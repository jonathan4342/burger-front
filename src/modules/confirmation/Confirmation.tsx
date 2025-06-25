import { Button } from "@/components/ui/button";
import { Header } from "@/componentsGloblals/header/Header";
import { Navigate, useNavigate } from "react-router-dom";

export const OrderSuccessPage = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token") 
    if (!token) {
        return <Navigate to="/" replace />
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <Header />
            <div className="text-center mt-16 px-4 space-y-6">
                <h2 className="text-4xl font-bold text-green-600 leading-relaxed">
                    ¡Pedido confirmado!
                </h2>
                <p className="text-lg text-gray-700 leading-loose">
                    Gracias por tu compra. Tu pedido está en camino 🚚
                </p>
                <Button
                    onClick={() => navigate("/menu")}
                    className="bg-orange-600 hover:bg-orange-700 px-6 py-2 text-white text-base"
                >
                    Volver al inicio
                </Button>
            </div>
        </div>
    )
}
