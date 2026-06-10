import Link from "next/link";
import { ArrowRight, CalendarDays, Check, MapPin, Search, SlidersHorizontal } from "lucide-react";
import {
  searchMarketplaceAvailability,
  type MarketplaceProductType,
  type MarketplaceSearchResult,
} from "@/lib/booking/marketplace";
import { norskeBilder } from "@/lib/images";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatCurrency } from "@/lib/utils";

export const metadata = buildMetadata({
  title: {
    nb: "Søk ledig dato | Felles booking for Helgeland",
    en: "Search available dates | Shared booking for Helgeland",
    de: "Verfügbarkeit suchen | Gemeinsame Buchung für Helgeland",
  },
  description: {
    nb: "Søk etter ledig overnatting og opplevelser på tvers av kunder og partnere i én felles bookingplattform.",
    en: "Search available accommodation and experiences across customers and partners in one shared booking platform.",
    de: "Suchen Sie verfügbare Unterkünfte und Erlebnisse über Partner hinweg in einer gemeinsamen Buchungsplattform.",
  },
  path: "/ledig-sok",
  image: norskeBilder.rorbuerKyst.hero,
});

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const productTypes = new Set(["alle", "overnatting", "opplevelse"]);

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
  fallback = "",
) {
  const value = searchParams[key];

  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
}

function getProductType(value: string): MarketplaceProductType | "alle" {
  return productTypes.has(value) ? (value as MarketplaceProductType | "alle") : "alle";
}

function getTomorrowIso() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow.toISOString().slice(0, 10);
}

export default async function AvailableSearchPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {};
  const from = getParam(params, "from", new Date().toISOString().slice(0, 10));
  const to = getParam(params, "to", getTomorrowIso());
  const query = getParam(params, "q");
  const guests = Number(getParam(params, "guests", "2"));
  const productType = getProductType(getParam(params, "type", "alle"));

  const results = searchMarketplaceAvailability({
    from,
    to,
    query,
    guests: Number.isFinite(guests) ? guests : 2,
    productType,
  });
  const availableResults = results.filter((result) => result.available);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-bold uppercase tracking-[0.25em]">
            Frimedia<span className="text-slate-400"> · Turismeplattform</span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-medium text-slate-700 md:flex">
            <Link href="/booking-systemer" className="rounded-full px-3.5 py-2.5 hover:bg-slate-100">
              Booking systemer
            </Link>
            <Link href="/pakker" className="rounded-full px-3.5 py-2.5 hover:bg-slate-100">
              Pakker
            </Link>
            <Link href="/markedsplass" className="rounded-full px-3.5 py-2.5 hover:bg-slate-100">
              Markedsplass
            </Link>
            <Link href="/login" className="rounded-full px-3.5 py-2.5 hover:bg-slate-100">
              Logg inn
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `url('${norskeBilder.rorbuerKyst.hero}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
              Felles ledighetssøk
            </p>
            <h1
              className="mt-5 text-5xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-7xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Finn ledig overnatting og opplevelser hos alle partnere.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Ett søk viser hvilke kunder som har kapasitet på valgt dato, enten
              de bookes direkte i plattformen eller via channel manager.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <form
          action="/ledig-sok"
          className="-mt-16 grid gap-3 rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/15 ring-1 ring-slate-200 md:grid-cols-[1.2fr_0.9fr_0.9fr_0.8fr_0.9fr_auto] md:items-end"
        >
          <div>
            <label htmlFor="q" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Søk
            </label>
            <div className="relative mt-1.5">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
              <input
                id="q"
                name="q"
                defaultValue={query}
                placeholder="Sted, partner eller aktivitet"
                className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-sm font-medium focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/30"
              />
            </div>
          </div>
          <div>
            <label htmlFor="from" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Dato fra
            </label>
            <input
              id="from"
              name="from"
              type="date"
              defaultValue={from}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/30"
            />
          </div>
          <div>
            <label htmlFor="to" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Dato til
            </label>
            <input
              id="to"
              name="to"
              type="date"
              defaultValue={to}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/30"
            />
          </div>
          <div>
            <label htmlFor="guests" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Gjester
            </label>
            <select
              id="guests"
              name="guests"
              defaultValue={String(Number.isFinite(guests) ? guests : 2)}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/30"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="type" className="text-xs font-semibold uppercase tracking-wide text-slate-600">
              Type
            </label>
            <select
              id="type"
              name="type"
              defaultValue={productType}
              className="mt-1.5 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400/30"
            >
              <option value="alle">Alle</option>
              <option value="overnatting">Overnatting</option>
              <option value="opplevelse">Opplevelser</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <SlidersHorizontal size={17} /> Søk
          </button>
        </form>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Resultater
            </p>
            <h2
              className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              {availableResults.length} ledige treff av {results.length} mulige
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Demoen viser felles søk på tvers av kunder. Direkteprodukter kan
            bookes i plattformen, mens eksterne kanaler krever avtale/API eller
            channel manager før de blir helt automatiske.
          </p>
        </div>

        {results.length > 0 ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {results.map((result) => (
              <ResultCard key={result.product.id} result={result} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8">
            <h3 className="text-xl font-semibold">Ingen treff på søket</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Prøv andre datoer, færre gjester eller fjern søkeordet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function ResultCard({ result }: { result: MarketplaceSearchResult }) {
  const { product, partner } = result;

  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="grid md:grid-cols-[0.9fr_1.1fr]">
        <div
          className="min-h-64 bg-slate-200"
          style={{
            backgroundImage: `url('${product.imageUrl}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                result.available ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }`}
            >
              {result.availabilityLabel}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              {product.type === "overnatting" ? "Overnatting" : "Opplevelse"}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold">{product.title}</h3>
          <p className="mt-2 text-sm font-semibold text-slate-600">{partner.name}</p>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={15} /> {product.location}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>

          <div className="mt-5 grid gap-2 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <CalendarDays size={16} className="text-slate-400" />
              {product.type === "overnatting"
                ? `Minst ${product.minNights} ${product.minNights === 1 ? "natt" : "netter"}`
                : product.duration}
            </p>
            <p className="flex items-center gap-2">
              <Check size={16} className="text-emerald-600" />
              {result.channelLabel}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.channels.map((channel) => (
              <span key={channel} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {channel}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-lg font-semibold">Fra {formatCurrency(product.priceFrom)}</p>
            <Link
              href={`${partner.websitePath}${result.available ? "#booking" : ""}`}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold ${
                result.available
                  ? "bg-slate-950 text-white hover:bg-slate-800"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {result.available ? "Gå til booking" : "Se partner"} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
