import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";
import Veiculo from "@/interfaces/veiculo";
import { URL_ADC_VEICULO } from "@/utils/constants";

const useAdicionarVeiculo = () => {
  const { alterar } = useApi<Veiculo>(URL_ADC_VEICULO);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (Veiculo: Veiculo) => alterar(Veiculo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["veiculo"],
      });
    },
  });
};

export default useAdicionarVeiculo;