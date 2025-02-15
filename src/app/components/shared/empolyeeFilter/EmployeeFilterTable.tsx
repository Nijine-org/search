'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
  PaginationState,
  OnChangeFn,
} from '@tanstack/react-table';
import { Checkbox } from 'flowbite-react';
import TitleIconCard from '@/app/components/shared/TitleIconCard';
import Link from 'next/link';
import { getEmployeeFilterAction } from '@/app/(DashboardLayout)/payroll/bonus/_actions';
import { useStore } from '@tanstack/react-store';
import { empFilterStore } from '@/app/store/empFilterStore';
import { EmployeeTableData } from '@/app/(DashboardLayout)/payroll/bonus/_types';
import { empPaginationStore } from '@/app/store/empPaginationStore';
import { getInitials, getRandomColor, getTextColor } from '@/utils/helper';
import Image from 'next/image';
import CommonEmployeeTable from './CommonEmployeeTable';
import { notification } from 'antd';
import { empSelectedStore } from '@/app/store/empSelectedStore';
type NotificationProps = {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
};

const columnHelper = createColumnHelper<EmployeeTableData>();

type EmployeeFilterTableProps = {
  selectionMode: 'single' | 'multi' | 'pool';
  name: string;
};

const MAX_POOL_MEMBERS = 50;
const EmployeeFilterTable: React.FC<EmployeeFilterTableProps> = ({
  selectionMode,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const params = useStore(empFilterStore, (state) => state);
  const { selected_employees } = useStore(empSelectedStore, (state) => state);
  const { paginationData } = useStore(empPaginationStore, (state) => state);
  const [data, setData] = useState<EmployeeTableData[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(
    new Set(selected_employees),
  );
  const [pageSelections, setPageSelections] = useState<
    Record<number, Set<string>>
  >({});
  // console.log(selected_employees,params.all,"ckk")
  useEffect(() => {
    if (selected_employees && selected_employees.length === 0) {
      setSelectedRows(new Set());
      setPageSelections({});
    }
  }, [selected_employees]);
  // console.log(selected_employees)
  //error image set
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const memoizedParams = useMemo(
    () => params,
    [
      params.department_ids,
      params.designation_ids,
      params.search,
      params.page,
      params.limit,
      params.all,
    ],
  );

  useEffect(() => {
    // The action should be call here.
    const initialFetch = async () => {
      const resData = await getEmployeeFilterAction(memoizedParams);
      if (resData?.state) {
        setData(resData?.data || []);
        empPaginationStore.setState((prev) => ({
          ...prev,
          paginationData: resData?.pagination,
        }));
        if (memoizedParams?.all) {
          const newSelected = new Set(
            resData?.selected_employee_ids?.map((id) => id.toString()),
          );
          setSelectedRows(newSelected);
          empSelectedStore.setState((prev) => ({
            ...prev,
            selected_employees: Array.from(newSelected),
          }));
        }
      }
    };
    initialFetch();
    // Add the deparments and the designation in the dependency array
  }, [memoizedParams]);

  const openNotification = ({
    type,
    title,
    description,
  }: NotificationProps) => {
    api.open({
      type,
      message: title,
      description,
    });
  };

  // Update store with selected employees
  const updateStore = (selections: Set<string>) => {
    // console.log(selections,"checks")
    empSelectedStore.setState((prev) => ({
      ...prev,
      selected_employees: Array.from(selections),
    }));
  };

  const globalFilterChange = (value: string) => {
    empFilterStore.setState((prev) => ({
      ...prev,
      search: value,
    }));
  };

  const handleCheckboxChange = (user_id: string) => {
    const newSelectedRows = new Set(selectedRows);
    const currentPage = paginationData?.current_page || 1;

    if (selectionMode === 'single') {
      newSelectedRows.clear();
      newSelectedRows.add(user_id);
      setPageSelections({});
    } else if (selectionMode === 'multi') {
      if (newSelectedRows.has(user_id)) {
        newSelectedRows.delete(user_id);
        // Remove from page selections
        const pageSet = new Set(pageSelections[currentPage] || []);
        pageSet.delete(user_id);
        setPageSelections({ ...pageSelections, [currentPage]: pageSet });
      } else {
        newSelectedRows.add(user_id);
        // Add to page selections
        const pageSet = new Set(pageSelections[currentPage] || []);
        pageSet.add(user_id);
        setPageSelections({ ...pageSelections, [currentPage]: pageSet });
      }
    } else if (selectionMode === 'pool') {
      if (newSelectedRows.has(user_id)) {
        newSelectedRows.delete(user_id);

        const pageSet = new Set(pageSelections[currentPage] || []);
        pageSet.delete(user_id);
        setPageSelections({ ...pageSelections, [currentPage]: pageSet });
      } else {
        if (newSelectedRows.size >= MAX_POOL_MEMBERS) {
          openNotification({
            type: 'warning',
            title: 'Selection Limit Reached',
            description: `You can only select up to ${MAX_POOL_MEMBERS} members in a pool`,
          });
          return;
        }
        newSelectedRows.add(user_id);
        const pageSet = new Set(pageSelections[currentPage] || []);
        pageSet.add(user_id);
        setPageSelections({ ...pageSelections, [currentPage]: pageSet });
      }
    }

    setSelectedRows(newSelectedRows);
    updateStore(newSelectedRows);

    if (params.all) {
      empFilterStore.setState((prev) => ({
        ...prev,
        all: false,
      }));
    }
  };

  //pagewise selection all
  const handleSelectAll = () => {
    if (!['multi', 'pool'].includes(selectionMode)) return;

    const currentPage = paginationData?.current_page || 1;
    const currentPageSelected = data.every((row) =>
      selectedRows.has(row.user_id.toString()),
    );
    const newSelectedRows = new Set(selectedRows);

    // Handle deselection - only deselect current page items
    if (currentPageSelected) {
      // Only remove current page selections
      const currentPageIds = data.map((row) => row.user_id.toString());
      currentPageIds.forEach((id) => newSelectedRows.delete(id));

      // Update page selections for current page only
      const newPageSelections = { ...pageSelections };
      delete newPageSelections[currentPage];
      setPageSelections(newPageSelections);
    }
    // Handle selection
    else {
      // For pools mode, check if adding current page would exceed limit
      if (selectionMode === 'pool') {
        const remainingSlots = MAX_POOL_MEMBERS - newSelectedRows.size;

        if (remainingSlots <= 0) {
          openNotification({
            type: 'warning',
            title: 'Selection Limit Reached',
            description: `You can only select up to ${MAX_POOL_MEMBERS} members in a pool`,
          });
          return;
        }

        // Only add up to remaining slots
        const itemsToAdd = data.slice(0, remainingSlots);
        itemsToAdd.forEach((row) =>
          newSelectedRows.add(row.user_id.toString()),
        );

        if (itemsToAdd.length < data.length) {
          openNotification({
            type: 'warning',
            title: 'Partial Selection',
            description: `Only ${itemsToAdd.length} items were selected to stay within the ${MAX_POOL_MEMBERS} member limit`,
          });
        }

        // Update page selections for current page
        setPageSelections({
          ...pageSelections,
          [currentPage]: new Set(
            itemsToAdd.map((row) => row.user_id.toString()),
          ),
        });
      }
      // For multi mode, add all current page items
      else {
        data.forEach((row) => newSelectedRows.add(row.user_id.toString()));

        // Update page selections for current page
        setPageSelections({
          ...pageSelections,
          [currentPage]: new Set(data.map((row) => row.user_id.toString())),
        });
      }
    }

    setSelectedRows(newSelectedRows);
    updateStore(newSelectedRows);
  };

  useEffect(() => {
    // When page changes, ensure existing selections maintained
    if (selectionMode === 'pool' && selectedRows.size > 0 && params.all) {
      empFilterStore.setState((prev) => ({
        ...prev,
        all: false,
      }));
      const newSelectedRows = new Set(selectedRows);
      setSelectedRows(newSelectedRows);
      updateStore(newSelectedRows);
    } else if (
      selectionMode === 'pool' &&
      selectedRows.size > 0 &&
      !params.all
    ) {
      const newSelectedRows = new Set(selectedRows);
      setSelectedRows(newSelectedRows);
      updateStore(newSelectedRows);
    }
  }, [paginationData?.current_page, params.all]);

  const handleMarkAllChange = async (check: boolean) => {
    await empFilterStore.setState((prev) => ({
      ...prev,
      all: check,
    }));

    if (!check) {
      setSelectedRows(new Set());
      setPageSelections({});
      updateStore(new Set());
    } else {
      await handleSelectAll();
    }
  };

  const columns = [
    columnHelper.accessor('user_id', {
      cell: (info) => {
        const user_id = info.getValue().toString();
        return (
          <Checkbox
            className="checkbox"
            checked={selectedRows.has(user_id)}
            onChange={() => handleCheckboxChange(user_id)}
          />
        );
      },
      header: () => (
        <div className="flex items-center gap-2 min-w-[80px]">
          <Checkbox
            className="checkbox"
            checked={
              data.length > 0 &&
              data.every((row) => selectedRows.has(row.user_id.toString()))
            }
            onChange={handleSelectAll}
          />
          {selectedRows.size > 0 && (
            <span className="text-xs text-blue-600  truncate  max-w-[70px]">
              {selectedRows.size} selected
            </span>
          )}
        </div>
      ),
    }),
    columnHelper.accessor('employee_id', {
      cell: (info) => (
        <div className="flex gap-2">
          <p className=" capitalize rounded-none min-w-[110px] text-center justify-center">
            {info.getValue()}
          </p>
        </div>
      ),
      header: () => <span>Employee ID</span>,
    }),
    columnHelper.accessor('employee_name', {
      cell: (info) => {
        const { profile, id, designation_name, department_name } =
          info.row.original;
        return (
          <div className="flex gap-3 items-start">
            <div className="truncate line-clamp-2 max-w-75">
              <Link href={`/employee/${id}`} className="flex flex-col">
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
                    <h6 className="text-base">{info.getValue()}</h6>
                    <div className="flex flex-row justify-start items-center gap-2 mt-1">
                      <span className="text-sm">{designation_name}</span>
                      <span className="text-sm">{department_name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      },
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('DOJ', {
      cell: (info) => (
        <div className="flex gap-2">
          <div className="flex items-center justify-center gap-4">
            <p>{info.getValue()}</p>
          </div>
        </div>
      ),
      header: () => <span>Date of Join</span>,
    }),
  ];

  //initial pagination data
  const pagination = {
    pageIndex: (paginationData?.current_page ?? 1) - 1,
    pageSize: paginationData?.per_page ?? 10,
  };

  // Handle pagination
  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    if (typeof updater !== 'function') return;

    const newPageInfo = updater(table.getState().pagination);
    const { pageIndex, pageSize } = newPageInfo;

    const newLimit = Number(pageSize);

    //limit is greater than pageSize that time set page
    const newTotalPages = Math.ceil((paginationData?.total ?? 1) / newLimit);
    const newPage = Math.min(pageIndex + 1, newTotalPages);

    empFilterStore.setState((prev) => ({
      ...prev,
      page: newPage,
      limit: newLimit,
    }));
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    onPaginationChange: handlePaginationChange,
    pageCount: paginationData?.last_page || 1,
    state: {
      pagination,
    },
    manualPagination: true,
  });

  return (
    <>
      <TitleIconCard
        title={`Employee Details - ${paginationData?.total ?? 0} Entries ${
          selectionMode === 'pool'
            ? `(${selectedRows.size}/${MAX_POOL_MEMBERS} selected)`
            : ''
        }`}
        addFormLink="bank/add/bank"
      >
        {contextHolder}
        <CommonEmployeeTable<EmployeeTableData>
          table={table}
          searchValue={memoizedParams?.search}
          onChange={globalFilterChange}
          markAll={selectionMode === 'pool' ? false : true}
          // markAll={true}
          markAllCheckbox={memoizedParams?.all ?? false}
          markAllonChange={handleMarkAllChange}
        />
      </TitleIconCard>
    </>
  );
};

export default EmployeeFilterTable;
