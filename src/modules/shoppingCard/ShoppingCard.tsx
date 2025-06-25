import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { useCart } from "@/context/CartContext"
import { ShoppingBag } from "lucide-react"
import { HeaderShoppingCard } from "./components/HeaderShoppingCard"
import { DetailedShopping } from "./components/DetailedShopping"
import { PurchaseSummary } from "./components/PurchaseSummary"
import { Navigate, useNavigate } from "react-router-dom"

export const ShoppingCard = () => {
    const navigate = useNavigate()
    const { state } = useCart()
    const token = localStorage.getItem("token") 
    if (!token) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <HeaderShoppingCard />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {state.items.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
                            <p className="text-gray-600 mb-4">Agrega algunas hamburguesas deliciosas para comenzar</p>
                            <Button className="bg-orange-600 hover:bg-orange-700" onClick={()=>navigate('/menu')}>
                                Explorar Menú
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <DetailedShopping />
                        <PurchaseSummary />
                    </div>
                )}
            </main>
        </div>
    )
}