import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility for combining Tailwind CSS class names safely.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
