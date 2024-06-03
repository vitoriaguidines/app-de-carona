import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";
import Viagem from "@/interfaces/viagem";
import { URL_ADC_VIAGEM } from "@/utils/constants";

const useAdicionarViagem = () => {
  const { adicionar } = useApi<Viagem>(URL_ADC_VIAGEM);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (viagem: Viagem) => adicionar(viagem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["viagens"],
      });
    },
  });
};

export default useAdicionarViagem;