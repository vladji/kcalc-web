import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { adminLogin } from "./requets";
import { AdminLoginRequestProps, Response } from "./types";
import { useAdminStore } from "../store/useAdminStore";

type UseAdminLogin = () => {
  adminLogin: UseMutateAsyncFunction<Response<string>, unknown, AdminLoginRequestProps>;
  errorMessage?: string;
}

export const useAdminLogin: UseAdminLogin = () => {
  const setToken = useAdminStore((store) => store.setToken);

  const { mutateAsync, data } = useMutation<Response<string>, unknown, AdminLoginRequestProps>({
    mutationFn: (data) => adminLogin(data),
    onSuccess: (response) => {
      if (response.data) {
        setToken(response.data);
      }
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    }
  });

  return {
    adminLogin: mutateAsync,
    errorMessage: data?.error
  };
};
