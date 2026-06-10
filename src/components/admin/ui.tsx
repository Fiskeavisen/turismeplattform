import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.02em]">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      {action ? (
        <button className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800">
          <Plus size={16} /> {action}
        </button>
      ) : null}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200", className)}>
      {title || action ? (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title ? <h2 className="text-lg font-semibold">{title}</h2> : <span />}
          {action ? (
            <button className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-50">
              <Plus size={15} /> {action}
            </button>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function StatusPill({ active, labels }: { active: boolean; labels?: [string, string] }) {
  const [onLabel, offLabel] = labels ?? ["Aktiv", "Skjult"];

  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600",
      )}
    >
      {active ? onLabel : offLabel}
    </span>
  );
}
