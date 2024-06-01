import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";
import Veiculo from "@/interfaces/veiculo";
import { URL_ADC_VEICULO } from "@/utils/constants";

const useAdicionarVeiculo = () => {
  const { adicionar } = useApi<Veiculo>(URL_ADC_VEICULO);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (veiculo: Veiculo) => adicionar(veiculo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["veiculos"],
      });
    },
  });
};

export default useAdicionarVeiculo;