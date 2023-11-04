import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { pathRecipe } from './requests';
import { PatchRecipeRequest } from './types';
import { MongoResponse, ResponseCustom } from '../types';

type UsePatchRecipe = () => {
  patchRecipe: UseMutateAsyncFunction<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PatchRecipeRequest, 'token'>
  >;
  loading: boolean;
};

export const usePatchRecipe: UsePatchRecipe = () => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PatchRecipeRequest, 'token'>
  >({
    mutationFn: ({ recipe, recipeId }) => pathRecipe({ recipe, token, recipeId }),
    onSuccess: (response) => {
      if (response?.error) {
        alert(response.error);
      }
    },
  });

  return {
    patchRecipe: mutateAsync,
    loading: isLoading,
  };
};
