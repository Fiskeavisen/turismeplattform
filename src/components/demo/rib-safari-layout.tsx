import type { CSSProperties } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Gauge,
  LifeBuoy,
  ShieldCheck,
  ShipWheel,
  Sparkles,
  Users,
  Waves,
  Wind,
} from "lucide-react";
import { norskeBilder } from "@/lib/images";
import { getTheme } from "@/lib/themes";
import { formatCurrency } from "@/lib/utils";

const ribTours = [
  {
    title: "Fyr og havgap",
    kicker: "Signaturtur",
    duration: "2 timer",
    capacity: 12,
    speed: "50 knop",
    priceFrom: 990,
    imageUrl: norskeBilder.moerkBoelge.url,
    description:
      "Ut gjennom skjærgården, forbi gamle fyr og helt ut der fjorden møter storhavet.",
  },
  {
    title: "Fjord og fossefall",
    kicker: "Mest natur",
    duration: "3 timer",
    capacity: 10,
    speed: "45 knop",
    priceFrom: 1290,
    imageUrl: norskeBilder.fjordbaat.url,
    description:
      "En rå, men trygg fjordtur med bratte fjellsider, fossefall og stopp for bilder.",
  },
  {
    title: "Midnatt i skjærgården",
    kicker: "Kveldspuls",
    duration: "90 min",
    capacity: 12,
    speed: "40 knop",
    priceFrom: 790,
    imageUrl: norskeBilder.seilbaatNatt.url,
    description:
      "Kortere kveldssafari med lav sol, blankt hav og høy wow-faktor for grupper.",
  },
];

const routeStops = [
  {
    label: "01",
    title: "Start ved kaia",
    text: "Oppmøte, sikkerhetsbrief og utstyr før skipperen leser dagens sjø.",
  },
  {
    label: "02",
    title: "Ut i fjorden",
    text: "Fart når forholdene tillater det, roligere stopp der naturen fortjener tid.",
  },
  {
    label: "03",
    title: "Fyr, fugl og havgap",
    text: "Lokale historier, fotostopp og ruter som justeres etter vær og gruppe.",
  },
  {
    label: "04",
    title: "Tilbake med puls",
    text: "Landing ved kaia med bilder, varme drikker og tips til neste opplevelse.",
  },
];

const safetyItems = [
  { icon: LifeBuoy, title: "Utstyr inkludert", text: "Flytedress, redningsvest og briller ligger klart." },
  { icon: ShieldCheck, title: "Trygg skipper", text: "Lokalkjent fører vurderer rute, fart og stopp underveis." },
  { icon: Wind, title: "Værvurdering", text: "Turen kjøres bare når forholdene gir en god og trygg opplevelse." },
  { icon: Users, title: "Grupper og firma", text: "Kapasitet, språk og tempo kan tilpasses reisefølget." },
];

const trustStats = [
  ["12", "gjester per RIB"],
  ["4.9", "snitt fra gjester"],
  ["15 min", "sikkerhetsbrief"],
];

export function RibSafariLayout() {
  const theme = getTheme("rib");
  const { tokens } = theme;

  const cssVars = {
    "--demo-primary": tokens.primary,
    "--demo-primary-fg": tokens.primaryForeground,
  } as CSSProperties;

  return (
    <div
      style={{
        ...cssVars,
        background: tokens.background,
        color: tokens.text,
        fontFamily: tokens.bodyFontStack,
      }}
    >
      <section className="relative min-h-screen overflow-hidden">
        <video
          className="absolute inset-0 size-full object-cover"
          src="/media/rib-safari-hero.mp4"
          poster={norskeBilder.moerkBoelge.hero}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(117,216,255,0.25),transparent_32%),linear-gradient(105deg,rgba(7,16,24,0.96)_0%,rgba(7,16,24,0.72)_42%,rgba(7,16,24,0.18)_78%)]" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-full"
              style={{ background: tokens.primary, color: tokens.primaryForeground }}
            >
              <Waves size={22} />
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.22em]">
                Fjordpuls
              </span>
              <span className="mt-1 block text-xs text-white/65">RIB safari demo</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-bold lg:flex">
            {[
              ["#booking", "Book"],
              ["#turer", "Turer"],
              ["#rute", "Rute"],
              ["#sikkerhet", "Sikkerhet"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-full px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-end gap-10 px-5 pb-8 pt-16 lg:grid-cols-[1fr_26rem] lg:px-8 lg:pb-12">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white/90 backdrop-blur">
              <Sparkles size={14} style={{ color: tokens.primary }} /> Videohero · RIB · Fjord
            </p>
            <h1
              className="mt-6 text-6xl font-black leading-[0.9] tracking-[-0.06em] text-white md:text-8xl lg:text-9xl"
              style={{ fontFamily: tokens.headingFontStack }}
            >
              Kjenn fjorden i 50 knop.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/78 md:text-xl">
              RIB-safari med lokalkjent skipper, trygge rammer og rå natur tett
              på kroppen. Denne malen er laget for opplevelser som skal selges
              med puls, tillit og direkte booking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="inline-flex min-h-13 items-center gap-2 rounded-full px-7 text-base font-black shadow-2xl shadow-orange-950/30 transition hover:-translate-y-0.5"
                style={{ background: tokens.primary, color: tokens.primaryForeground }}
              >
                Book RIB-safari <ArrowRight size={18} />
              </a>
              <a className="inline-flex min-h-13 items-center rounded-full border border-white/25 px-7 text-base font-bold text-white hover:bg-white/10" href="#sikkerhet">
                Se sikkerhet
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <p className="flex items-center gap-2 text-sm font-bold text-white/70">
              <Gauge size={16} style={{ color: tokens.accent }} /> Dagens forhold
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                ["Vind", "4 m/s"],
                ["Sjø", "Rolig"],
                ["Neste", "16:30"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/10 p-3">
                  <p className="text-xs text-white/55">{label}</p>
                  <p className="mt-1 font-black text-white">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              {trustStats.map(([value, label]) => (
                <p key={label} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                  <span className="text-sm text-white/60">{label}</span>
                  <span className="text-lg font-black text-white">{value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="relative z-20 mx-auto -mt-8 max-w-7xl px-5 lg:px-8">
        <div className="grid gap-5 rounded-[2rem] border p-4 shadow-2xl shadow-black/25 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto] lg:items-end" style={{ borderColor: tokens.border, background: tokens.surface }}>
          <div>
            <label className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: tokens.mutedText }}>
              Velg tur
            </label>
            <select className="mt-2 h-12 w-full rounded-full border bg-white/5 px-4 text-sm font-bold text-white outline-none" style={{ borderColor: tokens.border }}>
              {ribTours.map((tour) => (
                <option key={tour.title} className="bg-slate-950 text-white">
                  {tour.title} · fra {formatCurrency(tour.priceFrom)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: tokens.mutedText }}>
              Dato
            </label>
            <input type="date" className="mt-2 h-12 w-full rounded-full border bg-white/5 px-4 text-sm font-bold text-white outline-none" style={{ borderColor: tokens.border }} />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: tokens.mutedText }}>
              Personer
            </label>
            <select className="mt-2 h-12 w-full rounded-full border bg-white/5 px-4 text-sm font-bold text-white outline-none" style={{ borderColor: tokens.border }}>
              {[2, 3, 4, 5, 6, 8, 10, 12].map((count) => (
                <option key={count} className="bg-slate-950 text-white">
                  {count} personer
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: tokens.mutedText }}>
              Tid
            </label>
            <select className="mt-2 h-12 w-full rounded-full border bg-white/5 px-4 text-sm font-bold text-white outline-none" style={{ borderColor: tokens.border }}>
              {["10:00", "13:00", "16:30", "20:00"].map((time) => (
                <option key={time} className="bg-slate-950 text-white">
                  {time}
                </option>
              ))}
            </select>
          </div>
          <a
            href="#kontakt"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-black"
            style={{ background: tokens.primary, color: tokens.primaryForeground }}
          >
            Sjekk plass <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section id="turer" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: tokens.primary }}>
              Tre turer · samme motor
            </p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Velg adrenalinnivå. Vi tar sikkerheten.
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-7" style={{ color: tokens.mutedText }}>
            Hver tur presenteres som et tydelig salgbart produkt med pris,
            kapasitet og varighet, slik at gjesten raskt finner riktig nivå.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {ribTours.map((tour) => (
            <article key={tour.title} className="group overflow-hidden rounded-[2rem] border" style={{ borderColor: tokens.border, background: tokens.surface }}>
              <div className="relative h-72 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${tour.imageUrl}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <p className="absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.18em]" style={{ background: tokens.primary, color: tokens.primaryForeground }}>
                  {tour.kicker}
                </p>
                <p className="absolute bottom-5 left-5 text-4xl font-black tracking-[-0.04em] text-white">
                  {formatCurrency(tour.priceFrom)}
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-3xl font-black tracking-[-0.04em]">{tour.title}</h3>
                <p className="mt-3 text-sm leading-6" style={{ color: tokens.mutedText }}>
                  {tour.description}
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-bold" style={{ color: tokens.mutedText }}>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {tour.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} /> {tour.capacity}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Gauge size={14} /> {tour.speed}
                  </span>
                </div>
                <a href="#booking" className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full font-black" style={{ background: tokens.primary, color: tokens.primaryForeground }}>
                  Book denne turen <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="rute" className="overflow-hidden py-20" style={{ background: tokens.surface }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: tokens.accent }}>
              Ruten
            </p>
            <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Fra kaia til havgapet på én stram fortelling.
            </h2>
            <p className="mt-6 max-w-xl leading-7" style={{ color: tokens.mutedText }}>
              RIB-malen bør ikke bare vise produkter. Den bør selge reisen:
              lyden av motoren, stoppene, skipperens lokalkunnskap og følelsen av
              å komme tilbake med puls.
            </p>
          </div>
          <div className="grid gap-4">
            {routeStops.map((stop) => (
              <article key={stop.label} className="grid gap-4 rounded-[1.5rem] border p-5 sm:grid-cols-[4rem_1fr]" style={{ borderColor: tokens.border, background: tokens.background }}>
                <span className="flex size-14 items-center justify-center rounded-full text-sm font-black" style={{ background: tokens.primary, color: tokens.primaryForeground }}>
                  {stop.label}
                </span>
                <div>
                  <h3 className="text-2xl font-black tracking-[-0.03em]">{stop.title}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: tokens.mutedText }}>
                    {stop.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="sikkerhet" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2.5rem] border p-5" style={{ borderColor: tokens.border, background: tokens.surface }}>
            <div className="aspect-[4/3] rounded-[2rem] bg-cover bg-center" style={{ backgroundImage: `url('${norskeBilder.fjordbaat.hero}')` }} />
            <div className="absolute bottom-8 left-8 right-8 rounded-[1.5rem] border border-white/15 bg-slate-950/70 p-5 text-white backdrop-blur">
              <p className="flex items-center gap-2 text-sm font-bold text-white/70">
                <ShipWheel size={16} style={{ color: tokens.accent }} /> Skipperens vurdering
              </p>
              <p className="mt-2 text-2xl font-black tracking-[-0.03em]">
                Ruten justeres etter vær, sjø og gjestene om bord.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: tokens.primary }}>
              Trygghet som selger
            </p>
            <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Rå opplevelse. Kontrollert gjennomføring.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {safetyItems.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-[1.5rem] border p-5" style={{ borderColor: tokens.border, background: tokens.surface }}>
                  <span className="flex size-11 items-center justify-center rounded-full" style={{ background: tokens.surfaceMuted, color: tokens.accent }}>
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6" style={{ color: tokens.mutedText }}>
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border" style={{ borderColor: tokens.border, background: tokens.surface }}>
          <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold" style={{ color: tokens.accent }}>
                <CalendarDays size={16} /> Klar for å fylle båten?
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] md:text-6xl">
                Gjør neste ledige avgang umulig å overse.
              </h2>
              <p className="mt-5 max-w-xl leading-7" style={{ color: tokens.mutedText }}>
                Bruk denne malen til RIB-safari, firmaturer, grupper og
                destinasjoner som trenger en demo med ekte fart i førsteinntrykket.
              </p>
            </div>
            <a
              href="#booking"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-black"
              style={{ background: tokens.primary, color: tokens.primaryForeground }}
            >
              Book RIB-safari <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
