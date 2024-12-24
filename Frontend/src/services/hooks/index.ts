import { QueryKey, QueryObserverResult, UseQueryOptions, useQuery } from '@tanstack/react-query';

import { IApiError } from 'utils/Types';

export type ApiFunction<T> = () => Promise<T>;

interface QueryConfig<T> {
  queryKey: QueryKey;
  apiFunction: ApiFunction<T>;
  queryOptions?: Omit<UseQueryOptions<T, IApiError, T, QueryKey>, 'queryKey' | 'queryFn'>;
}

type QueryResult<T> = QueryObserverResult<T, IApiError>;

function useFetch<T>({ queryKey, apiFunction, queryOptions }: QueryConfig<T>): QueryResult<T> {
  return useQuery<T, IApiError, T, QueryKey>( // Fix the type arguments here
    queryKey,
    apiFunction,
    queryOptions as UseQueryOptions<T, IApiError, T, QueryKey>
  );
}

export default useFetch;
