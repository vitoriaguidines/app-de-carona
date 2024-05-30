import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";
import Login from "@/interfaces/login";
import { URL_LOGIN } from "@/utils/constants";

const useLogin = () => {
  const { alterar } = useApi<Login>(URL_LOGIN);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (login: Login) => alterar(login),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["produtos"],
      });
    },
  });
};

export default useLogin;