import Usuario from "./usuario";

interface Veiculo {
    id?: string;
    cor: string;
    usuario: Usuario;
    ano: number;
    marca: string;
    modelo: boolean;
    placa: string;
    qtdEstoque: number
}
export default Veiculo;