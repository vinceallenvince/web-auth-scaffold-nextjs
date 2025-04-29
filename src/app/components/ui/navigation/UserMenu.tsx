"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/app/providers/toast-provider";

export function UserMenu() {
  const { isAuthenticated, isLoading, session, login, logout } = useAuth();
  const { addToast } = useToast();

  if (isLoading) {
    // Return a skeleton loader while checking auth state
    return (
      <div className="flex items-center gap-2">
        <div className="h-9 w-24 bg-base-300 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Link
        href="/auth/magic-link"
        className="btn btn-primary min-h-12 h-12 px-5"
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <span className="text-base">Login</span>
      </Link>
    );
  }

  const handleLogout = () => {
    addToast("You have been signed out successfully.", "success");
    
    // Add a small delay to ensure the toast is displayed before redirect
    setTimeout(() => {
      logout({ callbackUrl: '/' });
    }, 500);
  };

  // User is authenticated, show dropdown menu
  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost min-h-12 h-12 flex items-center gap-2 focus:outline-none"
        aria-label="User menu"
        aria-haspopup="true"
      >
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
            <span className="text-sm">
              {session?.user?.email?.[0].toUpperCase() || "U"}
            </span>
          </div>
        </div>
        <span className="hidden md:inline-block">
          {session?.user?.email?.split('@')[0] || "User"}
        </span>
      </div>
      <ul tabIndex={0} className="dropdown-content z-10 menu p-3 shadow-lg bg-base-100 rounded-box w-60">
        <li>
          <Link href="/profile" className="flex items-center gap-2 py-3 px-4">
            <User size={18} />
            <span className="text-base">Profile</span>
          </Link>
        </li>
        <li>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-error py-3 px-4"
          >
            <LogOut size={18} />
            <span className="text-base">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
} 