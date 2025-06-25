import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const HeaderLogin = () => {
    return (
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">🍔 Burger Stock</CardTitle>
          <CardDescription>Las mejores hamburguesas difíciles de superar</CardDescription>
        </CardHeader>
    )
}