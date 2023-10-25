import { Dispatch, SetStateAction } from 'react';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { postRecipe } from './requests';
import { PostRecipeRequest } from './types';
import { MongoResponse, ResponseCustom } from '../types';

type UsePostRecipe = ({
  refetchRecipes,
  setActive,
}: {
  refetchRecipes: () => void;
  setActive: Dispatch<SetStateAction<boolean>>;
}) => {
  postRecipe: UseMutateFunction<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PostRecipeRequest, 'token'>
  >;
  loading: boolean;
};

export const usePostRecipe: UsePostRecipe = ({ refetchRecipes, setActive }) => {
  const token = localStorage.getItem('token') || '';

  const { mutate, isLoading } = useMutation<
    ResponseCustom<MongoResponse> | void,
    unknown,
    Omit<PostRecipeRequest, 'token'>
  >({
    mutationFn: ({ recipe, recipeId }) => postRecipe({ recipe, token, recipeId }),
    onSuccess: (response) => {
      if (response?.data?.acknowledged) {
        refetchRecipes();
        setActive(false);
      }
    },
  });

  return {
    postRecipe: mutate,
    loading: isLoading,
  };
};
