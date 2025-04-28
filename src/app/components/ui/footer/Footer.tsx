import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer p-6 bg-base-200 text-base-content" aria-label="Site footer">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col md:flex-row md:justify-between items-start">
        {/* Navigation Links */}
        <nav aria-label="Footer navigation" className="mb-4 md:mb-0">
          <ul className="flex flex-col md:flex-row gap-4">
            <li>
              <Link 
                href="/about" 
                className="link link-hover text-base font-medium" 
                aria-label="About page"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="link link-hover text-base font-medium" 
                aria-label="Contact page"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Copyright */}
        <div className="mt-2 md:mt-0">
          <p className="text-sm">© {currentYear} Web Auth Scaffold App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 