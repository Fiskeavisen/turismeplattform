"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BedDouble,
  CalendarCheck,
  CalendarDays,
  Compass,
  FileText,
  LineChart,
  MessageSquareQuote,
  Paintbrush,
  Settings,
  ShoppingBag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { href: "/admin", label: "Oversikt", icon: BarChart3 },
  { href: "/admin/bookinger", label: "Bookinger", icon: CalendarCheck },
  { href: "/admin/kalender", label: "Kalender", icon: CalendarDays },
  { href: "/admin/rapporter", label: "Rapporter", icon: LineChart },
  { href: "/admin/overnatting", label: "Overnatting", icon: BedDouble },
  { href: "/admin/aktiviteter", label: "Aktiviteter", icon: Compass },
  { href: "/admin/tilvalg", label: "Tilvalg", icon: ShoppingBag },
  { href: "/admin/omtaler", label: "Omtaler", icon: MessageSquareQuote },
  { href: "/admin/innhold", label: "Innhold", icon: FileText },
  { href: "/admin/design", label: "Design", icon: Paintbrush },
  { href: "/admin/innstillinger", label: "Innstillinger", icon: Settings },
];

export function AdminNav({ variant }: { variant: "sidebar" | "topbar" }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        variant === "sidebar" && "grid gap-1",
        variant === "topbar" && "flex gap-1 overflow-x-auto px-4 py-2",
      )}
    >
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition",
              variant === "topbar" && "shrink-0",
              active
                ? "bg-sky-950 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
            )}
          >
            <Icon size={17} className={active ? "text-amber-200" : "text-slate-400"} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
