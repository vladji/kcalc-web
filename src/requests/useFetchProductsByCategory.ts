import { useQuery } from "@tanstack/react-query";
import { fetchProductsByCategory } from "./requets";
import { ProductsProps } from "../types/prducts";
import { LONG_STALE_TIME } from "./constants";

type UseFetchProductsByCategory = (category: string) => {
  loading: boolean;
  productsList?: ProductsProps[];
}

export const useFetchProductsByCategory: UseFetchProductsByCategory = (category) => {
  const { data: response, isLoading } = useQuery({
    queryKey: [category],
    queryFn: () => fetchProductsByCategory(category),
    refetchOnWindowFocus: false,
    staleTime: LONG_STALE_TIME
  });

  return {
    loading: isLoading,
    productsList: response?.data
  };
};
