import { InputComponent } from "@/componentsGloblals/input/Input"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import { useState } from "react"
import { RegisterService } from "../services/Register.service"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export const FormRegister = () => {
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        console.log("handleChange", e.target.name, e.target.value);
        
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        })
    }
    const validatePassword = (password: string) => {
        return password.length >= 6
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!registerData.name.trim()) {

            return
        }

        if (!validateEmail(registerData.email)) {

            return
        }

        if (!validatePassword(registerData.password)) {

            return
        }

        if (registerData.password !== registerData.confirmPassword) {

            return
        }

        const token = await RegisterService(registerData.email,registerData.password,registerData.name)
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
        <TabsContent value="register">
            <form className="space-y-4" onSubmit={handleRegister}>
                <InputComponent
                    id="register-name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className="pl-10"
                    required
                    label="Nombre completo"

                />
                <InputComponent
                    id="login-email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="pl-10 pr-10"
                    required
                    label="Email"
                />

                <InputComponent
                    id="login-password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                    label="Contraseña"
                />
                <InputComponent
                    id="login-password"
                    type="password"
                    onChange={handleChange}
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                    label="Confirmar contraseña"
                />

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" >
                    Registrarse
                </Button>
            </form>
        </TabsContent>
    )
}