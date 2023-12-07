import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import { getUserProducts } from './requests';
import { QueryKeys, ResponseCustom } from '../types';
import { ProductsPropsWithDbId } from '../../types/products';
import { LONG_STALE_TIME } from '../constants';

type UseFetchUserProducts = () => {
  isLoading: boolean;
  data?: ProductsPropsWithDbId[];
  refetch: () => Promise<QueryObserverResult<ResponseCustom<ProductsPropsWithDbId[]> | undefined>>;
};

export const useFetchUserProducts: UseFetchUserProducts = () => {
  const token = localStorage.getItem('token') || '';

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [QueryKeys.userProducts, token],
    queryFn: () => getUserProducts(token),
    refetchOnWindowFocus: false,
    staleTime: LONG_STALE_TIME,
  });

  return {
    data: response?.data,
    isLoading,
    refetch,
  };
};
