import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { uploadImage } from './requests';
import { UploadImageRequest } from './types';
import { ResponseCustom } from '../types';

type UseUploadImage = () => {
  uploadImage: UseMutateAsyncFunction<
    ResponseCustom<string> | void,
    unknown,
    Omit<UploadImageRequest, 'token'>
  >;
  uploadLoading: boolean;
};

export const useUploadImage: UseUploadImage = () => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<string> | void,
    unknown,
    Omit<UploadImageRequest, 'token'>
  >({
    mutationFn: ({ formData, deleteFileName }) => uploadImage({ formData, token, deleteFileName }),
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
