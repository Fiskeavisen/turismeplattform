import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";

const steps = [
  ["Opprett organisasjon", "Regnskapspartner Oslo AS er opprettet i demo."],
  ["Legg inn domene", "regnskapspartner-demo.no brukes i mock mode."],
  [
    "Sjekk Google-tilgang",
    "Brukeren må ha tilgang til riktig Search Console-property og GA4-property før ekte data kan kobles inn.",
  ],
  [
    "Koble Search Console",
    "Velg riktig domene-property og gi lesetilgang til søk, sider, klikk, visninger, CTR og posisjon.",
  ],
  [
    "Koble Google Analytics 4",
    "Velg riktig GA4-konto, property og web stream. Kontroller sessions, engagement og konverteringer.",
  ],
  [
    "Koble Google Ads",
    "Hvis kunden bruker betalte annonser, velg annonsekonto og hent spend, klikk, konverteringer, CPA og landingssider.",
  ],
  ["Velg property", "Demo-property er valgt automatisk i mock mode."],
  ["Kjør første datainnhenting", "GSC- og GA4-rader er seedet."],
  ["Crawl toppsider", "Tre viktige URL-er er crawlet i demo."],
  ["Generer første tiltak", "Quality gate har godkjent prioriterte tiltak."],
  ["Vis dashboard", "Dashboardet er klart."],
];

export default function OnboardingPage() {
  return (
    <VisibilityAppShell
      title="Onboarding"
      description="Første MVP støtter både ekte integrasjoner senere og demo-data nå."
    >
      <Card>
        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="font-semibold text-amber-950">Viktig før Google kobles til</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">
            Search Console, GA4 og Google Ads kan ha ulike tilganger. Hvis kunden ikke ser riktig property eller
            annonsekonto i oppsettet, må de først få tilgang fra eier/admin i Google.
          </p>
        </div>
        <div className="grid gap-4">
          {steps.map(([title, description], index) => (
            <article key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#275444] text-sm font-semibold text-amber-50">
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold">{title}</h2>
                  <StatusBadge status="connected" />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
