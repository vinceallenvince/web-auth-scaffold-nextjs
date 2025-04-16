'use client';

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import React from "react";

type SessionProviderProps = {
  children: React.ReactNode;
  session?: Session | null;
};

/**
 * Provider component that wraps your app and makes session available throughout
 * This component is needed for useSession() to work properly on the client side
 */
export function AuthSessionProvider({ children, session }: SessionProviderProps): React.ReactElement {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
} 