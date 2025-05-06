"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CollapseIcon } from "../icons";

interface SidebarLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const SidebarLink = ({ href, label, icon, onClick }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = 
    pathname === href || 
    (pathname.startsWith(`${href}/`) && href !== '/');

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
    { href: "/", label: "Home" },
    { href: "/examples/typography", label: "Typography" },
  ];

  const sidebarLinks = links || defaultLinks;

  return (
    <aside
      className={cn(
        "h-screen bg-base-100 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
      role="navigation"
      aria-label="Main sidebar navigation"
    >
      <div className="flex h-full flex-col justify-between p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {!isCollapsed && <h2 className="text-xl font-bold">Navigation</h2>}
            {collapsible && (
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="btn btn-ghost btn-sm"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <CollapseIcon isCollapsed={isCollapsed} />
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