import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarCheck,
  Check,
  Globe2,
  LayoutDashboard,
  Search,
  ShoppingBag,
} from "lucide-react";
import { norskeBilder } from "@/lib/images";
import { salesPackages } from "@/lib/sales-packages";
import { themes, type ThemeDefinition } from "@/lib/themes";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: {
    nb: "Frimedia turismeplattform | Nettsider som selger norske opplevelser",
    en: "Frimedia tourism platform | Websites that sell Norwegian experiences",
    de: "Frimedia Tourismusplattform | Websites, die norwegische Erlebnisse verkaufen",
  },
  description: {
    nb: "Komplett nettside med booking, mersalg, tre språk, SEO/AEO og eget adminpanel for norske reiselivsbedrifter. Se tre klikkbare demoer.",
    en: "Complete website with booking, upsells, three languages, SEO/AEO and an admin panel for Norwegian tourism businesses.",
    de: "Komplette Website mit Buchung, Zusatzverkauf, drei Sprachen, SEO/AEO und Admin-Panel für norwegische Tourismusbetriebe.",
  },
});

const demoSlugByTheme: Record<string, string> = {
  coastal: "storhavet",
  fjord: "skogsro",
  premium: "fyrvokteren",
};

const features = [
  {
    icon: CalendarCheck,
    title: "Booking med ledighetssjekk",
    text: "Gjesten velger datoer, ser hvilke hytter som er ledige og booker en konkret enhet – ikke bare en forespørsel.",
  },
  {
    icon: ShoppingBag,
    title: "Tilvalg og mersalg",
    text: "Båt, sengetøy, sluttrenhold og tidlig innsjekk legges til i bookingen med automatisk prisberegning.",
  },
  {
    icon: Globe2,
    title: "Tre språk",
    text: "Norsk, engelsk og tysk er bygget inn i innholdsmodellen fra dag én – ikke limt på i etterkant.",
  },
  {
    icon: Search,
    title: "SEO og AEO",
    text: "Strukturerte data, FAQ, artikler og metadata gjør siden synlig i Google og i AI-svartjenester.",
  },
  {
    icon: LayoutDashboard,
    title: "Adminpanel",
    text: "Kunden styrer bookinger, priser, tilvalg, innhold og design selv – uten utvikler.",
  },
  {
    icon: BarChart3,
    title: "Statistikk",
    text: "Trafikkilder, konvertering og AEO-score samlet på ett sted, klart for rapportering.",
  },
];

const steps = [
  {
    step: "1",
    title: "Vi setter opp",
    text: "Kundens innhold, bilder og merkevare legges inn i valgt mal. Klart på dager, ikke måneder.",
  },
  {
    step: "2",
    title: "Kunden redigerer selv",
    text: "Tekst, priser, tilvalg og design styres fra adminpanelet med venstremeny og forhåndsvisning.",
  },
  {
    step: "3",
    title: "Gjestene booker",
    text: "Booking med ledighet, tilvalg og bekreftelse på e-post – på tre språk.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* Toppmeny */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-bold uppercase tracking-[0.25em]">
            Frimedia<span className="text-slate-400"> · Turismeplattform</span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-medium text-slate-700 md:flex">
            {[
              ["#maler", "Maler"],
              ["#funksjoner", "Funksjoner"],
              ["#pakker", "Pakker"],
              ["#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-full px-3.5 py-2.5 hover:bg-slate-100">
                {label}
              </a>
            ))}
          </nav>
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-5 text-sm font-semibold hover:bg-slate-50"
          >
            Logg inn
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-16 md:pt-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Nettsider for norsk reiseliv
          </p>
          <h1
            className="mt-5 text-5xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-7xl"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Nettsider som selger norske opplevelser.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Én plattform med booking, mersalg, tre språk og eget adminpanel –
            levert i tre gjennomarbeidede design inspirert av norsk kyst, skog
            og fjell. Klikk deg gjennom demoene og se hvordan kundens side blir.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#maler"
              className="inline-flex min-h-13 items-center gap-2 rounded-full bg-slate-950 px-7 text-base font-semibold text-white hover:bg-slate-800"
            >
              Se demoene <ArrowRight size={18} />
            </a>
            <a
              href="#pakker"
              className="inline-flex min-h-13 items-center gap-2 rounded-full border border-slate-300 px-7 text-base font-semibold hover:bg-slate-50"
            >
              Pakker og priser
            </a>
          </div>
        </div>

        <div
          className="mt-14 h-[24rem] rounded-[2rem] bg-cover bg-center md:h-[30rem]"
          style={{ backgroundImage: `url('${norskeBilder.rorbuerKyst.hero}')` }}
          role="img"
          aria-label={norskeBilder.rorbuerKyst.motiv}
        />
      </section>

      {/* Tre maler */}
      <section id="maler" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Tre maler
          </p>
          <h2
            className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Velg uttrykk. Innholdet og bookingen er den samme.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Hver demo er en fullt fungerende nettside med booking, tilvalg og
            innhold. Kunden kan bytte mal når som helst uten å miste noe.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {themes.map((theme) => (
            <TemplateCard key={theme.id} theme={theme} demoSlug={demoSlugByTheme[theme.id]} />
          ))}
        </div>
      </section>

      {/* Funksjoner */}
      <section id="funksjoner" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Funksjoner
            </p>
            <h2
              className="mt-4 text-4xl font-semibold tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Alt en reiselivsbedrift trenger for å selge på nett.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl bg-white p-7 ring-1 ring-slate-200">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Icon size={21} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-5 rounded-[2rem] bg-slate-950 p-8 text-white md:grid-cols-3 md:p-10">
            {steps.map(({ step, title, text }) => (
              <div key={step}>
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold">
                  {step}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakker */}
      <section id="pakker" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Pakker
          </p>
          <h2
            className="mt-4 text-4xl font-semibold tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Tre nivåer. Ett tydelig tilbud.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Prisene er utgangspunkt for tilbud og justeres etter innhold,
            integrasjoner og designnivå.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {salesPackages.map((salesPackage) => {
            const highlighted = salesPackage.id === "proff";

            return (
              <article
                key={salesPackage.id}
                className={
                  highlighted
                    ? "relative rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-950/20"
                    : "rounded-[2rem] bg-white p-8 ring-1 ring-slate-200"
                }
              >
                {highlighted ? (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-amber-300 px-4 py-1.5 text-xs font-bold text-slate-950">
                    Mest valgt
                  </span>
                ) : null}
                <p
                  className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                    highlighted ? "text-amber-200" : "text-slate-500"
                  }`}
                >
                  {salesPackage.name}
                </p>
                <p className="mt-4 text-3xl font-semibold">{salesPackage.priceRange}</p>
                <p
                  className={`mt-4 text-sm leading-6 ${
                    highlighted ? "text-white/75" : "text-slate-600"
                  }`}
                >
                  {salesPackage.description}
                </p>
                <div className="mt-7 grid gap-2.5">
                  {salesPackage.features.map((feature) => (
                    <p key={feature} className="flex gap-2.5 text-sm">
                      <Check
                        size={17}
                        className={`mt-0.5 shrink-0 ${
                          highlighted ? "text-amber-300" : "text-emerald-600"
                        }`}
                      />
                      {feature}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Kontakt / CTA */}
      <section id="kontakt" className="scroll-mt-24 px-6 pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-slate-950 text-white">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url('${norskeBilder.nordlysSkog.hero}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative px-8 py-16 text-center md:py-20">
            <h2
              className="mx-auto max-w-2xl text-4xl font-semibold tracking-[-0.03em] md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Klar til å vise kunden hvordan siden deres kan se ut?
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/75">
              Demoene over er bygget på samme grunnmur som leveres til kunde.
              Book en gjennomgang, så setter vi opp et utkast med kundens eget innhold.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://frimedia.no"
                className="inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-slate-950 hover:bg-slate-100"
              >
                Book en demo <ArrowUpRight size={18} />
              </a>
              <Link
                href="/demo/storhavet"
                className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/30 px-7 text-base font-semibold text-white hover:bg-white/10"
              >
                Prøv bookingflyten selv
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-slate-950">Frimedia · Turismeplattform</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/demo/storhavet" className="hover:text-slate-950">
              Demo: Storhavet
            </Link>
            <Link href="/demo/skogsro" className="hover:text-slate-950">
              Demo: Skogsro
            </Link>
            <Link href="/demo/fyrvokteren" className="hover:text-slate-950">
              Demo: Fyrvokteren
            </Link>
            <Link href="/login" className="hover:text-slate-950">
              Kundeportal
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function TemplateCard({ theme, demoSlug }: { theme: ThemeDefinition; demoSlug: string }) {
  const { tokens } = theme;

  return (
    <Link
      href={`/demo/${demoSlug}`}
      className="group overflow-hidden rounded-[2rem] ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10"
    >
      {/* Miniatyr-preview i malens egne tokens */}
      <div
        className="p-6"
        style={{
          background: tokens.background,
          color: tokens.text,
          fontFamily: tokens.bodyFontStack,
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="flex size-8 items-center justify-center text-xs font-bold"
            style={{
              background: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: tokens.radiusControl,
            }}
          >
            N
          </span>
          <span
            className="px-3.5 py-1.5 text-xs font-semibold"
            style={{
              background: tokens.primary,
              color: tokens.primaryForeground,
              borderRadius: tokens.radiusControl,
            }}
          >
            Bestill hytte
          </span>
        </div>
        <p
          className="mt-5 text-2xl leading-tight"
          style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
        >
          Bo ved havet på Nordskjær
        </p>
        <div
          className="mt-4 flex items-center justify-between gap-3 p-3.5 text-xs"
          style={{
            background: tokens.surface,
            border: `1px solid ${tokens.border}`,
            borderRadius: tokens.radiusCard,
          }}
        >
          <span style={{ color: tokens.mutedText }}>Ankomst · Avreise · 2 gjester</span>
          <span
            className="shrink-0 px-3 py-1.5 font-semibold"
            style={{
              background: tokens.accent,
              color: tokens.accentForeground,
              borderRadius: tokens.radiusControl,
            }}
          >
            Søk
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="border-t border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">{theme.name}</h3>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-slate-950">
            Åpne demoen{" "}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600">{theme.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {theme.idealFor.slice(0, 2).map((item) => (
            <span
              key={item}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
