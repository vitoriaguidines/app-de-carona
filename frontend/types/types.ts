export interface Veiculo {
    veiculo_id: string;
    ano: number;
    cor: string;
    driver_id: string;
    marca: string;
    modelo: string;
    placa: string;
}

export interface UserProfile {
    user_id: string;
    display_name: string;
    email: string;
    foto_url?: string; // opcional
    veiculos?: { [key: string]: Veiculo };
}
