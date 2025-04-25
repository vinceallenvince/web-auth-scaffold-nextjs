"use client";

import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Error state - visually indicates invalid input */
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "textarea textarea-bordered w-full",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
          "min-h-[80px] py-2 px-3",
          "placeholder:text-base-content/50",
          "text-base-content",
          "transition-colors",
          {
            "textarea-error border-error focus:ring-error": error
          },
          className
        )}
        aria-invalid={error ? "true" : undefined}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea"; 