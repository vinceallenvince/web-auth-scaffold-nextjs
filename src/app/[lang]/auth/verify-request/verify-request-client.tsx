'use client';

import Link from "next/link";
import { useT } from "@/app/lib/i18n-context";

// Props interface for the VerifyRequestClient component
interface VerifyRequestClientProps {
  lang: string;
}

export default function VerifyRequestClient({ lang }: VerifyRequestClientProps) {
  const t = useT();
  
  return (
    <div className="card card-border border-base-300 bg-base-100 w-96">
      <div className="card-body p-4">
        <h1 className="card-title text-xl font-bold">{t('auth.verifyRequest.title')}</h1>
        <p className="mt-2 text-base-content/70">
          {t('auth.verifyRequest.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md">
          <Link
            href={`/${lang}/auth/magic-link`}
            className="btn btn-outline btn-sm w-full"
          >
            {t('auth.verifyRequest.tryDifferentEmail')}
          </Link>
        </div>
      </div>
    </div>
  );
} 