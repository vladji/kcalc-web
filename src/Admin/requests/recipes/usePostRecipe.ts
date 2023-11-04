import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { postRecipe } from './requests';
import { MongoResponse, ResponseCustom } from '../types';
import { PostRecipeProps } from './types';

type UsePostRecipe = () => {
  postRecipe: UseMutateAsyncFunction<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PostRecipeProps, 'token'>
  >;
  loading: boolean;
};

export const usePostRecipe: UsePostRecipe = () => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PostRecipeProps, 'token'>
  >({
    mutationFn: ({ recipe }) => postRecipe({ recipe, token }),
    onSuccess: (response) => {
      if (response?.error) {
        alert(response.error);
      }
    },
  });

  return {
    postRecipe: mutateAsync,
    loading: isLoading,
  };
};
