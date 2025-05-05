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
  const t = dictionary.contact as { title: string; description: string };
  
  return {
    title: t.title,
    description: t.description,
  };
}

export default async function ContactPage({
  params
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  // Use string assertion for type safety
  const t = dictionary.contact as {
    title: string;
    description: string;
    alternativeTitle: string;
    emailContact: string;
    githubContact: string;
    twitterContact: string;
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          {t.description}
        </p>
        
        <section className="mt-8 mb-8" aria-labelledby="contact-methods">
          <h2 id="contact-methods" className="text-2xl font-bold mb-4">{t.alternativeTitle}</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>{t.emailContact}: <a href="mailto:example@example.com" className="link">example@example.com</a></li>
            <li>{t.githubContact}: <a href="https://github.com/example/repo" className="link" target="_blank" rel="noopener noreferrer">github.com/example/repo</a></li>
            <li>{t.twitterContact}: <a href="https://twitter.com/example" className="link" target="_blank" rel="noopener noreferrer">@example</a></li>
          </ul>
        </section>
      </div>
    </PageContainer>
  );
} 