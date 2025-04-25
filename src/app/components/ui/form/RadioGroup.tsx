"use client";

import React, { forwardRef } from "react";
import { cn } from "@/app/lib/utils";
import { Radio } from "./Radio";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Name attribute for the radio inputs */
  name: string;
  /** Options for the radio group */
  options: RadioOption[];
  /** Selected value */
  value?: string;
  /** Error state - visually indicates invalid selection */
  error?: boolean;
  /** Handler for value changes */
  onChange?: (value: string) => void;
  /** Whether the radio inputs are disabled */
  disabled?: boolean;
  /** Direction for the radio options */
  direction?: 'horizontal' | 'vertical';
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    className, 
    name, 
    options, 
    value, 
    error, 
    onChange, 
    disabled = false,
    direction = 'vertical',
    ...props 
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          "flex",
          direction === 'horizontal' ? "flex-row gap-4" : "flex-col gap-1",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            id={`${name}-${option.value}`}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={handleChange}
            disabled={disabled || option.disabled}
            error={error}
          />
        ))}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup"; 