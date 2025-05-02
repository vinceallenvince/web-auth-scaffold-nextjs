import { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/constants/i18n";
import { AuthDictionary } from "@/types/i18n.types";
import Link from "next/link";
import { redirect } from "next/navigation";
import AuthErrorAlert from "./auth-error-alert";

// Generate metadata dynamically based on the locale
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const auth = dictionary.auth as AuthDictionary;
  
  return {
    title: `${dictionary.errors.somethingWentWrong} | ${dictionary.common.appTitle}`,
    description: auth.errors?.default || "",
  };
}

interface ErrorPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

// Type for error messages
interface ErrorMessages {
  prefix?: string;
  default?: string;
  [key: string]: string | undefined;
}

export default async function AuthErrorPage({
  params,
  searchParams,
}: ErrorPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const auth = dictionary.auth as AuthDictionary;
  const t = (auth.errors || {}) as ErrorMessages;
  
  const searchParamsValue = await searchParams;
  const error = typeof searchParamsValue.error === "string" ? searchParamsValue.error : "";
  const message = typeof searchParamsValue.message === "string" ? searchParamsValue.message : "";

  // If no error is provided, redirect to the sign in page
  if (!error) {
    redirect(`/${lang}/auth/magic-link`);
  }

  // Get error message from translation or use default message
  // First try to get a specific translation for this error code
  // If not found, use the provided message or fall back to default error message
  const errorMessage = t[error] || message || t.default || "An error occurred during authentication";

  return (
    <div className="container ml-0 mr-auto py-12 max-w-5xl px-12 md:px-12 lg:px-12">
      <AuthErrorAlert error={error} message={errorMessage} />
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-red-600">{dictionary.errors.somethingWentWrong}</h1>
          <p className="mt-2 text-sm text-gray-600">
            {errorMessage}
          </p>
        </div>
        
        <div className="mt-8">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-red-700">
                  {t.prefix ? `${t.prefix} ${error}` : `Error code: ${error}`}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Link
            href={`/${lang}/auth/magic-link`}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {auth.signIn}
          </Link>
        </div>
        

      </div>
    </div>
  );
} 