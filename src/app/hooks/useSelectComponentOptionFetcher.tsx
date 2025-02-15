'use client';
import config from '@/services/globalConfig';
import { createQueryString } from '@/utils/helper';
import { useReducer, useEffect } from 'react';

type ApiState<Data> = {
  apiData: Data | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: unknown | null;
};

type Action<Data> =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Data }
  | { type: 'FETCH_ERROR'; payload: unknown };

type QueryParams = {
  [key: string]:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | object
    | null
    | undefined;
};

type Props = {
  endpoint: string;
  dependency?: string;
  tags: string[];
  data?: object;
  params?: QueryParams;
};

const apiReducer = <Data,>(
  state: ApiState<Data>,
  action: Action<Data>,
): ApiState<Data> => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        apiData: null,
        isLoading: true,
        isError: false,
        isSuccess: false,
        error: null,
      };
    case 'FETCH_SUCCESS':
      return {
        apiData: action.payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
      };
    case 'FETCH_ERROR':
      return {
        apiData: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const useSelectComponentOptionFetcher = <Data,>({
  endpoint,
  tags,
  params,
}: Props): ApiState<Data> => {
  const [state, dispatch] = useReducer(apiReducer<Data>, {
    apiData: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
  });
  // console.log("endpoint from useSelectComponentOptionFetcher",endpoint,params)
  useEffect(() => {
    if (!endpoint) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Endpoint is not defined' });
      return;
    }
    // const controller = new AbortController();

    const fetchData = async () => {
      dispatch({ type: 'FETCH_START' });

      try {
        if (!config.API_URL) throw new Error('API_URL is not defined');
        const url = params
          ? `${config.API_URL}/${endpoint}${createQueryString(params)}`
          : `${config.API_URL}/${endpoint}`;
        const response = await fetch(url, {
          next: { tags },
          method: 'GET',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          // signal: controller.signal,
        });

        if (!response.ok) {
          // console.log('error occured', response);

          throw new Error(`Error: ${response.statusText}`);
        }

        const { data: apiData }: { data: Data } = await response.json();
        // console.log(apiData,"from hook")
        dispatch({ type: 'FETCH_SUCCESS', payload: apiData });
      } catch (error) {
        console.error('API error', error);
        // if (!controller.signal.aborted) {
        console.error('error inside', error);
        dispatch({ type: 'FETCH_ERROR', payload: error });
        // }
      }
    };

    fetchData();
    // return () => {
    //   controller.abort(); // Cleanup to cancel request on unmount
    // };
  }, [params]);

  return state;
};

export default useSelectComponentOptionFetcher;
