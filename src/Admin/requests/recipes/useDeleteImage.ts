import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { ResponseCustom } from '../types';
import { deleteImage } from './requests';

type UseDeleteImage = () => {
  deleteImage: UseMutateAsyncFunction<ResponseCustom<string> | void, unknown, string>;
  deleteImageLoading: boolean;
};

export const useDeleteImage: UseDeleteImage = () => {
  const { mutateAsync, isLoading } = useMutation<ResponseCustom<string> | void, unknown, string>({
    mutationFn: (imageName) => deleteImage(imageName),
    onSuccess: (response) => {
      if (response?.error) {
        alert(response.error);
      }
    },
  });

  return {
    deleteImage: mutateAsync,
    deleteImageLoading: isLoading,
  };
};
