import { Data } from "@react-google-maps/api";
import Usuario from "./usuario";
import Veiculo from "./veiculo";

interface Viagem {
    id?: string;
    destino: string;
    usuario: Usuario;
    passageiros: Usuario[];
    veiculo: Veiculo;
    origem: string;
    vagas: number;
    horario: Date
}
export default Viagem;