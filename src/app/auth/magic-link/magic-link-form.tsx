"use client"

import { useState, useEffect, FormEvent } from "react";
import { getCsrfToken } from "next-auth/react";
import { useToast } from "@/app/providers/toast-provider";
import { useRouter } from "next/navigation";

export default function MagicLinkForm() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { addToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const loadCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token || null);
    };
    loadCsrfToken();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      addToast("Please enter a valid email address", "error");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/auth/signin/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          csrfToken: csrfToken || "",
          email,
          json: "true",
        }),
      });

      if (response.ok) {
        addToast(`Magic link sent to ${email}. Please check your inbox.`, "success");
        router.push("/auth/verify-request");
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || "Error sending magic link. Please try again";
        addToast(errorMessage, "error");
      }
    } catch {
      // Network error or other unexpected error
      addToast("Network error. Please try again later", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-200 border border-base-300">
      <div className="card-body">
        
        <form onSubmit={handleSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken || ""} />
          <div className="form-control w-full max-w-md">
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
            />
          </div>
          
          <div className="form-control mt-6">
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
      </div>
    </div>
  );
} 