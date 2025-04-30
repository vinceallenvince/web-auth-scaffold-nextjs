"use client"

import { useState, useEffect, FormEvent } from "react";
import { getCsrfToken } from "next-auth/react";
import { useToast } from "@/app/providers/toast-provider";
import { useRouter, useParams } from "next/navigation";
import { email as emailValidator } from "@/lib/form-validation";

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
  
  // Check email validity for form feedback
  const emailError = email.length > 0 && !emailValidator()(email).isValid;

  useEffect(() => {
    const loadCsrfToken = async () => {
      try {
        const token = await getCsrfToken();
        setCsrfToken(token || null);
      } catch (error) {
        addToast("Failed to load CSRF token. Please refresh the page.", "error");
        console.error("CSRF token fetch error:", error);
      }
    };
    loadCsrfToken();
  }, [addToast]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const emailValidation = emailValidator()(email);
    if (!emailValidation.isValid) {
      addToast(emailValidation.errorMessage || "Please enter a valid email address", "error");
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
        addToast(`Magic link sent to ${email}. Please check your inbox.`, "success");
        router.push(`/${lang}/auth/verify-request`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || 
          (response.status === 429 ? "Too many attempts. Please try again later." : 
           "Error sending magic link. Please try again");
        addToast(errorMessage, "error");
      }
    } catch (error) {
      // Network error or other unexpected error
      const errorMessage = error instanceof DOMException && error.name === "AbortError"
        ? "Request timed out. Please try again later."
        : "Network error. Please try again later";
      addToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-4">
      <legend className="fieldset-legend font-bold">Magic Link</legend>
      
      <form onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken || ""} />
        <div className="form-control w-full">
          <label className="label" htmlFor="email">
            <span className="label-text">Email address</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="input input-bordered w-full"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={emailError}
            aria-describedby={emailError ? "email-error" : undefined}
          />
          {emailError && (
            <p id="email-error" className="text-error text-sm mt-1">
              Please enter a valid email address
            </p>
          )}
        </div>
        
        <div className="form-control mt-6 w-full">
          <button
            type="submit"
            className="btn btn-primary"
            aria-label="Send magic link"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Sending...
              </>
            ) : (
              "Send Magic Link"
            )}
          </button>
        </div>
      </form>
    </fieldset>
  );
} 