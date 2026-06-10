import { ArrowRight, Check, Clock, MapPin, Star, Users } from "lucide-react";
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
 * Skogsro: et helt annet oppsett enn Storhavet.
 * Luftig split-hero uten overlay, booking i egen grønn seksjon,
 * opplevelser som redaksjonelle listerader og gjester som sitatband.
 */
export function SkogsroLayout() {
  const theme = getTheme("fjord");
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
      {/* Enkel, rolig header */}
      <header
        className="border-b"
        style={{ borderColor: tokens.border, background: tokens.surface }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight">
            <span
              className="flex size-9 items-center justify-center rounded-lg text-sm"
              style={{ background: tokens.primary, color: tokens.primaryForeground }}
            >
              N
            </span>
            Nordskjær Feriesenter
          </a>
          <nav className="hidden items-center gap-1 text-sm font-medium lg:flex">
            {[
              ["#hytter", "Hytter"],
              ["#opplevelser", "Opplevelser"],
              ["#artikler", "Artikler"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="px-3 py-2.5 hover:opacity-70">
                {label}
              </a>
            ))}
            <a
              href="#booking"
              className="ml-2 inline-flex min-h-11 items-center rounded-[0.625rem] px-5 font-semibold"
              style={{ background: tokens.primary, color: tokens.primaryForeground }}
            >
              Sjekk ledighet
            </a>
          </nav>
        </div>
      </header>

      {/* Split-hero: tekst venstre, bilde høyre */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.35em]"
            style={{ color: tokens.accent }}
          >
            Nordskjær · ved skog og fjell
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Ro, skog og stille vann
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8" style={{ color: tokens.mutedText }}>
            Hytter ved skogkanten, turer i fjellet og kvelder ved vannet.
            Nordskjær i sitt roligste uttrykk.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="inline-flex min-h-12 items-center rounded-[0.625rem] px-6 font-semibold"
              style={{ background: tokens.primary, color: tokens.primaryForeground }}
            >
              Finn ledig hytte
            </a>
            <a
              href="#opplevelser"
              className="inline-flex min-h-12 items-center rounded-[0.625rem] border px-6 font-semibold"
              style={{ borderColor: tokens.border }}
            >
              Se opplevelser
            </a>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
            {[
              ["7", "hytter"],
              ["4", "opplevelser"],
              ["3", "språk"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl p-4"
                style={{ background: tokens.surfaceMuted }}
              >
                <p className="text-2xl font-bold">{value}</p>
                <p style={{ color: tokens.mutedText }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div
            className="h-80 rounded-3xl bg-cover bg-center lg:h-[26rem]"
            style={{ backgroundImage: `url('${norskeBilder.kanoVann.hero}')` }}
          />
          <div className="grid grid-cols-2 gap-4">
            <div
              className="h-36 rounded-3xl bg-cover bg-center"
              style={{ backgroundImage: `url('${norskeBilder.granskog.url}')` }}
            />
            <div
              className="h-36 rounded-3xl bg-cover bg-center"
              style={{ backgroundImage: `url('${norskeBilder.skogshytte.url}')` }}
            />
          </div>
        </div>
      </section>

      {/* Booking i egen grønn seksjon */}
      <section
        className="py-16"
        style={{ background: tokens.primary, color: tokens.primaryForeground }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-[-0.02em]">
              Når vil dere komme?
            </h2>
            <p className="mt-4 leading-7 opacity-80">
              Velg datoer og se hvilke hytter som er ledige. Tilvalg som båt,
              sengetøy og tidlig innsjekk legger du til i samme bestilling.
            </p>
            <div className="mt-6 grid gap-2.5 text-sm">
              {[
                "Svar på e-post med en gang",
                "Betal med Stripe, Vipps eller kort",
                "Gratis avbestilling i 48 timer",
              ].map((item) => (
                <p key={item} className="flex items-center gap-2.5 opacity-90">
                  <Check size={16} style={{ color: tokens.accent }} /> {item}
                </p>
              ))}
            </div>
          </div>
          <BookingSearchCard />
        </div>
      </section>

      {/* Opplevelser som listerader */}
      <section id="opplevelser" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold tracking-[-0.02em]">Opplevelser</h2>
        <p className="mt-3 max-w-xl leading-7" style={{ color: tokens.mutedText }}>
          Rolige dager ute, med utgangspunkt i feriesenteret.
        </p>
        <div className="mt-8 grid">
          {activities.map((activity, index) => (
            <article
              key={activity.id}
              className="grid items-center gap-5 py-6 sm:grid-cols-[8rem_1fr_auto]"
              style={{
                borderTop: index === 0 ? undefined : `1px solid ${tokens.border}`,
              }}
            >
              <div
                className="h-24 w-full rounded-2xl bg-cover bg-center sm:w-32"
                style={{ backgroundImage: `url('${activity.imageUrl}')` }}
              />
              <div>
                <h3 className="text-lg font-bold">{activity.title.nb}</h3>
                <p className="mt-1 text-sm leading-6" style={{ color: tokens.mutedText }}>
                  {activity.teaser.nb}
                </p>
                <div
                  className="mt-2 flex flex-wrap gap-4 text-xs"
                  style={{ color: tokens.mutedText }}
                >
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {activity.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={13} /> Maks {activity.capacity}
                  </span>
                </div>
              </div>
              <p className="text-sm font-bold sm:text-right">
                Fra {formatCurrency(activity.priceFrom)}
                <ArrowRight size={16} className="ml-2 inline" style={{ color: tokens.accent }} />
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Hytter: store vekslende rader */}
      <section id="hytter" className="py-16" style={{ background: tokens.surfaceMuted }}>
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-[-0.02em]">Hyttene våre</h2>
          <div className="mt-8 grid gap-8">
            {accommodations.map((accommodation, index) => {
              const units = rentalUnits.filter(
                (unit) => unit.accommodationId === accommodation.id && unit.active,
              );
              const reversed = index % 2 === 1;

              return (
                <article
                  key={accommodation.id}
                  className="grid overflow-hidden rounded-3xl lg:grid-cols-2"
                  style={{ background: tokens.surface }}
                >
                  <div
                    className={`h-64 bg-cover bg-center lg:h-auto ${reversed ? "lg:order-2" : ""}`}
                    style={{ backgroundImage: `url('${accommodation.imageUrl}')` }}
                  />
                  <div className="p-8 lg:p-10">
                    <h3 className="text-2xl font-bold">{accommodation.title.nb}</h3>
                    <p className="mt-3 leading-7" style={{ color: tokens.mutedText }}>
                      {accommodation.description.nb}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                      <span
                        className="rounded-lg px-3 py-1.5"
                        style={{ background: tokens.surfaceMuted }}
                      >
                        {units.length} enheter
                      </span>
                      {accommodation.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-lg px-3 py-1.5"
                          style={{ background: tokens.surfaceMuted }}
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="text-lg font-bold">
                        Fra {formatCurrency(accommodation.priceFrom)}
                        <span
                          className="text-sm font-normal"
                          style={{ color: tokens.mutedText }}
                        >
                          /natt
                        </span>
                      </p>
                      <a
                        href="#booking"
                        className="inline-flex min-h-11 items-center rounded-[0.625rem] px-5 text-sm font-semibold"
                        style={{ background: tokens.accent, color: tokens.accentForeground }}
                      >
                        Sjekk ledighet
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gjester som sitatband */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="rounded-3xl border p-7"
              style={{ borderColor: tokens.border, background: tokens.surface }}
            >
              <div className="flex gap-1" style={{ color: tokens.accent }}>
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-4 text-lg font-medium leading-8">
                “{review.quote.nb}”
              </blockquote>
              <figcaption
                className="mt-4 text-sm font-semibold"
                style={{ color: tokens.mutedText }}
              >
                {review.guestName} · {review.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Artikler */}
      <section id="artikler" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-7 flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-[-0.02em]">Fra dagboka</h2>
          <span className="text-sm font-semibold" style={{ color: tokens.primary }}>
            Alle artikler →
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id}>
              <div
                className="h-44 rounded-3xl bg-cover bg-center"
                style={{ backgroundImage: `url('${article.imageUrl}')` }}
              />
              <p
                className="mt-3 text-xs font-semibold uppercase tracking-wide"
                style={{ color: tokens.accent }}
              >
                {article.category} · {article.readingMinutes} min
              </p>
              <h3 className="mt-1.5 text-lg font-bold leading-snug">{article.title.nb}</h3>
              <p className="mt-1.5 text-sm leading-6" style={{ color: tokens.mutedText }}>
                {article.excerpt.nb}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer med USP-er */}
      <footer
        id="kontakt"
        className="border-t"
        style={{ borderColor: tokens.border, background: tokens.surface }}
      >
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {uspItems.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon size={20} style={{ color: tokens.primary }} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-0.5 text-xs leading-5" style={{ color: tokens.mutedText }}>
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="mt-10 flex items-center gap-2 border-t pt-6 text-sm"
            style={{ borderColor: tokens.border, color: tokens.mutedText }}
          >
            <MapPin size={15} /> {touristCenter.name} · {touristCenter.location} ·{" "}
            {touristCenter.phone} · NO / EN / DE
          </p>
        </div>
      </footer>
    </div>
  );
}
