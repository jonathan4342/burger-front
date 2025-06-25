import api from "@/api/ApiRequest"

export const LoginService = async (email: string, password: string) => {
    try {
        const token = await api.post("/auth/login", { correo: email, contrasena: password })
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
