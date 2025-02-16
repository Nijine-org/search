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
import { SearchResult, TelEntry } from '../_types';
import TitleIconCard from '@/app/components/shared/TitleIconCard';
import Table from '@/app/components/shared/Table';
import * as XLSX from 'xlsx';
// import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';
type Props = {
  data: SearchResult | null;
};

const columnHelper = createColumnHelper<TelEntry>();
const Search = ({ data: tableData }: Props) => {
  // const [api, contextHolder] = notification.useNotification();
  const [data, setData] = React.useState(() => [
    ...(tableData?.feed?.entry || []),
  ]);
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
              {info.row.original['tel:name']}
            </h6>
            {/* <p className="text-sm text-darklink dark:text-bodytext">
                {info.row.original.company_name}
              </p> */}
          </div>
        </div>
      ),
      header: () => <span>Name</span>,
    }),

    columnHelper.accessor('tel:phone', {
      cell: (info) => (
        <div className="flex gap-2">
          {
            <p className="text-darklink dark:text-bodytext text-sm">
              {info.getValue()}
            </p>
          }
        </div>
      ),
      header: () => <span>Phone</span>,
    }),
    // columnHelper.accessor('tel:occupation', {
    //   cell: (info) => (
    //     <p className="text-darklink dark:text-bodytext text-sm">
    //       {info.getValue()}
    //     </p>
    //   ),
    //   header: () => <span>Occupation</span>,
    // }),
    columnHelper.accessor('tel:zip', {
      cell: (info) => (
        <p className="text-darklink dark:text-bodytext text-sm">
          {info.getValue()}
        </p>
      ),
      header: () => <span>Zip code</span>,
    }),
    // columnHelper.accessor('title', {
    //   cell: (info) => (
    //     <p className="text-darklink dark:text-bodytext text-sm">
    //       {info.getValue()}
    //     </p>
    //   ),
    //   header: () => <span>Date</span>,
    // }),
    columnHelper.accessor('tel:street', {
      cell: (info) => (
        <p className="text-darklink dark:text-bodytext text-sm">
          <span className="block">
            street no : {info.row.original['tel:streetno']}
          </span>
          <span className="block">
            street : {info.row.original['tel:street']}
          </span>
          <span className="block">city : {info.row.original['tel:city']}</span>
        </p>
      ),
      header: () => <span>Address</span>,
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
  const handleDownload = () => {
    // Convert JSON to worksheet
    const worksheet = XLSX.utils.json_to_sheet(tableData?.feed?.entry ?? []);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write workbook and create a Blob
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    setData(tableData?.feed?.entry ?? []);
  }, [tableData]);

  return (
    <>
      <TitleIconCard
        // renderIcon={() => (
        //   <Icon icon="solar:add-circle-linear" width="1.2rem" height="1.2rem" />
        // )}
        onDownload={handleDownload}
        total={tableData?.feed['openSearch:itemsPerPage'] ?? 0}
        title="Bonus List"
      >
        {/* {contextHolder} */}
        <Table<TelEntry>
          table={table}
          total={tableData?.feed['openSearch:totalResults']}
        />
      </TitleIconCard>
    </>
  );
};

export default Search;
