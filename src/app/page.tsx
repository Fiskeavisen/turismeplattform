import {
  ArrowRight,
  BarChart3,
  Globe2,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { BookingSearchCard } from "@/components/platform/booking-search-card";
import { ProductCard } from "@/components/platform/product-card";
import { SectionHeading } from "@/components/platform/section-heading";
import {
  accommodations,
  activities,
  analyticsSummary,
  articles,
  templates,
  touristCenter,
} from "@/lib/demo-data";
import { buildTourismSchema } from "@/lib/seo/schema";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: {
    nb: "Flø Feriesenter Demo | Turismeplattform",
    en: "Flø Holiday Centre Demo | Tourism Platform",
    de: "Flø Ferienzentrum Demo | Tourismusplattform",
  },
  description: {
    nb: "Demo av en gjenbrukbar turismeplattform med booking, admin, SEO, AEO og tre språk.",
    en: "Demo of a reusable tourism platform with booking, admin, SEO, AEO and three languages.",
    de: "Demo einer wiederverwendbaren Tourismusplattform mit Buchung, Admin, SEO, AEO und drei Sprachen.",
  },
});

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const schema = buildTourismSchema(siteUrl);

  return (
    <main className="min-h-screen bg-[#f7f3eb] text-slate-950">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/20" />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-amber-100">
              {touristCenter.name}
            </p>
            <p className="mt-1 text-sm text-white/70">{touristCenter.location}</p>
          </div>
          <nav className="hidden items-center gap-2 text-sm text-white/80 md:flex">
            {[
              ["#opplevelser", "Opplevelser"],
              ["#overnatting", "Overnatting"],
              ["#artikler", "Artikler"],
              ["/maler", "Maler"],
              ["/pakker", "Pakker"],
              ["/portal", "Portal"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-2.5 hover:bg-white/10 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#booking"
            className="rounded-full bg-amber-200 px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-black/20"
          >
            Finn ledig plass
          </a>
        </header>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-28">
          <div>
            <div className="mb-6 flex flex-wrap gap-3">
              {["Norsk", "English", "Deutsch"].map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur"
                >
                  {language}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl">
              Opplev Flø mellom hav, hytter og fjell.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
              Dette er første referanseside for turismeplattformen: en moderne
              Flø-demo med hytter, båt, aktiviteter, artikler, booking, tre
              språk, admin, SEO, AEO og statistikk.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-6 py-4 font-semibold text-slate-950"
              >
                Finn ledig hytte <ArrowRight size={18} />
              </a>
              <a
                href="/portal"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur"
              >
                Logg inn og test admin
              </a>
            </div>
          </div>

          <BookingSearchCard />
        </div>
      </section>

      <section className="mx-auto -mt-10 grid max-w-7xl gap-4 px-6 md:grid-cols-3">
        {templates.map((template) => (
          <a
            key={template.id}
            href="/maler"
            className="group rounded-[1.5rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur hover:border-sky-900/20"
          >
            <Sparkles className="mb-6 text-amber-600" />
            <h3 className="text-xl font-semibold">{template.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{template.description}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-900">
              Se malen <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </p>
          </a>
        ))}
      </section>

      <section id="opplevelser" className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Aktiviteter"
          title="Enkelt å legge til produkter, priser og kapasitet."
          description="Flø-demoen viser hvordan samme system kan håndtere hytter, båt, havfiske, fjellturer, dagsturer og opplevelser."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => <ProductCard key={activity.id} activity={activity} />)}
        </div>
      </section>

      <section id="overnatting" className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-900">
              Overnatting
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">
              Hytter, båt og pakker i samme system.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Kunden kan endre bilder, fasiliteter, tekst, prisindikasjon og CTA
              uten at vi må inn i koden.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {accommodations.map((accommodation) => (
              <article key={accommodation.id} className="rounded-[1.5rem] bg-[#f7f3eb] p-4">
                <div
                  className="h-56 rounded-[1.2rem]"
                  style={{
                    backgroundImage: `url('${accommodation.imageUrl}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
                <div className="p-3">
                  <h3 className="mt-3 text-2xl font-semibold">{accommodation.title.nb}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {accommodation.description.nb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {accommodation.amenities.map((amenity) => (
                      <span key={amenity} className="rounded-full bg-white px-3 py-1 text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-20 lg:grid-cols-4">
        {[
          ["Designbygger", "Flytt seksjoner, bytt mal, farger, fonter, logo og bilder.", Sparkles],
          ["Bookingkontroll", "Full oversikt, status, betaling, kilder og kundedialog.", MessageCircle],
          ["Statistikk", "Trafikkilder, konvertering, Search Console og AEO-score.", BarChart3],
          ["SEO/AEO", "FAQ, schema, artikler, metadata og flerspråklig struktur.", Globe2],
        ].map(([title, text, Icon]) => (
          <article key={title as string} className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
            <Icon className="text-amber-200" />
            <h3 className="mt-6 text-xl font-semibold">{title as string}</h3>
            <p className="mt-3 text-sm leading-6 text-white/70">{text as string}</p>
          </article>
        ))}
      </section>

      <section id="artikler" className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-900">
              Reiseinspirasjon
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">
              Artikler som bygger søk og AI-synlighet.
            </h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="overflow-hidden rounded-[1.5rem] bg-white">
              <div
                className="h-44"
                style={{
                  backgroundImage: `url('${article.imageUrl}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {article.category} · {article.readingMinutes} min
                </p>
                <h3 className="mt-2 text-xl font-semibold">{article.title.nb}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{article.excerpt.nb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-20 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] bg-white p-8">
          <div className="flex items-center gap-2 text-amber-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} fill="currentColor" size={18} />
            ))}
          </div>
          <blockquote className="mt-6 text-2xl font-semibold leading-10">
            “Profesjonelt opplegg fra første klikk til hjemreise. Vi visste hva
            vi skulle pakke, hvor vi skulle møte og hvem vi kunne kontakte.”
          </blockquote>
          <p className="mt-5 text-slate-600">Kari, firmatur</p>
        </div>

        <div className="rounded-[2rem] bg-sky-950 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-100">
            AEO og analyse
          </p>
          <h2 className="mt-3 text-4xl font-semibold">{analyticsSummary.aeoScore}/100</h2>
          <p className="mt-3 text-white/70">
            Demo-score for svarvennlig innhold, FAQ, lokal kontekst og strukturerte data.
          </p>
          <div className="mt-8 grid gap-3">
            {analyticsSummary.topSources.slice(0, 3).map((source) => (
              <div
                key={source.source}
                className="flex items-center justify-between rounded-2xl bg-white/10 p-4"
              >
                <span>{source.source}</span>
                <strong>{source.visitors.toLocaleString("nb-NO")}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">{touristCenter.name}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
              <MapPin size={16} /> {touristCenter.location}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} /> Lokal drift
            </span>
            <span className="flex items-center gap-2">
              <Globe2 size={16} /> NO / EN / DE
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
