import { Metadata } from 'next';
import { getDictionary } from '../dictionaries';
import type { Locale } from '@/constants/i18n';

// Generate metadata dynamically based on the locale
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const t = dictionary.helloworld as { title: string; description: string };
  
  return {
    title: t.title,
    description: t.description,
  };
} 