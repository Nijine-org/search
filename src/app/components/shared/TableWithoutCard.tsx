'use client';

import { Button } from 'flowbite-react';
import React from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

interface TableWithoutCardProps {
  children: React.ReactNode;
  title?: string;
  onDownload?: () => void;
  addFormLink: string;
  renderIcon?: () => React.ReactNode;
  disableHeaderBorder?: boolean;
}

const TableWithoutCard: React.FC<TableWithoutCardProps> = ({
  children,
  title = '',
  addFormLink,
  onDownload,
  renderIcon,
  disableHeaderBorder = false,
}) => {
  return (
    <div>
      {(renderIcon || onDownload) && (
        <div
          className={`flex justify-between items-center px-6 py-4 ${
            disableHeaderBorder ? '' : 'border-b border-ld'
          }`}
        >
          {title && <h5 className="text-xl font-semibold">{title}</h5>}
          <div className="flex gap-3">
            {renderIcon && (
              <Link href={addFormLink}>
                <Button className="flex items-center" size="sm" color="success">
                  {renderIcon()}
                </Button>
              </Link>
            )}
            {onDownload && (
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
            )}
          </div>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default TableWithoutCard;
