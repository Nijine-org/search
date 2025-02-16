import { getBaseUrl } from '@/utils/serverHelpers';
import React from 'react';
import KeyTable from './components/KeyTable';

const page = async () => {
  const baseUrl = await getBaseUrl();
  console.error('baseUrl', baseUrl);
  const listResponse = await fetch(`${baseUrl.toString()}/api/token`, {
    cache: 'no-cache',
    method: 'GET',
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return <KeyTable data={listResponse} />;
};

export default page;
