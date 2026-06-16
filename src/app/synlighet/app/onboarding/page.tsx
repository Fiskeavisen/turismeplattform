import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";

const steps = [
  ["Opprett organisasjon", "Regnskapspartner Oslo AS er opprettet i demo."],
  ["Legg inn domene", "regnskapspartner-demo.no brukes i mock mode."],
  ["Koble til Google", "Mock-data brukes til Search Console og GA4."],
  ["Velg property", "Demo-property er valgt automatisk."],
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
        <div className="grid gap-4">
          {steps.map(([title, description], index) => (
            <article key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-semibold text-white">
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
