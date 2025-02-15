'use client';
import React from 'react';
import { Button } from 'flowbite-react';

export default function SubmitButton() {
  ('');

  return (
    <Button
      type="submit"
      color={'primary'}
      className="sm:mb-0 mb-3 w-fit"
      aria-disabled={false}
    >
      Save changes
    </Button>
  );
}
