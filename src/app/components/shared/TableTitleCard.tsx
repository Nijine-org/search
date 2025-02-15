'use client';
import React from 'react';

interface TitleCardProps {
  title?: string;
  onDownload?: () => void;
  addFormLink?: string;
  disableHeaderBorder?: boolean; // Added prop to control header border
  icon?: React.ReactNode;
  tableAction?: React.ReactNode;
}

const TableTitleCard: React.FC<TitleCardProps> = ({
  title = '',
  disableHeaderBorder = true, // Default to false
  tableAction,
}) => {
  return (
    <>
      <div
        className={`flex justify-between items-center px-6 py-4 ${
          disableHeaderBorder ? '' : 'border-b border-ld'
        }`}
      >
        {title && <h5 className="text-xl font-semibold">{title}</h5>}
        <div className="flex gap-3">
          {tableAction && tableAction}
          {/* {onDownload && (
            <Button
              className="flex items-center"
              size="sm"
              color="primary"
              onClick={onDownload}
            >
              <Icon
                icon="solar:download-minimalistic-bold-duotone"
                width={20}
                height={20}
              />
            </Button>
          )} */}
        </div>
      </div>
    </>
  );
};

export default TableTitleCard;
