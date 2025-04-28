"use client";

import { useEffect } from "react";
import { useToast } from "@/app/providers/toast-provider";

interface AuthErrorAlertProps {
  error: string;
  message: string;
}

export default function AuthErrorAlert({ error, message }: AuthErrorAlertProps) {
  const { addToast } = useToast();

  useEffect(() => {
    // Show toast notification on component mount
    addToast(`Authentication error: ${message}`, "error", 8000);
  }, [error, message, addToast]);

  // This component doesn't render anything visible
  return null;
} 