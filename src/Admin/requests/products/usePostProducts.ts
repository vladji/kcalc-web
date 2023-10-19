import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { postProducts } from './requets';
import { ProductProps } from '../../../types/products';
import { checkRedirectToLogin, responseNotify } from '../utils';
import { useNavigate } from 'react-router-dom';

type UsePostProducts = () => {
  postProducts: UseMutateAsyncFunction<Response | undefined, unknown, ProductProps[]>;
  loading: boolean;
};

export const usePostProducts: UsePostProducts = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<Response | undefined, unknown, ProductProps[]>({
    mutationFn: (products) => postProducts({ token, products }),
    onSuccess: async (response) => {
      await responseNotify(response);
      checkRedirectToLogin(navigate, response);
    },
  });

  return {
    postProducts: mutateAsync,
    loading: isLoading,
  };
};
