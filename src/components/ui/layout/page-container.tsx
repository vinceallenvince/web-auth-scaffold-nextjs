import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

type PageContainerVariant = 'default' | 'compact';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  variant?: PageContainerVariant;
};

/**
 * PageContainer component for consistent page layout
 * Provides standardized padding, width, and alignment for page content
 * 
 * @param children - The content to display inside the container
 * @param className - Additional class names to apply
 * @param centered - Whether the container should be centered (true) or left-justified (false)
 * @param variant - Layout variant: 'default' (standard padding) or 'compact' (reduced padding)
 */
export function PageContainer({
  children,
  className,
  centered = false,
  variant = 'default',
  ...props
}: PageContainerProps) {
  return (
    <Container 
      fluid={centered}
      className={cn(
        'max-w-5xl',
        variant === 'default' ? 'py-12 px-12' : 'px-4 py-8',
        className
      )}
      {...props}
    >
      {children}
    </Container>
  );
} 