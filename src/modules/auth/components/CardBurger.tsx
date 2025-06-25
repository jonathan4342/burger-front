import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { MenuItem } from "@/modules/menu/Menu.interface"


export type CardBurgerProps = MenuItem & {
    onCustomize: () => void
}
export const CardBurger = ({ id,descripcion,nombre,precio, onCustomize }: CardBurgerProps) => {
    return (
        <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-medium absolute top-2 right-2">
                    ${precio.toFixed(2)}
                </span>
            </div>

            <CardHeader>
                <CardTitle className="text-xl">{nombre}</CardTitle>
                <CardDescription className="text-sm">{descripcion}</CardDescription>
            </CardHeader>

            <CardContent>
                <Button
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={() => onCustomize()}
                >
                    Personalizar y Agregar
                </Button>
            </CardContent>
        </Card>
    )
}