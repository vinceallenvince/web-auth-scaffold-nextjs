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
   * Gap between cards in pixels or any CSS value
   * Default: 'gap-4'
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
    
    return [
      `grid-cols-1`,
      sm > 0 && `sm:grid-cols-${sm}`,
      md > 0 && `md:grid-cols-${md}`,
      lg > 0 && `lg:grid-cols-${lg}`,
      xl > 0 && `xl:grid-cols-${xl}`,
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