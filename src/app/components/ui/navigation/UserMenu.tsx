"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";
import { LogOut, User } from "lucide-react";

export function UserMenu() {
  const { isAuthenticated, isLoading, session, login, logout } = useAuth();

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
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
      >
        Login
      </Link>
    );
  }

  // User is authenticated, show dropdown menu
  return (
    <div className="dropdown dropdown-end">
      <div 
        tabIndex={0} 
        role="button" 
        className="btn btn-ghost flex items-center gap-2 focus:outline-none"
        aria-label="User menu"
        aria-haspopup="true"
      >
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-8">
            <span className="text-xs">
              {session?.user?.email?.[0].toUpperCase() || "U"}
            </span>
          </div>
        </div>
        <span className="hidden md:inline-block">
          {session?.user?.email?.split('@')[0] || "User"}
        </span>
      </div>
      <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link href="/dashboard" className="flex items-center gap-2">
            <User size={16} />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <button 
            onClick={() => logout()} 
            className="flex items-center gap-2 text-error"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
} 