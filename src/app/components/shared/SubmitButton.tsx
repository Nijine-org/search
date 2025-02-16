'use client';
import React from 'react';
import { Button } from 'flowbite-react';

type Props = { text?: string };
export default function SubmitButton({ text = 'Submit' }: Props) {
  ('');

  return (
    <Button
      type="submit"
      color={'primary'}
      className="sm:mb-0 mb-3 w-fit"
      aria-disabled={false}
    >
      {text}
    </Button>
  );
}
