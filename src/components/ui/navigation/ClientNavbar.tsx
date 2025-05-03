"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/lib/hooks/use-auth";
import { NavigationTranslations } from "./types";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, className, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  
  const isLinkActive = (pathname: string | null, href: string): boolean => {
    // Extract the actual path
    const actualPath = pathname?.replace(/^\/[^\/]+/, '') || '';
    
    // For the home page (root)
    const isHome = href === '/' && (actualPath === '' || actualPath === '/');
    
    // For other pages
    return isHome || (href !== '/' && (actualPath === href || actualPath?.startsWith(`${href}/`)));
  }
  
  // Extract the locale for href generation
  const pathParts = pathname?.split('/') || [];
  const locale = pathParts.length > 1 ? pathParts[1] : '';
  const isActive = isLinkActive(pathname, href);

  // Include the current locale in the href if it exists
  const localizedHref = locale ? `/${locale}${href}` : href;

  return (
    <Link
      href={localizedHref}
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

interface ClientNavbarProps {
  className?: string;
  translations: NavigationTranslations;
}

export default function ClientNavbar({ className, translations }: ClientNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { isAuthenticated } = useAuth();

  // Define menu items for both mobile and desktop menus
  const menuItems = [
    { key: 'buttons', href: '/examples/buttons', label: translations.buttons },
    { key: 'cards', href: '/examples/cards', label: translations.cards },
    { key: 'typography', href: '/examples/typography', label: translations.typography },
    { key: 'layout', href: '/examples/layout', label: translations.layout },
    { key: 'daisyui', href: '/examples/daisyui', label: translations.daisyui || 'DaisyUI' },
    { key: 'toast', href: '/examples/toast', label: translations.toast || 'Toast' },
  ];

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
      <div className="w-full px-6 md:px-6 lg:px-8 ml-0 mr-auto">
        <div className="navbar px-0">
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
                      {translations.helloWorld}
                    </NavLink>
                  </li>
                )}
                <li className="menu-title pt-3" key="examples-mobile">
                  <span className="text-base font-medium">{translations.examples}</span>
                  <ul className="p-2 space-y-1">
                    {menuItems.map(item => (
                      <li key={`${item.key}-mobile`}>
                        <NavLink 
                          href={item.href} 
                          onClick={() => setIsOpen(false)}
                          className="py-3 px-4"
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
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
                <li key="locale-switcher-mobile" className="mt-4 flex justify-center">
                  <LocaleSwitcher />
                </li>
              </ul>
            </div>
            
            {/* Left navigation items - Desktop */}
            <div className="hidden lg:flex">
              <ul className="menu menu-horizontal gap-2 ml-0 pl-0">
                <li key="home-desktop">
                  <NavLink href="/">
                    Home
                  </NavLink>
                </li>
                <li key="examples-desktop">
                  <details>
                    <summary className="text-base font-medium">{translations.examples}</summary>
                    <ul className="p-2 bg-base-100 z-[1]">
                      {menuItems.map(item => (
                        <li key={item.key}>
                          <NavLink href={item.href}>
                            {item.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
                {isAuthenticated && (
                  <li key="hello-world-desktop">
                    <NavLink href="/helloworld">
                      {translations.helloWorld}
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          {/* Navbar End - Additional Controls */}
          <div className="navbar-end">
            <div key="locale-switcher-desktop" className="hidden sm:block mr-4">
              <LocaleSwitcher />
            </div>
            <div className="hidden sm:block mr-4">
              <ThemeToggle aria-label={translations.toggleTheme} />
            </div>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
} 