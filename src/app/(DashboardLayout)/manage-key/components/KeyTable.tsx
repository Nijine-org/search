'use client';
import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
// import { notification } from 'antd';
import React, { useEffect } from 'react';
import TitleIconCard from '@/app/components/shared/TitleIconCard';
import Table from '@/app/components/shared/Table';
import { Key } from '../type';
import { IconDotsVertical } from '@tabler/icons-react';
import { Dropdown } from 'flowbite-react';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';
type Props = {
  data: Key[] | null;
};

const columnHelper = createColumnHelper<Key>();
const KeyTable = ({ data: tableData }: Props) => {
  console.error('tableData', tableData);
  // const [api, contextHolder] = notification.useNotification();
  const [data, setData] = React.useState(() => [...(tableData || [])]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  // console.log('data', tableData);
  // const router = useRouter();
  // const handleEditClick = async (id: string) => {
  //   router.push(`bonus/edit/${id}`);
  // };
  // const handleRedirectionClick = (link: string) => {
  //   console.log('tableData', tableData);
  //   console.log(' ', link);
  //   router.push(link);
  // };
  const handleEditClick = (id: string) => {
    console.error('id', id);
  };
  const handleDeleteClick = (id: string) => {
    console.error('id', id);
  };
  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => (
        <div className="flex gap-3 items-center cursor-pointer">
          {/* <Image
            src="/images/blog/blog-img1.jpg"
            width={50}
            height={50}
            alt="icon"
            className="h-10 w-10 rounded-md"
          /> */}
          <div
            className="truncate line-clamp-2 max-w-56"
            // onClick={() =>
            //   handleRedirectionClick(info.row.original['tel:businesslink'])
            // }
          >
            <h6 className="text-darklink dark:text-bodytext text-base">
              {info.row.original.name}
            </h6>
            {/* <p className="text-sm text-darklink dark:text-bodytext">
                {info.row.original.company_name}
              </p> */}
          </div>
        </div>
      ),
      header: () => <span>Name</span>,
    }),

    columnHelper.accessor('token', {
      cell: (info) => (
        <div className="flex gap-2">
          {
            <p className="text-darklink dark:text-bodytext text-sm">
              {info.getValue()}
            </p>
          }
        </div>
      ),
      header: () => <span>Key</span>,
    }),
    columnHelper.accessor('status', {
      cell: (info) => (
        <div className="flex gap-2">
          {
            <p className="text-darklink dark:text-bodytext text-sm">
              {info.getValue()}
            </p>
          }
        </div>
      ),
      header: () => <span>Key</span>,
    }),
    columnHelper.accessor('id', {
      header: () => <span></span>,
      cell: (info) => (
        <Dropdown
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
              <IconDotsVertical size={22} />
            </span>
          )}
        >
          {[
            {
              icon: 'solar:pen-new-square-broken',
              color: 'success',
              listtitle: 'Make Active',
              handleClick: () => {
                handleEditClick(info.row.original.id);
              },
            },
            {
              icon: 'solar:trash-bin-minimalistic-outline',
              color: 'error',
              listtitle: 'Delete',
              handleClick: () => {
                handleDeleteClick(info.row.original.id);
              },
            },
          ].map((item, index) => (
            <Dropdown.Item
              key={index}
              onClick={item.handleClick}
              className="flex gap-3"
            >
              <Icon
                icon={item.icon}
                height={18}
                className={`text-${item.color}`}
              />
              <span>{item.listtitle}</span>
            </Dropdown.Item>
          ))}
        </Dropdown>
      ),
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: (filters) => setColumnFilters(filters),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  useEffect(() => {
    setData(tableData ?? []);
  }, [tableData]);

  return (
    <>
      <TitleIconCard
        // renderIcon={() => (
        //   <Icon icon="solar:add-circle-linear" width="1.2rem" height="1.2rem" />
        // )}
        addFormLink="/payroll/bonus/add"
        title="Key List"
      >
        {/* {contextHolder} */}
        <Table<Key> table={table} />
      </TitleIconCard>
    </>
  );
};

export default KeyTable;
