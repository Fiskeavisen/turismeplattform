import { BarChart3, Bot, ClipboardCheck, Gauge, ShieldCheck, Sparkles } from "lucide-react";
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
  "Ingen teknisk SEO-kunnskap nødvendig",
  "Prioriterte tiltak hver uke",
  "Basert på dine faktiske Google-data",
  "Klar for WordPress og Shopify",
  "Måler effekten etterpå",
];

const comparison = [
  ["Lover bedre rangering", "Gir konkrete ukentlige tiltak"],
  ["Sender generiske audits", "Bruker kundens egne Google-data"],
  ["Fokus på rapporter", "Fokus på oppgaver"],
  ["Vanskelig å forstå", "Skrevet for bedriftseiere"],
  ["Månedlige PDF-er", "Levende tiltaksliste"],
  ["Lite effektmåling", "Før/etter-måling per tiltak"],
];

export default function SynlighetLandingPage() {
  return (
    <SynlighetShell>
      <SynlighetTopNav />

      <section className="overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <SectionEyebrow>Organisk synlighet uten rapportstøy</SectionEyebrow>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-7xl">
              Få ukens viktigste tiltak for bedre synlighet i Google og AI-søk.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Koble til Search Console og Analytics. Få konkrete anbefalinger for SEO,
              AEO, lokal synlighet og konvertering uten å måtte tolke dashboards selv.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/synlighet/app/onboarding">Koble til gratis</ButtonLink>
              <ButtonLink href="/synlighet/eksempelrapport" variant="secondary">
                Se eksempelrapport
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
                  Eksempel på tiltak
                </span>
                <PriorityBadge score={91} />
              </div>
              <h2 className="mt-8 text-3xl font-semibold tracking-[-0.04em]">
                Legg til prisseksjon på /regnskapsforer-oslo
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-sky-400/15 px-3 py-1 text-xs font-semibold text-sky-100">
                  AEO / Innhold
                </span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-100">
                  25 minutter
                </span>
              </div>
              <div className="mt-8 grid gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Funn</p>
                  <p className="mt-2 leading-7 text-slate-200">
                    Siden får mange visninger for «hva koster regnskapsfører oslo», men
                    svarer ikke tydelig på pris.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Tiltak</p>
                  <p className="mt-2 leading-7 text-slate-200">
                    Legg til en seksjon med overskriften «Hva koster en regnskapsfører i Oslo?»
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Hvorfor</p>
                  <p className="mt-2 leading-7 text-slate-200">
                    Dette matcher søkeintensjon og gjør siden mer egnet for både Google-søk og
                    svarbaserte søk.
                  </p>
                </div>
              </div>
              <ButtonLink href="/synlighet/app/actions/act-price-section" variant="secondary">
                Se forslag
              </ButtonLink>
            </div>
          </Card>
        </div>
      </section>

      <MarketingSection
        eyebrow="Problemet"
        title="Bedrifter har data. De mangler beslutninger."
        description="Search Console viser søk, klikk og synlighet. Analytics viser trafikk og adferd. Nettsiden viser innholdet. Likevel vet de fleste ikke hvilke sider som bør forbedres, hvilke søk de nesten vinner på, og hva de bør endre først."
      >
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Hvilke sider haster?", "Prioriterer URL-er med faktisk datagrunnlag."],
            ["Hva bør endres?", "Gir konkret forslag, ikke bare «optimaliser innhold»."],
            ["Virket det?", "Starter måleperiode når tiltak markeres som utført."],
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
          eyebrow="Løsningen"
          title="Tre steg fra data til handling."
          description="Systemet finner muligheter med regelmotor, lar AI forklare og kvalitetssikre, og viser bare de viktigste tiltakene."
          className="py-16"
        >
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [BarChart3, "Koble til", "Search Console, Analytics og nettsiden."],
              [Bot, "Vi analyserer", "SEO, AEO, lokal synlighet, innhold, CTR og konvertering."],
              [ClipboardCheck, "Du får tiltak", "Endre dette, på denne siden, fordi det kan gi mer synlighet."],
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

      <MarketingSection
        eyebrow="Differensiering"
        title="Ikke en 30-siders rapport. Neste handling."
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
            [Gauge, "Shortlist over støy", "Vis 3-5 viktige tiltak, ikke 100 problemer."],
            [Sparkles, "AI som assistent", "AI forklarer og foreslår, men finner ikke på data."],
            [ShieldCheck, "Måling over løfter", "Ingen garantier om rangering. Bare før/etter-effekt per tiltak."],
          ].map(([Icon, title, text]) => (
            <div key={String(title)} className="border-t border-white/15 pt-6">
              {typeof Icon !== "string" ? <Icon className="size-6 text-sky-300" /> : null}
              <h3 className="mt-5 text-xl font-semibold">{title as string}</h3>
              <p className="mt-3 leading-7 text-slate-300">{text as string}</p>
            </div>
          ))}
        </div>
      </section>
    </SynlighetShell>
  );
}
