'use server';

import { headers } from 'next/headers';

const getBaseUrl = async () => {
  'use server';
  const host = headers().get('host'); // Dynamically get the host
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${protocol}://${host}`;
};

export { getBaseUrl };
