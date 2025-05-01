import React from 'react';
import Link from 'next/link';
import type { Locale } from "@/constants/i18n";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface FooterProps {
  lang: Locale;
}

export async function Footer({ lang }: FooterProps) {
  // Load the dictionary for the current locale
  const dictionary = await getDictionary(lang as Locale);
  
  return (
    <footer className="footer bg-base-200 text-base-content py-6" aria-label="Site footer">
      <div className="w-full ml-0 mr-auto px-12 md:px-12 lg:px-12">
        {/* Navigation Links */}
        <nav aria-label="Footer navigation" className="mb-4 md:mb-0">
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <Link 
                href={`/${lang}/about`} 
                className="link link-hover text-base font-medium" 
                aria-label="About page"
              >
                {dictionary.footer.about}
              </Link>
            </li>
            <li>
              <Link 
                href={`/${lang}/contact`} 
                className="link link-hover text-base font-medium" 
                aria-label="Contact page"
              >
                {dictionary.footer.contact}
              </Link>
            </li>
          </ul>
        </nav>
        
      </div>
    </footer>
  );
} 