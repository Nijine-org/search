'use client';
import { getSelectedEmployeeFilterAction } from '@/app/(DashboardLayout)/payroll/bonus/_actions';
import { EmployeeTableData } from '@/app/(DashboardLayout)/payroll/bonus/_types';
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import TitleIconCard from '../TitleIconCard';
import { useStore } from '@tanstack/react-store';
import { empFilterStore } from '@/app/store/empFilterStore';
import { empPaginationStore } from '@/app/store/empPaginationStore';
import { getInitials, getRandomColor, getTextColor } from '@/utils/helper';
import Image from 'next/image';
import CommonEmployeeTable from './CommonEmployeeTable';
import { empSelectedStore } from '@/app/store/empSelectedStore';
const columnHelper = createColumnHelper<EmployeeTableData>();

const SelectedEmployeeTable = () => {
  const { confirm_checked_employees } = useStore(
    empSelectedStore,
    (state) => state,
  );
  const params = useStore(empFilterStore, (state) => state);
  const { selectedPaginationData } = useStore(
    empPaginationStore,
    (state) => state,
  );
  const [data, setData] = React.useState<EmployeeTableData[]>([]);

  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const memoizedParams = useMemo(
    () => params,
    [params.selectedSearch, params.selectedPage, params.selectedLimit],
  );
  useEffect(() => {
    if (confirm_checked_employees && confirm_checked_employees.length > 0) {
      // The action should be call here.
      const initialFetch = async () => {
        const resData = await getSelectedEmployeeFilterAction({
          employee_ids: confirm_checked_employees,
          page: memoizedParams?.selectedPage,
          limit: memoizedParams?.selectedLimit,
          search: memoizedParams?.selectedSearch,
        });
        if (resData?.state) {
          setData(resData?.data || []);
          empPaginationStore.setState((prev) => ({
            ...prev,
            selectedPaginationData: resData?.pagination,
          }));
        }
      };
      initialFetch();
    }

    // Add the deparments and the designation in the dependency array
  }, [confirm_checked_employees, memoizedParams]);

  const globalFilterChange = (value: string) => {
    empFilterStore.setState((prev) => ({
      ...prev,
      selectedSearch: value,
    }));
  };

  const columns = [
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
                      alt="profile"
                      className="h-[40px] w-[40px] rounded-full mx-auto aspect-square"
                      width={20}
                      height={20}
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
    pageIndex: (selectedPaginationData?.current_page ?? 1) - 1,
    pageSize: selectedPaginationData?.per_page ?? 10,
  };

  // Handle pagination
  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    if (typeof updater !== 'function') return;

    const newPageInfo = updater(table.getState().pagination);
    const { pageIndex, pageSize } = newPageInfo;

    const newLimit = Number(pageSize);

    //limit is greater than pageSize that time set page
    const newTotalPages = Math.ceil(
      (selectedPaginationData?.total ?? 1) / newLimit,
    );
    const newPage = Math.min(pageIndex + 1, newTotalPages);

    empFilterStore.setState((prev) => ({
      ...prev,
      selectedPage: newPage,
      selectedLimit: newLimit,
    }));
  };

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    onPaginationChange: handlePaginationChange,
    pageCount: selectedPaginationData?.last_page || 1,
    manualPagination: true,
  });

  return (
    <>
      <TitleIconCard
        title={`Selected Employee - ${selectedPaginationData?.total ?? 0}  Records`}
        addFormLink="bank/add/bank"
        onDownload={() => {}}
      >
        <CommonEmployeeTable<EmployeeTableData>
          table={table}
          searchValue={memoizedParams?.selectedSearch}
          onChange={globalFilterChange}
        />
      </TitleIconCard>
    </>
  );
};

export default SelectedEmployeeTable;
