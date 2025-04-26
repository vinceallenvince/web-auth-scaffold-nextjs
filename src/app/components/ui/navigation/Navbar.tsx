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
  logo?: React.ReactNode;
  className?: string;
}

export function Navbar({ logo, className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
      <div className="container mx-auto">
        <div className="navbar">
          {/* Navbar Start - Logo and Mobile Menu */}
          <div className="navbar-start">
            {/* Mobile Menu Dropdown */}
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-ghost lg:hidden"
                ref={menuButtonRef}
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h8m-8 6h16" 
                  />
                </svg>
              </button>
              <ul
                id="mobile-menu"
                ref={menuRef}
                tabIndex={0}
                className={cn(
                  "menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52",
                  isOpen ? "block" : "hidden"
                )}
              >
                <li>
                  <NavLink href="/helloworld" onClick={() => setIsOpen(false)}>
                    Hello World
                  </NavLink>
                </li>
                <li className="menu-title">
                  <span>Examples</span>
                  <ul className="p-2">
                    <li>
                      <NavLink href="/examples/buttons" onClick={() => setIsOpen(false)}>
                        Buttons
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/cards" onClick={() => setIsOpen(false)}>
                        Cards
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/typography" onClick={() => setIsOpen(false)}>
                        Typography
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/layout" onClick={() => setIsOpen(false)}>
                        Layout
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/navigation" onClick={() => setIsOpen(false)}>
                        Navigation
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/daisyui" onClick={() => setIsOpen(false)}>
                        DaisyUI
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            
            {/* Logo */}
            <div className="flex items-center">
              {logo ? (
                logo
              ) : (
                <Link href="/" className="btn btn-ghost text-xl">
                  AppName
                </Link>
              )}
            </div>
          </div>
          
          {/* Navbar Center - Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink href="/helloworld">
                  Hello World
                </NavLink>
              </li>
              <li>
                <details>
                  <summary className="text-base font-medium">Examples</summary>
                  <ul className="p-2 bg-base-100 z-[1]">
                    <li>
                      <NavLink href="/examples/buttons">
                        Buttons
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/cards">
                        Cards
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/typography">
                        Typography
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/layout">
                        Layout
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/navigation">
                        Navigation
                      </NavLink>
                    </li>
                    <li>
                      <NavLink href="/examples/daisyui">
                        DaisyUI
                      </NavLink>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          
          {/* Navbar End - Additional Controls */}
          <div className="navbar-end">
            <Link href="/dashboard" className="btn">Dashboard</Link>
          </div>
        </div>
      </div>
    </header>
  );
} 