import React from 'react';
import { flexRender, Table as ReactTable } from '@tanstack/react-table';
import { Button, Checkbox, Label } from 'flowbite-react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import DebouncedInput from '../DebounceInput';
import { Select } from 'antd';
type Props<T> = {
  table: ReactTable<T>;
  searchValue?: string;
  onChange?: (value: string) => void;
  markAll?: boolean;
  markAllCheckbox?: boolean;
  markAllonChange?: (value: boolean) => void;
};
const CommonEmployeeTable = <T extends object>({
  table,
  searchValue,
  onChange,
  markAll,
  markAllCheckbox,
  markAllonChange,
}: Props<T>) => {
  const rows = table?.getRowModel()?.rows;
  //   const onSearchHandle =(data)=>{
  // console.log(data,"search")
  //   }
  //   console.log(rows,"checked")
  return (
    <div className="border rounded-md border-ld overflow-hidden">
      <div className="p-4">
        {/* Filtering Inputs */}
        <div className="flex justify-between sm:flex-row flex-col gap-6   mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center  sm:mt-0 mt-3 mr-2">
              <label className="mr-2 ">Show </label>
              <Select
                value={table.getState().pagination.pageSize}
                onChange={(value) => {
                  table.setPageSize(Number(value));
                }}
                className="w-20"
                options={[5, 10, 15, 20, 25].map((pageSize) => ({
                  label: pageSize,
                  value: pageSize,
                }))}
              />
            </div>
            {markAll && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="accept"
                  checked={markAllCheckbox}
                  onChange={(e) => markAllonChange?.(e.target.checked)}
                />
                <Label htmlFor="accept" className="flex cursor-pointer">
                  Select All Entries
                </Label>
              </div>
            )}
          </div>
          <div className="">
            <DebouncedInput
              value={searchValue ?? ''}
              onChange={(value) => {
                if (onChange) {
                  onChange(String(value));
                }
              }}
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-base text-ld font-semibold  text-left border-b border-ld px-4 py-3"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border dark:divide-darkborder">
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="whitespace-nowrap py-3 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getHeaderGroups()[0]?.headers.length || 1}
                  className="text-center py-3"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {rows.length > 0 && (
        <div className="sm:flex  gap-2 p-3 items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Button color="primary">Force Rerender</Button> */}
            <h1 className="text-gray-700">
              {table.getPrePaginationRowModel().rows.length} Rows
            </h1>
          </div>
          <div className="sm:flex  items-center gap-2 sm:mt-0 mt-3">
            <div className="sm:flex items-center gap-2">
              <div className="flex ">
                <h2 className="text-gray-700 pe-1">Page</h2>
                <h2 className="font-semibold text-gray-900">
                  {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount()}
                </h2>
              </div>
              <div className="flex items-center gap-2 ">
                | Go to page:
                <input
                  type="number"
                  min="1"
                  max={table.getPageCount()}
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    table.setPageIndex(page);
                  }}
                  className="w-16  form-control-input"
                />
              </div>
              <div className="sm:mt-0 mt-3">
                <Select
                  value={table.getState().pagination.pageSize}
                  onChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                  className="w-20"
                  options={[5, 10, 15, 20, 25].map((pageSize) => ({
                    label: pageSize,
                    value: pageSize,
                  }))}
                />
              </div>
              <div className="flex gap-2 sm:mt-0 mt-3">
                <Button
                  size="small"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="bg-lightgray dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary disabled:opacity-50"
                >
                  <IconChevronsLeft className="text-ld" size={20} />
                </Button>
                <Button
                  size="small"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="bg-lightgray dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary disabled:opacity-50"
                >
                  <IconChevronLeft className="text-ld" size={20} />
                </Button>
                <Button
                  size="small"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="bg-lightgray dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary disabled:opacity-50"
                >
                  <IconChevronRight className="text-ld" size={20} />
                </Button>
                <Button
                  size="small"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="bg-lightgray dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary disabled:opacity-50"
                >
                  <IconChevronsRight className="text-ld" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonEmployeeTable;
