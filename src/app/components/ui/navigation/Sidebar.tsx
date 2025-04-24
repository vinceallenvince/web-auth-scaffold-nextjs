"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink = ({ href, label, icon, onClick }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-base-content/80 transition-colors hover:bg-base-200 hover:text-base-content",
        isActive && "bg-base-200 text-primary font-medium"
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
};

interface SidebarProps {
  className?: string;
  links?: SidebarLinkProps[];
  collapsible?: boolean;
}

export function Sidebar({
  className,
  links,
  collapsible = true,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const defaultLinks: SidebarLinkProps[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/profile", label: "Profile" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  const sidebarLinks = links || defaultLinks;

  return (
    <aside
      className={cn(
        "h-screen bg-base-100 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {!isCollapsed && <h2 className="text-xl font-bold">Dashboard</h2>}
            {collapsible && (
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="btn btn-ghost btn-sm"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
                    strokeWidth={2}
                    d={
                      isCollapsed
                        ? "M13 5l7 7-7 7M5 5l7 7-7 7"
                        : "M11 19l-7-7 7-7M19 19l-7-7 7-7"
                    }
                  />
                </svg>
              </button>
            )}
          </div>

          <nav className="flex flex-col space-y-1">
            {sidebarLinks.map((link) => (
              <SidebarLink
                key={link.href}
                href={link.href}
                label={isCollapsed ? "" : link.label}
                icon={link.icon}
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto">
          {!isCollapsed && (
            <div className="rounded-lg bg-base-200 p-4">
              <p className="text-sm text-base-content/70">
                Need help? Contact support
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
} 