import React from 'react';
import { flexRender, Table as ReactTable } from '@tanstack/react-table';
import DebouncedInput from '../DebounceInput';
type Props<T> = {
  table: ReactTable<T>;
  searchValue?: string;
  onChange?: (value: string) => void;
};
const SplitTable = <T extends object>({
  table,
  searchValue,
  onChange,
}: Props<T>) => {
  const rows = table?.getRowModel()?.rows;
  return (
    <div className="rounded-md border-ld overflow-hidden">
      <div className="p-4">
        {/* Filtering Inputs */}
        <div className="flex justify-end sm:flex-row flex-col gap-6   mb-4">
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
          {/* <thead>
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
          </thead> */}
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
    </div>
  );
};

export default SplitTable;
