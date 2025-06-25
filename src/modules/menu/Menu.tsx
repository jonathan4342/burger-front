/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardBurger } from "../auth/components/CardBurger";
import { Header } from "@/componentsGloblals/header/Header";
import { HeaderTitle } from "./components/HeaderTitle";
import { ModalPersonaliseBurger } from "./components/ModalPersonaliseBurger";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GetMenuService } from "./services/GetBurgers";
import type { MenuItem, MenuResponse } from "./Menu.interface";
import { toast } from "sonner";


export default function Menu() {
    const [selectedBurger, setSelectedBurger] = useState<MenuItem | null>(null)
    const [showCustomizer, setShowCustomizer] = useState(false)
    const [menuData, setMenuData] = useState<MenuResponse | null>(null)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    useEffect(() => {
        const obtenerMenu = async () => {
            try {
                const response = await GetMenuService()
                if (response.status == 401) {
                    localStorage.removeItem('user')
                    localStorage.removeItem('token')
                    toast.error("Sesion expirada")
                    navigate('/')
                }
                setMenuData(response)
            } catch (error) {
                console.error("Error al obtener el menú:", error)
            }
        }

        if (token) obtenerMenu()
    }, [token,navigate])

    const salsas = useMemo(() => menuData?.salsa ?? [], [menuData])
    const adicionales = useMemo(() => menuData?.adicionales ?? [], [menuData])
    const papas = useMemo(() => menuData?.papas ?? [], [menuData])
    const bebidas = useMemo(() => menuData?.bebidas ?? [], [menuData])
    const compuestos = useMemo(() => menuData?.compuesto ?? [], [menuData])

    const handleCustomizeBurger = (burger: any) => {
        setSelectedBurger(burger)
        setShowCustomizer(true)
    }

    const handleCloseCustomizer = () => {
        setShowCustomizer(false)
        setSelectedBurger(null)
    }

    if (!token) {
        return <Navigate to="/" replace />
    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeaderTitle />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {compuestos.map((burger: MenuItem) => (
                    <CardBurger key={burger.id}
                        {...burger}
                        onCustomize={() => handleCustomizeBurger(burger)}
                    />
                ))}
            </div>
        </main>
        {showCustomizer && selectedBurger &&
            <ModalPersonaliseBurger
                additions={adicionales}
                drinks={bebidas}
                burger={selectedBurger}
                fries={papas}
                sauces={salsas}
                onClose={handleCloseCustomizer} />}
    </div>
    );
}
