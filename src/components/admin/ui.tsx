import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const adminInputClass =
  "block h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10";

export const adminTextareaClass =
  "block w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm leading-6 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10";

export const adminLabelClass = "text-xs font-semibold uppercase tracking-wide text-slate-500";

export function FormSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-slate-200 bg-slate-50/80 p-5", className)}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("grid gap-2", className)}>
      <span className={adminLabelClass}>{label}</span>
      {children}
      {hint ? <span className="text-xs leading-5 text-slate-500">{hint}</span> : null}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(adminInputClass, props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(adminTextareaClass, props.className)} />;
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(adminInputClass, props.className)} />;
}

export function CheckboxField({
  label,
  description,
  defaultChecked,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-0.5 size-4 shrink-0 rounded border-slate-300 text-sky-900 focus:ring-sky-900/20"
      />
      <span>
        <span className="block text-sm font-semibold text-slate-950">{label}</span>
        {description ? (
          <span className="mt-1 block text-sm leading-6 text-slate-600">{description}</span>
        ) : null}
      </span>
    </label>
  );
}

export function SaveButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      {label}
    </button>
  );
}

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
