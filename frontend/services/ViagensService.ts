import axios from "axios";

const API_URL = "http://192.168.100.189:3000"; //Change to your backend ip

export const fetchViagens = async (origemPassageiro: string | null, destinoPassgeiro: string | null, prioridade: string, horario: any, vagas: number,
                             distanciaMaximaOrigem: number, distanciaMaximaDestino: number) => {
    if (origemPassageiro === null || destinoPassgeiro === null) return null;

    const data = {
        "origem_passageiro": origemPassageiro,
        "destino_passageiro": destinoPassgeiro,
        "prioridade": prioridade,
        "horario": horario,
        "vagas": vagas,
        "distancia_maxima_origem": distanciaMaximaOrigem,
        "distancia_maxima_destino": distanciaMaximaDestino
    }
    console.log(data);

    try {
        const response = await axios.post(`${API_URL}/buscar_viagens`, data);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const adicionaPassageiroEmViagem = async (idViagem: string | null, idPassageiro: string | null) => {
    const data = {
        "passageiro_id": idPassageiro,
        "viagem_id": idViagem,
    }
    try {
        const response = await axios.post(`${API_URL}/adicionar_passageiro_a_viagem`, data);
        return response.data;
    } catch (error) {
        return null;
    }
}