import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { deleteProduct } from "./requets";

type UseDeleteProduct = () => {
  deleteProduct: UseMutateAsyncFunction<unknown, unknown, string>;
  loading: boolean;
}

export const useDeleteProduct: UseDeleteProduct = () => {
  const token = localStorage.getItem("token") || "";

  const { mutateAsync, isLoading } = useMutation<unknown, unknown, string>({
    mutationFn: (id) => deleteProduct({ token, id }),
    onError: (error) => {
      alert(JSON.stringify(error));
    }
  });

  return {
    deleteProduct: mutateAsync,
    loading: isLoading
  };
};
