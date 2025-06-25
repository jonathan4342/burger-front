import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const HeaderShoppingCard = () =>{
    const navigate = useNavigate()
    return (
         <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <Button variant="ghost" onClick={()=> navigate('/menu')}  className="mr-4">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver al Menú
                        </Button>
                        <h1 className="text-2xl font-bold text-orange-600">🛒 Tu Carrito</h1>
                    </div>
                </div>
            </header>
    )
}