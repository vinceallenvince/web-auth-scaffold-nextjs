import React from 'react';
import Link from 'next/link';

export function Footer() {
  
  return (
    <footer className="footer bg-base-200 text-base-content py-6" aria-label="Site footer">
      <div className="w-full mx-auto px-6 md:px-6 lg:px-8">
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
        
      </div>
    </footer>
  );
} 