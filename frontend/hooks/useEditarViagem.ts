import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";
import Viagem from "@/interfaces/viagem";
import { URL_EDT_VIAGEM } from "@/utils/constants";

const useEditarViagem = () => {
  const { alterar } = useApi<Viagem>(URL_EDT_VIAGEM);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (viagem: Viagem) => alterar(viagem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["viagens"],
      });
    },
  });
};

export default useEditarViagem;