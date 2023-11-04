import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { pathRecipe } from './requests';
import { PostRecipeRequest } from './types';
import { MongoResponse, ResponseCustom } from '../types';

type UsePatchRecipe = () => {
  patchRecipe: UseMutateAsyncFunction<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PostRecipeRequest, 'token'>
  >;
  loading: boolean;
};

export const usePatchRecipe: UsePatchRecipe = () => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PostRecipeRequest, 'token'>
  >({
    mutationFn: ({ recipe, recipeId }) => pathRecipe({ recipe, token, recipeId }),
  });

  return {
    patchRecipe: mutateAsync,
    loading: isLoading,
  };
};
