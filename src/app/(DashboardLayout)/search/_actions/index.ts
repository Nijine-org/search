'use server';

import config from '@/services/globalConfig';
import { createQueryString } from '@/utils/helper';
import { XMLParser } from 'fast-xml-parser';
import { SearchResult } from '../_types';

const params = {
  was: 1,
  key: config.API_KEY,
  maxnum: 30,
  lang: 'en',
};
const getXMLSearchData = async () => {
  const url = `${config.API_URL}${createQueryString(params)}`;
  const xmlResponse = fetchXMLData(url, ['search-data']);
  // console.log('xmlResponse', xmlResponse);
  return xmlResponse;
  //   if (xmlResponse.state) {
  //     console.log('xmlResponse', xmlResponse);
  //     const jObj = parser.parse(xmlResponse.data);
  //     console.log('jObj', jObj);
  //   }
};
type SearchResponse = {
  state: boolean;
  msg: string;
  data: SearchResult | null;
};
async function fetchXMLData(
  url: string,
  tags: string[],
): Promise<SearchResponse> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      next: { tags },
      headers: {
        Accept: 'application/xml',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text(); // Get response as text
    const parser = new XMLParser();
    const parsedResponse: SearchResult = parser.parse(text);
    // console.log('parsedResponse', parsedResponse);
    return {
      state: true,
      msg: 'Success',
      data: parsedResponse,
    };
  } catch (error) {
    console.error('Error fetching XML:', error);

    return {
      state: false,
      msg: 'Error fetching XML',
      data: null,
    };
  }
}
export { getXMLSearchData, fetchXMLData };
export type { SearchResponse };
