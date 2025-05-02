import { Container } from "@/components/ui/layout/container";
import { Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/constants/i18n";
import VerifyRequestClient from "./verify-request-client";
import { AuthDictionary } from "@/types/i18n.types";

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
    title: auth.verifyRequest?.metaTitle,
    description: auth.verifyRequest?.metaDescription,
  };
}

export default async function VerifyRequestPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  
  return (
    <div className="container ml-0 mr-auto py-12 max-w-5xl px-12 md:px-12 lg:px-12">
      <section className='hero bg-gradient-to-br py-24 md:py-32'>
        <div className="hero-content w-full">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full">
                <VerifyRequestClient lang={lang} />
              </div>
              {/* intentional for layout spacing: */}
              <div className="w-full">
                &nbsp;
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
} 