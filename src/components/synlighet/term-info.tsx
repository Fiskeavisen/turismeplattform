"use client";

import { useId, useState, type ReactNode } from "react";
import { getGlossaryTerm, getScoreBand, scoreScaleExplainer } from "@/lib/synlighet/glossary";
import { cn } from "@/lib/utils";

/**
 * Tekst med stiplet understrek som viser en forklaring i en tooltip ved hover/fokus/klikk.
 * Bruk: <TermLabel term="ctr">CTR</TermLabel>
 */
export function TermLabel({
  term,
  children,
  className,
}: {
  term: string;
  children?: ReactNode;
  className?: string;
}) {
  const entry = getGlossaryTerm(term);
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  if (!entry) {
    return <>{children ?? term}</>;
  }

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label={`Hva betyr ${entry.term}?`}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "cursor-help underline decoration-dotted decoration-slate-400 underline-offset-4 hover:decoration-slate-700",
          className,
        )}
      >
        {children ?? entry.term}
      </button>
      {open ? (
        <span
          role="tooltip"
          id={tooltipId}
          className="absolute left-0 top-full z-30 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-3 text-left text-xs font-normal leading-5 text-slate-600 shadow-lg"
        >
          <span className="block font-semibold text-slate-900">
            {entry.term} – {entry.name}
          </span>
          <span className="mt-1 block">{entry.short}</span>
          {entry.benchmark ? (
            <span className="mt-2 block text-slate-500">
              <span className="font-semibold text-slate-700">Standard: </span>
              {entry.benchmark}
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

const bandStyles: Record<string, string> = {
  weak: "bg-rose-100 text-rose-800",
  below: "bg-amber-100 text-amber-800",
  good: "bg-sky-100 text-sky-800",
  great: "bg-emerald-100 text-emerald-800",
  excellent: "bg-emerald-100 text-emerald-800",
};

/** Viser hva en score betyr: et merke med nivå + kort forklaring. */
export function ScoreMeaning({ score, className }: { score: number; className?: string }) {
  const band = getScoreBand(score);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className={cn("inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold", bandStyles[band.tone])}>
        {band.label}
      </span>
      <p className="text-xs leading-5 text-slate-500">{band.description}</p>
    </div>
  );
}

const scaleBands = [
  { range: "0–39", label: "Svak", tone: "weak" },
  { range: "40–59", label: "Under middels", tone: "below" },
  { range: "60–74", label: "God", tone: "good" },
  { range: "75–89", label: "Veldig god", tone: "great" },
  { range: "90–100", label: "Utmerket", tone: "excellent" },
];

/** Forklarer hele 0–100-skalaen. Brukes på ordliste-siden. */
export function ScoreScaleLegend() {
  return (
    <div>
      <p className="text-sm leading-6 text-slate-600">{scoreScaleExplainer}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {scaleBands.map((band) => (
          <li key={band.range} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <span
              className={cn("inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold", bandStyles[band.tone])}
            >
              {band.label}
            </span>
            <span className="text-sm font-medium tabular-nums text-slate-500">{band.range}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
