'use client';
import TableSearchInput from '@/app/components/shared/TableSearchInput';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const SearchComponent = () => {
  const searchParams = useSearchParams();
  return (
    <div className="pb-5">
      <div className="pb-3">
        <h2>Search </h2>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="lg:col-span-4 col-span-12">
          <TableSearchInput
            searchKey="was"
            placeholder="Who/What/Phone Number"
            value={(searchParams.get('was') as string) ?? ''}
          />
        </div>

        <div className="lg:col-span-4 col-span-12">
          <TableSearchInput
            searchKey="wo"
            placeholder="Where"
            value={(searchParams.get('wo') as string) ?? ''}
          />
          {/* <Input
            id="account_name"
            name="account_name"
            placeholder="Where"
            onChange={(e) => {
              updateQuery({
                wo: e.target.value,
              });
            }}
            value={(searchParams.get('wo') as string) ?? ''}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
