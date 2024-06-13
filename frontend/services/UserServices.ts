import axios from "axios";

const API_URL = "http://10.10.8.239:3000"; // Altere para o IP do seu backend
const loginEndpoint = "login";
const profileEndpoint = "obter_usuario";
const ratingsEndpoint = "obter_avaliacoes";

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

function handleAxiosError(error: any): void {
    if (axios.isAxiosError(error)) {
        console.error(`Axios error: ${error.response?.status} ${error.response?.statusText}`);
    } else {
        console.error(`Network error: ${error}`);
    }
}
