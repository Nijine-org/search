'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Input, InputProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

interface DebouncedInputProps extends Omit<InputProps, 'onChange'> {
  value: string | number;
  debounce?: number;
  searchKey: string;
}

const TableSearchInput: React.FC<DebouncedInputProps> = ({
  value,
  debounce = 0, // Default debounce time set to 2 seconds
  searchKey,
  ...props
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(String(value));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update query in the URL after debounce delay
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);

    // Clear previous timer if any
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer to update query after the debounce delay
    timerRef.current = setTimeout(() => {
      updateQuery(searchKey, newValue);
    }, debounce);
  };

  useEffect(() => {
    setSearchValue(String(value)); // Sync value if prop changes
  }, [value]);

  return (
    <Input
      {...props}
      value={searchValue}
      id="search-bar-0"
      className="form-control search"
      onChange={handleChange}
      style={{ padding: '8px 11px' }}
      autoFocus={true}
      suffix={<Icon icon="solar:magnifer-line-duotone" height={20} />}
    />
  );
};

export default TableSearchInput;
