import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthHero } from "@/components/auth";

export const metadata: Metadata = {
  title: "Authentication Error | Web Auth Scaffold",
  description: "An error occurred during authentication",
};

interface ErrorPageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AuthErrorPage({
  searchParams,
}: ErrorPageProps) {
  const resolvedParams = await searchParams;
  const error = typeof resolvedParams.error === "string" ? resolvedParams.error : "";

  // If no error is provided, redirect to the sign in page
  if (!error) {
    redirect("/auth/magic-link");
  }

  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    default: "An error occurred during authentication. Please try again.",
    configuration: "There is a problem with the server configuration.",
    accessdenied: "You do not have permission to sign in.",
    verification: "The verification link may have expired or already been used.",
  };

  // Get error message or use default message
  const errorMessage = errorMessages[error] || errorMessages.default;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body">
                <h1 className="text-2xl font-bold text-red-600 text-center">Authentication Error</h1>
                <p className="text-sm text-gray-600 text-center">
                  {errorMessage}
                </p>
                
                <div className="my-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-error" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-error">
                        Error code: {error}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Link
                    href="/auth/magic-link"
                    className="btn btn-primary btn-sm"
                  >
                    Try signing in again
                  </Link>
                  
                  <Link
                    href="/"
                    className="btn btn-outline btn-sm"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <AuthHero 
              title="Authentication Error"
              description="We encountered an issue during the authentication process."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 