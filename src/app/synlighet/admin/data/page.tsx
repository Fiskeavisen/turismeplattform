import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";

const jobs = [
  ["Search Console sync", "mocked", "Siste 28 dager er lastet fra demo-data."],
  ["GA4 sync", "mocked", "Landing page-rapport er lastet fra demo-data."],
  ["Crawler", "mocked", "Tre toppsider er crawlet med sideutdrag."],
  ["Beskrivelsesaudit", "mocked", "Produkter, kategorier og tjenestesider er sjekket for svake beskrivelser."],
  ["Søkeordmonitor", "mocked", "Monitorerte søkeord, alerts, clusters og konkurrentnotater er lastet."],
  ["Annonsemonitor", "mocked", "Google Ads og Meta-kampanjer er sjekket for CPA, spend og landingssidematch."],
  ["Analyse", "connected", "Regelmotor og quality gate er kjørt."],
  ["Rapportgenerator", "needs_review", "Ukesrapport venter på admin-godkjenning."],
] as const;

export default function AdminDataPage() {
  return (
    <VisibilityAppShell admin title="Datainnhenting" description="Status for sync, crawl, analyse og rapportjobber.">
      <Card>
        <div className="grid gap-4">
          {jobs.map(([name, status, description]) => (
            <article key={name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-semibold">{name}</h2>
                <StatusBadge status={status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
