'use client';

import { CustomizerContext } from '@/app/context/customizerContext';
import { Card, Button } from 'flowbite-react';
import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import { Popover } from 'antd';

interface TitleCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: string;
  onDownload?: () => void;
  renderIcon?: () => React.ReactNode;
  disableHeaderBorder?: boolean; // Added prop to control header border
  total?: number;
}

const TitleIconCard: React.FC<TitleCardProps> = ({
  children,
  className = '',
  title = '',
  onDownload,
  renderIcon,
  disableHeaderBorder = false, // Default to false
  total,
}) => {
  const { isCardShadow, isBorderRadius } = useContext(CustomizerContext);

  return (
    <Card
      className={`card ${className} ${
        isCardShadow
          ? 'dark:shadow-dark-md shadow-md p-0'
          : 'shadow-none border border-ld p-0'
      }`}
      style={{
        borderRadius: `${isBorderRadius}px`,
      }}
    >
      <div
        className={`flex justify-between items-center px-6 py-4 ${
          disableHeaderBorder ? '' : 'border-b border-ld'
        }`}
      >
        {title && <h5 className="text-xl font-semibold">{title}</h5>}
        <div className="flex gap-3">
          {renderIcon &&
            // <Button className="flex items-center" size="sm" color="success">
            renderIcon()
            // </Button>
          }
          {onDownload && (
            <Popover content={`Export ${total} records`}>
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
            </Popover>
          )}
        </div>
      </div>
      <div className="pt-4 p-6">{children}</div>
    </Card>
  );
};

export default TitleIconCard;
