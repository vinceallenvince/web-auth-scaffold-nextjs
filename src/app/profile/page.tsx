import React from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { getSession } from "@/lib/auth";
import { ProfileCard } from "./components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Web Auth Scaffold",
  description: "Your profile information",
};

export default async function ProfilePage() {
  // Get the session to display user info
  const session = await getSession();
  
  return (
    <AuthGuard>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <div className="max-w-3xl mx-auto">
          <ProfileCard session={session} />
        </div>
      </main>
    </AuthGuard>
  );
} 