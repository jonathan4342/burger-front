import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react" // o tus propios íconos
import { InputType, type InputComponentProps } from "./Input.interface"



export const InputComponent = ({
    id,
    type,
    label,
    name,
    placeholder,
    value,
    onChange,
    required = false,
}: InputComponentProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const renderIcon = () => {
        switch (type) {
            case InputType.EMAIL:
                return <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            case InputType.PASSWORD:
                return <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            case InputType.TEXT:
                return  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            default:
                return null
        }
    }
    const conditionType = (showPassword ? InputType.TEXT : InputType.PASSWORD)
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                {renderIcon()}
                <Input
                    id={id}
                    name={name}
                    type={type === InputType.PASSWORD ? conditionType : type}
                    placeholder={placeholder}
                    className={type === InputType.PASSWORD ? "pl-10 pr-10" : "pl-10"}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                {type === InputType.PASSWORD && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                )}
            </div>
        </div>
    )
}
