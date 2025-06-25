import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { MenuItem } from "../Menu.interface"
interface SauceProps {
    sauces: MenuItem[]
    selectedSauces: string[]
    handleSauceChange: (sauces: string, checked: boolean) => void
}
export const Souces =({ sauces, selectedSauces, handleSauceChange }: SauceProps)=>{
    return(
        <div>
                        <h4 className="font-semibold mb-3">Salsas (máximo 2) - {selectedSauces.length}/2</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {sauces.map((sauce) => (
                                <div key={sauce.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={sauce.id.toString()}
                                        checked={selectedSauces.includes(sauce.id.toString())}
                                        onCheckedChange={(checked) => handleSauceChange(sauce.id.toString(), checked as boolean)}
                                    />
                                    <Label htmlFor={sauce.id.toString()} className="flex-1 cursor-pointer">
                                        {sauce.nombre}
                                    </Label>
                                    <span className="text-sm font-medium">
                                        {sauce.precio === 0 ? "Gratis" : `+$${sauce.precio.toFixed(2)}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
    )
}