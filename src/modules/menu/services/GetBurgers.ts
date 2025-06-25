import api from "@/api/ApiRequest"

export const GetMenuService = async () => {
    try {
        const menu = await api.get("/producto/all")
       
        if (menu.status !== 200) {
            return menu
        }
        
        return menu.data
    }
    catch (error) {
        console.error("Error en el servicio de obtener el menu:", error)
        return error
    }
}
