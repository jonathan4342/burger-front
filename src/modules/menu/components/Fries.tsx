import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { MenuItem } from "../Menu.interface"
interface FriesProps {
    selectedFries: string
    setSelectedFries: (value: string) => void
    fries: MenuItem[]
}
export const Fries = ({ selectedFries, setSelectedFries, fries }: FriesProps) => {
    return (
        <div>
                        <h4 className="font-semibold mb-3">Papas (requerido)</h4>
                        <RadioGroup value={selectedFries} onValueChange={setSelectedFries}>
                            {fries.map((friesOption) => (
                                <div key={friesOption.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={friesOption.id.toString()} id={friesOption.id.toString()} />
                                    <Label htmlFor={friesOption.id.toString()} className="flex-1 cursor-pointer">
                                        {friesOption.nombre}
                                    </Label>
                                    <span className="text-sm font-medium">+${friesOption.precio.toFixed(2)}</span>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
    )
}