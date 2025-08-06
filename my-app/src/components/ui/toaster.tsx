"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  // Remove usage of toasts from useToast, as it does not exist.
  // If you want to display toasts, you need to manage them in a context or use a different hook.
  // For now, just render the ToastProvider and ToastViewport.

  return (
    <ToastProvider>
      {/* No toasts to display since useToast does not provide them */}
      <ToastViewport />
    </ToastProvider>
  )
}
