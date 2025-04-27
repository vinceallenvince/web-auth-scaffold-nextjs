'use client';

import Link from "next/link";
import { AuthHero } from "@/components/auth";

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="card border border-base-300 bg-base-300">
              <div className="card-body">
                <h1 className="text-2xl font-bold text-left">Magic Link Sent!</h1>
                <p className="text-sm text-gray-600 text-left">
                Check your email for the magic link to sign in.
                </p>
                <div className="mt-4 text-left">
                  <p className="text-sm text-gray-600">
                    Didn't receive the link?
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Link
                    href="/auth/magic-link"
                    className="btn btn-outline btn-sm"
                  >
                    Try a different email
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <AuthHero 
              title="Email Verification"
              description="We've sent a secure magic link to your email."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 