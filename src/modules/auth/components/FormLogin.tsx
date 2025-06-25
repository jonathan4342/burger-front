import { InputComponent } from "@/componentsGloblals/input/Input"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import { LoginService } from "../services/Login.service"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom'

export const FormLogin = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log("handleChange", e.target.name, e.target.value);
        
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        })
    }
    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    const validatePassword = (password: string) => {
        return password.length >= 6
    }
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateEmail(loginData.email)) {
            console.error("Email inválido")
            return
        }
        if (!validatePassword(loginData.password)) {
            console.error("La contraseña debe tener al menos 6 caracteres")
            return
        }
        setIsLoading(true)
        const token = await LoginService(loginData.email, loginData.password)
        setIsLoading(false)
        if (token.status !== 201) {
            console.error("Error al iniciar sesión:", token.data)
            toast.error("Error al iniciar sesión: " + token.response.data.message)
            
        }else{
            localStorage.setItem("token", token.data.access_token)
            localStorage.setItem("user", JSON.stringify(token.data.usuario))
            toast.success("Inicio de sesión exitoso")
            navigate("/menu")
        }
    }
    return (
        <TabsContent value="login">
            <form className="space-y-4" onSubmit={handleLogin}>
                <InputComponent
                    id="login-email"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={(e)=> handleChange(e)}
                    placeholder="tu@email.com"
                    className="pl-10 pr-10"
                    required
                    label="Email"
                />
                <InputComponent
                    id="login-password"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e)=> handleChange(e)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                    label="Contraseña"
                />
                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" >
                    Iniciar Sesión
                </Button>
            </form>
        </TabsContent>
    )
}