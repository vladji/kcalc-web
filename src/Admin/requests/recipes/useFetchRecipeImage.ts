import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { fetchImage } from './requests';
import { ResponseCustom } from '../types';

type UseFetchRecipeImage = () => {
  fetchImage: UseMutateAsyncFunction<ResponseCustom<string> | void, unknown, { filename: string }>;
  imageBase64?: string;
};

export const useFetchRecipeImage: UseFetchRecipeImage = () => {
  const { mutateAsync, data: response } = useMutation<
    ResponseCustom<string> | void,
    unknown,
    { filename: string }
  >({
    mutationFn: ({ filename }) => fetchImage({ filename }),
  });

  return {
    fetchImage: mutateAsync,
    imageBase64: response?.data,
  };
};
