const {API_URL} = process.env;
const loginEndpoint = "login";

export async function loginUsuario(email: string, password: string):Promise<string | null> {
    const data = {
        "email": email,
        "password": password,
    }
    await fetch(`${API_URL}/${loginEndpoint}`, {
        method: "POST",
        body: JSON.stringify(data)
    }).then((res) => {
        if (!res.ok) return null;
        return res.json();
    }).then((data) => {
        return data.uid;
    }).catch(
        err => console.error(err)
    )
    return null;
}