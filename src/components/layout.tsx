"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FilePlus,
  History,
  FileSearch,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/new-assessment", label: "New Assessment", icon: FilePlus },
  { href: "/history", label: "History", icon: History },
  { href: "/detail/RA-2024-0087", label: "Detail", icon: FileSearch },
  { href: "/sop", label: "SOP Documents", icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-sidebar overflow-y-auto border-r border-sidebar-border">
      <nav className="p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href.split("/").slice(0, 2).join("/")));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function Header() {
  return (
    <header className="bg-card sticky top-0 z-40 h-14 flex items-center justify-between px-6 border-b border-border">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-primary" />
        <span className="font-serif font-bold text-lg tracking-tight">
          Risk Assessment Agent
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
            赫
          </div>
          <span className="text-sm text-muted-foreground">小赫</span>
        </div>
      </div>
    </header>
  );
}
