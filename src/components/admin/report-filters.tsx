"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { reportPeriods, reportTypes } from "@/lib/admin/reports";
import type { ReportPeriod, ReportType } from "@/lib/types";

export function ReportFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeType = (searchParams.get("type") as ReportType | null) ?? "belegg";
  const activePeriod = (searchParams.get("period") as ReportPeriod | null) ?? "90d";

  function hrefFor(next: Partial<{ type: ReportType; period: ReportPeriod }>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", next.type ?? activeType);
    params.set("period", next.period ?? activePeriod);
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        {reportPeriods.map((period) => (
          <Link
            key={period.id}
            href={hrefFor({ period: period.id })}
            className={cn(
              "inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold transition",
              activePeriod === period.id
                ? "bg-slate-950 text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
            )}
          >
            {period.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {reportTypes.map((report) => (
          <Link
            key={report.id}
            href={hrefFor({ type: report.id })}
            className={cn(
              "rounded-2xl border p-4 transition",
              activeType === report.id
                ? "border-sky-900 bg-sky-950 text-white"
                : "border-slate-200 bg-white hover:border-slate-300",
            )}
          >
            <p className="font-semibold">{report.label}</p>
            <p
              className={cn(
                "mt-1 text-sm leading-6",
                activeType === report.id ? "text-white/75" : "text-slate-600",
              )}
            >
              {report.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
