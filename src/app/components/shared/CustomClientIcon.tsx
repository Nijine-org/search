'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

type Props = React.ComponentProps<typeof Icon>;

const CustomClientIcon: React.FC<Props> = (props) => {
  return (
    <div>
      <Icon {...props} />
    </div>
  );
};

export default CustomClientIcon;
