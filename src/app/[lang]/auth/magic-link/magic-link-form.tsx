"use client"

import { useState, useEffect, FormEvent } from "react";
import { getCsrfToken } from "next-auth/react";
import { useToast } from "@/app/providers/toast-provider";
import { useRouter, useParams } from "next/navigation";
import { email as emailValidator } from "@/lib/form-validation";
import { useT } from "@/app/lib/i18n-context";

// Configuration constants
const API_TIMEOUT_MS = 10000; // 10 seconds

export default function MagicLinkForm() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { addToast } = useToast();
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;
  const t = useT();
  
  // Translation keys
  const translations = {
    formTitle: t('auth.magicLink.formTitle'),
    emailLabel: t('auth.magicLink.emailLabel'),
    emailPlaceholder: t('auth.magicLink.emailPlaceholder'),
    emailError: t('auth.magicLink.emailError'),
    sendButton: t('auth.magicLink.sendButton'),
    sending: t('auth.magicLink.sending'),
    successMessage: t('auth.magicLink.successMessage'),
    rateLimitError: t('auth.magicLink.rateLimitError'),
    timeoutError: t('auth.magicLink.timeoutError'),
    networkError: t('auth.magicLink.networkError'),
    csrfError: t('auth.magicLink.csrfError'),
    generalError: t('auth.magicLink.generalError')
  };
  
  // Check email validity for form feedback
  const emailError = email.length > 0 && !emailValidator()(email).isValid;

  useEffect(() => {
    const loadCsrfToken = async () => {
      try {
        const token = await getCsrfToken();
        setCsrfToken(token || null);
      } catch (error) {
        addToast(translations.csrfError, "error");
        console.error("CSRF token fetch error:", error);
      }
    };
    loadCsrfToken();
  }, [addToast, translations.csrfError]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const emailValidation = emailValidator()(email);
    if (!emailValidation.isValid) {
      addToast(emailValidation.errorMessage || translations.emailError, "error");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);
      
      const response = await fetch("/api/auth/signin/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        signal: controller.signal,
        body: new URLSearchParams({
          csrfToken: csrfToken || "",
          email,
          json: "true",
        }),
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        // Replace {email} placeholder in the success message
        const successMessage = translations.successMessage.replace("{email}", email);
        addToast(successMessage, "success");
        router.push(`/${lang}/auth/verify-request`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 
          (response.status === 429 ? translations.rateLimitError : translations.generalError);
        addToast(errorMessage, "error");
      }
    } catch (error) {
      // Network error or other unexpected error
      const errorMessage = error instanceof DOMException && error.name === "AbortError"
        ? translations.timeoutError
        : translations.networkError;
      addToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-4">
      <legend className="fieldset-legend font-bold">{translations.formTitle}</legend>
      
      <form onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken || ""} />
        <div className="form-control w-full">
          <label className="label" htmlFor="email">
            <span className="label-text">{translations.emailLabel}</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="input input-bordered w-full"
            placeholder={translations.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={emailError}
            aria-describedby={emailError ? "email-error" : undefined}
          />
          {emailError && (
            <p id="email-error" className="text-error text-sm mt-1">
              {translations.emailError}
            </p>
          )}
        </div>
        
        <div className="form-control mt-6 w-full">
          <button
            type="submit"
            className="btn btn-primary"
            aria-label={translations.sendButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                {translations.sending}
              </>
            ) : (
              translations.sendButton
            )}
          </button>
        </div>
      </form>
    </fieldset>
  );
} 