"use client";

import { cn } from "@/lib/utils";

interface SkipToContentProps {
  contentId?: string;
  className?: string;
  text?: string;
}

export function SkipToContent({
  contentId = "main-content",
  className,
  text = "Skip to content",
}: SkipToContentProps) {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:left-0 focus:top-0 focus:z-50 focus:block focus:bg-primary focus:p-4 focus:text-primary-content",
        className
      )}
    >
      {text}
    </a>
  );
} 