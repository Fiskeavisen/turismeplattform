import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/ui";
import {
  analyticsSummary,
  bookingAddons,
  bookings,
  rentalUnits,
} from "@/lib/demo-data";
import { bookingStatusClass, bookingStatusLabel, cn, formatCurrency } from "@/lib/utils";

export const metadata = { title: "Oversikt | Admin" };

export default function AdminOverviewPage() {
  const revenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const addonRevenue = bookings.reduce(
    (sum, booking) =>
      sum + (booking.addons?.reduce((addonSum, addon) => addonSum + addon.amount, 0) ?? 0),
    0,
  );

  return (
    <>
      <PageHeader
        title="Oversikt"
        description="Nøkkeltall for nettsiden, bookingene og synligheten – oppdatert i sanntid."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Bookinger", bookings.length.toString(), CalendarCheck],
          ["Omsetning", formatCurrency(revenue), CreditCard],
          ["Besøkende", analyticsSummary.visitors.toLocaleString("nb-NO"), Users],
          ["Konvertering", `${analyticsSummary.conversionRate.toLocaleString("nb-NO")} %`, TrendingUp],
        ].map(([label, value, Icon]) => (
          <article
            key={label as string}
            className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
          >
            <Icon className="text-sky-900" size={20} />
            <p className="mt-4 text-sm text-slate-500">{label as string}</p>
            <p className="mt-1 text-2xl font-semibold">{value as string}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Siste bookinger">
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white p-4 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">{booking.guestName}</p>
                  <p className="text-sm text-slate-500">
                    {booking.productTitle}
                    {booking.rentalUnitName ? ` · ${booking.rentalUnitName}` : ""} ·{" "}
                    {booking.arrivalDate}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      bookingStatusClass(booking.status),
                    )}
                  >
                    {bookingStatusLabel(booking.status)}
                  </span>
                  <strong>{formatCurrency(booking.totalAmount)}</strong>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/admin/bookinger"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-900"
          >
            Alle bookinger <ArrowRight size={15} />
          </Link>
        </Panel>

        <div className="grid gap-6">
          <Panel title="Mersalg">
            <p className="text-sm text-slate-600">
              Tilvalg solgt gjennom bookingflyten denne perioden.
            </p>
            <p className="mt-3 text-3xl font-semibold">{formatCurrency(addonRevenue)}</p>
            <p className="mt-1 text-sm text-slate-500">
              {bookingAddons.filter((addon) => addon.active).length} aktive tilvalg
            </p>
            <Link
              href="/admin/tilvalg"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-900"
            >
              Administrer tilvalg <ArrowRight size={15} />
            </Link>
          </Panel>

          <Panel title="Trafikkilder">
            <div className="grid gap-2">
              {analyticsSummary.topSources.map((source) => (
                <div
                  key={source.source}
                  className="flex justify-between rounded-xl bg-slate-50 p-3 text-sm"
                >
                  <span>{source.source}</span>
                  <strong>{source.visitors.toLocaleString("nb-NO")}</strong>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Søkesynlighet">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">AEO-score</p>
              <p className="text-2xl font-semibold">{analyticsSummary.aeoScore}/100</p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${analyticsSummary.aeoScore}%` }}
              />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Toppsøk som gir klikk
            </p>
            <div className="mt-2 grid gap-2">
              {analyticsSummary.topQueries.map((query) => (
                <div
                  key={query.query}
                  className="flex justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm"
                >
                  <span className="truncate">«{query.query}»</span>
                  <strong className="shrink-0">{query.clicks}</strong>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Kapasitet">
            <p className="text-sm text-slate-600">
              {rentalUnits.filter((unit) => unit.active).length} av {rentalUnits.length}{" "}
              utleieenheter er aktive.
            </p>
            <Link
              href="/admin/overnatting"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-900"
            >
              Se enheter <ArrowRight size={15} />
            </Link>
          </Panel>
        </div>
      </div>
    </>
  );
}
