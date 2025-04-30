"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ButtonLink } from '../button';
import { Container } from '../layout/container';
import { H1 } from '../typography/heading';
import { FeatureCard } from './FeatureCard';
import { useSession } from 'next-auth/react';

interface HomeHeroProps {
  className?: string;
}

function HomeHero({ className }: HomeHeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  // Animation effect when component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={cn('hero bg-gradient-to-br py-24 md:py-32', className)}>
      <div className="hero-content w-full">
        <Container>
          <div className="flex flex-col space-y-12 w-full">
            <div 
              className={cn(
                'transform transition-all duration-500 ease-in-out',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              )}
            >
              <H1 className="mb-6 tracking-tight">
                Welcome to <span className="text-primary font-bold">Next.js Auth Scaffold</span>
              </H1>
              
              <p className="text-lg md:text-xl text-base-content/80 max-w-2xl mb-8">
                A secure, modern authentication system built with Next.js and Auth.js.
                Get started with magic link authentication in minutes.
              </p>
            </div>
            
            {!isAuthenticated && (
              <div 
                className={cn(
                  'transform transition-all duration-500 delay-150 ease-in-out',
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                )}
              >
                <ButtonLink 
                  href="/auth/magic-link" 
                  size="lg"
                  variant="primary"
                  className="font-medium"
                >
                  LOGIN
                </ButtonLink>
              </div>
            )}
            
            <div 
              className={cn(
                'mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full', 
                'transform transition-all duration-500 delay-300 ease-in-out',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              )}
            >
              {/* Feature cards */}
              <FeatureCard 
                title="Magic Link Auth" 
                description="Passwordless authentication with secure email magic links" 
              />
              <FeatureCard 
                title="Modern Stack" 
                description="Built with Next.js, TypeScript, and Tailwind CSS" 
              />
              <FeatureCard 
                title="Ready to Use" 
                description="Pre-configured with all you need to start building" 
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default HomeHero; 