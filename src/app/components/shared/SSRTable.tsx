// 'use client';
import React from 'react';
import Paginator from './Paginator';
import { TableMetaData } from '@/types';
import TableSearchInput from './TableSearchInput';
import CustomLimitSearch from './CustomLimitSearch';
interface Column<Data> {
  id: keyof Data;
  header: string;
  accessor: (row: Data) => React.ReactNode;
}

interface SSRTableProps<Data> {
  columns: Column<Data>[];
  data: Data[];
  searchValue: string | number;
  pagination: TableMetaData;
  // onChange: (value: string) => void;
  padding?: number;
}
const SSRTable = <Data extends { id: string }>({
  columns,
  data,
  searchValue,
  pagination,
  padding = 6,
  // onChange,
}: SSRTableProps<Data>) => {
  return (
    <div className={`pt-4 p-${padding}`}>
      <div className="border rounded-md border-ld overflow-hidden">
        <div className="p-4">
          {/* Filtering Inputs */}
          <div className="flex justify-between sm:flex-row flex-col gap-6   mb-4">
            <div className="flex items-center gap-2">
              <CustomLimitSearch {...pagination} />
            </div>
            <div className="">
              <TableSearchInput
                searchKey="search"
                value={searchValue ?? ''}
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.id)}
                    className="text-base text-ld font-semibold text-left border-b border-ld px-4 py-3"
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {columns.map((column) => (
                      <td
                        key={String(column.id)}
                        className="whitespace-nowrap py-3 px-4"
                      >
                        {column.accessor(row) as React.ReactNode}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-3">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Paginator {...pagination} />
    </div>
  );
};

export default SSRTable;
