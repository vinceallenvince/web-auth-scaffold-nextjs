"use client";

import { Session } from "next-auth";
import { AuthSessionProvider } from "@/app/providers/session-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { ToastProvider } from "@/app/providers/toast-provider";

type ClientProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

// This component is a client component that wraps client-side providers
export default function ClientProviders({ children, session }: ClientProvidersProps) {
  return (
    <AuthSessionProvider session={session}>
      <ThemeProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ThemeProvider>
    </AuthSessionProvider>
  );
} 