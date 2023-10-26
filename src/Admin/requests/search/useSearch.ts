import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { search } from './request';
import { SearchRequest, SearchResponse } from './types';
import { ResponseCustom } from '../types';

type UseSearch = () => {
  search: UseMutateFunction<ResponseCustom<SearchResponse> | undefined, unknown, SearchRequest>;
  data?: SearchResponse;
};

export const useSearch: UseSearch = () => {
  const { mutate, data: response } = useMutation<
    ResponseCustom<SearchResponse> | undefined,
    unknown,
    SearchRequest
  >({
    mutationFn: ({ query, page }) => search({ query, page }),
  });

  return {
    search: mutate,
    data: response?.data,
  };
};
