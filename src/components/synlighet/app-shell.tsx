import Link from "next/link";
import type { ReactNode } from "react";
import {
  BarChart3,
  Bot,
  CircleDollarSign,
  FileText,
  Gauge,
  Globe2,
  Home,
  Link2,
  MapPin,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { visibilityOrganization, visibilitySite } from "@/lib/synlighet/demo-data";

const appNav = [
  { href: "/synlighet/app/dashboard", label: "Dashboard", icon: Home },
  { href: "/synlighet/app/actions", label: "Tiltak", icon: Gauge },
  { href: "/synlighet/app/pages", label: "Sider", icon: Globe2 },
  { href: "/synlighet/app/queries", label: "Søkeord", icon: Search },
  { href: "/synlighet/app/paid-ads", label: "Annonser", icon: CircleDollarSign },
  { href: "/synlighet/app/aeo", label: "AEO / AI-synlighet", icon: Bot },
  { href: "/synlighet/app/local", label: "Lokal synlighet", icon: MapPin },
  { href: "/synlighet/app/reports", label: "Rapporter", icon: FileText },
  { href: "/synlighet/app/integrations", label: "Integrasjoner", icon: Link2 },
  { href: "/synlighet/app/settings", label: "Innstillinger", icon: Settings },
];

const adminNav = [
  { href: "/synlighet/admin", label: "Admin", icon: ShieldCheck },
  { href: "/synlighet/admin/customers", label: "Kunder", icon: Home },
  { href: "/synlighet/admin/sites", label: "Sites", icon: Globe2 },
  { href: "/synlighet/admin/actions", label: "Tiltak QA", icon: Gauge },
  { href: "/synlighet/admin/data", label: "Datainnhenting", icon: Search },
  { href: "/synlighet/admin/reports", label: "Rapportkontroll", icon: FileText },
  { href: "/synlighet/admin/ai-usage", label: "AI-kostnader", icon: BarChart3 },
  { href: "/synlighet/admin/integrations", label: "Integrasjoner", icon: Link2 },
  { href: "/synlighet/admin/billing", label: "Abonnement", icon: Settings },
  { href: "/synlighet/admin/logs", label: "Feil/logger", icon: Bot },
];

export function VisibilityAppShell({
  children,
  title,
  description,
  admin = false,
}: {
  children: ReactNode;
  title: string;
  description?: string;
  admin?: boolean;
}) {
  const nav = admin ? adminNav : appNav;

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-950">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="border-b border-slate-200 px-5 py-5">
          <Link href="/synlighet" className="flex items-center gap-3 font-semibold">
            <span className="grid size-9 place-items-center rounded-2xl bg-slate-950 text-sm text-white">
              S
            </span>
            Synlighetsassistenten
          </Link>
          <p className="mt-4 text-sm font-semibold">{visibilityOrganization.name}</p>
          <p className="mt-1 text-xs text-slate-500">{visibilitySite.domain}</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              <item.icon size={17} className="text-slate-400" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <Link
            href={admin ? "/synlighet/app/dashboard" : "/synlighet/admin"}
            className="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          >
            <ShieldCheck size={17} className="text-slate-400" />
            {admin ? "Til kundepanel" : "Til admin"}
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/synlighet" className="font-semibold">
              Synlighetsassistenten
            </Link>
            <Link href={admin ? "/synlighet/app/dashboard" : "/synlighet/admin"} className="text-sm font-semibold text-sky-900">
              {admin ? "Kundepanel" : "Admin"}
            </Link>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <main className="px-5 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-800">
                {admin ? "Internt adminpanel" : visibilitySite.name}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{title}</h1>
              {description ? <p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p> : null}
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
