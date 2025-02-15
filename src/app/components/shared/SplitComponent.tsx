'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  createColumnHelper,
  FilterFn,
} from '@tanstack/react-table';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import Image from 'next/image';
import { Input } from 'antd';
import CardBox from './CardBox';
import { useFormikContext } from 'formik';
import { getSelectedEmployeeFilterAction } from '@/app/(DashboardLayout)/payroll/bonus/_actions';
import { getInitials, getRandomColor, getTextColor } from '@/utils/helper';
import { EmployeeTableData } from '@/app/(DashboardLayout)/payroll/bonus/_types';
import SplitTable from './empolyeeFilter/SplitTable';
import { Icon } from '@iconify/react/dist/iconify.js';
import { usePathname } from 'next/navigation';
import { empSelectedStore } from '@/app/store/empSelectedStore';

interface PoolSplitTableData extends EmployeeTableData {
  amountValue?: string;
  percentageValue?: string;
  amountLockedStatus?: boolean;
}
const columnHelper = createColumnHelper<PoolSplitTableData>();
type Props = {
  employee_list?: string[];
  selectionMode: 'multi' | 'pools';
  initialValues?: string[] | { user_id: number; amount: string }[];
};
type updatedPoolValue = {
  user_id: number;
  amount?: string;
  percentage?: string;
};
const MAX_POOL_MEMBERS = 50;

const SplitComponent: React.FC<Props> = ({ employee_list, initialValues }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('Amount');
  const { values, setFieldValue } = useFormikContext<{
    amount: number;
    employee_list: { user_id: number; amount: string }[];
  }>();
  const totalAmount = values.amount;
  const [data, setData] = useState<PoolSplitTableData[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const [editingValues, setEditingValues] = useState<Record<number, string>>(
    {},
  );

  const pathSegments = pathname.split('/').filter(Boolean);
  const formType = pathSegments[2];

  useEffect(() => {
    const initializeData = async () => {
      if (!employee_list?.length) {
        setData([]);
        setTotalPage(0);
        return;
      }

      const resData = await getSelectedEmployeeFilterAction({
        employee_ids: employee_list,
        page: 1,
        limit: 50,
      });

      if (resData?.state) {
        // If the current employee count is less than initial distribution,
        const dataLength = resData.data.length;
        const shouldRecalculateAll =
          initialValues &&
          (dataLength !== initialValues.length ||
            totalAmount !==
              values.employee_list.reduce(
                (sum, item) => sum + parseFloat(item.amount),
                0,
              ));

        const equalDistributionAmount = (totalAmount / dataLength).toFixed(2);
        const equalDistributionPercentage = (100 / dataLength).toFixed(2);

        const enrichedData = resData.data?.map((item) => {
          if (shouldRecalculateAll) {
            // Recalculate for everyone when employee count is reduced
            return {
              ...item,
              amountValue: equalDistributionAmount,
              percentageValue: equalDistributionPercentage,
              amountLockedStatus: false,
            };
          } else {
            // Find matching initial value if it exists
            const initialValue = initialValues?.find(
              (val) =>
                typeof val !== 'string' &&
                String(val.user_id) === String(item.user_id),
            );

            if (initialValue) {
              // Use initial value if it exists
              const amount =
                typeof initialValue !== 'string'
                  ? (initialValue.amount ?? '0')
                  : '0';
              const percentage = (
                (parseFloat(amount) / totalAmount) *
                100
              ).toFixed(2);

              return {
                ...item,
                amountValue: amount,
                percentageValue: percentage,
                amountLockedStatus: false,
              };
            } else {
              // Use equal distribution for new entries
              return {
                ...item,
                amountValue: equalDistributionAmount,
                percentageValue: equalDistributionPercentage,
                amountLockedStatus: false,
              };
            }
          }
        });

        const page = resData.pagination?.total;
        setTotalPage(page);
        setData(enrichedData ?? []);
      }
    };

    initializeData();
  }, [employee_list, totalAmount, initialValues]);

  //user_id && amount set
  const formattedEmployeeList: updatedPoolValue[] = useMemo(() => {
    return data?.map((employee) => ({
      user_id: Number(employee.user_id),
      [activeTab === 'Amount' ? 'amount' : 'percentage']:
        activeTab === 'Amount'
          ? employee.amountValue || '0'
          : employee.percentageValue || '0',
    }));
  }, [data, activeTab]);

  useEffect(() => {
    if (
      formType == 'add' &&
      formattedEmployeeList &&
      employee_list &&
      employee_list?.length > 0
    ) {
      setFieldValue('employee_list', formattedEmployeeList);
    } else {
      // pool_updatedvalues
      empSelectedStore.setState((prev) => ({
        ...prev,
        pool_updatedvalues: formattedEmployeeList,
      }));
    }
  }, [
    formType,
    employee_list,
    initialValues,
    formattedEmployeeList,
    setFieldValue,
  ]);

  const redistributeAmount = (changedIndex: number, newValue: string) => {
    const numericValue = parseFloat(newValue) || 0;

    setData((prevData) => {
      const newData = [...prevData];

      // Calculate total allocated amount excluding current change
      const totalAllocated = newData.reduce((sum, item, idx) => {
        if (
          idx !== changedIndex &&
          (item.amountLockedStatus || idx === changedIndex)
        ) {
          return sum + (parseFloat(item.amountValue!) || 0);
        }
        return sum;
      }, 0);

      // Check if remaining amount is available
      const remainingAvailable = totalAmount - totalAllocated;

      // If attempting to allocate more than available, return without changes
      if (numericValue > remainingAvailable) {
        return prevData;
      }

      // Update the changed member's amount
      newData[changedIndex] = {
        ...newData[changedIndex],
        amountValue: newValue,
        percentageValue: ((numericValue / totalAmount) * 100).toFixed(2),
      };

      // Get total locked amount including the changed amount
      const lockedAmount = newData.reduce((sum, item, idx) => {
        if (idx === changedIndex || item.amountLockedStatus) {
          return sum + (parseFloat(item.amountValue!) || 0);
        }
        return sum;
      }, 0);

      // Get unlocked members
      const unlockedMembers = newData.filter(
        (item, idx) => !item.amountLockedStatus && idx !== changedIndex,
      );

      if (unlockedMembers.length > 0) {
        const remainingAmount = totalAmount - lockedAmount;

        // Only distribute if there's a positive remaining amount
        if (remainingAmount >= 0) {
          const equalShare = remainingAmount / unlockedMembers.length;

          // Update unlocked members
          newData.forEach((item, idx) => {
            if (!item.amountLockedStatus && idx !== changedIndex) {
              const isLastUnlocked =
                idx ===
                newData.findLastIndex(
                  (item, i) => !item.amountLockedStatus && i !== changedIndex,
                );

              if (isLastUnlocked) {
                const currentTotal = newData.reduce((sum, curr, i) => {
                  if (i === idx) return sum;
                  return sum + (parseFloat(curr.amountValue!) || 0);
                }, 0);
                const finalAmount = Math.max(
                  0,
                  totalAmount - currentTotal,
                ).toFixed(2);
                item.amountValue = finalAmount;
                item.percentageValue = (
                  (parseFloat(finalAmount) / totalAmount) *
                  100
                ).toFixed(2);
              } else {
                item.amountValue = Math.max(0, equalShare).toFixed(2);
                item.percentageValue = (
                  (equalShare / totalAmount) *
                  100
                ).toFixed(2);
              }
            }
          });
        } else {
          // If no remaining amount, set all unlocked members to 0
          newData.forEach((item, idx) => {
            if (!item.amountLockedStatus && idx !== changedIndex) {
              item.amountValue = '0';
              item.percentageValue = '0';
            }
          });
        }
      }
      return newData;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    const numericValue = parseFloat(value) || 0;

    // Calculate total allocated amount excluding current field
    const totalAllocated = data.reduce((sum, item, idx) => {
      if (idx !== index && item.amountLockedStatus) {
        return sum + (parseFloat(item.amountValue!) || 0);
      }
      return sum;
    }, 0);

    // Calculate maximum allowed value for this input
    const maxAllowed = totalAmount - totalAllocated;

    // Don't allow values greater than remaining amount
    if (numericValue > maxAllowed) {
      return;
    }

    setEditingValues((prev) => ({
      ...prev,
      [index]: value,
    }));

    redistributeAmount(index, value);
  };

  const handleBlur = (index: number) => {
    const newValue = editingValues[index];
    if (newValue) {
      redistributeAmount(index, newValue);
    }
    setEditingValues((prev) => {
      const newValues = { ...prev };
      delete newValues[index];
      return newValues;
    });
  };
  const handlePercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value.replace(/[^\d.]/g, '');

    setEditingValues((prev) => ({
      ...prev,
      [index]: value,
    }));

    const percentValue = parseFloat(value) || 0;
    if (percentValue > 100) return;

    const amountValue = ((percentValue / 100) * totalAmount).toFixed(2);
    redistributeAmount(index, amountValue);
  };

  const isInputDisabled = (index: number) => {
    // Calculate total allocated amount in locked fields
    const totalAllocated = data.reduce((sum, item, idx) => {
      if (item.amountLockedStatus && idx !== index) {
        return sum + (parseFloat(item.amountValue!) || 0);
      }
      return sum;
    }, 0);

    // Input should be disabled if total amount is already allocated
    return totalAllocated >= totalAmount;
  };

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  //fuzzyFilter
  const fuzzyFilter: FilterFn<EmployeeTableData> = (
    row,
    columnId,
    value,
    addMeta,
  ) => {
    const itemValue = String(row.getValue(columnId) || '').toLowerCase();
    const searchValue = String(value).toLowerCase();
    const itemRank: RankingInfo = rankItem(itemValue, searchValue);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  const columns = [
    columnHelper.accessor('employee_name', {
      cell: (info) => {
        const rowIndex = info.row.index;
        const { profile, id, designation_name, department_name } =
          info.row.original;
        const currentAmount = data?.[rowIndex]?.amountValue || '0';
        return (
          <div className="flex gap-3 items-start">
            <div className="truncate line-clamp-2 max-w-75">
              <div className="flex gap-3 items-center">
                {profile && !imageErrors?.[id] ? (
                  <Image
                    src={profile}
                    alt="materialm"
                    className="h-[40px] w-[40px] rounded-full mx-auto aspect-square border-1 border-solid border-gray-300"
                    width={40}
                    height={40}
                    onError={() => {
                      setImageErrors((prev) => ({
                        ...prev,
                        [id]: true,
                      }));
                    }}
                  />
                ) : (
                  <p
                    className={`w-[40px] h-[40px] rounded-full flex justify-center items-center  
                ${getTextColor(getRandomColor(info.getValue()))}  
              bg-${getRandomColor(info.getValue())} dark:bg-${getRandomColor(info.getValue())}`}
                  >
                    {getInitials(info.getValue())}
                  </p>
                )}

                <div>
                  <div className="flex items-center ">
                    <h6 className="text-base mr-2">{info.getValue()}</h6>
                    {activeTab === 'Percentage' && (
                      <span className="text-sm text-blue-500">
                        ₹{currentAmount}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-row justify-start items-center gap-2 mt-1">
                    <span className="text-sm">{designation_name}</span>
                    <span className="text-sm">{department_name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      },
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('employee_id', {
      cell: (info) => {
        const rowIndex = info.row.index;
        const isLocked = data[rowIndex]?.amountLockedStatus;
        const inputValue =
          activeTab === 'Amount'
            ? data[rowIndex]?.amountValue
            : data[rowIndex]?.percentageValue;
        return (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              size="large"
              className="input-custom"
              prefix={activeTab === 'Amount' ? '₹' : null}
              suffix={activeTab === 'Percentage' ? '%' : null}
              onChange={(e) => {
                if (activeTab === 'Amount') {
                  handleInputChange(e, rowIndex);
                } else {
                  handlePercentageChange(e, rowIndex);
                }
              }}
              onBlur={() => handleBlur(rowIndex)}
              disabled={isInputDisabled(rowIndex)}
              value={inputValue}
              style={{ width: '150px' }}
              key={`${rowIndex}-${activeTab}`}
            />
            <button
              onClick={() => {
                setData((prevData) => {
                  const newData = [...prevData];
                  newData[rowIndex] = {
                    ...newData[rowIndex],
                    amountLockedStatus: !isLocked,
                  };
                  return newData;
                });
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isLocked ? (
                <Icon
                  className="w-4 h-4 text-blue-500"
                  icon="uil:lock-alt"
                  height={20}
                />
              ) : (
                <Icon
                  className="w-4 h-4 text-gray-400"
                  icon="tabler:lock-open"
                  height={20}
                />
              )}
            </button>
          </div>
        );
      },
      header: () => <span>Employee ID</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <>
      <CardBox className="max-w-2xl relative h-full">
        <div className="flex items-center justify-between">
          <h5 className="card-title flex items-center justify-center">
            Pool Split - {totalAmount} / &nbsp;
            <span className="mr-2 flex items-center justify-center w-8 h-8 text-primary overflow-hidden bg-lightprimary dark:bg-darksecondary rounded-full text-sm font-medium hover:bg-lightprimary">
              {totalPage ?? 0}
            </span>
          </h5>
          <div className="mb-4 sm:mt-0 mt-6">
            <div className="flex flex-wrap bg-muted dark:bg-dark p-1 rounded-full">
              <div
                onClick={() => handleTabClick('Amount')}
                className={`py-2 px-4 rounded-full min-w-[100px] cursor-pointer text-dark text-xs font-semibold text-center ${
                  activeTab === 'Amount'
                    ? 'text-dark bg-white dark:bg-darkgray dark:text-white'
                    : 'dark:text-white opacity-60'
                }`}
              >
                Amount
              </div>
              <div
                onClick={() => handleTabClick('Percentage')}
                className={`py-2 px-4 rounded-full min-w-[100px] cursor-pointer text-dark text-xs font-semibold text-center ${
                  activeTab === 'Percentage'
                    ? 'text-dark bg-white dark:bg-darkgray dark:text-white'
                    : 'dark:text-white opacity-60'
                }`}
              >
                Percentage
              </div>
            </div>
          </div>
        </div>
        {(totalPage ?? 0) > MAX_POOL_MEMBERS ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <p className="text-center text-lg font-semibold text-red-500">
              Employee limit exceeded. Kindly reduce the number of employees.
            </p>
          </div>
        ) : (
          <div className="relative h-full ">
            <div className="aside_list_content ">
              <SplitTable
                table={table}
                searchValue={''}
                onChange={setGlobalFilter}
              />
            </div>
          </div>
        )}
      </CardBox>
    </>
  );
};

export default SplitComponent;
