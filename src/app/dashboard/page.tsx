import { AuthGuard } from "@/components/auth/auth-guard";
import { getSession } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Web Auth Scaffold",
  description: "Protected dashboard page",
};

export default async function DashboardPage() {
  // Get the session to display user info
  const session = await getSession();
  
  return (
    <AuthGuard>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session?.user?.name || session?.user?.email}</h2>
          
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-2">Your Profile</h3>
              <p className="text-gray-600">Email: {session?.user?.email}</p>
              <p className="text-gray-600">User ID: {session?.user?.id}</p>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-2">Session Information</h3>
              <p className="text-gray-600">This page is protected and only accessible to authenticated users.</p>
              <p className="text-gray-600">Your session is stored securely in the database.</p>
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
} 