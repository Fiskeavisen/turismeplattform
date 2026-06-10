import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Anchor,
  ArrowRight,
  Fish,
  HeartHandshake,
  Landmark,
  Leaf,
  MapPin,
  Mountain,
  Sailboat,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
import { getTheme, themes, type ThemeDefinition } from "@/lib/themes";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildTourismSchema } from "@/lib/seo/schema";
import type { SiteTemplate } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type DemoConfig = {
  slug: string;
  themeId: SiteTemplate;
  heroImage: string;
  heroTitle: string;
  heroText: string;
};

const demoConfigs: DemoConfig[] = [
  {
    slug: "storhavet",
    themeId: "coastal",
    heroImage: norskeBilder.fjordbaat.hero,
    heroTitle: "Bo ved havet på Nordskjær",
    heroText:
      "Moderne hytter med egen båt, havfiske og naturopplevelser mellom fjord, fjell og åpent hav.",
  },
  {
    slug: "skogsro",
    themeId: "fjord",
    heroImage: norskeBilder.kanoVann.hero,
    heroTitle: "Ro, skog og stille vann",
    heroText:
      "Hytter ved skogkanten, turer i fjellet og kvelder ved vannet. Nordskjær i sitt roligste uttrykk.",
  },
  {
    slug: "fyrvokteren",
    themeId: "premium",
    heroImage: norskeBilder.moerkBoelge.hero,
    heroTitle: "Havet, mørket og fyrlyset",
    heroText:
      "Et eksklusivt opphold ytterst mot storhavet, med egen båt, lokale råvarer og personlig vertskap.",
  },
];

const activityIcons: Record<string, LucideIcon> = {
  "rib-safari": Fish,
  kayak: Sailboat,
  "mountain-hike": Mountain,
  "food-night": Landmark,
};

const uspItems: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Anchor, title: "Enkel booking", text: "Se ledighet og book på under ett minutt." },
  { icon: Sailboat, title: "Båt inkludert", text: "Egen motorbåt kan legges til oppholdet." },
  { icon: HeartHandshake, title: "Personlig service", text: "Lokalt vertskap som kjenner kysten." },
  { icon: Leaf, title: "Naturen i fokus", text: "Hav, skog og fjell rett utenfor døra." },
];

export function generateStaticParams() {
  return demoConfigs.map((config) => ({ tema: config.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const config = demoConfigs.find((item) => item.slug === tema);

  if (!config) {
    return {};
  }

  const theme = getTheme(config.themeId);

  return buildMetadata({
    title: {
      nb: `${touristCenter.name} – ${theme.name}-malen | Frimedia demo`,
      en: `${touristCenter.name} – ${theme.name} template | Frimedia demo`,
      de: `${touristCenter.name} – ${theme.name}-Vorlage | Frimedia Demo`,
    },
    description: {
      nb: `Demo av ${theme.name}-malen: ${theme.tagline}`,
      en: `Demo of the ${theme.name} template: ${theme.tagline}`,
      de: `Demo der Vorlage ${theme.name}: ${theme.tagline}`,
    },
    path: `/demo/${config.slug}`,
    image: config.heroImage,
  });
}

export default async function DemoPage({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const config = demoConfigs.find((item) => item.slug === tema);

  if (!config) {
    notFound();
  }

  const theme = getTheme(config.themeId);
  const { tokens } = theme;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const schema = buildTourismSchema(siteUrl);

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
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <DemoBar activeSlug={config.slug} />

      {/* Header */}
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link href={`/demo/${config.slug}`} className="flex items-center gap-3">
          <span
            className="flex size-11 items-center justify-center text-lg font-bold"
            style={{
              background: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: tokens.radiusControl,
            }}
          >
            N
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.2em]">
              {touristCenter.name}
            </span>
            <span className="block text-xs" style={{ color: tokens.mutedText }}>
              {touristCenter.location}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {[
            ["#hytter", "Hytter"],
            ["#opplevelser", "Opplevelser"],
            ["#artikler", "Artikler"],
            ["#om", "Om"],
            ["#kontakt", "Kontakt"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="px-3 py-2.5 transition hover:opacity-70"
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#booking"
          className="inline-flex min-h-12 items-center px-6 text-sm font-semibold transition hover:opacity-90"
          style={{
            background: tokens.primary,
            color: tokens.primaryForeground,
            borderRadius: tokens.radiusControl,
          }}
        >
          Bestill hytte
        </a>
      </header>

      {/* Hero med flytende bookingkort */}
      <section className="mx-auto max-w-7xl px-6 pt-8 text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.4em]"
          style={{ color: tokens.mutedText }}
        >
          {theme.name} · Nordskjær, Vestlandskysten
        </p>
        <h1
          className="mx-auto mt-4 max-w-3xl text-5xl leading-[1.05] tracking-[-0.03em] md:text-6xl"
          style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
        >
          {config.heroTitle}
        </h1>
        <p
          className="mx-auto mt-5 max-w-2xl text-lg leading-8"
          style={{ color: tokens.mutedText }}
        >
          {config.heroText}
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-10">
        <div
          className="h-[26rem] w-full bg-cover bg-center md:h-[30rem]"
          style={{
            backgroundImage: `url('${config.heroImage}')`,
            borderRadius: tokens.radiusCard,
          }}
        />
        <div className="relative z-10 mx-auto -mt-28 max-w-xl md:-mt-36">
          <BookingSearchCard />
        </div>
      </section>

      {/* Opplevelser */}
      <section id="opplevelser" className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle
          theme={theme}
          eyebrow="Opplevelser"
          title="Dager du kommer til å huske"
          text="Havfiske, båtturer, fjell og kystkultur – alt med utgangspunkt i feriesenteret."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => {
            const Icon = activityIcons[activity.id] ?? MapPin;

            return (
              <article
                key={activity.id}
                className="overflow-hidden"
                style={{
                  background: tokens.surface,
                  borderRadius: tokens.radiusCard,
                  border: `1px solid ${tokens.border}`,
                }}
              >
                <div
                  className="h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url('${activity.imageUrl}')` }}
                />
                <div className="relative p-5">
                  <span
                    className="absolute -top-6 left-5 flex size-12 items-center justify-center shadow-lg"
                    style={{
                      background: tokens.accent,
                      color: tokens.accentForeground,
                      borderRadius: tokens.radiusControl,
                    }}
                  >
                    <Icon size={20} />
                  </span>
                  <h3
                    className="mt-5 text-xl"
                    style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
                  >
                    {activity.title.nb}
                  </h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: tokens.mutedText }}>
                    {activity.teaser.nb}
                  </p>
                  <p className="mt-4 text-sm font-semibold">
                    Fra {formatCurrency(activity.priceFrom)}
                    <span className="font-normal" style={{ color: tokens.mutedText }}>
                      {" "}
                      · {activity.duration}
                    </span>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Hytter */}
      <section id="hytter" className="py-20" style={{ background: tokens.surfaceMuted }}>
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            theme={theme}
            eyebrow="Hytter"
            title="Velg hytta som passer dere"
            text="Sju utleieenheter fordelt på to hyttetyper – book med ledighetssjekk og tilvalg."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {accommodations.map((accommodation) => {
              const units = rentalUnits.filter(
                (unit) => unit.accommodationId === accommodation.id && unit.active,
              );

              return (
                <article
                  key={accommodation.id}
                  className="overflow-hidden"
                  style={{
                    background: tokens.surface,
                    borderRadius: tokens.radiusCard,
                    border: `1px solid ${tokens.border}`,
                  }}
                >
                  <div
                    className="h-60 bg-cover bg-center"
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
                    <p className="mt-3 text-sm leading-6" style={{ color: tokens.mutedText }}>
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
                    <a
                      href="#booking"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-70"
                    >
                      Sjekk ledighet <ArrowRight size={15} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artikler + anmeldelser */}
      <section id="artikler" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <SectionTitle
              theme={theme}
              eyebrow="Artikler"
              title="Planlegg turen"
              text="Guider og lokale tips som hjelper gjestene å velge riktig."
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {articles.map((article) => (
                <article key={article.id}>
                  <div
                    className="h-36 bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${article.imageUrl}')`,
                      borderRadius: tokens.radiusCard,
                    }}
                  />
                  <p
                    className="mt-3 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: tokens.mutedText }}
                  >
                    {article.category} · {article.readingMinutes} min
                  </p>
                  <h3
                    className="mt-1.5 text-lg leading-snug"
                    style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
                  >
                    {article.title.nb}
                  </h3>
                </article>
              ))}
            </div>
          </div>

          <div id="om">
            <SectionTitle
              theme={theme}
              eyebrow="Gjester"
              title="Dette sier våre gjester"
            />
            <div className="mt-8 grid gap-4">
              {reviews.map((review) => (
                <figure
                  key={review.id}
                  className="p-5"
                  style={{
                    background: tokens.surface,
                    borderRadius: tokens.radiusCard,
                    border: `1px solid ${tokens.border}`,
                  }}
                >
                  <div className="flex gap-1" style={{ color: tokens.accent }}>
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Star key={index} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm leading-6">
                    “{review.quote.nb}”
                  </blockquote>
                  <figcaption
                    className="mt-3 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: tokens.mutedText }}
                  >
                    {review.guestName} · {review.date}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USP-stripe */}
      <section
        className="py-14"
        style={{ background: tokens.primary, color: tokens.primaryForeground }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {uspItems.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <span
                className="flex size-11 shrink-0 items-center justify-center"
                style={{
                  background: tokens.accent,
                  color: tokens.accentForeground,
                  borderRadius: tokens.radiusControl,
                }}
              >
                <Icon size={19} />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-6 opacity-75">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">{touristCenter.name}</p>
            <p
              className="mt-1 flex items-center gap-2 text-sm"
              style={{ color: tokens.mutedText }}
            >
              <MapPin size={15} /> {touristCenter.location} · {touristCenter.phone} ·{" "}
              {touristCenter.email}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm" style={{ color: tokens.mutedText }}>
            {["Norsk", "English", "Deutsch"].map((language) => (
              <span
                key={language}
                className="px-3 py-1.5"
                style={{
                  border: `1px solid ${tokens.border}`,
                  borderRadius: tokens.radiusControl,
                }}
              >
                {language}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-8 text-xs" style={{ color: tokens.mutedText }}>
          Fiktiv demo bygget på Frimedia turismeplattform.{" "}
          <Link href="/" className="font-semibold underline underline-offset-2">
            Se alle maler og priser
          </Link>
        </p>
      </footer>
    </div>
  );
}

function DemoBar({ activeSlug }: { activeSlug: string }) {
  return (
    <div className="bg-slate-950 px-4 py-2.5 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-sm">
        <Link href="/" className="font-semibold underline-offset-2 hover:underline">
          ← Frimedia turismeplattform
        </Link>
        <div className="flex items-center gap-1.5">
          <span className="mr-1 hidden text-white/60 sm:inline">Bytt mal:</span>
          {demoConfigs.map((config) => {
            const theme = themes.find((item) => item.id === config.themeId);

            return (
              <Link
                key={config.slug}
                href={`/demo/${config.slug}`}
                className={
                  config.slug === activeSlug
                    ? "rounded-full bg-white px-3.5 py-1.5 font-semibold text-slate-950"
                    : "rounded-full px-3.5 py-1.5 text-white/80 hover:bg-white/10 hover:text-white"
                }
              >
                {theme?.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  theme,
  eyebrow,
  title,
  text,
}: {
  theme: ThemeDefinition;
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p
        className="text-xs font-semibold uppercase tracking-[0.3em]"
        style={{ color: theme.tokens.accent }}
      >
        {eyebrow}
      </p>
      <h2
        className="mt-3 text-4xl tracking-[-0.02em]"
        style={{ fontFamily: theme.tokens.headingFontStack, fontWeight: 600 }}
      >
        {title}
      </h2>
      {text ? (
        <p className="mt-3 leading-7" style={{ color: theme.tokens.mutedText }}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
