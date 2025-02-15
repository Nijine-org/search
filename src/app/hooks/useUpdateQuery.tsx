import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const useUpdateQuery = (initialValue: Record<string, string>) => {
  const [state, setState] = useState(initialValue);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const setter = (updates: Record<string, string>) => {
    Object.entries(updates).forEach(([key, value]) => {
      // params.set(key, value);
      if (value !== undefined) {
        params.set(key, value);
      }
    });
    router.push(`?${params.toString()}`);
    setState((prev) => ({ ...prev, ...updates }));
  };
  return [state, setter] as const;
};

export default useUpdateQuery;
