import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { replaceRecipeImageName } from './requests';
import { ReplaceRecipeImageNameRequest } from './types';
import { ResponseCustom } from '../types';

type UseReplaceRecipeImageName = () => {
  replaceImageName: UseMutateAsyncFunction<
    ResponseCustom<string> | void,
    unknown,
    ReplaceRecipeImageNameRequest
  >;
  replaceLoading: boolean;
};

export const useReplaceRecipeImageName: UseReplaceRecipeImageName = () => {
  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<string> | void,
    unknown,
    ReplaceRecipeImageNameRequest
  >({
    mutationFn: ({ recipeId, newImageName }) => replaceRecipeImageName({ recipeId, newImageName }),
    onSuccess: (response) => {
      if (response?.error) {
        alert(response.error);
      }
    },
  });

  return {
    replaceImageName: mutateAsync,
    replaceLoading: isLoading,
  };
};
