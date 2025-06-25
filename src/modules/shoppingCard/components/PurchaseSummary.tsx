import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/CartContext"
import { useNavigate } from "react-router-dom"
import { SendEmailService } from "../services/SendEmails"

export const PurchaseSummary = () => {
    const userDataString = localStorage.getItem("user")
    const userData = userDataString ? JSON.parse(userDataString) : null
    const { state, dispatch } = useCart()
    const navigate = useNavigate()
    const handleCheckout = async() => {
        if (state.items.length === 0) return
        await SendEmailService(state.items,userData?.nombre,userData?.correo)
        dispatch({type:'CLEAR_CART'})
        console.log("ITEMPS PARA EL CORREO",state.items);
        navigate('/orden-exitosa')
    }
    
    return (
        <div className="lg:col-span-1">
            <Card className="sticky top-4">
                <CardHeader>
                    <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        {state.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span>
                                    {item.quantity}x {item.name}
                                </span>
                                <span>${(item.totalPrice * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${state.total.toFixed(2)}</span>
                    </div>
                    <Button onClick={handleCheckout} className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                        Confirmar pedido
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}