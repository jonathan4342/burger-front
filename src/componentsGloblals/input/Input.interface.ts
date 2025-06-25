export const InputType = {
    TEXT: "text",
    PASSWORD: "password",
    EMAIL: "email",
} as const

export type InputType = (typeof InputType)[keyof typeof InputType]


export interface InputComponentProps {
    id: string
    type: InputType
    label: string
    name?: string
    placeholder?: string
    className?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean
}