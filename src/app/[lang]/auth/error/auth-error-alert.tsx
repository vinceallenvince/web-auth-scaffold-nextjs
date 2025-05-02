"use client";

import { useEffect } from "react";
import { useToast } from "@/app/providers/toast-provider";
import { useT } from "@/app/lib/i18n-context";
import { useMemo } from "react";

interface AuthErrorAlertProps {
  error: string;
  message: string;
}

export default function AuthErrorAlert({ error, message }: AuthErrorAlertProps) {
  const { addToast } = useToast();
  const t = useT();
  
  // Memoize translations to prevent unnecessary re-creation
  const translations = useMemo(() => {
    const errorTranslation = t(`auth.errors.${error}`);
    const hasErrorTranslation = errorTranslation !== `auth.errors.${error}`;
    return {
      prefix: t('auth.errors.prefix'),
      default: t('auth.errors.default'),
      // Specific error translations if available
      errorMessage: hasErrorTranslation
        ? errorTranslation
        : message || t('auth.errors.default')
    };
  }, [t, error, message]);

  useEffect(() => {
    // Show toast notification on component mount with translated error message
    const displayMessage = `${translations.prefix} ${translations.errorMessage}`;
    addToast(displayMessage, "error", 8000);
  }, [error, translations, addToast]);

  // This component doesn't render anything visible
  return null;
} 