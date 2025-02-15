import { getBaseUrl } from '@/utils/serverHelpers';
import React from 'react';
import KeyTable from './components/KeyTable';
import { getActiveToken } from './_action';

const page = async () => {
  const apiKey = await getActiveToken();
  console.log('apiKey', apiKey.token);
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
