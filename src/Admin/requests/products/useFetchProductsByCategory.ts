import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from './requets';
import { ProductsPropsWithDbId } from '../../../types/products';
import { LONG_STALE_TIME } from '../constants';

type UseFetchProductsByCategory = (category: string) => {
  loading: boolean;
  productsList?: ProductsPropsWithDbId[];
  refetch: () => void;
};

export const useFetchProductsByCategory: UseFetchProductsByCategory = (category) => {
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [category],
    queryFn: () => fetchProductsByCategory(category),
    refetchOnWindowFocus: false,
    staleTime: LONG_STALE_TIME,
  });

  return {
    loading: isLoading,
    productsList: response?.data,
    refetch,
  };
};
