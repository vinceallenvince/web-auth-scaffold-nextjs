import React from 'react';
import { cn } from '@/lib/utils';

type SpacerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  axis?: 'horizontal' | 'vertical';
  className?: string;
};

/**
 * Spacer component for consistent spacing
 * 
 * @param size - Size of the spacer
 * @param axis - Orientation of the spacer (horizontal or vertical)
 * @param className - Additional class names to apply
 */
export function Spacer({
  size = 'md',
  axis = 'vertical',
  className,
}: SpacerProps) {
  const getSizeClass = () => {
    switch (size) {
      case 'xs': return axis === 'vertical' ? 'h-2' : 'w-2';
      case 'sm': return axis === 'vertical' ? 'h-4' : 'w-4';
      case 'md': return axis === 'vertical' ? 'h-8' : 'w-8';
      case 'lg': return axis === 'vertical' ? 'h-12' : 'w-12';
      case 'xl': return axis === 'vertical' ? 'h-16' : 'w-16';
      case '2xl': return axis === 'vertical' ? 'h-24' : 'w-24';
      default: return axis === 'vertical' ? 'h-8' : 'w-8';
    }
  };

  return (
    <div
      className={cn(
        getSizeClass(),
        axis === 'horizontal' ? 'inline-block' : 'block',
        className
      )}
      aria-hidden="true"
    />
  );
}

type StackProps = {
  children: React.ReactNode;
  className?: string;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  direction?: 'row' | 'column';
};

/**
 * Stack component for consistent spacing between elements
 * 
 * @param children - The content to display inside the stack
 * @param className - Additional class names to apply
 * @param space - Size of the gap between elements
 * @param direction - Direction of the stack (row or column)
 */
export function Stack({
  children,
  className,
  space = 'md',
  direction = 'column',
}: StackProps) {
  const getSpaceClass = () => {
    switch (space) {
      case 'xs': return 'gap-2';
      case 'sm': return 'gap-4';
      case 'md': return 'gap-8';
      case 'lg': return 'gap-12';
      case 'xl': return 'gap-16';
      case '2xl': return 'gap-24';
      default: return 'gap-8';
    }
  };

  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';

  return (
    <div
      className={cn(
        'flex',
        directionClass,
        getSpaceClass(),
        className
      )}
    >
      {children}
    </div>
  );
} 