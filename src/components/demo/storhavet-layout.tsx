import { ArrowRight, MapPin, Star } from "lucide-react";
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
import { activityIcons, fallbackActivityIcon, uspItems } from "./shared";

/**
 * Storhavet: bygget etter den godkjente skissen.
 * Lys hero med headline over kystbilde, flytende horisontalt søkekort,
 * fire opplevelseskort med ikon-badge, artikler + gjester side om side
 * og USP-stripe i bunn.
 */
export function StorhavetLayout() {
  const theme = getTheme("coastal");
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
      {/* Hero med header og tekst over kystbilde */}
      <section className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${norskeBilder.rorbuerKyst.hero}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(247,243,235,0.96) 0%, rgba(247,243,235,0.82) 28%, rgba(247,243,235,0.35) 55%, rgba(247,243,235,0.05) 80%)",
          }}
        />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6">
          <a href="#" className="leading-none" style={{ color: tokens.primary }}>
            <span
              className="block text-3xl tracking-tight"
              style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
            >
              Nordskjær
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.5em]">
              Feriesenter
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 text-sm font-medium lg:flex"
            style={{ color: tokens.text }}
          >
            {[
              ["#hytter", "Hytter"],
              ["#opplevelser", "Opplevelser"],
              ["#artikler", "Artikler"],
              ["#om", "Om Nordskjær"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="px-3 py-2.5 transition hover:opacity-70">
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#booking"
            className="inline-flex min-h-12 items-center px-6 text-sm font-semibold shadow-lg shadow-slate-950/10 transition hover:opacity-90"
            style={{
              background: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: tokens.radiusControl,
            }}
          >
            Bestill hytte
          </a>
        </header>

        <div className="relative mx-auto max-w-7xl px-6 pb-44 pt-14 md:pb-52 md:pt-20">
          <h1
            className="max-w-xl text-5xl leading-[1.05] tracking-[-0.03em] md:text-7xl"
            style={{ fontFamily: tokens.headingFontStack, fontWeight: 600, color: tokens.primary }}
          >
            Bo ved havet på Nordskjær
          </h1>
          <p className="mt-5 max-w-sm text-lg leading-8" style={{ color: tokens.text }}>
            Moderne hytter, fisketurer og naturopplevelser mellom fjord, fjell
            og Atlanterhavet.
          </p>
        </div>
      </section>

      {/* Flytende horisontalt søkekort */}
      <div className="relative z-10 mx-auto -mt-24 max-w-5xl px-6 md:-mt-20">
        <BookingSearchCard variant="bar" />
      </div>

      {/* Fire opplevelseskort med ikon-badge */}
      <section id="opplevelser" className="mx-auto max-w-7xl px-6 pb-8 pt-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.id] ?? fallbackActivityIcon;

            return (
              <article
                key={activity.id}
                className="overflow-hidden bg-white shadow-sm ring-1 ring-slate-950/5"
                style={{ borderRadius: tokens.radiusCard }}
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url('${activity.imageUrl}')` }}
                />
                <div className="relative p-5">
                  <span
                    className="absolute -top-6 left-5 flex size-12 items-center justify-center rounded-full shadow-lg"
                    style={{ background: tokens.accent, color: tokens.accentForeground }}
                  >
                    <Icon size={20} />
                  </span>
                  <h3
                    className="mt-5 text-lg"
                    style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
                  >
                    {activity.title.nb}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: tokens.mutedText }}>
                    {activity.teaser.nb}
                  </p>
                  {activity.sellStandalone ? (
                    <span
                      className="mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ background: tokens.surfaceMuted, color: tokens.primary }}
                    >
                      Kan kjøpes uten opphold
                    </span>
                  ) : null}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold">Fra {formatCurrency(activity.priceFrom)}</span>
                    <ArrowRight size={16} style={{ color: tokens.primary }} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Hytter */}
      <section id="hytter" className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2
            className="text-3xl tracking-[-0.02em]"
            style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
          >
            Velg hytta som passer dere
          </h2>
          <a href="#booking" className="text-sm font-semibold" style={{ color: tokens.primary }}>
            Se ledighet →
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {accommodations.map((accommodation) => {
            const units = rentalUnits.filter(
              (unit) => unit.accommodationId === accommodation.id && unit.active,
            );

            return (
              <article
                key={accommodation.id}
                className="overflow-hidden bg-white shadow-sm ring-1 ring-slate-950/5"
                style={{ borderRadius: tokens.radiusCard }}
              >
                <div
                  className="h-56 bg-cover bg-center"
                  style={{ backgroundImage: `url('${accommodation.imageUrl}')` }}
                />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className="text-2xl"
                      style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
                    >
                      {accommodation.title.nb}
                    </h3>
                    <span
                      className="inline-flex shrink-0 items-center px-3 py-1.5 text-xs font-semibold"
                      style={{
                        background: tokens.accent,
                        color: tokens.accentForeground,
                        borderRadius: tokens.radiusControl,
                      }}
                    >
                      Fra {formatCurrency(accommodation.priceFrom)}/natt
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6" style={{ color: tokens.mutedText }}>
                    {accommodation.description.nb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                    <span
                      className="px-3 py-1.5"
                      style={{
                        background: tokens.primary,
                        color: tokens.primaryForeground,
                        borderRadius: tokens.radiusControl,
                      }}
                    >
                      {units.length} enheter
                    </span>
                    {accommodation.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1.5"
                        style={{
                          border: `1px solid ${tokens.border}`,
                          borderRadius: tokens.radiusControl,
                        }}
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Artikler + gjester side om side, som i skissen */}
      <section id="artikler" className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-end justify-between">
              <h2
                className="text-2xl tracking-[-0.02em]"
                style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
              >
                Siste artikler
              </h2>
              <span className="text-sm font-semibold" style={{ color: tokens.primary }}>
                Se alle artikler →
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {articles.map((article) => (
                <article key={article.id}>
                  <div
                    className="h-28 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${article.imageUrl}')`,
                      borderRadius: tokens.radiusCard,
                    }}
                  />
                  <p
                    className="mt-2.5 text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color: tokens.accent }}
                  >
                    {article.category}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold leading-snug">{article.title.nb}</h3>
                  <p className="mt-1 text-xs" style={{ color: tokens.mutedText }}>
                    {article.readingMinutes} min lesetid
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div id="om">
            <div className="mb-6 flex items-end justify-between">
              <h2
                className="text-2xl tracking-[-0.02em]"
                style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
              >
                Dette sier våre gjester
              </h2>
              <span className="text-sm font-semibold" style={{ color: tokens.primary }}>
                Se alle anmeldelser →
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.map((review) => (
                <figure
                  key={review.id}
                  className="bg-white p-5 shadow-sm ring-1 ring-slate-950/5"
                  style={{ borderRadius: tokens.radiusCard }}
                >
                  <div className="flex items-center gap-1.5" style={{ color: tokens.accent }}>
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                    <span className="ml-1 text-xs font-semibold" style={{ color: tokens.mutedText }}>
                      {review.rating}/5
                    </span>
                  </div>
                  <blockquote className="mt-3 text-sm leading-6">
                    “{review.quote.nb}”
                  </blockquote>
                  <figcaption className="mt-4 flex items-center gap-2.5">
                    <span
                      className="flex size-8 items-center justify-center rounded-full text-xs font-bold"
                      style={{ background: tokens.primary, color: tokens.primaryForeground }}
                    >
                      {review.guestName.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-xs font-semibold">{review.guestName}</span>
                      <span className="block text-[11px]" style={{ color: tokens.mutedText }}>
                        {review.date}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USP-stripe i bunn */}
      <section
        className="mt-10 border-t bg-white"
        style={{ borderColor: tokens.border }}
      >
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {uspItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3.5">
              <Icon size={22} style={{ color: tokens.accent }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-0.5 text-xs leading-5" style={{ color: tokens.mutedText }}>
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        id="kontakt"
        className="bg-white"
        style={{ borderTop: `1px solid ${tokens.border}` }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2" style={{ color: tokens.mutedText }}>
            <MapPin size={15} /> {touristCenter.name} · {touristCenter.location} ·{" "}
            {touristCenter.phone}
          </p>
          <p style={{ color: tokens.mutedText }}>NO / EN / DE</p>
        </div>
      </footer>
    </div>
  );
}
