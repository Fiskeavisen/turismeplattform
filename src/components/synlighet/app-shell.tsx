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
    <div className="flex min-h-screen bg-[#fbf4e8] text-stone-950">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-amber-200 bg-[#fff8ed] lg:flex">
        <div className="border-b border-amber-200 px-5 py-5">
          <Link href="/synlighet" className="flex items-center gap-3 font-semibold">
            <span className="grid size-9 rotate-[-3deg] place-items-center rounded-2xl bg-[#275444] text-sm text-amber-50 shadow-sm">
              S
            </span>
            Synlighetsassistenten
          </Link>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-[#fffdf7] px-3 py-2.5 shadow-sm shadow-amber-900/5">
            <p className="text-sm font-semibold">{visibilityOrganization.name}</p>
            <p className="mt-0.5 text-xs text-stone-500">{visibilitySite.domain}</p>
          </div>
          {admin ? (
            <span className="mt-3 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
              Internt adminpanel
            </span>
          ) : null}
        </div>

        <SidebarNav admin={admin} />

        <div className="border-t border-amber-200 p-3">
          <Link
            href={switchHref}
            className="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-stone-600 hover:bg-amber-100/70 hover:text-stone-950"
          >
            <ArrowLeftRight size={17} className="text-stone-400" />
            {switchLabel}
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 border-b border-amber-200 bg-[#fff8ed]/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/synlighet" className="font-semibold">
              Synlighetsassistenten
            </Link>
            <Link href={switchHref} className="text-sm font-semibold text-[#275444]">
              {admin ? "Kundepanel" : "Admin"}
            </Link>
          </div>
          <MobileNav admin={admin} />
        </div>

        <main className="mx-auto max-w-6xl px-5 py-8 lg:px-10">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a85f1a]">
                {admin ? "Internt adminpanel" : visibilitySite.name}
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{title}</h1>
              {description ? <p className="mt-2 max-w-3xl leading-7 text-stone-600">{description}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
