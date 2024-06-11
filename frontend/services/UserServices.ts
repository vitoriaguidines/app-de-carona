import axios from "axios";

const API_URL = "http://192.168.15.163:3000"; // Change to your backend IP
const loginEndpoint = "login";
const profileEndpoint = "obter_usuario";
const ratingsEndpoint = "obter_avaliacoes";

export async function loginUsuario(email: string, password: string): Promise<{ uid: string; token: string } | null> {
    const data = {
        "email": email,
        "senha": password,
    };

    try {
        const response = await axios.post(`${API_URL}/${loginEndpoint}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            console.log(`Server error: ${response.status} ${response.statusText}`);
            return null;
        }

        const responseData = response.data;
        return {
            uid: responseData.uid,
            token: responseData.token,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(`Axios error: ${error.response?.status} ${error.response?.statusText}`);
        } else {
            console.log(`Network error: ${error}`);
        }
        return null;
    }
}

export async function getProfile(userId: string): Promise<any> {
    try {
        const response = await axios.post(`${API_URL}/${profileEndpoint}`, { user_id: userId }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            console.log(`Server error: ${response.status} ${response.statusText}`);
            return null;
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(`Axios error: ${error.response?.status} ${error.response?.statusText}`);
        } else {
            console.log(`Network error: ${error}`);
        }
        return null;
    }
}

export async function getRatings(userId: string): Promise<any> {
    try {
        const response = await axios.post(`${API_URL}/${ratingsEndpoint}`, { user_id: userId }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status !== 200) {
            console.log(`Server error: ${response.status} ${response.statusText}`);
            return [];
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(`Axios error: ${error.response?.status} ${error.response?.statusText}`);
        } else {
            console.log(`Network error: ${error}`);
        }
        return [];
    }
}
