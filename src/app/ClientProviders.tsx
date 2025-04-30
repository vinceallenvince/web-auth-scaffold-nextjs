"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./providers/theme-provider";
import { ToastProvider } from "./providers/toast-provider";
import { Suspense, useEffect, useState } from "react";
import { Session } from "next-auth";

interface ClientProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function ClientProviders({ children, session }: ClientProvidersProps) {
  // Add a client-side only flag to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  // Only after mounting on client, render the providers to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen p-4">
      <div className="animate-pulse flex space-x-2">
        <div className="h-3 w-3 bg-primary rounded-full"></div>
        <div className="h-3 w-3 bg-primary rounded-full"></div>
        <div className="h-3 w-3 bg-primary rounded-full"></div>
      </div>
    </div>}>
      <SessionProvider session={session}>
        <ThemeProvider>
          <ToastProvider>
            {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
          </ToastProvider>
        </ThemeProvider>
      </SessionProvider>
    </Suspense>
  );
} 