import { Suspense } from "react";
import { PageHeader, Panel } from "@/components/admin/ui";
import { ReportFilters } from "@/components/admin/report-filters";
import {
  formatReportAmount,
  formatReportPeriod,
  getActivityReport,
  getAddonReport,
  getOccupancyReport,
  getRevenueReport,
  getSourceReport,
  reportTypes,
} from "@/lib/admin/reports";
import type { ReportPeriod, ReportType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Rapporter | Admin" };

type PageProps = {
  searchParams: Promise<{ type?: ReportType; period?: ReportPeriod }>;
};

export default async function AdminReportsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const type = params.type ?? "belegg";
  const period = params.period ?? "90d";
  const activeReport = reportTypes.find((report) => report.id === type);

  const occupancy = getOccupancyReport();
  const revenue = getRevenueReport();
  const activities = getActivityReport();
  const addons = getAddonReport();
  const sources = getSourceReport();

  return (
    <>
      <PageHeader
        title="Rapporter"
        description="Nyttige rapporter for deg som driver overnatting: belegg, omsetning, aktiviteter, mersalg og bookingkilder."
        action="Eksporter PDF"
      />

      <Panel className="mb-6">
        <Suspense fallback={<p className="text-sm text-slate-600">Laster rapportfilter …</p>}>
          <ReportFilters />
        </Suspense>
      </Panel>

      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="rounded-full bg-slate-950 px-4 py-2 font-semibold text-white">
          {activeReport?.label ?? "Rapport"}
        </span>
        <span>{formatReportPeriod(period)}</span>
      </div>

      {type === "belegg" ? <OccupancyReport data={occupancy} /> : null}
      {type === "omsetning" ? <RevenueReport data={revenue} /> : null}
      {type === "aktiviteter" ? <ActivityReport data={activities} /> : null}
      {type === "mersalg" ? <AddonReport data={addons} /> : null}
      {type === "kilder" ? <SourceReport data={sources} /> : null}
    </>
  );
}

function OccupancyReport({
  data,
}: {
  data: ReturnType<typeof getOccupancyReport>;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
      <Panel title="Snittbelegg">
        <p className="text-5xl font-semibold tracking-[-0.03em]">{data.averageOccupancy}%</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Gjennomsnittlig belegg på alle aktive utleieenheter i valgt periode.
        </p>
        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-sky-700"
            style={{ width: `${data.averageOccupancy}%` }}
          />
        </div>
      </Panel>

      <Panel title="Belegg per utleieenhet">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          {data.unitStats.map((unit) => (
            <div
              key={unit.unitId}
              className="grid gap-3 border-b border-slate-200 bg-white p-4 last:border-b-0 md:grid-cols-[1fr_auto_auto]"
            >
              <div>
                <p className="font-semibold">{unit.unitName}</p>
                <p className="text-sm text-slate-500">
                  {unit.bookedNights} netter booket · {unit.bookingCount} bookinger
                </p>
              </div>
              <p className="text-sm font-semibold">{unit.occupancyRate}% belegg</p>
              <p className="text-sm font-semibold">{formatCurrency(unit.revenue)}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function RevenueReport({ data }: { data: ReturnType<typeof getRevenueReport> }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Total omsetning", data.total],
          ["Overnatting", data.stayRevenue],
          ["Aktiviteter", data.activityRevenue],
          ["Mersalg", data.addonRevenue],
        ].map(([label, amount]) => (
          <Panel key={label as string}>
            <p className="text-sm text-slate-500">{label as string}</p>
            <p className="mt-2 text-3xl font-semibold">{formatReportAmount(amount as number)}</p>
          </Panel>
        ))}
      </div>

      <Panel title="Omsetning per produkt">
        <div className="grid gap-3">
          {data.byProduct.map((item) => (
            <div
              key={item.product}
              className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm"
            >
              <span className="font-medium">{item.product}</span>
              <strong>{formatCurrency(item.amount)}</strong>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ActivityReport({ data }: { data: ReturnType<typeof getActivityReport> }) {
  return (
    <Panel title="Solgte aktiviteter">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        {data.map((item) => (
          <div
            key={item.id}
            className="grid gap-3 border-b border-slate-200 bg-white p-4 last:border-b-0 md:grid-cols-[1.2fr_auto_auto_auto]"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-slate-500">
                {item.date} · {item.guests} gjester · {item.source}
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              Uten overnatting
            </span>
            <p className="text-sm font-semibold">{formatCurrency(item.amount)}</p>
            <p className="text-xs uppercase tracking-wide text-slate-400">{item.id}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AddonReport({ data }: { data: ReturnType<typeof getAddonReport> }) {
  return (
    <Panel title="Mersalg per tilvalg">
      <div className="grid gap-3 md:grid-cols-2">
        {data.map((item) => (
          <article key={item.name} className="rounded-2xl border border-slate-200 p-5">
            <p className="font-semibold">{item.name}</p>
            <p className="mt-2 text-sm text-slate-600">{item.count} salg i perioden</p>
            <p className="mt-3 text-2xl font-semibold">{formatCurrency(item.amount)}</p>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function SourceReport({ data }: { data: ReturnType<typeof getSourceReport> }) {
  const sourceLabels: Record<string, string> = {
    website: "Nettside",
    partner: "Partner / Visit Norway",
    manual: "Manuell booking",
    "booking-com": "Booking.com",
    airbnb: "Airbnb",
  };

  return (
    <Panel title="Bookingkilder">
      <div className="grid gap-3">
        {data.map((item) => (
          <div
            key={item.source}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4"
          >
            <div>
              <p className="font-semibold">{sourceLabels[item.source] ?? item.source}</p>
              <p className="text-sm text-slate-600">{item.count} bookinger</p>
            </div>
            <strong>{formatCurrency(item.amount)}</strong>
          </div>
        ))}
      </div>
    </Panel>
  );
}
