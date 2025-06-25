import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { MenuItem } from "../Menu.interface"
interface DrinkProps {
    selectedDrink: string
    setSelectedDrink: (value: string) => void
    drinks: MenuItem[]
}
export const Drinks = ({ drinks, selectedDrink, setSelectedDrink }: DrinkProps) => {
    return (
        <div>
                        <h4 className="font-semibold mb-3">Bebidas (requerido)</h4>
                        <RadioGroup value={selectedDrink} onValueChange={setSelectedDrink}>
                            {drinks.map((drink) => (
                                <div key={drink.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={drink.id.toString()} id={drink.id.toString()} />
                                    <Label htmlFor={drink.id.toString()} className="flex-1 cursor-pointer">
                                        {drink.nombre}
                                    </Label>
                                    <span className="text-sm font-medium">+${drink.precio.toFixed(2)}</span>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
    )
}