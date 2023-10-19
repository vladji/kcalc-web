import { useNavigate } from "react-router-dom";
import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { adminLogin } from "./requets";
import { AdminLoginRequestProps, ResponseCustom } from "./types";

type UseAdminLogin = () => {
  adminLogin: UseMutateAsyncFunction<ResponseCustom<string> | void, unknown, AdminLoginRequestProps>;
  loading: boolean;
  errorMessage?: string;
}

export const useAdminLogin: UseAdminLogin = () => {
  const navigate = useNavigate();

  const { mutateAsync, data, isLoading } = useMutation<ResponseCustom<string> | void, unknown, AdminLoginRequestProps>({
    mutationFn: (data) => adminLogin(data),
    onSuccess: (response) => {
      if (response?.data) {
        localStorage.setItem("token", response.data);
        setTimeout(() => {
          navigate("/admin");
        });
      }
    }
  });

  return {
    adminLogin: mutateAsync,
    loading: isLoading,
    errorMessage: data?.error
  };
};
