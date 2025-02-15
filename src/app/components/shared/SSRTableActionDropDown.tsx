'use client';

import { Icon } from '@iconify/react/dist/iconify.js';
import { IconDotsVertical } from '@tabler/icons-react';
import React from 'react';
import { Dropdown } from 'flowbite-react';
import { CustomResponse } from '@/types';
// Define the structure of the dropdown button config
export interface DropdownButtonConfig {
  icon: string; // Icon identifier
  color?: string; // Optional color for the icon
  listtitle: string; // List item title
  handleClick: (id: string) => Promise<CustomResponse<unknown>>; // Click handler
}

interface DropdownProps {
  config: DropdownButtonConfig[]; // Array of dropdown button configurations
  row: Row;
}
interface Row {
  id: string;
}
const SSRTableActionDropDown = ({ row, config }: DropdownProps) => {
  return (
    <Dropdown
      label=""
      dismissOnClick={true}
      renderTrigger={() => (
        <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
          <IconDotsVertical size={22} />
        </span>
      )}
    >
      {config.map((item, index) => (
        <Dropdown.Item
          key={index}
          onClick={() => {
            void item.handleClick(row.id);
          }}
          className="flex gap-3"
        >
          <Icon icon={item.icon} height={18} className={`text-${item.color}`} />
          <span>{item.listtitle}</span>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default SSRTableActionDropDown;
