import { UseMutateAsyncFunction, useMutation } from "@tanstack/react-query";
import { adminRequest } from "./requets";

type UseAdminRequest = () => {
  adminRequest: UseMutateAsyncFunction<any, unknown, string>
}

export const useAdminRequest: UseAdminRequest = () => {
  const { mutateAsync } = useMutation<any, unknown, string>({
    mutationFn: (token) => adminRequest(token),
    onSuccess: (response) => {
      console.log("adminRequest", response);
    },
    onError: (error) => {
      alert(JSON.stringify(error));
    }
  });

  return {
    adminRequest: mutateAsync,
  }
};
