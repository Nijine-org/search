import { Card } from 'flowbite-react';
import React from 'react';
import config from '@/app/context/config';

type Props = {
  className?: string;
  children?: React.ReactNode;
};
const PageWrapper = ({ className, children }: Props) => {
  const { isCardShadow, isBorderRadius } = config;
  return (
    <Card
      className={`card ${className && className} ${
        isCardShadow
          ? 'dark:shadow-dark-md shadow-md p-0'
          : 'shadow-none border border-ld p-0'
      }`}
      style={{
        borderRadius: `${isBorderRadius}px`,
      }}
    >
      {children}
    </Card>
  );
};

export default PageWrapper;
