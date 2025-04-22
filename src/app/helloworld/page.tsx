'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function HelloWorldPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If the user is not authenticated, redirect to login
    if (status === 'unauthenticated') {
      redirect('/auth/magic-link');
    }

    // If we know the session status, stop loading
    if (status !== 'loading') {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Hello World</h1>
      <p className="mb-4">
        Welcome, {session?.user?.name || session?.user?.email || 'authenticated user'}!
      </p>
      <p>This is a protected page that requires authentication.</p>
    </div>
  );
} 