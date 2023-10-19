import { UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { updateProducts } from './requets';
import { ProductsPropsWithDbId } from '../../types/products';
import { checkRedirectToLogin, responseNotify } from './utils';
import { useNavigate } from 'react-router-dom';

type UseUpdateProducts = () => {
  updateProducts: UseMutateAsyncFunction<Response | undefined, unknown, ProductsPropsWithDbId[]>;
  response: unknown;
};

export const useUpdateProducts: UseUpdateProducts = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, data: response } = useMutation<
    Response | undefined,
    unknown,
    ProductsPropsWithDbId[]
  >({
    mutationFn: (products) => updateProducts({ token, products }),
    onSuccess: async (response) => {
      await responseNotify(response);
      checkRedirectToLogin(navigate, response);
    },
  });

  return {
    updateProducts: mutateAsync,
    response,
  };
};
