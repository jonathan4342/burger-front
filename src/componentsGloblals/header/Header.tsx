import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { LogOut, ShoppingCart, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Header = () => {
    const navigate = useNavigate()
    const userDataString = localStorage.getItem("user")
    const userData = userDataString ? JSON.parse(userDataString) : null
    const { state } = useCart()

    const Logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-orange-600">🍔 Burger Stock</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" className="relative" onClick={() => navigate('/shopping')}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Carrito
                            {state.items.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 shadow">
                                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            )}
                        </Button>
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span className="text-sm font-medium">{userData?.nombre ?? "invitado"}</span>
                        </div>
                        <Button variant="ghost" onClick={Logout}>
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}