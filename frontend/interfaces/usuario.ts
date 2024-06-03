import Veiculo from "./veiculo";

interface Usuario {
    id: string;
    nome: string;
    email: string;
    veiculos: Veiculo[]
}
export default Usuario;