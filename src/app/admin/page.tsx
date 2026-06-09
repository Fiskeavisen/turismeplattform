import {
  BarChart3,
  CalendarCheck,
  CreditCard,
  Globe2,
  GripVertical,
  Mail,
  Paintbrush,
  Plus,
  SearchCheck,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  analyticsSummary,
  bookings,
  editableSections,
  emailTemplates,
  templates,
  themeSettings,
} from "@/lib/demo-data";
import { bookingStatusClass, bookingStatusLabel, cn, formatCurrency } from "@/lib/utils";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-900">
              Plattformadmin
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Kontrollpanel for turistside</h1>
          </div>
          <Link href="/" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
            Se nettside
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-8 md:grid-cols-4">
        {[
          ["Bookinger", bookings.length.toString(), CalendarCheck],
          ["Omsetning", formatCurrency(bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)), CreditCard],
          ["AEO-score", `${analyticsSummary.aeoScore}/100`, SearchCheck],
          ["Språk", "NO / EN / DE", Globe2],
        ].map(([label, value, Icon]) => (
          <article key={label as string} className="rounded-[1.5rem] bg-white p-6 shadow-sm">
            <Icon className="text-sky-900" />
            <p className="mt-5 text-sm text-slate-500">{label as string}</p>
            <p className="mt-1 text-2xl font-semibold">{value as string}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6">
          <Panel
            icon={<Paintbrush size={20} />}
            title="Forsidebygger"
            action="Legg til boks"
          >
            <div className="grid gap-3">
              {editableSections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="text-slate-400" size={18} />
                    <div>
                      <p className="font-semibold">{section.title}</p>
                      <p className="text-sm text-slate-500">
                        {section.type} · rekkefølge {section.order}
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      section.enabled
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-600",
                    )}
                  >
                    {section.enabled ? "Synlig" : "Skjult"}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={<CalendarCheck size={20} />} title="Bookinger" action="Ny booking">
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="grid gap-4 border-b border-slate-200 bg-white p-4 last:border-b-0 md:grid-cols-[1fr_1fr_auto]"
                >
                  <div>
                    <p className="font-semibold">{booking.guestName}</p>
                    <p className="text-sm text-slate-500">{booking.productTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{booking.arrivalDate}</p>
                    <p className="text-sm text-slate-500">
                      {booking.source} · {booking.language.toUpperCase()} · {booking.paymentProvider}
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
          </Panel>
        </div>

        <div className="grid gap-6">
          <Panel icon={<Paintbrush size={20} />} title="Design og merkevare">
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  themeSettings.primaryColor,
                  themeSettings.secondaryColor,
                  themeSettings.accentColor,
                ].map((color) => (
                  <div key={color} className="rounded-2xl bg-slate-50 p-3">
                    <div className="h-16 rounded-xl" style={{ background: color }} />
                    <p className="mt-2 text-xs font-semibold">{color}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-3">
                {templates.map((template) => (
                  <div key={template.id} className="rounded-2xl border border-slate-200 p-4">
                    <p className="font-semibold">{template.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{template.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel icon={<BarChart3 size={20} />} title="Statistikk og AEO">
            <div className="rounded-2xl bg-sky-950 p-5 text-white">
              <p className="text-sm text-white/70">AEO-oversikt</p>
              <p className="mt-2 text-4xl font-semibold">{analyticsSummary.aeoScore}/100</p>
              <p className="mt-2 text-sm text-white/70">
                Basert på FAQ, schema, lokal relevans, artikler og svarvennlig struktur.
              </p>
            </div>
            <div className="mt-4 grid gap-2">
              {analyticsSummary.topSources.map((source) => (
                <div key={source.source} className="flex justify-between rounded-2xl bg-slate-50 p-3 text-sm">
                  <span>{source.source}</span>
                  <strong>{source.visitors.toLocaleString("nb-NO")}</strong>
                </div>
              ))}
            </div>
          </Panel>

          <Panel icon={<Mail size={20} />} title="Epostmaler">
            <div className="grid gap-3">
              {emailTemplates.map((template) => (
                <article key={template.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold">{template.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{template.subject.nb}</p>
                  <p className="mt-2 text-sm text-slate-600">{template.preview.nb}</p>
                </article>
              ))}
            </div>
          </Panel>
        </div>
      </section>
    </main>
  );
}

function Panel({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: ReactNode;
  action?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-2xl bg-slate-100 p-3 text-sky-900">{icon}</span>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        {action ? (
          <button className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
            <Plus size={16} /> {action}
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}
