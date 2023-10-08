import { useQuery } from "@tanstack/react-query";
import { adminRequest } from "./requets";
import { SHORT_STALE_TIME } from "./constants";

type UseAdminRequest = () => {
  loading: boolean;
  authenticated: boolean;
}

export const useAdminRequest: UseAdminRequest = () => {
  const token = localStorage.getItem("token") || "";

  const { data: response, isFetching, isFetched } = useQuery({
    queryKey: [token],
    queryFn: () => adminRequest(token),
    refetchOnWindowFocus: false,
    staleTime: SHORT_STALE_TIME,
    enabled: !!token
  });

  const isValid = response?.data?.username === process.env.REACT_APP_ROOT_ADMIN;

  return {
    loading: isFetching,
    authenticated: isValid && isFetched || false,
  };
};
