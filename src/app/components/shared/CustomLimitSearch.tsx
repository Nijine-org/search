'use client';
import { TableMetaData } from '@/types';
import { Select } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
type Props = TableMetaData;
const CustomLimitSearch = ({
  per_page = 10,
  total = 0,
  current_page = 1,
  // last_page = 1,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        params.set(key, value);
      }
    });
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-center  sm:mt-0 mt-3 mr-2">
      <label className="mr-2 ">Show </label>
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
  );
};

export default CustomLimitSearch;
