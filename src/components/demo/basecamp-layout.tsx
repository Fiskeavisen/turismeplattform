import type { CSSProperties } from "react";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Check,
  Clock,
  Compass,
  MapPin,
  Mountain,
  Tent,
  Users,
} from "lucide-react";
import { BookingSearchCard } from "@/components/platform/booking-search-card";
import { accommodations, activities, rentalUnits, touristCenter } from "@/lib/demo-data";
import { norskeBilder } from "@/lib/images";
import { getTheme } from "@/lib/themes";
import { formatCurrency } from "@/lib/utils";

const accommodationTypeLabel = {
  hytte: "Hytte",
  leilighet: "Campinghytte",
  hus: "Feriehus",
} as const;

const stayHighlights = [
  "Hytter og camping samlet i ett ledighetssøk",
  "Båt, sengetøy og lokale tilvalg i samme bestilling",
  "Vertskap som hjelper med vær, ruter og dagsplaner",
];

const nearbySuggestions = [
  {
    title: "Utsiktstur til Skarvheia",
    area: "12 min fra campen",
    duration: "2-3 timer",
    difficulty: "Middels",
    audience: "Par og aktive familier",
    imageUrl: norskeBilder.fjellDis.url,
  },
  {
    title: "Kveldsrunde langs bryggene",
    area: "Starter ved resepsjonen",
    duration: "45 min",
    difficulty: "Lett",
    audience: "Alle gjester",
    imageUrl: norskeBilder.brygge.url,
  },
  {
    title: "Dagstur til kystbyen",
    area: "35 min med bil",
    duration: "Halv dag",
    difficulty: "Lett",
    audience: "Familier og vennegjenger",
    imageUrl: norskeBilder.rorbuerKyst.url,
  },
  {
    title: "Fjellvann og badestopp",
    area: "18 min fra campen",
    duration: "1-2 timer",
    difficulty: "Lett",
    audience: "Familier",
    imageUrl: norskeBilder.kanoVann.url,
  },
];

/**
 * Basecamp: presentasjon først, deretter overnatting og booking,
 * før egne salgbare aktiviteter og nærliggende turforslag uten priser.
 */
export function BasecampLayout() {
  const theme = getTheme("basecamp");
  const { tokens } = theme;
  const localActivities = activities.filter((activity) => activity.visible && activity.sellStandalone);

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
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ borderColor: tokens.border, background: "rgba(255, 250, 241, 0.9)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <span
              className="flex size-10 items-center justify-center rounded-2xl"
              style={{ background: tokens.primary, color: tokens.primaryForeground }}
            >
              <Tent size={20} />
            </span>
            <span>
              <span className="block text-sm font-semibold leading-none">{touristCenter.name}</span>
              <span className="mt-1 block text-xs" style={{ color: tokens.mutedText }}>
                Hytter · camping · opplevelser
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-sm font-semibold lg:flex">
            {[
              ["#stedet", "Stedet"],
              ["#hytter", "Hytter og booking"],
              ["#lokale-aktiviteter", "Aktiviteter"],
              ["#turforslag", "Turforslag"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-full px-4 py-2 hover:bg-black/5">
                {label}
              </a>
            ))}
            <a
              href="#booking"
              className="ml-2 inline-flex min-h-11 items-center rounded-full px-5"
              style={{ background: tokens.primary, color: tokens.primaryForeground }}
            >
              Sjekk ledighet
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section id="stedet" className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-52" style={{ background: tokens.surfaceMuted }} />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: tokens.accent }}>
                Basecamp ved kysten
              </p>
              <h1
                className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl"
                style={{ fontFamily: tokens.headingFontStack }}
              >
                Kom hit for roen. Bli for alt du kan gjøre herfra.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8" style={{ color: tokens.mutedText }}>
                {touristCenter.name} er en praktisk og lun base for hytteferie,
                campingdøgn og korte eventyr. Her møter gjestene først stedet,
                vertskapet og mulighetene, før de velger opphold og aktiviteter.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#hytter"
                  className="inline-flex min-h-12 items-center rounded-full px-6 font-bold"
                  style={{ background: tokens.primary, color: tokens.primaryForeground }}
                >
                  Se hytter og camping
                </a>
                <a
                  href="#turforslag"
                  className="inline-flex min-h-12 items-center rounded-full border px-6 font-bold"
                  style={{ borderColor: tokens.border }}
                >
                  Utforsk nærområdet
                </a>
              </div>
              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  ["7", "hytter og enheter"],
                  ["4", "lokale opplevelser"],
                  ["0 m", "til første turforslag"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-3xl border p-4" style={{ borderColor: tokens.border, background: tokens.surface }}>
                    <p className="text-3xl font-black" style={{ fontFamily: tokens.headingFontStack }}>
                      {value}
                    </p>
                    <p className="mt-1 text-sm" style={{ color: tokens.mutedText }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.7fr_1fr]">
              <div className="grid gap-4 pt-10">
                <div
                  className="min-h-56 rounded-[2rem] bg-cover bg-center"
                  style={{ backgroundImage: `url('${norskeBilder.skogshytte.hero}')` }}
                />
                <div className="rounded-[2rem] p-6" style={{ background: tokens.primary, color: tokens.primaryForeground }}>
                  <p className="flex items-center gap-2 text-sm font-semibold opacity-80">
                    <MapPin size={16} /> {touristCenter.location}
                  </p>
                  <p className="mt-3 text-2xl font-black leading-tight" style={{ fontFamily: tokens.headingFontStack }}>
                    Et sted som føles planlagt rundt gjesten, ikke bare rundt rommet.
                  </p>
                </div>
              </div>
              <div
                className="min-h-[34rem] rounded-[2.5rem] bg-cover bg-center shadow-2xl shadow-black/20"
                style={{ backgroundImage: `url('${norskeBilder.granskog.hero}')` }}
              />
            </div>
          </div>
        </section>

        <section id="hytter" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_25rem] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: tokens.accent }}>
                Overnatting først etter presentasjonen
              </p>
              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-4xl font-black tracking-[-0.03em] md:text-5xl" style={{ fontFamily: tokens.headingFontStack }}>
                    Hytter og camping med tydelig booking
                  </h2>
                  <p className="mt-4 max-w-2xl leading-7" style={{ color: tokens.mutedText }}>
                    Gjestene får først se hva slags opphold de kan velge, og kan
                    deretter sjekke dato, enhet og tilvalg i samme flyt.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {accommodations.map((accommodation) => {
                  const unitCount = rentalUnits.filter(
                    (unit) => unit.active && unit.accommodationId === accommodation.id,
                  ).length;

                  return (
                    <article
                      key={accommodation.id}
                      className="overflow-hidden rounded-[2rem] border"
                      style={{ borderColor: tokens.border, background: tokens.surface }}
                    >
                      <div
                        className="h-64 bg-cover bg-center"
                        style={{ backgroundImage: `url('${accommodation.imageUrl}')` }}
                      />
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-4">
                          <p className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ background: tokens.surfaceMuted }}>
                            <BedDouble size={14} /> {accommodationTypeLabel[accommodation.type]}
                          </p>
                          <p className="text-sm font-bold">Fra {formatCurrency(accommodation.priceFrom)}/natt</p>
                        </div>
                        <h3 className="mt-5 text-2xl font-black" style={{ fontFamily: tokens.headingFontStack }}>
                          {accommodation.title.nb}
                        </h3>
                        <p className="mt-3 text-sm leading-6" style={{ color: tokens.mutedText }}>
                          {accommodation.description.nb}
                        </p>
                        <div className="mt-5 grid gap-2 text-sm" style={{ color: tokens.mutedText }}>
                          <p className="flex items-center gap-2">
                            <Users size={16} /> Opptil {accommodation.guests} gjester · {accommodation.beds} sengeplasser
                          </p>
                          <p className="flex items-center gap-2">
                            <Tent size={16} /> {unitCount} bookbare enheter
                          </p>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {accommodation.amenities.map((item) => (
                            <span key={item} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: tokens.surfaceMuted }}>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className="lg:sticky lg:top-24">
              <BookingSearchCard />
              <div className="mt-5 rounded-[1.5rem] border p-5" style={{ borderColor: tokens.border, background: tokens.surface }}>
                <p className="font-bold">Hva skjer etter søk?</p>
                <div className="mt-4 grid gap-3 text-sm" style={{ color: tokens.mutedText }}>
                  {stayHighlights.map((item) => (
                    <p key={item} className="flex gap-2">
                      <Check size={16} style={{ color: tokens.primary }} /> {item}
                    </p>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="lokale-aktiviteter" className="py-16" style={{ background: tokens.surface }}>
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: tokens.accent }}>
                  Lokalt salg
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-5xl" style={{ fontFamily: tokens.headingFontStack }}>
                  Aktiviteter stedet selv selger
                </h2>
              </div>
              <p className="max-w-2xl leading-7 lg:justify-self-end" style={{ color: tokens.mutedText }}>
                Disse opplevelsene kan presenteres som egne produkter med pris,
                kapasitet og en tydelig booking- eller forespørselsknapp.
              </p>
            </div>

            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {localActivities.map((activity) => (
                <article
                  key={activity.id}
                  className="group overflow-hidden rounded-[2rem] border"
                  style={{ borderColor: tokens.border, background: tokens.background }}
                >
                  <div
                    className="h-56 bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url('${activity.imageUrl}')` }}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: tokens.mutedText }}>
                      <span>{activity.duration}</span>
                      <span>{activity.difficulty}</span>
                    </div>
                    <h3 className="mt-4 text-2xl font-black leading-tight" style={{ fontFamily: tokens.headingFontStack }}>
                      {activity.title.nb}
                    </h3>
                    <p className="mt-3 text-sm leading-6" style={{ color: tokens.mutedText }}>
                      {activity.teaser.nb}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <p className="font-black">Fra {formatCurrency(activity.priceFrom)}</p>
                      <a href="#kontakt" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold" style={{ background: tokens.primary, color: tokens.primaryForeground }}>
                        Book aktivitet <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="turforslag" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: tokens.accent }}>
                Nærområdet
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] md:text-5xl" style={{ fontFamily: tokens.headingFontStack }}>
                Andre aktiviteter man kan nå fra denne plassen
              </h2>
              <p className="mt-5 leading-7" style={{ color: tokens.mutedText }}>
                Her handler det om inspirasjon og trygg planlegging, ikke pris.
                Turforslagene viser avstand, varighet og hvem de passer for.
              </p>
            </div>

            <div className="grid gap-4">
              {nearbySuggestions.map((suggestion) => (
                <article
                  key={suggestion.title}
                  className="grid gap-4 rounded-[2rem] border p-4 sm:grid-cols-[11rem_1fr_auto] sm:items-center"
                  style={{ borderColor: tokens.border, background: tokens.surface }}
                >
                  <div
                    className="h-40 rounded-[1.5rem] bg-cover bg-center sm:h-32"
                    style={{ backgroundImage: `url('${suggestion.imageUrl}')` }}
                  />
                  <div>
                    <h3 className="text-xl font-black" style={{ fontFamily: tokens.headingFontStack }}>
                      {suggestion.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm" style={{ color: tokens.mutedText }}>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {suggestion.area}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {suggestion.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mountain size={14} /> {suggestion.difficulty}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={14} /> {suggestion.audience}
                      </span>
                    </div>
                  </div>
                  <a
                    href="#kontakt"
                    className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-bold"
                    style={{ borderColor: tokens.border }}
                  >
                    Spør vertskapet <Compass size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
          <div className="grid gap-8 rounded-[2.5rem] p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10" style={{ background: tokens.primary, color: tokens.primaryForeground }}>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold opacity-80">
                <CalendarDays size={16} /> Klar for å planlegge oppholdet?
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] md:text-4xl" style={{ fontFamily: tokens.headingFontStack }}>
                Book hytte først, bygg resten av turen sammen med vertskapet.
              </h2>
            </div>
            <div className="grid gap-2 text-sm">
              <a href={`mailto:${touristCenter.email}`} className="font-bold">
                {touristCenter.email}
              </a>
              <a href={`tel:${touristCenter.phone.replaceAll(" ", "")}`} className="font-bold">
                {touristCenter.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
