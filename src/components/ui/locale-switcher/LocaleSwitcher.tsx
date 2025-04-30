"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useT } from "@/app/lib/i18n-context";
import { locales, Locale, defaultLocale } from "@/constants/i18n";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current locale from pathname with validation and fallback
  const currentLocale = (() => {
    // Split pathname and filter out empty segments
    const segments = pathname.split('/').filter(Boolean);
    // Get the first segment as a candidate locale
    const candidateLocale = segments[0];
    
    // Check if candidate is a valid locale
    if (candidateLocale && locales.includes(candidateLocale as Locale)) {
      return candidateLocale as Locale;
    }
    
    // Fall back to default locale if no valid locale is found
    return defaultLocale;
  })();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Replace the locale segment in the current pathname
  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Handle different URL structures
    const segments = pathname.split('/').filter(Boolean);
    let newPath = '';
    
    if (segments.length === 0) {
      // If we're at the root path
      newPath = `/${locale}`;
    } else if (locales.includes(segments[0] as Locale)) {
      // If first segment is a valid locale, replace it
      segments[0] = locale;
      newPath = `/${segments.join('/')}`;
    } else {
      // If first segment is not a locale, insert the locale at the beginning
      newPath = `/${locale}/${segments.join('/')}`;
    }
    
    // Navigate to the new path
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="dropdown dropdown-end" ref={dropdownRef}>
      <button
        className="btn btn-ghost btn-sm capitalize"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t("language.switchLanguage")}
      >
        <span>{t(`language.${currentLocale}`)}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn("ml-1 w-4 h-4 transition-transform", isOpen ? "transform rotate-180" : "")}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <div
        className={cn(
          "dropdown-content bg-base-100 text-base-content rounded-box mt-1 shadow-lg p-2",
          "w-40 transition-all",
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        <ul className="menu menu-sm">
          {locales.map((locale) => (
            <li key={locale}>
              <button
                onClick={() => switchLocale(locale)}
                className={cn(
                  "px-4 py-2 text-sm hover:bg-base-200 rounded-lg",
                  locale === currentLocale ? "bg-primary/10 text-primary font-medium" : ""
                )}
                aria-current={locale === currentLocale ? "true" : "false"}
              >
                {t(`language.${locale}`)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 