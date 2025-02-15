'use client';
import React from 'react';
import { Button } from 'flowbite-react';
type Props = {
  handleClick?: () => void;
};
export default function CancelButton({ handleClick }: Props) {
  // The aria-disabled field should fix by dynamically setting the the loading or pending value
  return (
    <Button
      onClick={handleClick}
      color={'lighterror'}
      className="w-fit"
      aria-disabled={false}
    >
      Cancel
    </Button>
  );
}
