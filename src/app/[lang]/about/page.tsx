import { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import type { Locale } from '@/constants/i18n';
import { PageContainer } from '@/components/ui/layout';

// Generate metadata dynamically based on the locale
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const t = dictionary.about as { title: string; description: string };
  
  return {
    title: t.title,
    description: t.description,
  };
}

export default async function AboutPage({
  params
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  // Use string assertion for type safety
  const t = dictionary.about as {
    title: string;
    description: string;
    featuresTitle: string;
    feature1: string;
    feature2: string;
    teamTitle: string;
    teamDescription: string;
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          {t.description}
        </p>
        <p className="mb-4">
          {t.feature1} {t.feature2}
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">{t.featuresTitle}</h2>
        <p className="mb-4">
          {t.teamDescription}
        </p>
      </div>
    </PageContainer>
  );
} 