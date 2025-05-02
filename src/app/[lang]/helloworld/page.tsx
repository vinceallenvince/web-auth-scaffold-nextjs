'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useT } from '@/app/lib/i18n-context';

export default function HelloWorldPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const t = useT();

  useEffect(() => {
    // If the user is not authenticated, redirect to login
    if (status === 'unauthenticated') {
      router.push('/auth/magic-link');
    }

    // If we know the session status, stop loading
    if (status !== 'loading') {
      setIsLoading(false);
    }
  }, [status, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
        <span className="sr-only">{t('helloworld.loading')}</span>
      </div>
    );
  }

  // Get user name or email, or fall back to generic text
  const userName = session?.user?.name || session?.user?.email || t('helloworld.authenticatedUser');
  
  // Replace the {name} placeholder in the welcome message
  const welcomeMessage = t('helloworld.welcome').replace('{name}', userName);

  return (
    <div className="container ml-0 mr-auto py-12 max-w-5xl px-12 md:px-12 lg:px-12">
      <h1 className="text-3xl font-bold mb-4">{t('helloworld.title')}</h1>
      <p className="mb-4">
        {welcomeMessage}
      </p>
      <p>{t('helloworld.description')}</p>
    </div>
  );
} 