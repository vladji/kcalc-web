import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { postProducts } from "./requets";
import { ProductProps } from "../types/products";

type UsePostProducts = () => {
  postProducts: UseMutateAsyncFunction<unknown, unknown, ProductProps[]>;
  loading: boolean;
}

export const usePostProducts: UsePostProducts = () => {
  const token = localStorage.getItem("token") || "";

  const { mutateAsync, isLoading } = useMutation<unknown, unknown, ProductProps[]>({
    mutationFn: (products) => postProducts({ token, products }),
    onError: (error) => {
      alert(JSON.stringify(error));
    }
  });

  return {
    postProducts: mutateAsync,
    loading: isLoading
  };
};
