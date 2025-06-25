export interface MenuItem {
    id: number
    nombre: string
    precio: number
    descripcion: string | null
}

export interface MenuResponse {
    adicionales: MenuItem[]
    salsa: MenuItem[]
    papas: MenuItem[]
    compuesto: MenuItem[]
    bebidas: MenuItem[]
}