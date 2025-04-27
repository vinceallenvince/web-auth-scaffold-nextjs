import { Metadata } from "next";
import MagicLinkForm from "./magic-link-form";
import { AuthHero } from "@/components/auth";

export const metadata: Metadata = {
  title: "Magic Link Authentication | Web Auth Scaffold",
  description: "Authenticate with a magic link sent to your email",
};

export default function MagicLinkPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="w-full lg:w-1/2">
            <MagicLinkForm />
          </div>
          
          <div className="w-full lg:w-1/2">
            <AuthHero 
              title="Secure Magic Link Login"
              description="Secure, convenient authentication without the hassle of passwords."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 