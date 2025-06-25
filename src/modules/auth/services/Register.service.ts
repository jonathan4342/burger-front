import api from "@/api/ApiRequest"

export const RegisterService = async (email: string, password: string,nombre:string) => {
    try {
        const token = await api.post("/auth/register", { correo: email, contrasena: password ,nombre:nombre})
        if (token.status !== 200) {
            return token
        }
        return token.data
    }
    catch (error) {
        console.error("Error en el servicio de inicio de sesión:", error)
        return error
    }
}
