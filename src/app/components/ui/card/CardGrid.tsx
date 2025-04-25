"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /**
   * Number of columns at different breakpoints
   * Default: { sm: 1, md: 2, lg: 3, xl: 4 }
   */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /**
   * Gap between cards using Tailwind's gap utility classes
   * Default: 'gap-4' (equivalent to 1rem)
   * Example values: 'gap-2', 'gap-6', 'gap-x-4 gap-y-2'
   */
  gap?: string;
}

export function CardGrid({
  children,
  className,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "gap-4",
  ...props
}: CardGridProps) {
  // Convert columns to Tailwind grid classes
  const getGridClass = () => {
    const { sm = 1, md = 2, lg = 3, xl = 4 } = columns;
    
    // Ensure column values are within a valid range (1-12)
    const validateColumns = (val: number) => val > 0 && val <= 12;
    
    // Define mappings for grid column classes
    const gridColumnsMap: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      7: "grid-cols-7",
      8: "grid-cols-8",
      9: "grid-cols-9",
      10: "grid-cols-10",
      11: "grid-cols-11",
      12: "grid-cols-12"
    };
    
    const smGridColumnsMap: Record<number, string> = {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      6: "sm:grid-cols-6",
      7: "sm:grid-cols-7",
      8: "sm:grid-cols-8",
      9: "sm:grid-cols-9",
      10: "sm:grid-cols-10",
      11: "sm:grid-cols-11",
      12: "sm:grid-cols-12"
    };
    
    const mdGridColumnsMap: Record<number, string> = {
      1: "md:grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-3",
      4: "md:grid-cols-4",
      5: "md:grid-cols-5",
      6: "md:grid-cols-6",
      7: "md:grid-cols-7",
      8: "md:grid-cols-8",
      9: "md:grid-cols-9",
      10: "md:grid-cols-10",
      11: "md:grid-cols-11",
      12: "md:grid-cols-12"
    };
    
    const lgGridColumnsMap: Record<number, string> = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
      7: "lg:grid-cols-7",
      8: "lg:grid-cols-8",
      9: "lg:grid-cols-9",
      10: "lg:grid-cols-10",
      11: "lg:grid-cols-11",
      12: "lg:grid-cols-12"
    };
    
    const xlGridColumnsMap: Record<number, string> = {
      1: "xl:grid-cols-1",
      2: "xl:grid-cols-2",
      3: "xl:grid-cols-3",
      4: "xl:grid-cols-4",
      5: "xl:grid-cols-5",
      6: "xl:grid-cols-6",
      7: "xl:grid-cols-7",
      8: "xl:grid-cols-8",
      9: "xl:grid-cols-9",
      10: "xl:grid-cols-10",
      11: "xl:grid-cols-11",
      12: "xl:grid-cols-12"
    };
    
    return [
      gridColumnsMap[1], // Default is always grid-cols-1
      validateColumns(sm) && smGridColumnsMap[sm],
      validateColumns(md) && mdGridColumnsMap[md],
      validateColumns(lg) && lgGridColumnsMap[lg],
      validateColumns(xl) && xlGridColumnsMap[xl],
    ].filter(Boolean).join(" ");
  };

  return (
    <div
      className={cn(
        "grid w-full",
        getGridClass(),
        gap,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 