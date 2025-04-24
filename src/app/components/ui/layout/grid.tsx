import React, { ElementType } from 'react';
import { cn } from '@/lib/utils';

type GridProps<T extends ElementType = 'div'> = {
  children: React.ReactNode;
  className?: string;
  as?: T;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 'none';
  gap?: 'none' | 'sm' | 'md' | 'lg';
} & React.ComponentPropsWithoutRef<T>;

/**
 * Grid component for responsive layouts
 * 
 * @param children - The content to display inside the grid
 * @param className - Additional class names to apply
 * @param as - The HTML element to render as (default: div)
 * @param cols - Number of columns (1-6 or 'none' for auto)
 * @param gap - Size of gap between grid items
 */
export function Grid<T extends ElementType = 'div'>({
  children,
  className,
  as,
  cols = 1,
  gap = 'md',
  ...props
}: GridProps<T>) {
  const Component = as || 'div';
  
  const getColsClass = () => {
    switch(cols) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      case 5: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      case 6: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      case 'none': return '';
      default: return 'grid-cols-1';
    }
  };
  
  const getGapClass = () => {
    switch(gap) {
      case 'none': return 'gap-0';
      case 'sm': return 'gap-2';
      case 'md': return 'gap-4';
      case 'lg': return 'gap-8';
      default: return 'gap-4';
    }
  };

  return (
    <Component
      className={cn(
        'grid',
        getColsClass(),
        getGapClass(),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

type GridItemProps<T extends ElementType = 'div'> = {
  children: React.ReactNode;
  className?: string;
  as?: T;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
} & React.ComponentPropsWithoutRef<T>;

/**
 * GridItem component for use within Grid
 * 
 * @param children - The content to display inside the grid item
 * @param className - Additional class names to apply
 * @param as - The HTML element to render as (default: div)
 * @param span - Number of columns to span (1-6 or 'full' for all columns)
 */
export function GridItem<T extends ElementType = 'div'>({
  children,
  className,
  as,
  span,
  ...props
}: GridItemProps<T>) {
  const Component = as || 'div';
  
  const getSpanClass = () => {
    switch(span) {
      case 1: return 'col-span-1';
      case 2: return 'col-span-2';
      case 3: return 'col-span-3';
      case 4: return 'col-span-4';
      case 5: return 'col-span-5';
      case 6: return 'col-span-6';
      case 'full': return 'col-span-full';
      default: return '';
    }
  };

  return (
    <Component
      className={cn(
        getSpanClass(),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
} 