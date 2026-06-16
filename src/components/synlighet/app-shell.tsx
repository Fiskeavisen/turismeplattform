import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftRight } from "lucide-react";
import { MobileNav, SidebarNav } from "@/components/synlighet/app-nav";
import { visibilityOrganization, visibilitySite } from "@/lib/synlighet/demo-data";

export function VisibilityAppShell({
  children,
  title,
  description,
  actions,
  admin = false,
}: {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
  admin?: boolean;
}) {
  const switchHref = admin ? "/synlighet/app/dashboard" : "/synlighet/admin";
  const switchLabel = admin ? "Til kundepanel" : "Til admin";

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
          <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5">
            <p className="text-sm font-semibold">{visibilityOrganization.name}</p>
            <p className="mt-0.5 text-xs text-slate-500">{visibilitySite.domain}</p>
          </div>
          {admin ? (
            <span className="mt-3 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
              Internt adminpanel
            </span>
          ) : null}
        </div>

        <SidebarNav admin={admin} />

        <div className="border-t border-slate-200 p-3">
          <Link
            href={switchHref}
            className="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
          >
            <ArrowLeftRight size={17} className="text-slate-400" />
            {switchLabel}
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/synlighet" className="font-semibold">
              Synlighetsassistenten
            </Link>
            <Link href={switchHref} className="text-sm font-semibold text-sky-900">
              {admin ? "Kundepanel" : "Admin"}
            </Link>
          </div>
          <MobileNav admin={admin} />
        </div>

        <main className="mx-auto max-w-6xl px-5 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-800">
                {admin ? "Internt adminpanel" : visibilitySite.name}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{title}</h1>
              {description ? <p className="mt-2 max-w-3xl leading-7 text-slate-600">{description}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
