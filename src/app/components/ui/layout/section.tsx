import React, { ElementType } from 'react';
import { cn } from '@/lib/utils';

type SectionProps<T extends ElementType = 'section'> = {
  children: React.ReactNode;
  className?: string;
  as?: T;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
} & React.ComponentPropsWithoutRef<T>;

/**
 * Section component for page structure with consistent vertical spacing
 * 
 * @param children - The content to display inside the section
 * @param className - Additional class names to apply
 * @param as - The HTML element to render as (default: section)
 * @param size - Size of vertical padding
 * @param container - Whether to wrap content in a container
 */
export function Section<T extends ElementType = 'section'>({
  children,
  className,
  as,
  size = 'md',
  container = false,
  ...props
}: SectionProps<T>) {
  const Component = as || 'section';
  
  const getSizeClass = () => {
    switch(size) {
      case 'sm': return 'py-4';
      case 'md': return 'py-8';
      case 'lg': return 'py-12 md:py-16';
      case 'xl': return 'py-16 md:py-24';
      default: return 'py-8';
    }
  };

  const content = container ? (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {children}
    </div>
  ) : children;

  return (
    <Component
      className={cn(
        getSizeClass(),
        className
      )}
      {...props}
    >
      {content}
    </Component>
  );
}

type DividerProps<T extends ElementType = 'hr'> = {
  className?: string;
  as?: T;
  orientation?: 'horizontal' | 'vertical';
} & React.ComponentPropsWithoutRef<T>;

/**
 * Divider component for visual separation between content
 * 
 * @param className - Additional class names to apply
 * @param as - The HTML element to render as (default: hr)
 * @param orientation - Orientation of the divider (horizontal or vertical)
 */
export function Divider<T extends ElementType = 'hr'>({
  className,
  as,
  orientation = 'horizontal',
  ...props
}: DividerProps<T>) {
  const Component = as || 'hr';
  
  const orientationClass = orientation === 'vertical'
    ? 'h-full border-l border-t-0'
    : 'w-full border-t border-l-0';

  return (
    <Component
      className={cn(
        'border-gray-200 dark:border-gray-700',
        orientationClass,
        className
      )}
      {...props}
    />
  );
} 