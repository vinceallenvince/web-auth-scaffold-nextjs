import { Metadata } from "next";
import MagicLinkForm from "./magic-link-form";

export const metadata: Metadata = {
  title: "Magic Link Authentication | Web Auth Scaffold",
  description: "Authenticate with a magic link sent to your email",
};

export default function MagicLinkPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Magic Link Authentication</h1>
          <p className="mt-2 text-gray-600">
            Enter your email to receive a secure login link
          </p>
        </div>
        
        <MagicLinkForm />
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            No password needed! You'll receive an email with a secure link to sign in instantly.
          </p>
        </div>
      </div>
    </div>
  );
} 