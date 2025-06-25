import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina múltiples clases CSS y aplica merge para Tailwind.
 * Ej: cn("text-sm", condition && "text-red-500") -> "text-sm text-red-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
