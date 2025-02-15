'use client';
import React from 'react';
import DefaultButton from '@/app/components/shared/DefaultButton';
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const handleClick = () => {
    reset();
  };
  return (
    <div>
      <h2 className="pb-3">This service is currently unavailable !</h2>
      <DefaultButton handleClick={handleClick} text="Try Again" />
    </div>
  );
}
