import { useQuery } from '@tanstack/react-query';
import { getRecipesByCategory } from './requests';
import { LONG_STALE_TIME } from '../constants';
import { RecipeProps } from './types';

type UseFetchRecipesByCategory = (category: string) => {
  loading: boolean;
  data: RecipeProps[];
};

export const useFetchRecipesByCategory: UseFetchRecipesByCategory = (category) => {
  const { data: response, isLoading } = useQuery({
    queryKey: [category],
    queryFn: () => getRecipesByCategory(category),
    refetchOnWindowFocus: false,
    staleTime: LONG_STALE_TIME,
  });

  return {
    loading: isLoading,
    data: response?.data || [],
  };
};
