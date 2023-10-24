import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { uploadImage } from './requests';
import { UploadImageRequest } from './types';
import { ResponseCustom } from '../types';

type UseUploadImage = () => {
  uploadImage: UseMutateAsyncFunction<ResponseCustom<string> | void, unknown, UploadImageRequest>;
  uploadLoading: boolean;
};

export const useUploadImage: UseUploadImage = () => {
  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<string> | void,
    unknown,
    UploadImageRequest
  >({
    mutationFn: ({ formData, deleteFileName }) => uploadImage({ formData, deleteFileName }),
    onSuccess: (response) => {
      if (response?.error) {
        alert(response.error);
      }
    },
  });

  return {
    uploadImage: mutateAsync,
    uploadLoading: isLoading,
  };
};
