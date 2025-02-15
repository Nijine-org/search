'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'flowbite-react';
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react';
import { TableMetaData } from '@/types';
import { Select } from 'antd';
type Props = TableMetaData;
const Paginator = ({
  per_page = 10,
  total = 0,
  current_page = 1,
  last_page = 1,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  //   const [per_page, setPageSize] = useState(per_page);

  // const updateQuery = (key: string, value: string) => {
  //   const params = new URLSearchParams(searchParams.toString());

  //   // Update the parameter
  //   params.set(key, value);

  //   // Update the URL
  //   router.push(`?${params.toString()}`);
  // };

  const updateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update the parameters
    Object.entries(updates).forEach(([key, value]) => {
      // params.set(key, value);
      if (value !== undefined) {
        params.set(key, value);
      }
    });

    // Update the URL
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      {
        <div className="sm:flex gap-2 p-3 items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-gray-700">{total} Rows</h1>
          </div>
          <div className="sm:flex items-center gap-2 sm:mt-0 mt-3">
            <div className="flex items-center gap-2">
              <h2 className="text-gray-700 pe-1">Page</h2>
              <h2 className="font-semibold text-gray-900">
                {current_page} of {last_page}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              | Go to page:
              <input
                type="number"
                min="1"
                max={last_page}
                value={current_page}
                onChange={(e) => {
                  const newPage = Math.min(last_page, Number(e.target.value));
                  updateQuery({
                    page: String(newPage),
                  });
                }}
                className="w-16 form-control-input"
              />
            </div>
            {/* <div className="select-md sm:mt-0 mt-3">
              <select
                value={per_page}
                onChange={(e) => {
                  const newLimit = Number(e.target.value);
                  const newTotalPage = Math.ceil(total / newLimit);
                  const newPage = Math.min(current_page, newTotalPage);
                  updateQuery({
                    page: String(newPage),
                    limit: String(newLimit),
                  });
                }}
                className="border w-20"
              >
                {[10, 15, 20, 25].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="sm:mt-0 mt-3">
              <Select
                value={per_page}
                onChange={(value) => {
                  const newLimit = Number(value);
                  const newTotalPage = Math.ceil(total / newLimit);
                  const newPage = Math.min(current_page, newTotalPage);
                  updateQuery({
                    page: String(newPage),
                    limit: String(newLimit),
                  });
                }}
                options={[10, 15, 20, 25].map((pageSize) => ({
                  label: pageSize,
                  value: pageSize,
                }))}
              />
            </div>
            <div className="flex gap-2 sm:mt-0 mt-3">
              <Button
                size="small"
                onClick={() => {
                  updateQuery({
                    page: '1',
                  });
                }}
                disabled={current_page === 1}
                className="bg-lightgray dark:bg-dark hover:bg-lightprimary disabled:opacity-50"
              >
                <IconChevronsLeft className="text-ld" size={20} />
              </Button>
              <Button
                size="small"
                // onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                onClick={() => {
                  updateQuery({
                    page: String(Math.max(current_page - 1, 1)),
                  });
                }}
                disabled={current_page === 1}
                className="bg-lightgray dark:bg-dark hover:bg-lightprimary disabled:opacity-50"
              >
                <IconChevronLeft className="text-ld" size={20} />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  updateQuery({
                    page: String(Math.min(current_page + 1, last_page)),
                  });
                }}
                // onClick={() =>
                //   setCurrentPage((prev) =>
                //     Math.min(prev + 1, Math.ceil(total / per_page)),
                //   )
                // }
                disabled={current_page === last_page}
                className="bg-lightgray dark:bg-dark hover:bg-lightprimary disabled:opacity-50"
              >
                <IconChevronRight className="text-ld" size={20} />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  updateQuery({
                    page: String(last_page),
                  });
                }}
                // onClick={() => setCurrentPage(Math.ceil(total / per_page))}
                disabled={current_page === last_page}
                className="bg-lightgray dark:bg-dark hover:bg-lightprimary disabled:opacity-50"
              >
                <IconChevronsRight className="text-ld" size={20} />
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Paginator;
