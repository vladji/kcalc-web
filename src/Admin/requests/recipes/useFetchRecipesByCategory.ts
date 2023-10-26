import { useQuery } from '@tanstack/react-query';
import { getRecipesByCategory } from './requests';
import { LONG_STALE_TIME } from '../constants';
import { RecipeCategoriesEnum, RecipeProps } from '../../types/recipes';
import { ResponseCustom } from '../types';

type UseFetchRecipesByCategory = (category: RecipeCategoriesEnum) => {
  loading: boolean;
  data: RecipeProps[];
  refetch: () => Promise<ResponseCustom<RecipeProps[]> | unknown>;
};

export const useFetchRecipesByCategory: UseFetchRecipesByCategory = (category) => {
  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [category],
    queryFn: () => getRecipesByCategory(category),
    refetchOnWindowFocus: false,
    staleTime: LONG_STALE_TIME,
  });

  return {
    loading: isLoading,
    data: response?.data || [],
    refetch,
  };
};
