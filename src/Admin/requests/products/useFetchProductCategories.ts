import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../types';
import { fetchProductCategories } from './requests';
import { LONG_STALE_TIME } from '../constants';

type UseFetchProductCategories = () => {
  isFetched: boolean;
  categories?: string[];
};

export const useFetchProductCategories: UseFetchProductCategories = () => {
  const { data: response, isFetched } = useQuery({
    queryKey: [QueryKeys.productCategories],
    queryFn: () => fetchProductCategories(),
    refetchOnWindowFocus: false,
    staleTime: LONG_STALE_TIME,
  });

  return {
    isFetched,
    categories: response?.data?.categories,
  };
};
