import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import ClientProviders from "../ClientProviders";
import { SkipToContent } from "@/components/ui/navigation";
import { Navbar } from "@/components/ui/navigation/server";
import { Footer } from "@/components/ui/footer/server";
import { locales } from "@/constants/i18n";
import { getDictionary } from "./dictionaries";
import type { Locale } from "@/constants/i18n";

// Define valid locales for static generation
export function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

// Generate metadata dynamically
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  // Get dictionary based on the current locale
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  
  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // Get the session from the server
  const session = await getSession();
  
  // Get the dictionary for the current locale
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ClientProviders session={session}>
          <SkipToContent text={dictionary.navigation.skipToContent} />
          <Navbar lang={lang} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer lang={lang} />
        </ClientProviders>
      </body>
    </html>
  );
} 