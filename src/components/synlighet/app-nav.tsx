"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Bot,
  CircleDollarSign,
  CreditCard,
  Database,
  FileCheck2,
  FileText,
  Gauge,
  Globe2,
  Home,
  Link2,
  MapPin,
  Search,
  Settings,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: LucideIcon };
type NavGroup = { label: string; items: NavItem[] };

const appGroups: NavGroup[] = [
  {
    label: "Oversikt",
    items: [
      { href: "/synlighet/app/dashboard", label: "Dashboard", icon: Home },
      { href: "/synlighet/app/ordliste", label: "Ordliste", icon: BookOpen },
    ],
  },
  {
    label: "Analyse",
    items: [
      { href: "/synlighet/app/actions", label: "Tiltak", icon: Gauge },
      { href: "/synlighet/app/pages", label: "Sider", icon: Globe2 },
      { href: "/synlighet/app/queries", label: "Søkeord", icon: Search },
      { href: "/synlighet/app/paid-ads", label: "Annonser", icon: CircleDollarSign },
      { href: "/synlighet/app/aeo", label: "AI-synlighet", icon: Bot },
      { href: "/synlighet/app/local", label: "Lokal synlighet", icon: MapPin },
    ],
  },
  {
    label: "Levering",
    items: [
      { href: "/synlighet/app/reports", label: "Rapporter", icon: FileText },
      { href: "/synlighet/app/integrations", label: "Integrasjoner", icon: Link2 },
      { href: "/synlighet/app/settings", label: "Innstillinger", icon: Settings },
    ],
  },
];

const adminGroups: NavGroup[] = [
  {
    label: "Oversikt",
    items: [{ href: "/synlighet/admin", label: "Admin", icon: ShieldCheck }],
  },
  {
    label: "Kunder",
    items: [
      { href: "/synlighet/admin/leads", label: "Leads", icon: UserPlus },
      { href: "/synlighet/admin/customers", label: "Kunder", icon: Users },
      { href: "/synlighet/admin/sites", label: "Sites", icon: Globe2 },
    ],
  },
  {
    label: "Drift",
    items: [
      { href: "/synlighet/admin/actions", label: "Tiltak QA", icon: FileCheck2 },
      { href: "/synlighet/admin/data", label: "Datainnhenting", icon: Database },
      { href: "/synlighet/admin/reports", label: "Rapportkontroll", icon: FileText },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/synlighet/admin/ai-usage", label: "AI-kostnader", icon: BarChart3 },
      { href: "/synlighet/admin/integrations", label: "Integrasjoner", icon: Link2 },
      { href: "/synlighet/admin/billing", label: "Abonnement", icon: CreditCard },
      { href: "/synlighet/admin/logs", label: "Feil/logger", icon: Bot },
    ],
  },
];

function useIsActive() {
  const pathname = usePathname();

  return (href: string) => {
    if (pathname === href) return true;
    // Exact-root items (e.g. /synlighet/admin) should not match every subpage.
    if (href.endsWith("/admin")) return pathname === href;
    return pathname.startsWith(`${href}/`);
  };
}

export function SidebarNav({ admin = false }: { admin?: boolean }) {
  const groups = admin ? adminGroups : appGroups;
  const isActive = useIsActive();

  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            {group.label}
          </p>
          <div className="space-y-1">
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  )}
                >
                  <item.icon size={17} className={active ? "text-white" : "text-slate-400"} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function MobileNav({ admin = false }: { admin?: boolean }) {
  const groups = admin ? adminGroups : appGroups;
  const isActive = useIsActive();
  const items = groups.flatMap((group) => group.items);

  return (
    <nav className="flex gap-2 overflow-x-auto px-4 pb-3">
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
