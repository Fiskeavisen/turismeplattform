import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, CheckCircle2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PublicNavLinks } from "@/components/synlighet/public-nav";
import type { ActionStatus, Difficulty, IntegrationStatus, QaStatus } from "@/lib/synlighet/types";

export function SynlighetShell({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-[#f6f7fb] text-slate-950">{children}</main>;
}

export function SynlighetTopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/synlighet" className="flex items-center gap-3 font-semibold">
          <span className="grid size-9 place-items-center rounded-2xl bg-slate-950 text-sm text-white">
            S
          </span>
          <span>Synlighetsassistenten</span>
        </Link>
        <PublicNavLinks />
        <Link
          href="/synlighet/app/onboarding"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Koble til gratis
        </Link>
      </div>
    </header>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-800">{children}</p>
  );
}

export function MarketingSection({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-7xl px-5 py-16 lg:py-20", className)}>
      <div className="max-w-3xl">
        {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h2>
        {description ? <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm", className)}>
      {children}
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold",
        variant === "primary"
          ? "bg-slate-950 text-white hover:bg-slate-800"
          : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50",
      )}
    >
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-6 text-slate-700">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
      <span>{children}</span>
    </li>
  );
}

export function MetricCard({
  label,
  value,
  hint,
  tone = "neutral",
  icon: Icon,
  delta,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "neutral" | "positive" | "warning";
  icon?: LucideIcon;
  delta?: { value: string; direction: "up" | "down" };
}) {
  const DeltaIcon = delta?.direction === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
        {Icon ? (
          <span className="grid size-8 place-items-center rounded-lg bg-slate-100 text-slate-500">
            <Icon size={16} />
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <p
          className={cn(
            "text-3xl font-semibold tracking-[-0.03em] tabular-nums",
            tone === "positive" && "text-emerald-700",
            tone === "warning" && "text-amber-700",
          )}
        >
          {value}
        </p>
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold",
              delta.direction === "up" ? "text-emerald-700" : "text-rose-700",
            )}
          >
            <DeltaIcon size={13} />
            {delta.value}
          </span>
        ) : null}
      </div>
      {hint ? <p className="mt-1 text-sm text-slate-500">{hint}</p> : null}
    </Card>
  );
}

export function PriorityBadge({ score }: { score: number }) {
  const className =
    score >= 85
      ? "bg-rose-100 text-rose-800"
      : score >= 70
        ? "bg-amber-100 text-amber-800"
        : "bg-slate-100 text-slate-700";

  return <span className={cn("rounded-full px-3 py-1 text-xs font-bold", className)}>{score} / 100</span>;
}

export function StatusBadge({ status }: { status: ActionStatus | IntegrationStatus | QaStatus }) {
  const labels: Record<string, string> = {
    new: "Ikke startet",
    approved: "Godkjent",
    sent_to_cms: "Sendt til CMS",
    in_progress: "Pågår",
    completed: "Utført",
    measuring: "Måles",
    ignored: "Ignorert",
    failed: "Feilet",
    connected: "Tilkoblet",
    needs_setup: "Må settes opp",
    mocked: "Demo-data",
    error: "Feil",
    coming_soon: "Kommer",
    passed: "Bestått",
    needs_review: "Må vurderes",
    rejected: "Avvist",
  };

  const tone =
    status === "connected" || status === "completed" || status === "passed"
      ? "bg-emerald-100 text-emerald-800"
      : status === "new" || status === "needs_setup" || status === "needs_review" || status === "mocked"
        ? "bg-amber-100 text-amber-800"
        : status === "failed" || status === "error" || status === "rejected"
          ? "bg-rose-100 text-rose-800"
          : "bg-slate-100 text-slate-700";

  return <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", tone)}>{labels[status]}</span>;
}

export function DifficultyLabel({ difficulty }: { difficulty: Difficulty }) {
  const labels: Record<Difficulty, string> = {
    low: "Lav",
    medium: "Medium",
    high: "Høy",
  };

  return labels[difficulty];
}

export function formatPercent(value: number) {
  return `${(value * 100).toLocaleString("nb-NO", { maximumFractionDigits: 1 })} %`;
}

export function AppNotice() {
  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm leading-6 text-sky-900">
      Demoen kjører i mock mode. Google, AI, crawler og CMS-integrasjoner har service-lag/stubber og kan kobles til ekte nøkler senere.
    </div>
  );
}
