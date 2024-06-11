import axios from "axios";

const API_URL = "http://192.168.100.189:3000"; //Change to your backend ip

export const fetchViagens = async (origemPassageiro: string | null, destinoPassgeiro: string | null, prioridade: string, horario: any, vagas: number,
                             distanciaMaximaOrigem: number, distanciaMaximaDestino: number) => {
    const data = {
        "origem_passageiro": origemPassageiro,
        "destino_passageiro": destinoPassgeiro,
        "prioridade": prioridade,
        "horario": horario,
        "vagas": vagas,
        "distancia_maxima_origem": distanciaMaximaOrigem,
        "distancia_maxima_destino": distanciaMaximaDestino
    }
    try {
        const response = await axios.post(`${API_URL}/buscar_viagens`, data);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}