import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { updateProducts } from "./requets";
import { ProductsProps } from "../types/prducts";

type UseUpdateProducts = () => {
  updateProducts: UseMutateAsyncFunction<unknown, unknown, ProductsProps[]>;
  response: unknown;
}

export const useUpdateProducts: UseUpdateProducts = () => {
  const token = localStorage.getItem("token") || "";

  const { mutateAsync, data: response } = useMutation<unknown, unknown, ProductsProps[]>({
    mutationFn: (products) => updateProducts({ token, products }),
    onError: (error) => {
      alert(JSON.stringify(error));
    }
  });

  return {
    updateProducts: mutateAsync,
    response
  };
};
