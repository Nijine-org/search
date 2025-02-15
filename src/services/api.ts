'use server';
// import { permanentRedirect } from 'next/navigation';
// import { CustomResponse } from '@/types';
// import { createQueryString } from '@/utils/helper';
// import { ApiError } from 'next/dist/server/api-utils';
// import { headers } from 'next/headers';
// import config from './globalConfig';
// // Define types for the parameters
// interface GetRequestParams<P> {
//   endpoint: string;
//   params?: P;
//   token?: string;
//   tags?: string[];
// }

// interface PostRequestParams<T> {
//   endpoint: string;
//   data: T;
//   token?: string;
// }

// interface PutRequestParams<T> {
//   endpoint: string;
//   data?: T;
//   token?: string;
// }

// interface PatchRequestParams<T> {
//   endpoint: string;
//   data: Partial<T>;
//   token?: string;
// }

// interface DeleteRequestParams<T> {
//   endpoint: string;
//   data?: T;
//   token?: string;
//   params?: T;
// }

// interface RequestParams<T> {
//   endpoint: string;
//   data?: T;
//   token?: string;
//   params?: T;
//   method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
//   tags?: string[];
// }

// // // Helper function to construct query strings
// // const createQueryString = <P>(params: P): string => {
// //   const query = new URLSearchParams(params as Record<string, string>);
// //   return query.toString() ? `?${query.toString()}` : '';
// // };

// // Unified request handler
// // type HTTPRES = Response | null;

// const handleRequest = async <Payload, Response>({
//   endpoint,
//   data,
//   // token,
//   params,
//   method,
//   tags,
// }: RequestParams<Payload>): Promise<CustomResponse<Response>> => {
//   // console.log('type of data', typeof data, data instanceof FormData);
//   let unAuthorized = false;
//   // let httpRes: HTTPRES | null;
//   try {
//     if (!config.API_URL) throw new Error('API_URL is not defined');
//     const url =
//       params && method === 'GET'
//         ? `${config.API_URL}${endpoint}${createQueryString(params)}`
//         : `${config.API_URL}${endpoint}`;
//     // Get incoming headers and cookies
//     // const incomingHeaders = headers(); // Next.js server headers
//     const cookie = headers().get('cookie');
//     // console.log("data from api gatewat" ,'url :' ,url, 'method:',method,data ,data instanceof FormData , typeof data)
//     const response = await fetch(url, {
//       next: { tags },
//       // cache: 'no-cache',
//       method,
//       // headers: outgoingHeaders,
//       headers: {
//         ...(data instanceof FormData
//           ? {} // Do not set Content-Type; it will be set automatically by FormData
//           : { 'Content-Type': 'application/json' }),
//         accept: 'application/json',
//         Cookie: cookie || '',
//       },
//       credentials: 'include',
//       ...(data && {
//         body: data instanceof FormData ? data : JSON.stringify(data),
//       }),
//     });
//     // httpRes = response;
//     if (
//       (response.status && response.status === 403) ||
//       response.status === 401
//     ) {
//       // console.log(method, 'URL :', url, ' status code:', response.status);
//       unAuthorized = true;
//       return {
//         state: false,
//         statusCode: response.status,
//         message: 'Unauthorized',
//         // response: response,
//       };
//     }
//     const responseData = await response.json();

//     console.error(`raw response  ${method} : ${endpoint}`, responseData);
//     if (!response.ok) {
//       throw {
//         state: false,
//         statusCode: response.status,
//         message: response || 'An error occurred during the request',
//       };
//     }

//     return {
//       state: true,
//       ...responseData,
//       statusCode: response.status,
//     };
//   } catch (error) {
//     const apiError = error as ApiError;
//     // console.log('apiError', apiError);
//     return {
//       state: false,
//       statusCode: apiError?.statusCode || 500,
//       message: apiError?.message || 'An unknown error occurred',
//     };
//   } finally {
//     if (unAuthorized) {
//       // console.log('redirected to login page', config.SSO_LINK);
//       unAuthorized = false;
//       if (!config.SSO_LINK) {
//         console.error('SSO_LINK is not defined');
//       } else {
//         permanentRedirect(config.SSO_LINK);
//       }
//     }
//   }
// };

// // Request functions using the unified handler
// const getRequest = <Payload, Response>(params: GetRequestParams<Payload>) =>
//   handleRequest<Payload, Response>({ ...params, method: 'GET' });

// const postRequest = <Payload, Response>(params: PostRequestParams<Payload>) =>
//   handleRequest<Payload, Response>({ ...params, method: 'POST' });

// const putRequest = <Payload, Response>(params: PutRequestParams<Payload>) =>
//   handleRequest<Payload, Response>({ ...params, method: 'PUT' });

// const patchRequest = <T>(params: PatchRequestParams<T>) =>
//   handleRequest({ ...params, method: 'PATCH' });

// const deleteRequest = <T>(params: DeleteRequestParams<T>) =>
//   handleRequest({ ...params, method: 'DELETE' });

// // const apiClient = {
// //   getRequest,
// //   postRequest,
// //   putRequest,
// //   deleteRequest,
// //   patchRequest,
// // };

// export { getRequest, postRequest, putRequest, deleteRequest, patchRequest };

// // export default apiClient;
import { XMLParser } from 'fast-xml-parser';

async function fetchXMLData(url: string) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/xml', // Request XML response
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const text = await response.text(); // Get response as text
    const parser = new XMLParser();
    const xmlDoc = parser.parse(text);

    // console.log('xmlDoc', xmlDoc); // Logs XML document

    return {
      state: true,
      data: xmlDoc,
    };
  } catch (error) {
    console.error('Error fetching XML:', error);
  }
}

// Example API endpoint (replace with your own)
export default fetchXMLData;
