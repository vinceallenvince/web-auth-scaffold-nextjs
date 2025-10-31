import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 * 
 * Combines clsx for conditional class handling and tailwind-merge for
 * intelligent deduplication of conflicting Tailwind utility classes.
 * Later classes override earlier ones when they target the same property.
 * 
 * @param inputs - Class names, objects with boolean values, or arrays to merge
 * @returns Merged and deduplicated class string
 * 
 * @example
 * ```tsx
 * // Basic usage
 * cn('px-2 py-1', 'px-3') // => 'py-1 px-3' (px-3 overrides px-2)
 * 
 * // Conditional classes
 * cn('btn', { 'btn-primary': isPrimary, 'btn-disabled': isDisabled })
 * 
 * // Array and object mix
 * cn('text-base', ['font-bold', { 'text-red-500': hasError }])
 * 
 * // Component usage
 * <button className={cn('btn', className)} />
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 