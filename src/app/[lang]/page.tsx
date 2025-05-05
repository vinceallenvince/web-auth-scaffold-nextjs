import { getDictionary } from "./dictionaries";
import type { Locale } from "@/constants/i18n";
import { HomeHero } from "@/components/ui/hero/server";
import { PageContainer } from "@/components/ui/layout";

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ lang: string }>
}) {
  // Get the dictionary for the current locale
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  
  // Log information about the locale and dictionary
  console.log(`Page rendered with locale: ${lang}`);
  console.log(`Using dictionary with app title: ${dictionary.common.appTitle}`);
  
  return (
    <PageContainer centered>
      <HomeHero lang={lang} />
    </PageContainer>
  );
} 