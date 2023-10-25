import { useQuery } from '@tanstack/react-query';
import { getRecipesCategories } from './requests';
import { QueryKeys } from '../types';
import { LONG_STALE_TIME } from '../constants';
import { RecipeCategoriesEnum } from '../../types/recipes';

type UseFetchRecipesCategories = () => {
  isFetched: boolean;
  categories?: RecipeCategoriesEnum[];
};

export const useFetchRecipesCategories: UseFetchRecipesCategories = () => {
  const { data: response, isFetched } = useQuery({
    queryKey: [QueryKeys.recipesCategories],
    queryFn: getRecipesCategories,
    refetchOnWindowFocus: false,
    staleTime: LONG_STALE_TIME,
  });

  return {
    categories: response?.data?.categories,
    isFetched,
  };
};
