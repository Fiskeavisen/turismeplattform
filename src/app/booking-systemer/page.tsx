import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Check,
  Globe2,
  Hotel,
  Network,
  PlugZap,
  ShieldCheck,
  Store,
  UsersRound,
} from "lucide-react";
import { norskeBilder } from "@/lib/images";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: {
    nb: "Booking systemer for reiseliv | Frimedia turismeplattform",
    en: "Booking systems for tourism | Frimedia tourism platform",
    de: "Buchungssysteme für Tourismus | Frimedia Tourismusplattform",
  },
  description: {
    nb: "Eget bookingsystem for overnatting og opplevelser, med partnernettverk, admin, betaling og mulighet for kobling mot Airbnb, Booking.com, Hotels.com og kanalmanagere.",
    en: "Booking platform for accommodation and experiences with partner network, admin, payments and channel integrations.",
    de: "Buchungsplattform für Unterkünfte und Erlebnisse mit Partnernetzwerk, Admin, Zahlung und Kanalintegrationen.",
  },
  path: "/booking-systemer",
  image: norskeBilder.fjordbaat.hero,
});

const benefits = [
  {
    icon: CalendarClock,
    title: "Forenklet planlegging",
    text: "Samle kalender, kapasitet, priser og tilvalg på ett sted, slik at partneren bruker mindre tid på administrasjon.",
  },
  {
    icon: Globe2,
    title: "Global rekkevidde",
    text: "Publiser produkter i egne sider og klargjør dem for distribusjon i relevante salgskanaler.",
  },
  {
    icon: ShieldCheck,
    title: "Full kontroll",
    text: "Følg kundedata, ordre, betaling og leveranse fra første forespørsel til gjennomført opplevelse.",
  },
  {
    icon: Network,
    title: "Skalerbart nettverk",
    text: "La én aktør starte enkelt, eller koble mange partnere sammen i et felles booking- og salgsapparat.",
  },
];

const modules = [
  "Sanntidsbooking for opplevelser, turer, kurs og overnatting",
  "Egen partnerportal med produkter, kapasitet, priser og innhold",
  "Betaling, depositum, gavekort og tilvalg via betalingsadaptere",
  "Kundelister, språk, e-postmaler og profesjonell oppfølging",
  "Rapporter for salg, belegg, trafikkilder og kampanjer",
  "SEO/AEO-klare landingssider for produkter, steder og tema",
];

const integrations = [
  {
    icon: Store,
    title: "Egen salgsside",
    text: "Kunden kan selge direkte på sin egen side med lavere avhengighet av provisjonskanaler.",
  },
  {
    icon: Hotel,
    title: "Overnattingskanaler",
    text: "Booking.com, Airbnb, Hotels.com og lignende kan kobles på via channel manager eller tilgjengelige partner-API-er.",
  },
  {
    icon: UsersRound,
    title: "Opplevelseskanaler",
    text: "Turer og aktiviteter kan struktureres for eksterne markedsplasser, destinasjonssider og kampanjer.",
  },
  {
    icon: PlugZap,
    title: "Åpen adaptermodell",
    text: "Plattformen har egne adapterpunkter, slik at nye kanaler kan legges til uten å bygge om hele bookingsystemet.",
  },
];

const steps = [
  {
    label: "1",
    title: "Kartlegg tilbudet",
    text: "Vi definerer produkter, kapasitet, sesong, priser, tilvalg og hvilke kanaler som faktisk skal brukes.",
  },
  {
    label: "2",
    title: "Sett opp plattformen",
    text: "Partnerne får egne sider og adminverktøy. Innhold, bookingregler og betalingsflyt legges inn.",
  },
  {
    label: "3",
    title: "Koble på markedet",
    text: "Direktesalg aktiveres først. Deretter kobles eksterne kanaler inn der tekniske avtaler og API-tilgang finnes.",
  },
];

export default function BookingSystemsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-bold uppercase tracking-[0.25em]">
            Frimedia<span className="text-slate-400"> · Turismeplattform</span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-medium text-slate-700 md:flex">
            {[
              ["/#maler", "Maler"],
              ["/#funksjoner", "Funksjoner"],
              ["/pakker", "Pakker"],
              ["/#kontakt", "Kontakt"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-full px-3.5 py-2.5 hover:bg-slate-100">
                {label}
              </Link>
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

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pt-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Booking systemer
          </p>
          <h1
            className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-7xl"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            Gjør lidenskap til butikk. Vi tar oss av teknikken.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Bygg en felles bookingplattform for overnatting, opplevelser og
            lokale partnere. Selg direkte, administrer enklere og koble deg på
            kanalene gjestene allerede bruker.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="inline-flex min-h-13 items-center gap-2 rounded-full bg-slate-950 px-7 text-base font-semibold text-white hover:bg-slate-800"
            >
              Ønsker du en demo? <ArrowRight size={18} />
            </a>
            <a
              href="#integrasjoner"
              className="inline-flex min-h-13 items-center gap-2 rounded-full border border-slate-300 px-7 text-base font-semibold hover:bg-slate-50"
            >
              Se integrasjoner
            </a>
            <Link
              href="/ledig-sok"
              className="inline-flex min-h-13 items-center gap-2 rounded-full border border-slate-300 px-7 text-base font-semibold hover:bg-slate-50"
            >
              Søk ledig dato
            </Link>
            <Link
              href="/markedsplass"
              className="inline-flex min-h-13 items-center gap-2 rounded-full border border-slate-300 px-7 text-base font-semibold hover:bg-slate-50"
            >
              Test markedsplass
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-4 text-white shadow-2xl shadow-slate-950/20">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url('${norskeBilder.fjordbaat.hero}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            role="img"
            aria-label={norskeBilder.fjordbaat.motiv}
          />
          <div className="relative ml-auto max-w-md rounded-[2rem] bg-white/95 p-6 text-slate-950 shadow-xl backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  Helgeland Connect
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Partnernettverk</h2>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                Live
              </span>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                ["Aktive partnere", "48"],
                ["Bookingkanaler", "Direkte + eksterne"],
                ["Neste innsjekk", "I dag 15:00"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="text-sm text-slate-500">{label}</span>
                  <strong className="text-sm">{value}</strong>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
              <p className="text-sm font-semibold">Ny ordre fra felles salgskanal</p>
              <p className="mt-1 text-sm text-white/70">
                Kajakktur, 4 gjester, betalt og klar for leveranse.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Hvorfor velge oss?
            </p>
            <h2
              className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Et digitalt hjerte for hele partnernettverket.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              I en digital reiselivshverdag er avstanden mellom en god idé og
              et solgt produkt ofte for lang. Plattformen tetter gapet mellom
              planlegging, salg og faktisk leveranse.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl bg-white p-7 ring-1 ring-slate-200">
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Icon size={21} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 rounded-[2.5rem] bg-slate-950 p-8 text-white md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
              Plattform
            </p>
            <h2
              className="mt-4 text-4xl font-semibold tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Fra første idé til gjennomført opplevelse.
            </h2>
            <p className="mt-5 leading-7 text-white/70">
              Systemet kan brukes som komplett bookingmotor eller som en
              fleksibel modul for kunder som bare vil koble seg på bookingdelen.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {modules.map((module) => (
              <p key={module} className="flex gap-3 rounded-2xl bg-white/10 p-4 text-sm leading-6">
                <Check className="mt-0.5 shrink-0 text-amber-300" size={17} />
                {module}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="integrasjoner" className="scroll-mt-24 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              Integrasjoner
            </p>
            <h2
              className="mt-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Snakker med egne sider, partnere og eksterne bookingaktører.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Vi bygger ikke et lukket system. Plattformen er laget for å
              sende og motta bookingdata gjennom adaptere, channel manager og
              API-er når kanalene tilbyr teknisk tilgang.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {integrations.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl bg-white p-7 ring-1 ring-slate-200">
                <Icon className="text-sky-900" size={28} />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  Viktig om Airbnb, Booking.com og Hotels.com
                </p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Slike kanaler krever normalt godkjent API-tilgang,
                  partneravtale eller en etablert channel manager. Derfor
                  planlegger vi integrasjonen per kunde, slik at kalender,
                  priser og kapasitet håndteres riktig.
                </p>
              </div>
              <Link
                href="/#kontakt"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-slate-300 px-5 text-sm font-semibold hover:bg-slate-50"
              >
                Snakk med oss <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.label} className="rounded-[2rem] bg-white p-8 ring-1 ring-slate-200">
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                {step.label}
              </span>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="kontakt" className="scroll-mt-24 px-6 pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-slate-950 text-white">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url('${norskeBilder.nordlysVinter.hero}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative px-8 py-16 text-center md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200">
              Klar for en ny hverdag?
            </p>
            <h2
              className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.03em] md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              La oss koble deg på verden.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/75">
              Ønsker du en demo, eller er du usikker på hvilke digitale behov
              partnernettverket ditt har? Vi kan kartlegge løsningen og vise
              hvordan bookingsystemet kan settes opp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="https://frimedia.no"
                className="inline-flex min-h-13 items-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-slate-950 hover:bg-slate-100"
              >
                Book en demo <ArrowUpRight size={18} />
              </a>
              <Link
                href="/ledig-sok"
                className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/30 px-7 text-base font-semibold text-white hover:bg-white/10"
              >
                Prøv felles ledighetssøk
              </Link>
              <Link
                href="/markedsplass"
                className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/30 px-7 text-base font-semibold text-white hover:bg-white/10"
              >
                Åpne baksiden
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-slate-950">Frimedia · Turismeplattform</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/" className="hover:text-slate-950">
              Forside
            </Link>
            <Link href="/pakker" className="hover:text-slate-950">
              Pakker
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
