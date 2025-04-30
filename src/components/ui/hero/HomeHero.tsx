import React from 'react';
import { cn } from '@/lib/utils';
import { ButtonLink } from '../button';
import { Container } from '../layout/container';
import { H1 } from '../typography/heading';
import { FeatureCard } from './FeatureCard';
import type { Locale } from "@/constants/i18n";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getSession } from '@/lib/auth';

interface HomeHeroProps {
  className?: string;
  lang: string;
}

export async function HomeHero({ className, lang }: HomeHeroProps) {
  // Get the dictionary for the current locale
  const dictionary = await getDictionary(lang as Locale);
  
  // Check if user is authenticated
  const session = await getSession();
  const isAuthenticated = !!session;
  
  // Parse the welcome message to separate the span text
  const welcomeText = dictionary.home.welcome;
  const spanMatch = welcomeText.match(/<span>(.*?)<\/span>/);
  const beforeSpan = spanMatch ? welcomeText.split('<span>')[0] : welcomeText;
  const spanContent = spanMatch ? spanMatch[1] : '';

  return (
    <section className={cn('hero bg-gradient-to-br py-24 md:py-32', className)}>
      <div className="hero-content w-full">
        <Container>
          <div className="flex flex-col space-y-12 w-full">
            <div className="animate-fadeIn">
              <H1 className="mb-6 tracking-tight">
                {beforeSpan} {spanContent && <span className="text-primary font-bold">{spanContent}</span>}
              </H1>
              
              <p className="text-lg md:text-xl text-base-content/80 max-w-2xl mb-8">
                {dictionary.home.description}
              </p>
            </div>
            
            {!isAuthenticated && (
              <div className="animate-fadeIn">
                <ButtonLink 
                  href={`/${lang}/auth/magic-link`} 
                  size="lg"
                  variant="primary"
                  className="font-medium"
                >
                  {dictionary.auth.login}
                </ButtonLink>
              </div>
            )}
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full animate-fadeIn">
              {/* Feature cards */}
              <FeatureCard 
                title={dictionary.home.magicLinkAuthTitle} 
                description={dictionary.home.magicLinkAuthDescription} 
              />
              <FeatureCard 
                title={dictionary.home.modernStackTitle} 
                description={dictionary.home.modernStackDescription} 
              />
              <FeatureCard 
                title={dictionary.home.readyToUseTitle} 
                description={dictionary.home.readyToUseDescription} 
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
} 