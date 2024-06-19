import axios from "axios";

const API_URL = "http://192.168.100.189:3000";

const loginEndpoint = "login";
const profileEndpoint = "obter_usuario";
const ratingsEndpoint = "obter_avaliacoes";
const motoristaHistoricoEndpoint = "obter_historico_como_motorista";
const passageiroHistoricoEndpoint = "obter_historico_como_passageiro";
const adicionarViagemEndpoint = "adicionar_viagem";

interface LoginResponse {
  uid: string;
  token: string;
}

export async function loginUsuario(email: string, password: string): Promise<LoginResponse | null> {
  const data = {
    email: email,
    senha: password,
  };

  try {
    const response = await axios.post(`${API_URL}/${loginEndpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.error(`Server error: ${response.status} ${response.statusText}`);
      return null;
    }

    const responseData = response.data;
    return {
      uid: responseData.uid,
      token: responseData.token,
    };
  } catch (error) {
    handleAxiosError(error);
    return null;
  }
}

export async function getProfile(userId: string): Promise<any> {
  try {
    const response = await axios.post(`${API_URL}/${profileEndpoint}`, { user_id: userId }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.error(`Server error: ${response.status} ${response.statusText}`);
      return null;
    }

    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return null;
  }
}

export async function getRatings(userId: string): Promise<any> {
  try {
    const response = await axios.post(`${API_URL}/${ratingsEndpoint}`, { user_id: userId }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.error(`Server error: ${response.status} ${response.statusText}`);
      return [];
    }

    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return [];
  }
}

export async function getMotoristaHistorico(userId: string): Promise<any> {
  try {
    console.log(`Fetching motorista historico for user ID: ${userId}`);
    const response = await axios.post(`${API_URL}/${motoristaHistoricoEndpoint}`, { user_id: userId }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.error(`Server error: ${response.status} ${response.statusText}`);
      return [];
    }

    console.log(`Received motorista historico: ${response.data}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return [];
  }
}

export async function getPassageiroHistorico(userId: string): Promise<any> {
  try {
    console.log(`Fetching passageiro historico for user ID: ${userId}`);
    const response = await axios.post(`${API_URL}/${passageiroHistoricoEndpoint}`, { user_id: userId }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.error(`Server error: ${response.status} ${response.statusText}`);
      return [];
    }

    console.log(`Received passageiro historico: ${response.data}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return [];
  }
}

export async function addTrip(data: any): Promise<any> {
  try {
    const response = await axios.post(`${API_URL}/${adicionarViagemEndpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    handleAxiosError(error);
    return null;
  }
}

export async function getVehicles(userId: string): Promise<any> {
  try {
    const profile = await getProfile(userId);
    if (profile && profile.veiculos) {
      return Object.values(profile.veiculos);
    }
    return [];
  } catch (error) {
    handleAxiosError(error);
    return [];
  }
}

function handleAxiosError(error: any): void {
  if (axios.isAxiosError(error)) {
    console.error(`Axios error: ${error.response?.status} ${error.response?.statusText}`);
  } else {
    console.error(`Network error: ${error}`);
  }
}

export async function getMotoristaDetalhes(userId: string): Promise<any> {
  try {
    console.log(`Fetching motorista detalhes for user ID: ${userId}`);
    const response = await axios.post(`${API_URL}/obter_usuario`, { user_id: userId }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.error(`Server error: ${response.status} ${response.statusText}`);
      return null;
    }

    console.log(`Received motorista detalhes: ${response.data}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    return null;
  }
}
