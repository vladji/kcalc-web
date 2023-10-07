import { useNavigate } from "react-router-dom";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { adminLogin } from "./requets";
import { AdminLoginRequestProps, Response } from "./types";

type UseAdminLogin = () => {
  adminLogin: UseMutateAsyncFunction<Response<string>, unknown, AdminLoginRequestProps>;
  loading: boolean;
  errorMessage?: string;
}

export const useAdminLogin: UseAdminLogin = () => {
  const navigate = useNavigate();

  const { mutateAsync, data, isLoading } = useMutation<Response<string>, unknown, AdminLoginRequestProps>({
    mutationFn: (data) => adminLogin(data),
    onSuccess: (response) => {
      if (response.data) {
        localStorage.setItem("token", response.data);
        navigate("/admin");
      }
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    }
  });

  return {
    adminLogin: mutateAsync,
    loading: isLoading,
    errorMessage: data?.error,
  };
};
