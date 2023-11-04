import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { fetchImage } from './requests';

type UseFetchRecipeImage = () => {
  fetchImage: UseMutateAsyncFunction<string[] | void, unknown, { filename: string }>;
  data: any;
};

export const useFetchRecipeImage: UseFetchRecipeImage = () => {
  const { mutateAsync, data } = useMutation<string[] | void, unknown, { filename: string }>({
    mutationFn: ({ filename }) => fetchImage({ filename }),
  });

  return {
    fetchImage: mutateAsync,
    data: data || [],
  };
};
