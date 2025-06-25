import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { MenuItem } from "../Menu.interface"

interface AdditionProps {
    additions: MenuItem[]
    selectedAdditions: string[]
    handleAdditionChange: (additionId: string, checked: boolean) => void
}
export const Additions = ({ additions, selectedAdditions, handleAdditionChange }: AdditionProps) => {
    return (<div>
                        <h4 className="font-semibold mb-3">Adiciones (máximo 3) - {selectedAdditions.length}/3</h4>
                        <div className="grid grid-cols-1 gap-3">
                            {additions.map((addition) => (
                                <div key={addition.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={addition.id.toString()}
                                        checked={selectedAdditions.includes(addition.id.toString())}
                                        onCheckedChange={(checked) => handleAdditionChange(addition.id.toString(), checked as boolean)}
                                    />
                                    <Label htmlFor={addition.id.toString()} className="flex-1 cursor-pointer">
                                        {addition.nombre}
                                    </Label>
                                    <span className="text-sm font-medium">+${addition.precio.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>)
}