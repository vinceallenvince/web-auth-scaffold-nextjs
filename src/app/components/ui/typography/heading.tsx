import { forwardRef } from 'react';
import { cn } from '@/app/lib/utils';
import { HeadingProps } from './types';

export const H1 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, id, as = 'h1', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        id={id}
        ref={ref}
        className={cn(
          'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, id, as = 'h2', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        id={id}
        ref={ref}
        className={cn(
          'scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, id, as = 'h3', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        id={id}
        ref={ref}
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
H3.displayName = 'H3';

export const H4 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, id, as = 'h4', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        id={id}
        ref={ref}
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
H4.displayName = 'H4';

export const H5 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, id, as = 'h5', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        id={id}
        ref={ref}
        className={cn(
          'scroll-m-20 text-lg font-semibold tracking-tight lg:text-xl',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
H5.displayName = 'H5';

export const H6 = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, children, id, as = 'h6', ...props }, ref) => {
    const Component = as;
    
    return (
      <Component
        id={id}
        ref={ref}
        className={cn(
          'scroll-m-20 text-base font-semibold tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
H6.displayName = 'H6'; 