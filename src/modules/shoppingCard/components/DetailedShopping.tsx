import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/context/CartContext"
import { Separator } from "@radix-ui/react-separator"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const DetailedShopping = () => {
    const { state, dispatch } = useCart()

       const updateQuantity = (id: string, newQuantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQuantity } })
    }

    const removeItem = (id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: id })
    }
    return (
        <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
                <Card key={item.id}>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-gray-600">Precio base: ${item.basePrice.toFixed(2)}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        {item.customizations.additions.length > 0 && (
                            <div className="mb-3">
                                <h4 className="text-sm font-medium mb-1">Adiciones:</h4>
                                <div className="flex flex-wrap gap-1">
                                    {item.customizations.additions.map((addition, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                            {addition.name} (+${addition.price.toFixed(2)})
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        {item.customizations.sauces.length > 0 && (
                            <div className="mb-3">
                                <h4 className="text-sm font-medium mb-1">Salsas:</h4>
                                <div className="flex flex-wrap gap-1">
                                    {item.customizations.sauces.map((sauce, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                            {sauce.name}
                                            {sauce.price > 0 && ` (+$${sauce.price.toFixed(2)})`}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="mb-4">
                            <h4 className="text-sm font-medium mb-1">Acompañamientos:</h4>
                            <div className="flex flex-wrap gap-1">
                                {item.sides.fries && (
                                    <Badge variant="outline" className="text-xs">
                                        {item.sides.fries.name} (+${item.sides.fries.price.toFixed(2)})
                                    </Badge>
                                )}
                                {item.sides.drink && (
                                    <Badge variant="outline" className="text-xs">
                                        {item.sides.drink.name} (+${item.sides.drink.price.toFixed(2)})
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <Separator className="my-4" />
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium">Cantidad:</span>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">${(item.totalPrice * item.quantity).toFixed(2)}</div>
                                <div className="text-sm text-gray-600">${item.totalPrice.toFixed(2)} c/u</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}