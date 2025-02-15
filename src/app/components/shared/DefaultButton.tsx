'use client';
import { Button } from 'antd';
import React from 'react';

type Props = {
  handleClick: () => void;
  text: string;
};
const DefaultButton = ({ handleClick, text }: Props) => {
  return (
    <Button type="primary" onClick={handleClick}>
      {text}
    </Button>
  );
};

export default DefaultButton;
