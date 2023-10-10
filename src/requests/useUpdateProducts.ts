import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { updateProducts } from "./requets";
import { ProductsPropsWithDbId } from "../types/products";

type UseUpdateProducts = () => {
  updateProducts: UseMutateAsyncFunction<unknown, unknown, ProductsPropsWithDbId[]>;
  response: unknown;
}

export const useUpdateProducts: UseUpdateProducts = () => {
  const token = localStorage.getItem("token") || "";

  const { mutateAsync, data: response } = useMutation<unknown, unknown, ProductsPropsWithDbId[]>({
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
