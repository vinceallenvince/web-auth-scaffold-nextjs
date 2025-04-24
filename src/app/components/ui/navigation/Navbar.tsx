"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, className, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-base font-medium transition-colors duration-200",
        isActive
          ? "text-primary font-semibold"
          : "text-base-content/80 hover:text-base-content",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

interface NavbarProps {
  logo?: React.ReactNode;
  className?: string;
}

export function Navbar({ logo, className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Handle focus management when opening/closing the menu
  useEffect(() => {
    if (isOpen && menuRef.current) {
      // Focus the first focusable element in the menu
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    } else if (!isOpen && menuButtonRef.current) {
      // Return focus to the menu button when closing
      menuButtonRef.current.focus();
    }
  }, [isOpen]);

  // Handle clicks outside of the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className={cn("bg-base-100", className)}>
      <div className="container mx-auto px-4">
        <div className="navbar py-4">
          {/* Logo & Brand */}
          <div className="navbar-start">
            <div className="flex items-center">
              {logo ? (
                logo
              ) : (
                <Link href="/" className="text-xl font-bold">
                  AppName
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal space-x-6 p-0">
              <li>
                <NavLink href="/">Home</NavLink>
              </li>
              <li>
                <NavLink href="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink href="/about">About</NavLink>
              </li>
            </ul>
          </div>

          {/* Right Side Items */}
          <div className="navbar-end">
            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                ref={menuButtonRef}
                type="button"
                className="btn btn-ghost"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop for mobile menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation Drawer */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={cn(
            "fixed inset-y-0 right-0 z-50 w-full max-w-xs transform overflow-auto bg-base-100 p-4 shadow-lg transition-transform duration-300 lg:hidden",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn-ghost p-2"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-8 flex flex-col space-y-4">
            <NavLink
              href="/"
              className="block px-4 py-2 text-lg"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              href="/dashboard"
              className="block px-4 py-2 text-lg"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              href="/about"
              className="block px-4 py-2 text-lg"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
} 