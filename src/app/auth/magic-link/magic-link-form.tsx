"use client"

import { useState, useEffect } from "react";
import { getCsrfToken } from "next-auth/react";

export default function MagicLinkForm() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const loadCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token || null);
    };
    loadCsrfToken();
  }, []);

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Sign In with Magic Link</h2>
        
        <form action="/api/auth/signin/email" method="POST">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken || ""} />
          <div className="form-control w-full max-w-md">
            <label className="label">
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
              aria-describedby="email-description"
            />
            <label className="label">
              <span className="label-text-alt" id="email-description">We'll send a magic link to this address</span>
            </label>
          </div>
          
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              aria-label="Send magic link"
            >
              Send Magic Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 