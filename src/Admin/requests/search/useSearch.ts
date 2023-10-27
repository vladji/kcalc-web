import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { search } from './request';
import { SearchRequest, SearchResponse } from './types';
import { ResponseCustom } from '../types';

type UseSearch = () => {
  search: UseMutateFunction<ResponseCustom<SearchResponse> | undefined, unknown, SearchRequest>;
  loading: boolean;
  data?: SearchResponse;
};

export const useSearch: UseSearch = () => {
  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation<ResponseCustom<SearchResponse> | undefined, unknown, SearchRequest>({
    mutationFn: ({ query, page }) => search({ query, page }),
  });

  return {
    search: mutate,
    data: response?.data,
    loading: isLoading,
  };
};
