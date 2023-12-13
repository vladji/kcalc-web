import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { patchRecipeKey } from './requests';
import { MongoResponse, ResponseCustom } from '../types';
import { RecipeKeyDataProps } from './types';
import { RecipeCategoriesEnum } from '../../types/recipes';

type UsePatchRecipeKey = () => {
  patchRecipeKey: UseMutateAsyncFunction<
    ResponseCustom<MongoResponse[]> | void,
    unknown,
    { category: RecipeCategoriesEnum; data: RecipeKeyDataProps[] }
  >;
  loading: boolean;
};

export const usePatchRecipeKey: UsePatchRecipeKey = () => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<MongoResponse[]> | void,
    unknown,
    { category: RecipeCategoriesEnum; data: RecipeKeyDataProps[] }
  >({
    mutationFn: ({ category, data }) => patchRecipeKey({ token, category, data }),
    onSuccess: (response) => {
      if (response?.error) {
        alert(response.error);
      }
    },
  });

  return {
    patchRecipeKey: mutateAsync,
    loading: isLoading,
  };
};
