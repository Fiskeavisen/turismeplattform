import { BarChart3, Bot, ClipboardCheck, Gauge, Search, ShieldCheck, Sparkles } from "lucide-react";
import { CompareBars, TrendChart } from "@/components/synlighet/graphics";
import { LeadForm } from "@/components/synlighet/lead-form";
import {
  ButtonLink,
  Card,
  CheckItem,
  MarketingSection,
  PriorityBadge,
  SectionEyebrow,
  SynlighetShell,
  SynlighetTopNav,
} from "@/components/synlighet/ui";

const trustBullets = [
  "Du trenger ingen teknisk kunnskap",
  "Få noen få, tydelige oppgaver hver uke",
  "Bygger på dine egne tall fra Google",
  "Virker med WordPress og Shopify",
  "Vi måler om endringene faktisk hjalp",
];

const glossary = [
  [
    "Å bli funnet på Google (SEO)",
    "SEO betyr å gjøre nettsiden din lettere å finne når folk søker på Google. Vi forteller deg hva som er verdt å endre for at flere skal komme inn på siden din uten at du betaler for annonser.",
  ],
  [
    "Å bli brukt i AI-svar (AEO)",
    "Stadig flere spør ChatGPT, Google AI og lignende i stedet for å klikke seg rundt. AEO betyr å skrive innholdet ditt tydelig nok til at slike svar nevner og anbefaler bedriften din.",
  ],
  [
    "Gratis trafikk fra søk",
    "Dette er besøkende du får uten å betale per klikk. Vi hjelper deg å få mer av den, og å se hvilke sider som allerede er nær ved å lykkes.",
  ],
  [
    "Dine egne Google-tall",
    "Google har gratis verktøy som viser hva folk søker på før de finner deg, og hva de gjør på siden etterpå. Vi leser disse tallene for deg og oversetter dem til konkrete oppgaver.",
  ],
];

const comparison = [
  ["Lover at du havner høyere opp", "Gir deg konkrete oppgaver du faktisk kan gjøre"],
  ["Sender en lang, generell rapport", "Bruker dine egne tall fra Google"],
  ["Full av faguttrykk", "Skrevet så en vanlig bedriftseier forstår det"],
  ["En PDF du leser én gang", "En kort liste du jobber med hver uke"],
  ["Du vet ikke om det hjalp", "Vi måler resultatet før og etter"],
];

export default function SynlighetLandingPage() {
  return (
    <SynlighetShell>
      <SynlighetTopNav />

      <section className="overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <SectionEyebrow>Bli lettere å finne på nett</SectionEyebrow>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-7xl">
              Vi forteller deg hva du bør gjøre for at flere finner bedriften din på nett.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Du trenger ikke kunne noe om søkemotorer. Vi kobler oss til dine egne
              tall fra Google, finner ut hva som er verdt å fikse, og gir deg en kort
              liste med konkrete oppgaver hver uke. Etterpå måler vi om det virket.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#gratis-rapport">Få gratis rapport</ButtonLink>
              <ButtonLink href="/synlighet/eksempelrapport" variant="secondary">
                Se et eksempel
              </ButtonLink>
            </div>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {trustBullets.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </div>

          <Card className="relative overflow-hidden bg-slate-950 p-0 text-white">
            <div className="absolute right-8 top-8 size-40 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="relative p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                  Eksempel på en oppgave
                </span>
                <PriorityBadge score={91} />
              </div>
              <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">
                Skriv hva det koster på prissiden din
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-semibold text-sky-100">
                  Innhold
                </span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-100">
                  Tar 25 minutter
                </span>
              </div>
              <div className="mt-8 grid gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Hva vi så</p>
                  <p className="mt-2 leading-7 text-slate-200">
                    Mange søker «hva koster regnskapsfører i Oslo» og finner siden din,
                    men siden svarer ikke tydelig på pris.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Hva du bør gjøre</p>
                  <p className="mt-2 leading-7 text-slate-200">
                    Legg til en kort del med overskriften «Hva koster en regnskapsfører i Oslo?»
                    og svar enkelt på det.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Hvorfor det hjelper</p>
                  <p className="mt-2 leading-7 text-slate-200">
                    Da svarer siden på det folk faktisk lurer på, og blir lettere å vise
                    fram både i Google og i AI-svar.
                  </p>
                </div>
              </div>
              <ButtonLink href="/synlighet/app/actions/act-price-section" variant="secondary">
                Se forslaget
              </ButtonLink>
            </div>
          </Card>
        </div>
      </section>

      <section id="gratis-rapport" className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-16 lg:py-20">
          <div className="text-center">
            <SectionEyebrow>Gratis å prøve</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
              Få din første synlighetsrapport gratis
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Skriv inn nettadressen din, så skanner vi siden og viser deg hvor du kan bli lettere å finne.
              Vil du ha hele rapporten? Legg igjen firmanavn, telefon og e-post, så sender vi den til deg.
            </p>
          </div>
          <div className="mt-10">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <MarketingSection
          eyebrow="Forklart enkelt"
          title="Hva betyr egentlig SEO og AEO?"
          description="Du vil høre disse ordene i tjenesten. Her er hva de betyr på vanlig norsk – du trenger ikke pugge dem."
          className="py-16"
        >
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {glossary.map(([title, text]) => (
              <Card key={title} className="bg-slate-50">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </Card>
            ))}
          </div>
        </MarketingSection>
      </section>

      <MarketingSection
        eyebrow="Problemet"
        title="De fleste bedrifter har tallene. De vet bare ikke hva de skal gjøre med dem."
        description="Google viser hva folk søker på og hvordan de bruker nettsiden din. Likevel er det vanskelig å vite hvilke sider som bør forbedres, hvilke søk du nesten vinner på, og hva du bør endre først. Det er denne oversettingen vi gjør for deg."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Hva haster?", "Vi peker på sidene som er verdt å starte med, ikke alt på én gang."],
            ["Hva skal jeg endre?", "Du får et konkret forslag, ikke et vagt «lag bedre innhold»."],
            ["Hjalp det?", "Når du har gjort en oppgave, måler vi om det faktisk ga resultater."],
          ].map(([title, text]) => (
            <Card key={title}>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{text}</p>
            </Card>
          ))}
        </div>
      </MarketingSection>

      <section className="border-y border-slate-200 bg-white">
        <MarketingSection
          eyebrow="Slik fungerer det"
          title="Tre steg fra tall til handling."
          description="Du kobler til, vi gjør analysen, og du får en kort liste med oppgaver. Ingenting endres på nettsiden din uten at du godkjenner det."
          className="py-16"
        >
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [BarChart3, "1. Du kobler til", "Koble til Google-kontoen din og nettsiden. Det tar noen minutter."],
              [Bot, "2. Vi analyserer", "Vi går gjennom hva folk søker på, hvilke sider som fungerer, og hva som kan bli bedre."],
              [ClipboardCheck, "3. Du får oppgaver", "Endre dette, på denne siden, fordi det kan gi flere besøkende."],
            ].map(([Icon, title, text]) => (
              <Card key={String(title)}>
                {typeof Icon !== "string" ? <Icon className="size-6 text-sky-800" /> : null}
                <h3 className="mt-5 text-xl font-semibold">{title as string}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text as string}</p>
              </Card>
            ))}
          </div>
        </MarketingSection>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <MarketingSection
          eyebrow="Sånn ser det ut"
          title="Du ser tydelig om det går rette veien."
          description="Vi viser utviklingen over tid og sammenligner før og etter hver endring. Tallene under er et eksempel."
          className="py-16"
        >
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">Synlighet over tid</h3>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                  Eksempel
                </span>
              </div>
              <TrendChart values={[58, 60, 63, 66, 66, 74]} className="mt-5 text-slate-900" />
              <p className="mt-4 leading-7 text-slate-600">
                Hver prikk er en uke. Når du gjør oppgavene, skal kurven stige jevnt – ikke
                hoppe tilfeldig.
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-semibold">Før og etter en endring</h3>
              <CompareBars before={42} after={64} beforeLabel="Før" afterLabel="Etter" className="mt-6" />
              <p className="mt-6 leading-7 text-slate-600">
                Eksempel: antall klikk til en side før og etter at prisen ble forklart tydelig.
              </p>
            </Card>
          </div>
        </MarketingSection>
      </section>

      <MarketingSection
        eyebrow="Hvorfor oss"
        title="Ikke en lang rapport. Bare neste oppgave."
      >
        <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid bg-slate-100 text-sm font-semibold text-slate-700 md:grid-cols-2">
            <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r">Vanlige SEO-tilbud</div>
            <div className="p-4">Synlighetsassistenten</div>
          </div>
          {comparison.map(([oldWay, newWay]) => (
            <div key={oldWay} className="grid border-t border-slate-200 md:grid-cols-2">
              <div className="border-b border-slate-100 p-4 text-slate-500 md:border-b-0 md:border-r">
                {oldWay}
              </div>
              <div className="p-4 font-medium text-slate-900">{newWay}</div>
            </div>
          ))}
        </div>
      </MarketingSection>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-3">
          {[
            [Gauge, "Få, ikke mange", "Du får 3-5 viktige oppgaver, ikke en liste med 100 problemer."],
            [Sparkles, "AI som hjelper", "AI forklarer og foreslår, men finner aldri på tall."],
            [ShieldCheck, "Ærlig om resultater", "Vi lover ikke førsteplass. Vi viser hva som skjedde før og etter."],
          ].map(([Icon, title, text]) => (
            <div key={String(title)} className="border-t border-white/15 pt-6">
              {typeof Icon !== "string" ? <Icon className="size-6 text-sky-300" /> : null}
              <h3 className="mt-5 text-xl font-semibold">{title as string}</h3>
              <p className="mt-3 leading-7 text-slate-300">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sky-800">
              <Search className="size-5" />
              <SectionEyebrow>Klar til å prøve?</SectionEyebrow>
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Se hvordan det ser ut med ekte eksempeldata.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Du kan se en ferdig rapport og hele demoen uten å koble til noe.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/synlighet/app/onboarding">Kom i gang gratis</ButtonLink>
            <ButtonLink href="/synlighet/eksempelrapport" variant="secondary">
              Se et eksempel
            </ButtonLink>
          </div>
        </div>
      </section>
    </SynlighetShell>
  );
}
