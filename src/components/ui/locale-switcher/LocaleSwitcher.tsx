"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useT } from "@/app/lib/i18n-context";
import { locales, Locale } from "@/constants/i18n";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current locale from pathname
  const currentLocale = pathname.split("/")[1] as Locale;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Replace the locale segment in the current pathname
  const switchLocale = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Get path segments and replace the locale segment
    const segments = pathname.split("/");
    segments[1] = locale;
    
    // Join the segments back together
    const newPath = segments.join("/");
    
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