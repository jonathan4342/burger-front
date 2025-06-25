"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface ICartItem {
    id: string
    name: string
    basePrice: number
    customizations: {
        additions: Array<{ name: string; price: number }>
        sauces: Array<{ name: string; price: number }>
    }
    sides: {
        fries: { name: string; price: number } | null
        drink: { name: string; price: number } | null
    }
    quantity: number
    totalPrice: number
}

interface CartState {
    items: ICartItem[]
    total: number
}

type CartAction =
    | { type: "ADD_ITEM"; payload: ICartItem }
    | { type: "REMOVE_ITEM"; payload: string }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "CLEAR_CART" }

const CartContext = createContext<{
    state: CartState
    dispatch: React.Dispatch<CartAction>
} | null>(null)

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id)
            if (existingItemIndex > -1) {
                const updatedItems = [...state.items]
                updatedItems[existingItemIndex].quantity += action.payload.quantity
                const newTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)
                return { items: updatedItems, total: newTotal }
            }

            const newItems = [...state.items, action.payload]
            const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)
            return { items: newItems, total: newTotal }
        }
        case "REMOVE_ITEM": {
            const filteredItems = state.items.filter((item) => item.id !== action.payload)
            const filteredTotal = filteredItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)
            return { items: filteredItems, total: filteredTotal }
        }
        case "UPDATE_QUANTITY": {
            const updatedItems = state.items
                .map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item))
                .filter((item) => item.quantity > 0)

            const updatedTotal = updatedItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)
            return { items: updatedItems, total: updatedTotal }
        }
        case "CLEAR_CART":
            return { items: [], total: 0 }

        default:
            return state
    }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
