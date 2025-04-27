import { Metadata } from "next";
import Link from "next/link";
import { AuthHero } from "@/components/auth";

export const metadata: Metadata = {
  title: "Check Your Email | Web Auth Scaffold",
  description: "Check your email for a sign in link",
};

export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="w-full lg:w-1/2 space-y-8 text-center">
            <div>
              <h1 className="text-2xl font-bold">Check your email</h1>
              <p className="mt-2 text-sm text-gray-600">
                A sign in link has been sent to your email address.
              </p>
            </div>
            
            <div className="mt-8">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.75.75 0 00.736-.599l.5-2.5A.75.75 0 0010.738 6H9.75a.75.75 0 000 1.5h.253l-.486 2.43zm3.555 7.202A5.981 5.981 0 0110 18a5.981 5.981 0 01-2.555-.798 1 1 0 010-1.5 5.981 5.981 0 012.555-.798 5.981 5.981 0 012.555.798 1 1 0 010 1.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      Click the link in your email to sign in. It may take a few minutes to arrive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Didn't receive an email? Check your spam folder or{" "}
                <Link href="/auth/magic-link" className="font-medium text-blue-600 hover:text-blue-500">
                  try again
                </Link>
              </p>
            </div>
            
            <div className="mt-8">
              <Link
                href="/"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                ← Back to home
              </Link>
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