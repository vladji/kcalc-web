import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { postRecipe } from './requests';
import { PostRecipeRequest } from './types';
import { MongoResponse, ResponseCustom } from '../types';

type UsePostRecipe = () => {
  postRecipe: UseMutateAsyncFunction<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PostRecipeRequest, 'token'>
  >;
  loading: boolean;
};

export const usePostRecipe: UsePostRecipe = () => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PostRecipeRequest, 'token'>
  >({
    mutationFn: ({ recipe, recipeId }) => postRecipe({ recipe, token, recipeId }),
  });

  return {
    postRecipe: mutateAsync,
    loading: isLoading,
  };
};
