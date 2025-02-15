import { Card } from 'flowbite-react';
import React from 'react';
import config from '@/app/context/config';

type Props = {
  className?: string;
  children?: React.ReactNode;
};
const CustomCard = ({ className, children }: Props) => {
  const { isCardShadow, isBorderRadius } = config;
  return (
    <Card
      //   className={`card ${className && className} ${
      //     isCardShadow
      //       ? 'dark:shadow-dark-md shadow-md p-0'
      //       : 'shadow-none border border-ld p-0'
      //   }`}
      className={`card ${className} ${isCardShadow ? 'dark:shadow-dark-md shadow-md ' : 'shadow-none border border-ld'} `}
      style={{
        borderRadius: `${isBorderRadius}px`,
      }}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
