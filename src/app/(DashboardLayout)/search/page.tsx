import React from 'react';
import { fetchXMLData, SearchResponse } from './_actions';
// import Test from './_components/Test';
import Search from './_components/Search';
import { createQueryString } from '@/utils/helper';
import SearchComponent from './_components/SearchComponent';
import { getActiveToken } from '../manage-key/_action';
type Props = {
  searchParams: {
    was: string;
    wo: string;
    limit: string;
  };
};
const page = async ({ searchParams }: Props) => {
  // console.log('searchParams', searchParams);
  const params = {
    was: searchParams.was ?? '',
    wo: searchParams.wo ?? '',
    maxnum: searchParams.limit ?? 30,
    // lang: 'en',
  };
  const isSearched = searchParams.was || searchParams.wo;

  let listResponse: SearchResponse;
  // console.log('params', params);
  // b954f1c2795a5737905abd81e84114f9;
  // 68a7df0ab097eff93e3d4d8c60499ed7
  //
  const apiKey = await getActiveToken();
  const url = `https://search.ch/tel/api/${createQueryString(params)}&key=${apiKey.token}`;
  if (isSearched) listResponse = await fetchXMLData(url, [url]);
  else
    listResponse = {
      state: false,
      msg: 'No search params',
      data: null,
    };
  return (
    <div>
      {listResponse.state}
      <SearchComponent />
      <Search data={listResponse.data} />
    </div>
  );
};

export default page;
