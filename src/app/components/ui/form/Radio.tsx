"use client";

import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utils";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text to display next to the radio button */
  label?: React.ReactNode;
  /** Error state - visually indicates invalid selection */
  error?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const radioId = id || Math.random().toString(36).substring(2, 9);
    
    return (
      <div className="form-control">
        <label 
          htmlFor={radioId}
          className={cn(
            "label cursor-pointer justify-start gap-2",
            error && "text-error",
            className
          )}
        >
          <input
            type="radio"
            id={radioId}
            ref={ref}
            className={cn(
              "radio",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50",
              {
                "radio-error": error
              }
            )}
            {...props}
          />
          {label && (
            <span className="label-text">{label}</span>
          )}
        </label>
      </div>
    );
  }
);

Radio.displayName = "Radio"; 