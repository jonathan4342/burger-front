import { TabsList, TabsTrigger } from "@/components/ui/tabs"

export const TabsLogin =() => {
    return (
        <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
    )
}