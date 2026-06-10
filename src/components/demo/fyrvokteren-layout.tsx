import { MapPin, Star } from "lucide-react";
import { BookingSearchCard } from "@/components/platform/booking-search-card";
import {
  accommodations,
  activities,
  articles,
  rentalUnits,
  reviews,
  touristCenter,
} from "@/lib/demo-data";
import { norskeBilder } from "@/lib/images";
import { getTheme } from "@/lib/themes";
import { formatCurrency } from "@/lib/utils";
import { uspItems } from "./shared";

/**
 * Fyrvokteren: mørkt, redaksjonelt premium-oppsett.
 * Fullskjerm-hero med sentrert serif, nummererte seksjoner,
 * store vekslende bilderader og booking i egen avsluttende seksjon.
 */
export function FyrvokterenLayout() {
  const theme = getTheme("premium");
  const { tokens } = theme;

  const cssVars = {
    "--demo-primary": tokens.primary,
    "--demo-primary-fg": tokens.primaryForeground,
  } as React.CSSProperties;

  return (
    <div
      style={{
        ...cssVars,
        background: tokens.background,
        color: tokens.text,
        fontFamily: tokens.bodyFontStack,
      }}
    >
      {/* Fullskjerm-hero med header oppå */}
      <section className="relative flex min-h-[88vh] flex-col">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${norskeBilder.moerkBoelge.hero}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,19,23,0.75) 0%, rgba(18,19,23,0.35) 45%, rgba(18,19,23,0.92) 100%)",
          }}
        />

        <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7">
          <a
            href="#"
            className="text-2xl tracking-[0.08em]"
            style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
          >
            Nordskjær
          </a>
          <nav className="hidden items-center gap-7 text-sm tracking-wide lg:flex">
            {[
              ["#opplevelser", "Opplevelser"],
              ["#hytter", "Hytter"],
              ["#artikler", "Journal"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="opacity-80 transition hover:opacity-100">
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#booking"
            className="inline-flex min-h-11 items-center border px-6 text-sm font-semibold tracking-wide transition hover:opacity-80"
            style={{ borderColor: tokens.primary, color: tokens.primary, borderRadius: tokens.radiusControl }}
          >
            Reserver
          </a>
        </header>

        <div className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.5em]"
            style={{ color: tokens.primary }}
          >
            Nordskjær Feriesenter
          </p>
          <h1
            className="mt-6 text-5xl leading-[1.08] md:text-7xl"
            style={{ fontFamily: tokens.headingFontStack, fontWeight: 500 }}
          >
            Havet, mørket og fyrlyset
          </h1>
          <span
            className="mt-8 block h-px w-16"
            style={{ background: tokens.primary }}
          />
          <p className="mt-8 max-w-xl text-lg leading-8" style={{ color: tokens.mutedText }}>
            Et eksklusivt opphold ytterst mot storhavet, med egen båt, lokale
            råvarer og personlig vertskap.
          </p>
          <a
            href="#booking"
            className="mt-10 inline-flex min-h-13 items-center px-8 text-sm font-semibold tracking-wide"
            style={{
              background: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: tokens.radiusControl,
            }}
          >
            Reserver opphold
          </a>
        </div>
      </section>

      {/* 01 — Opplevelser: store vekslende rader */}
      <section id="opplevelser" className="mx-auto max-w-6xl px-6 py-24">
        <SectionMarker tokens={tokens} number="01" title="Opplevelser" />
        <div className="mt-12 grid gap-16">
          {activities.map((activity, index) => {
            const reversed = index % 2 === 1;

            return (
              <article
                key={activity.id}
                className="grid items-center gap-8 lg:grid-cols-2"
              >
                <div
                  className={`h-72 bg-cover bg-center lg:h-80 ${reversed ? "lg:order-2" : ""}`}
                  style={{
                    backgroundImage: `url('${activity.imageUrl}')`,
                    borderRadius: tokens.radiusCard,
                  }}
                />
                <div className={reversed ? "lg:order-1 lg:text-right" : ""}>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.35em]"
                    style={{ color: tokens.primary }}
                  >
                    {activity.duration} · maks {activity.capacity} gjester
                    {activity.sellStandalone ? " · kan kjøpes uten opphold" : ""}
                  </p>
                  <h3
                    className="mt-4 text-3xl md:text-4xl"
                    style={{ fontFamily: tokens.headingFontStack, fontWeight: 500 }}
                  >
                    {activity.title.nb}
                  </h3>
                  <p
                    className="mt-4 max-w-md leading-8 lg:inline-block"
                    style={{ color: tokens.mutedText }}
                  >
                    {activity.teaser.nb} {activity.description.nb}
                  </p>
                  <p className="mt-5 text-sm font-semibold tracking-wide" style={{ color: tokens.primary }}>
                    Fra {formatCurrency(activity.priceFrom)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 02 — Hytter */}
      <section id="hytter" className="py-24" style={{ background: tokens.surface }}>
        <div className="mx-auto max-w-6xl px-6">
          <SectionMarker tokens={tokens} number="02" title="Hytter og suiter" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {accommodations.map((accommodation) => {
              const units = rentalUnits.filter(
                (unit) => unit.accommodationId === accommodation.id && unit.active,
              );

              return (
                <article key={accommodation.id}>
                  <div
                    className="h-64 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${accommodation.imageUrl}')`,
                      borderRadius: tokens.radiusCard,
                    }}
                  />
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <h3
                      className="text-2xl"
                      style={{ fontFamily: tokens.headingFontStack, fontWeight: 500 }}
                    >
                      {accommodation.title.nb}
                    </h3>
                    <p className="shrink-0 text-sm font-semibold" style={{ color: tokens.primary }}>
                      Fra {formatCurrency(accommodation.priceFrom)}/natt
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-7" style={{ color: tokens.mutedText }}>
                    {accommodation.description.nb}
                  </p>
                  <p
                    className="mt-3 text-xs uppercase tracking-[0.25em]"
                    style={{ color: tokens.mutedText }}
                  >
                    {units.length} enheter · {accommodation.amenities.join(" · ")}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stort sitat */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="flex justify-center gap-1.5" style={{ color: tokens.primary }}>
          {Array.from({ length: reviews[0]?.rating ?? 5 }).map((_, index) => (
            <Star key={index} size={16} fill="currentColor" />
          ))}
        </div>
        <blockquote
          className="mt-8 text-3xl leading-[1.4] md:text-4xl"
          style={{ fontFamily: tokens.headingFontStack, fontWeight: 500 }}
        >
          “{reviews[0]?.quote.nb}”
        </blockquote>
        <p
          className="mt-8 text-xs font-semibold uppercase tracking-[0.35em]"
          style={{ color: tokens.mutedText }}
        >
          {reviews[0]?.guestName} · gjest {reviews[0]?.date}
        </p>
      </section>

      {/* 03 — Booking */}
      <section className="py-24" style={{ background: tokens.surface }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionMarker tokens={tokens} number="03" title="Reserver oppholdet" />
            <p className="mt-6 max-w-md leading-8" style={{ color: tokens.mutedText }}>
              Velg datoer og se ledige hytter. Egen båt, sengetøy og tidlig
              innsjekk legges til i samme reservasjon – og vertskapet tar
              kontakt før ankomst.
            </p>
            <div className="mt-8 grid gap-3 text-sm" style={{ color: tokens.mutedText }}>
              <p>{touristCenter.phone}</p>
              <p>{touristCenter.email}</p>
              <p className="flex items-center gap-2">
                <MapPin size={15} /> {touristCenter.location}
              </p>
            </div>
          </div>
          <BookingSearchCard />
        </div>
      </section>

      {/* Journal */}
      <section id="artikler" className="mx-auto max-w-6xl px-6 py-24">
        <SectionMarker tokens={tokens} number="04" title="Journal" />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id}>
              <div
                className="h-44 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${article.imageUrl}')`,
                  borderRadius: tokens.radiusCard,
                }}
              />
              <p
                className="mt-4 text-xs font-semibold uppercase tracking-[0.3em]"
                style={{ color: tokens.primary }}
              >
                {article.category}
              </p>
              <h3
                className="mt-2 text-xl leading-snug"
                style={{ fontFamily: tokens.headingFontStack, fontWeight: 500 }}
              >
                {article.title.nb}
              </h3>
              <p className="mt-2 text-sm leading-7" style={{ color: tokens.mutedText }}>
                {article.excerpt.nb}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* USP-linje + footer */}
      <footer id="kontakt" style={{ borderTop: `1px solid ${tokens.border}` }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {uspItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center sm:text-left">
              <Icon size={20} style={{ color: tokens.primary }} className="mx-auto sm:mx-0" />
              <p className="mt-3 text-sm font-semibold tracking-wide">{title}</p>
              <p className="mt-1 text-xs leading-5" style={{ color: tokens.mutedText }}>
                {text}
              </p>
            </div>
          ))}
        </div>
        <div
          className="px-6 py-6 text-center text-xs tracking-[0.25em]"
          style={{ borderTop: `1px solid ${tokens.border}`, color: tokens.mutedText }}
        >
          {touristCenter.name.toUpperCase()} · {touristCenter.location.toUpperCase()} · NO / EN / DE
        </div>
      </footer>
    </div>
  );
}

function SectionMarker({
  tokens,
  number,
  title,
}: {
  tokens: ReturnType<typeof getTheme>["tokens"];
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-5">
      <span
        className="text-sm font-semibold tracking-[0.3em]"
        style={{ color: tokens.primary }}
      >
        {number}
      </span>
      <span className="h-px w-12" style={{ background: tokens.border }} />
      <h2
        className="text-3xl md:text-4xl"
        style={{ fontFamily: tokens.headingFontStack, fontWeight: 500 }}
      >
        {title}
      </h2>
    </div>
  );
}
