"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/app/components/ui/theme-toggle";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/lib/hooks/use-auth";
import LanguageToggle from "@/app/language-toggle";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, className, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname?.startsWith(`${href}/`);

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
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => setIsOpen(prev => !prev);

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
    <header className={cn("bg-base-100 shadow-sm", className)}>
      <div className="w-full px-6 md:px-6 lg:px-8 mx-auto">
        <div className="navbar">
          {/* Navbar Start - Logo and Mobile Menu */}
          <div className="navbar-start">
            {/* Mobile Menu Dropdown */}
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-ghost min-h-12 min-w-12 h-12 w-12 rounded-full lg:hidden"
                ref={menuButtonRef}
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h8m-8 6h16" 
                  />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </button>
              <ul
                id="mobile-menu"
                ref={menuRef}
                tabIndex={0}
                className={cn(
                  "menu menu-sm dropdown-content mt-3 z-[100] p-4 shadow-lg bg-base-100 rounded-box",
                  "w-72 max-h-[80vh] overflow-y-auto transition-opacity duration-200",
                  isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                data-show={isOpen}
              >
                {isAuthenticated && (
                  <li key="hello-world-mobile" className="py-1">
                    <NavLink 
                      href="/helloworld" 
                      onClick={() => setIsOpen(false)}
                      className="py-3 px-4"
                    >
                      Hello World
                    </NavLink>
                  </li>
                )}
                <li className="menu-title pt-3" key="examples-mobile">
                  <span className="text-base font-medium">Examples</span>
                  <ul className="p-2 space-y-1">
                    <li key="buttons-mobile">
                      <NavLink 
                        href="/examples/buttons" 
                        onClick={() => setIsOpen(false)}
                        className="py-3 px-4"
                      >
                        Buttons
                      </NavLink>
                    </li>
                    <li key="cards-mobile">
                      <NavLink 
                        href="/examples/cards" 
                        onClick={() => setIsOpen(false)}
                        className="py-3 px-4"
                      >
                        Cards
                      </NavLink>
                    </li>
                    <li key="typography-mobile">
                      <NavLink 
                        href="/examples/typography" 
                        onClick={() => setIsOpen(false)}
                        className="py-3 px-4"
                      >
                        Typography
                      </NavLink>
                    </li>
                    <li key="layout-mobile">
                      <NavLink 
                        href="/examples/layout" 
                        onClick={() => setIsOpen(false)}
                        className="py-3 px-4"
                      >
                        Layout
                      </NavLink>
                    </li>
                    <li key="navigation-mobile">
                      <NavLink 
                        href="/examples/navigation" 
                        onClick={() => setIsOpen(false)}
                        className="py-3 px-4"
                      >
                        Navigation
                      </NavLink>
                    </li>
                    <li key="daisyui-mobile">
                      <NavLink 
                        href="/examples/daisyui" 
                        onClick={() => setIsOpen(false)}
                        className="py-3 px-4"
                      >
                        DaisyUI
                      </NavLink>
                    </li>
                    <li key="i18n-demo-mobile">
                      <NavLink 
                        href="/i18n-demo" 
                        onClick={() => setIsOpen(false)}
                        className="py-3 px-4"
                      >
                        i18n Demo
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li key="auth-mobile" className="mt-6 pb-3 border-t border-base-300 pt-3">
                  <div className="flex justify-center">
                    <UserMenu />
                  </div>
                </li>
                <li key="theme-toggle-mobile" className="mt-4 flex justify-center">
                  <ThemeToggle />
                </li>
                <li key="language-toggle-mobile" className="mt-2 flex justify-center">
                  <LanguageToggle />
                </li>
              </ul>
            </div>
            
            {/* Left navigation items - Desktop */}
            <div className="hidden lg:flex">
              <ul className="menu menu-horizontal gap-2">
                <li key="home-desktop">
                  <NavLink href="/">
                    Home
                  </NavLink>
                </li>
                <li key="examples-desktop">
                  <details>
                    <summary className="text-base font-medium">Examples</summary>
                    <ul className="p-2 bg-base-100 z-[1]">
                      <li key="buttons">
                        <NavLink href="/examples/buttons">
                          Buttons
                        </NavLink>
                      </li>
                      <li key="cards">
                        <NavLink href="/examples/cards">
                          Cards
                        </NavLink>
                      </li>
                      <li key="typography">
                        <NavLink href="/examples/typography">
                          Typography
                        </NavLink>
                      </li>
                      <li key="layout">
                        <NavLink href="/examples/layout">
                          Layout
                        </NavLink>
                      </li>
                      <li key="navigation">
                        <NavLink href="/examples/navigation">
                          Navigation
                        </NavLink>
                      </li>
                      <li key="daisyui">
                        <NavLink href="/examples/daisyui">
                          DaisyUI
                        </NavLink>
                      </li>
                      <li key="i18n-demo">
                        <NavLink href="/i18n-demo">
                          i18n Demo
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
                {isAuthenticated && (
                  <li key="hello-world-desktop">
                    <NavLink href="/helloworld">
                      Hello World
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          {/* Navbar End - Auth, Theme, etc. */}
          <div className="navbar-end gap-2">
            {isAuthenticated && (
              <div className="hidden md:flex">
                <NavLink href="/helloworld" className="btn btn-ghost">
                  Hello World
                </NavLink>
              </div>
            )}
            
            <div className="hidden md:flex md:items-center md:gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
} 