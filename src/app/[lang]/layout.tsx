import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import ClientProviders from "./ClientProviders";
import { Navbar, SkipToContent } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";

// Define valid locales for static generation
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

// Generate metadata dynamically
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  // Log the current language (this is just to use the params and avoid linting errors)
  console.log(`Rendering page in language: ${lang}`);
  return {
    title: "Web Auth Scaffold",
    description: "A modern authentication scaffold built with Next.js",
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
  
  const { lang } = await params;
  // Log the current language (this is just to use the params and avoid linting errors)
  console.log(`Rendering page in language: ${lang}`);
  
  return (
    <ClientProviders session={session}>
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </ClientProviders>
  );
} 