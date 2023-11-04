import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { deleteRecipe } from './requests';
import { MongoResponse, ResponseCustom } from '../types';
import { DeleteRecipeRequest } from './types';

type UseDeleteRecipe = () => {
  deleteRecipe: UseMutateAsyncFunction<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<DeleteRecipeRequest, 'token'>
  >;
  deleteRecipeLoading: boolean;
};

export const useDeleteRecipe: UseDeleteRecipe = () => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<DeleteRecipeRequest, 'token'>
  >({
    mutationFn: ({ recipeId }) => deleteRecipe({ recipeId, token }),
    onSuccess: (response) => {
      if (response?.error) {
        alert(response.error);
      }
    },
  });

  return {
    deleteRecipe: mutateAsync,
    deleteRecipeLoading: isLoading,
  };
};
