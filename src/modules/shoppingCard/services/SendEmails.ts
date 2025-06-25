import api from "@/api/ApiRequest"
import type { ICartItem } from "@/context/CartContext"

export const SendEmailService = async (shopping:ICartItem[],cliente:string,clienteEmail:string) => {
    try {
        const token = await api.post("/correo/enviar", { cliente,clienteEmail,shopping })
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
