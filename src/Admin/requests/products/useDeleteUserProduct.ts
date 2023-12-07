import { QueryObserverResult, UseMutateAsyncFunction, useMutation } from '@tanstack/react-query';
import { deleteUserProducts } from './requests';
import { MongoResponse, ResponseCustom } from '../types';
import { ProductsPropsWithDbId } from '../../types/products';

type UseDeleteUserProduct = (
  refetchUserProducts: () => Promise<
    QueryObserverResult<ResponseCustom<ProductsPropsWithDbId[]> | undefined>
  >
) => {
  deleteUserProduct: UseMutateAsyncFunction<
    ResponseCustom<MongoResponse> | undefined,
    unknown,
    string
  >;
  loading: boolean;
};

export const useDeleteUserProduct: UseDeleteUserProduct = (refetchUserProducts) => {
  const token = localStorage.getItem('token') || '';

  const { mutateAsync, isLoading } = useMutation<
    ResponseCustom<MongoResponse> | undefined,
    unknown,
    string
  >({
    mutationFn: (productId) => deleteUserProducts({ token, productId }),
    onSuccess: () => {
      refetchUserProducts();
    },
  });

  return {
    deleteUserProduct: mutateAsync,
    loading: isLoading,
  };
};
