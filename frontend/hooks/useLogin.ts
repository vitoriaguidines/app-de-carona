import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import Login from "@/interfaces/login";
import { URL_LOGIN } from "@/utils/constants";

const useLogin = () => {
  const { recuperar } = useApi<Login>(URL_LOGIN);
  
  return useQuery({
    queryKey: ["login"],
    queryFn: () => recuperar(),
  });
};

export default useLogin;

