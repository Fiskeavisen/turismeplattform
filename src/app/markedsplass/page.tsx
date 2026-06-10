import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  CheckCircle2,
  CircleAlert,
  ExternalLink,
  Globe2,
  PlugZap,
  Search,
  Store,
} from "lucide-react";
import {
  marketplacePartners,
  marketplaceProducts,
  searchMarketplaceAvailability,
  type MarketplaceBookingMode,
  type MarketplaceProduct,
} from "@/lib/booking/marketplace";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn, formatCurrency } from "@/lib/utils";

export const metadata = buildMetadata({
  title: {
    nb: "Markedsplass bakside | Frimedia turismeplattform",
    en: "Marketplace back office | Frimedia tourism platform",
    de: "Marktplatz Verwaltung | Frimedia Tourismusplattform",
  },
  description: {
    nb: "Demo-bakside for å teste partnernettverk, produkter, ledighet og kanalstatus i markedsplassen.",
    en: "Demo back office for testing partners, products, availability and channel status in the marketplace.",
    de: "Demo-Verwaltung zum Testen von Partnern, Produkten, Verfügbarkeit und Kanalstatus.",
  },
  path: "/markedsplass",
});

const demoFrom = "2026-07-12";
const demoTo = "2026-07-16";
const demoGuests = 4;

const bookingModeLabels: Record<MarketplaceBookingMode, string> = {
  internal: "Direktebooking",
  "channel-manager": "Channel manager",
  "external-link": "Ekstern lenke",
};

const bookingModeStyles: Record<MarketplaceBookingMode, string> = {
  internal: "bg-emerald-100 text-emerald-800",
  "channel-manager": "bg-sky-100 text-sky-800",
  "external-link": "bg-amber-100 text-amber-800",
};

export default function MarketplaceBackofficePage() {
  const availability = searchMarketplaceAvailability({
    from: demoFrom,
    to: demoTo,
    guests: demoGuests,
    productType: "alle",
  });

  const liveProducts = marketplaceProducts.filter((product) => product.bookingMode === "internal");
  const channelManagerProducts = marketplaceProducts.filter(
    (product) => product.bookingMode === "channel-manager",
  );
  const externalProducts = marketplaceProducts.filter((product) => product.bookingMode === "external-link");
  const availableProducts = availability.filter((result) => result.available);
  const totalDirectValue = availableProducts.reduce(
    (sum, result) => sum + result.product.priceFrom * demoGuests,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-900">
              Frimedia · Markedsplass
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Bakside for partnernettverk</h1>
            <p className="mt-1 text-sm text-slate-600">
              Testflate for produkter, ledighet, partnere og kanalstatus før full admin bygges ut.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/ledig-sok"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              <Search size={16} /> Åpne ledighetssøk
            </Link>
            <Link
              href="/booking-systemer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-5 text-sm font-semibold hover:bg-slate-50"
            >
              Salgsside <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={Building2} label="Partnere" value={marketplacePartners.length.toString()} />
          <MetricCard icon={Store} label="Produkter" value={marketplaceProducts.length.toString()} />
          <MetricCard
            icon={CalendarCheck}
            label="Ledige i demo-søk"
            value={`${availableProducts.length}/${availability.length}`}
          />
          <MetricCard icon={Globe2} label="Mulig ordreverdi" value={formatCurrency(totalDirectValue)} />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Partnerstatus</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Hver kunde kan ha egne produkter, kanaler og bookingmodus.
                </p>
              </div>
              <Link href="/ledig-sok" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-900">
                Test offentlig søk <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-5 grid gap-3">
              {marketplacePartners.map((partner) => {
                const products = marketplaceProducts.filter((product) => product.partnerId === partner.id);
                const directCount = products.filter((product) => product.bookingMode === "internal").length;

                return (
                  <article
                    key={partner.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {partner.location}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold">{partner.name}</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                          {partner.description}
                        </p>
                      </div>
                      <Link
                        href={partner.websitePath}
                        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold hover:bg-slate-50"
                      >
                        Åpne <ExternalLink size={15} />
                      </Link>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <StatusPill active={directCount > 0} label={`${directCount} direkteprodukt`} />
                      <StatusPill active label={`${products.length} produkter`} />
                      {partner.channels.map((channel) => (
                        <span
                          key={channel}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
                        >
                          {channel}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <div className="grid gap-6">
            <section className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold">Kanaloppsett</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Dette viser hva som kan bookes direkte nå, og hva som krever channel manager/API.
              </p>
              <div className="mt-5 grid gap-3">
                <ChannelCard
                  title="Direkte i plattformen"
                  count={liveProducts.length}
                  description="Kan bruke intern booking, betaling og kundedialog."
                  active
                />
                <ChannelCard
                  title="Channel manager"
                  count={channelManagerProducts.length}
                  description="Klar struktur, men krever kundens tekniske avtale og nøkler."
                  active={channelManagerProducts.length > 0}
                />
                <ChannelCard
                  title="Ekstern lenke"
                  count={externalProducts.length}
                  description="Sender gjesten videre til partnerens eksisterende bookingløp."
                  active={externalProducts.length > 0}
                />
              </div>
            </section>

            <section className="rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex items-start gap-3">
                <PlugZap className="mt-1 text-amber-300" size={22} />
                <div>
                  <h2 className="text-lg font-semibold">Neste tekniske steg</h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Koble denne baksiden til Supabase-tabeller for partnere, produkter,
                    kalenderblokker og kanalnøkler. Da kan markedsplassen redigeres uten kode.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <section className="mt-6 rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Produkter og ledighet</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Demo-sjekk: {demoFrom} til {demoTo}, {demoGuests} gjester.
              </p>
            </div>
            <Link
              href={`/ledig-sok?from=${demoFrom}&to=${demoTo}&guests=${demoGuests}&type=alle`}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-50"
            >
              Åpne samme søk <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            {availability.map((result) => (
              <ProductRow key={result.product.id} product={result.product} available={result.available} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <Icon className="text-sky-900" size={20} />
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </article>
  );
}

function StatusPill({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600",
      )}
    >
      {label}
    </span>
  );
}

function ChannelCard({
  title,
  count,
  description,
  active,
}: {
  title: string;
  count: number;
  description: string;
  active: boolean;
}) {
  return (
    <article className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4">
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <span
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold",
          active ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600",
        )}
      >
        {count}
      </span>
    </article>
  );
}

function ProductRow({ product, available }: { product: MarketplaceProduct; available: boolean }) {
  return (
    <div className="grid gap-4 border-b border-slate-200 bg-white p-4 last:border-b-0 md:grid-cols-[1.2fr_0.8fr_0.8fr_auto] md:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {product.type === "overnatting" ? "Overnatting" : "Opplevelse"} · {product.location}
        </p>
        <p className="mt-1 font-semibold">{product.title}</p>
        <p className="mt-1 text-sm text-slate-500">Fra {formatCurrency(product.priceFrom)}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {product.channels.slice(0, 3).map((channel) => (
          <span key={channel} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {channel}
          </span>
        ))}
      </div>
      <span
        className={cn(
          "w-fit rounded-full px-3 py-1 text-xs font-semibold",
          bookingModeStyles[product.bookingMode],
        )}
      >
        {bookingModeLabels[product.bookingMode]}
      </span>
      <span
        className={cn(
          "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
          available ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800",
        )}
      >
        {available ? <CheckCircle2 size={14} /> : <CircleAlert size={14} />}
        {available ? "Ledig" : "Ikke ledig"}
      </span>
    </div>
  );
}
