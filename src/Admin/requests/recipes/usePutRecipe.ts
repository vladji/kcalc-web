import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { putRecipe } from './requests';
import { PatchRecipeRequest } from './types';
import { MongoResponse, ResponseCustom } from '../types';

type UsePutRecipe = () => {
  putRecipe: UseMutateAsyncFunction<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PatchRecipeRequest, 'token'>
  >;
  loading: boolean;
};

export const usePutRecipe: UsePutRecipe = () => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PatchRecipeRequest, 'token'>
  >({
    mutationFn: ({ recipe, recipeId }) => putRecipe({ recipe, token, recipeId }),
    onSuccess: (response) => {
      if (response?.error) {
        alert(response.error);
      }
    },
  });

  return {
    putRecipe: mutateAsync,
    loading: isLoading,
  };
};
