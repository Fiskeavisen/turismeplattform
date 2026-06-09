import Link from "next/link";
import { ArrowRight, ExternalLink, LayoutDashboard, LogOut, Palette, Package } from "lucide-react";
import { requireUser } from "@/lib/auth/require-user";
import { demoSites } from "@/lib/demo-sites";

export const metadata = {
  title: "Portal | Turismeplattform",
  description: "Frimedia turismeplattform – demo-sider og admin.",
};

export default async function PortalPage() {
  const user = await requireUser();
  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-900">
              Frimedia · Turismeplattform
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Portal</h1>
            <p className="mt-1 text-sm text-slate-600">Innlogget som {user.email}</p>
          </div>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-5 text-sm font-semibold hover:bg-slate-50"
            >
              <LogOut size={16} /> Logg ut
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <StatusCard
            label="Supabase"
            value={supabaseConfigured ? "Koblet" : "Mangler nøkler"}
            ok={supabaseConfigured}
          />
          <StatusCard label="Demo-sider" value={`${demoSites.length} aktiv`} ok />
          <StatusCard label="Miljø" value={process.env.NEXT_PUBLIC_SITE_URL ?? "Ikke satt"} ok />
        </div>

        <h2 className="text-xl font-semibold">Kunde- og demo-sider</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Her samler vi alle sider som er satt opp i plattformen. Åpne nettsiden for å
          se resultatet, eller gå til admin for å teste redigering, booking og innhold.
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {demoSites.map((site) => (
            <article
              key={site.slug}
              className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {site.template} · {site.status}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{site.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{site.description}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={site.publicPath}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-sky-950 px-5 text-sm font-semibold text-white"
                >
                  <ExternalLink size={16} /> Se nettside
                </Link>
                <Link
                  href={site.adminPath}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-5 text-sm font-semibold hover:bg-slate-50"
                >
                  <LayoutDashboard size={16} /> Admin
                </Link>
              </div>
            </article>
          ))}

          <article className="flex flex-col justify-between rounded-[1.5rem] border border-dashed border-slate-300 bg-white/60 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ny kunde
              </p>
              <h3 className="mt-2 text-2xl font-semibold">Legg til via AI-onboarding</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Bruk kundeprofil + AI-prompt i docs/CUSTOMER_ONBOARDING.md for å hente
                innhold fra kundens eksisterende nettside.
              </p>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-900">
              Se onboarding-guide <ArrowRight size={16} />
            </p>
          </article>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link
            href="/maler"
            className="flex items-center gap-4 rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 hover:ring-sky-900/20"
          >
            <Palette className="text-sky-900" />
            <div>
              <p className="font-semibold">Designmaler</p>
              <p className="text-sm text-slate-600">Sammenlign Kyst, Fjord og Premium.</p>
            </div>
          </Link>
          <Link
            href="/pakker"
            className="flex items-center gap-4 rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 hover:ring-sky-900/20"
          >
            <Package className="text-sky-900" />
            <div>
              <p className="font-semibold">Salgspakker</p>
              <p className="text-sm text-slate-600">Start, Proff og Premium.</p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

function StatusCard({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <article className="rounded-[1.25rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
      <p className={`mt-2 text-xs font-semibold ${ok ? "text-emerald-700" : "text-amber-700"}`}>
        {ok ? "OK" : "Krever oppsett"}
      </p>
    </article>
  );
}
