import { forwardRef } from 'react';
import { cn } from '@/app/lib/utils';
import { TextProps } from './types';

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as = 'p', variant = 'normal', children, id, ...props }, ref) => {
    const Component = as;
    
    const variantStyles = {
      lead: 'text-xl text-foreground leading-7',
      normal: 'text-base text-foreground leading-7',
      small: 'text-sm text-foreground/80 leading-6',
      tiny: 'text-xs text-foreground/70 leading-5',
    };
    
    return (
      <Component
        id={id}
        ref={ref}
        className={cn(variantStyles[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = 'Text';

export const Paragraph = forwardRef<HTMLParagraphElement, Omit<TextProps, 'as'>>((props, ref) => (
  <Text ref={ref} as="p" {...props} />
));
Paragraph.displayName = 'Paragraph';

export const Lead = forwardRef<HTMLParagraphElement, Omit<TextProps, 'as' | 'variant'>>((props, ref) => (
  <Text ref={ref} as="p" variant="lead" {...props} />
));
Lead.displayName = 'Lead';

export const Small = forwardRef<HTMLParagraphElement, Omit<TextProps, 'as' | 'variant'>>((props, ref) => (
  <Text ref={ref} as="p" variant="small" {...props} />
));
Small.displayName = 'Small';

export const Tiny = forwardRef<HTMLSpanElement, Omit<TextProps, 'as' | 'variant'>>((props, ref) => (
  <Text ref={ref} as="span" variant="tiny" {...props} />
));
Tiny.displayName = 'Tiny'; 