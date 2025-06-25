import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useCart, type ICartItem } from "@/context/CartContext"
import { useState } from "react"
import { toast } from "sonner"
import { TotalAmount } from "./TotalAmount"
import { Drinks } from "./Drinks"
import { Fries } from "./Fries"
import { Souces } from "./Souces"
import { Additions } from "./Additions"
import { BurgerInfo } from "./BurgerInfo"
import type { MenuItem } from "../Menu"


interface BurgerCustomizerProps {
    burger: MenuItem
    additions: MenuItem[]
    sauces: MenuItem[]
    fries: MenuItem[]
    drinks: MenuItem[]
    onClose: () => void
}
export const ModalPersonaliseBurger = ({ burger, additions, drinks, fries, sauces, onClose }: BurgerCustomizerProps) => {
    const [selectedAdditions, setSelectedAdditions] = useState<string[]>([])
    const [selectedSauces, setSelectedSauces] = useState<string[]>([])
    const [selectedFries, setSelectedFries] = useState<string>("")
    const [selectedDrink, setSelectedDrink] = useState<string>("")
    const [quantity, setQuantity] = useState(1)
    const { dispatch } = useCart()

    const handleAdditionChange = (additionId: string, checked: boolean) => {
        if (checked && selectedAdditions.length >= 3) {
            toast("Límite alcanzado", {
                description: "Solo puedes seleccionar hasta 3 adiciones",
            })
            return
        }

        setSelectedAdditions((prev) => (checked ? [...prev, additionId] : prev.filter((id) => id !== additionId)))
    }

    const handleSauceChange = (sauceId: string, checked: boolean) => {
        if (checked && selectedSauces.length >= 2) {
            toast("Límite alcanzado", {
                description: "Solo puedes seleccionar hasta 2 salsas",
            })
            return
        }

        setSelectedSauces((prev) => (checked ? [...prev, sauceId] : prev.filter((id) => id !== sauceId)))
    }

    const calculateTotal = () => {
        let total = burger.precio

        // Adiciones
        selectedAdditions.forEach((additionId) => {
            const addition = additions.find((a) => String(a.id) === additionId)
            if (addition) total += addition.precio
        })

        // Salsas
        selectedSauces.forEach((sauceId) => {
            const sauce = sauces.find((s) => String(s.id) === sauceId)
            if (sauce) total += sauce.precio
        })

        // Papas
        if (selectedFries) {
            const friesOption = fries.find((f) => String(f.id) === selectedFries)
            if (friesOption) total += friesOption.precio
        }

        // Bebida
        if (selectedDrink) {
            const drinkOption = drinks.find((d) => String(d.id) === selectedDrink)
            if (drinkOption) total += drinkOption.precio
        }

        return total
    }

    const handleAddToCart = () => {
        if (!selectedFries || !selectedDrink) {
            toast("Selección incompleta", {
                description: "Por favor selecciona papas y bebida para completar tu pedido",
            })
            return
        }

        const cartItem: ICartItem = {
            id: `${burger.id}-${Date.now()}`,
            name: burger.nombre,
            basePrice: burger.precio,
            customizations: {
                additions: selectedAdditions.map((id) => {
                    const addition = additions.find((a) => String(a.id) === id)!
                    return { name: addition.nombre, price: addition.precio }
                }),
                sauces: selectedSauces.map((id) => {
                    const sauce = sauces.find((s) => String(s.id) === id)!
                    return { name: sauce.nombre, price: sauce.precio }
                }),
            },
            sides: {
                fries: (() => {
                    const f = fries.find((f) => String(f.id) === selectedFries);
                    return f ? { name: f.nombre, price: f.precio } : null;
                })(),
                drink: (() => {
                    const d = drinks.find((d) => String(d.id) === selectedDrink);
                    return d ? { name: d.nombre, price: d.precio } : null;
                })(),
            },
            quantity,
            totalPrice: calculateTotal(),
        }

        dispatch({ type: "ADD_ITEM", payload: cartItem })

        toast("¡Agregado al carrito!", {
            description: `${quantity}x ${burger.nombre} agregado correctamente`,
        })

        onClose()
    }
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">Personaliza tu {burger.nombre}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <BurgerInfo burger={burger} />
                    <Separator />
                    <Additions
                        additions={additions}
                        selectedAdditions={selectedAdditions}
                        handleAdditionChange={handleAdditionChange}
                    />
                    <Separator />
                    <Souces
                        sauces={sauces}
                        selectedSauces={selectedSauces}
                        handleSauceChange={handleSauceChange}
                    />
                    <Separator />
                    <Fries
                        fries={fries}
                        selectedFries={selectedFries}
                        setSelectedFries={setSelectedFries}
                    />
                    <Separator />
                    <Drinks
                        drinks={drinks}
                        selectedDrink={selectedDrink}
                        setSelectedDrink={setSelectedDrink}
                    />
                    <Separator />
                    <TotalAmount
                        quantity={quantity}
                        setQuantity={setQuantity}
                        calculateTotal={calculateTotal}
                    />
                    <div className="flex space-x-3">
                        <Button variant="outline" onClick={onClose} className="flex-1">
                            Cancelar
                        </Button>
                        <Button onClick={handleAddToCart} className="flex-1 bg-orange-600 hover:bg-orange-700">
                            Agregar al Carrito
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}