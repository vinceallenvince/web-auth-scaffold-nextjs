import { Metadata } from "next";
import MagicLinkForm from "./magic-link-form";
import { Container } from "@/components/ui/layout/container";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/constants/i18n";
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
    title: `${auth.magicLink?.title} | ${dictionary.common.appTitle}`,
    description: auth.magicLink?.description,
  };
}

export default async function MagicLinkPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const auth = dictionary.auth as AuthDictionary;
  const t = auth.magicLink!;

  return (
    <div className="container ml-0 mr-auto py-12 max-w-5xl px-12 md:px-12 lg:px-12">
      <section className='hero bg-gradient-to-br py-24 md:py-32'>
        <div className="hero-content w-full">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full">
                <div className="max-w-md">
                  <MagicLinkForm />
                </div>
              </div>
              <div className="card card-border bg-base-100 w-full">
                <div className="card-body">
                  <h1 className="text-3xl font-bold mb-3">{t.title}</h1>
                  <p>{t.description}</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
} 