import { useCallback } from "react";

export function useToast() {
  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    // Replace with your toast logic, e.g. using a context or a library
    alert(`[${type}] ${message}`);
  }, []);

  return { showToast };
}