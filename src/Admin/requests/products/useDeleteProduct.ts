import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { deleteProduct } from './requets';
import { checkRedirectToLogin, responseNotify } from '../utils';
import { useNavigate } from 'react-router-dom';

type UseDeleteProduct = () => {
  deleteProduct: UseMutateAsyncFunction<Response | undefined, unknown, string>;
  loading: boolean;
};

export const useDeleteProduct: UseDeleteProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<Response | undefined, unknown, string>({
    mutationFn: (id) => deleteProduct({ token, id }),
    onSuccess: async (response) => {
      await responseNotify(response);
      checkRedirectToLogin(navigate, response);
    },
  });

  return {
    deleteProduct: mutateAsync,
    loading: isLoading,
  };
};
