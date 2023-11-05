import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { cleanImages } from './requests';
import { ResponseCustom } from '../types';

type UseCleanImages = () => {
  cleanImages: UseMutateAsyncFunction<ResponseCustom<string> | void, unknown, void>;
  loading: boolean;
};

export const useCleanImages: UseCleanImages = () => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<ResponseCustom<string> | void, unknown, void>({
    mutationFn: () => cleanImages(token),
    onSuccess: (response) => {
      if (response?.error) {
        alert(response.error);
      }
    },
  });

  return {
    cleanImages: mutateAsync,
    loading: isLoading,
  };
};
