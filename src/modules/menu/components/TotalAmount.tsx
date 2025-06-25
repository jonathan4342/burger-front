import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface TotalAmountProps {
    quantity: number;
    setQuantity: (value: number) => void;
    calculateTotal: () => number;
}
export const TotalAmount = ({ quantity, setQuantity, calculateTotal }: TotalAmountProps) => {
    return (
         <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="font-semibold">Cantidad:</span>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{quantity}</span>
                                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-lg font-bold">Total: ${(calculateTotal() * quantity).toFixed(2)}</div>
                            <div className="text-sm text-gray-600">${calculateTotal().toFixed(2)} c/u</div>
                        </div>
                    </div>
    )
}