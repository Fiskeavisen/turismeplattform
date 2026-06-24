import { notFound } from "next/navigation";
import { ActionControls } from "@/components/synlighet/action-controls";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { CopyPromptButton } from "@/components/synlighet/copy-prompt-button";
import {
  Card,
  DifficultyLabel,
  MetricCard,
  PriorityBadge,
  StatusBadge,
  formatPercent,
} from "@/components/synlighet/ui";
import { getActionById } from "@/lib/synlighet/store";
import type { ActionImpactArea, ActionSource } from "@/lib/synlighet/types";

export const dynamic = "force-dynamic";

const sourceLabels: Record<ActionSource, string> = {
  search_console: "Search Console",
  ga4: "GA4",
  crawl: "Crawl",
  competitor: "Konkurrentanalyse",
  ads: "Annonser",
  manual: "Manuell vurdering",
};

const impactLabels: Record<ActionImpactArea, string> = {
  trafikk: "Trafikk",
  leads: "Leads",
  synlighet: "Synlighet",
  teknisk: "Teknisk",
  kostnad: "Kostnad",
};

export default async function ActionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const action = getActionById(id);

  if (!action) {
    notFound();
  }

  return (
    <VisibilityAppShell title={action.title} description={action.url}>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-6">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={action.status} />
                <StatusBadge status={action.qaStatus} />
              </div>
              <PriorityBadge score={action.priorityScore} />
            </div>
            <div className="mt-6 grid gap-6">
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Funn</h2>
                <p className="mt-2 leading-8 text-slate-700">{action.issue}</p>
              </section>
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Tiltak</h2>
                <p className="mt-2 leading-8 text-slate-700">{action.recommendation}</p>
              </section>
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Hvorfor</h2>
                <p className="mt-2 leading-8 text-slate-700">{action.whyItMatters}</p>
              </section>
              <section className="rounded-2xl bg-slate-50 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Foreslått endring
                </h2>
                <p className="mt-2 leading-8 text-slate-800">{action.suggestedChange}</p>
              </section>
            </div>
            <ActionControls actionId={action.id} />
          </Card>

          {action.contentSuggestions?.length ? (
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Ferdige tekstforslag</h2>
                  <p className="mt-2 leading-7 text-slate-600">
                    Dette er utkast kunden kan kopiere, redigere og publisere i CMS. Tekstene skal
                    kvalitetssikres før publisering.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  Kopierbart
                </span>
              </div>
              <div className="mt-5 grid gap-4">
                {action.contentSuggestions.map((suggestion) => (
                  <article key={suggestion.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{suggestion.label}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{suggestion.context}</p>
                      </div>
                      <CopyPromptButton
                        prompt={suggestion.text}
                        label="Kopier tekst"
                        copiedLabel="Tekst kopiert"
                      />
                    </div>
                    <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-white p-4 text-sm leading-7 text-slate-800">
                      {suggestion.text}
                    </pre>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Hvorfor dette forslaget: {suggestion.why}
                    </p>
                  </article>
                ))}
              </div>
            </Card>
          ) : null}

          <Card>
            <h2 className="text-xl font-semibold">Slik gjør du det</h2>
            <ol className="mt-5 grid gap-3">
              {action.implementationSteps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="leading-7 text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </Card>

          {action.measurement ? (
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Før/etter-måling</h2>
                  <p className="mt-2 leading-7 text-slate-600">
                    Tiltak utført: {action.completedAt}. Målt etter 28 dager.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                  Ser ut til å virke
                </span>
              </div>
              <p className="mt-2 leading-7 text-slate-600">
                Dette er en indikasjon, ikke et løfte. Andre faktorer kan også påvirke resultatet.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-5">
                <MetricCard
                  label="Klikk"
                  value={`+${Math.round(((action.measurement.clicksAfter - action.measurement.clicksBefore) / action.measurement.clicksBefore) * 100)} %`}
                  tone="positive"
                />
                <MetricCard
                  label="Visninger"
                  value={`+${Math.round(((action.measurement.impressionsAfter - action.measurement.impressionsBefore) / action.measurement.impressionsBefore) * 100)} %`}
                  tone="positive"
                />
                <MetricCard
                  label="CTR"
                  value={`+${((action.measurement.ctrAfter - action.measurement.ctrBefore) * 100).toLocaleString("nb-NO", { maximumFractionDigits: 1 })} pp`}
                  tone="positive"
                />
                <MetricCard
                  label="Snittposisjon"
                  value={`+${(action.measurement.positionBefore - action.measurement.positionAfter).toLocaleString("nb-NO", { maximumFractionDigits: 1 })}`}
                  tone="positive"
                />
                <MetricCard
                  label="Konverteringer"
                  value={`+${action.measurement.conversionsAfter - action.measurement.conversionsBefore}`}
                  tone="positive"
                />
              </div>
            </Card>
          ) : null}
        </div>

        <div className="grid gap-6 self-start">
          <Card>
            <h2 className="text-lg font-semibold">Datagrunnlag</h2>
            {action.sourceSummary ? (
              <p className="mt-2 text-sm leading-6 text-slate-600">{action.sourceSummary}</p>
            ) : null}
            <dl className="mt-5 grid gap-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Kilder</dt>
                <dd className="text-right font-medium">
                  {action.sources?.map((source) => sourceLabels[source]).join(", ") ?? "Search Console, GA4, crawl"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Søk</dt>
                <dd className="font-medium">{action.sourceData.query ?? "Sidebasert funn"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Visninger</dt>
                <dd className="font-medium">{action.sourceData.impressions.toLocaleString("nb-NO")}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Klikk</dt>
                <dd className="font-medium">{action.sourceData.clicks}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">CTR</dt>
                <dd className="font-medium">{formatPercent(action.sourceData.ctr)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Posisjon</dt>
                <dd className="font-medium">{action.sourceData.position.toLocaleString("nb-NO")}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">Prioritering</h2>
            <dl className="mt-5 grid gap-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Effekt</dt>
                <dd className="font-medium">{action.expectedImpact}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Effekttype</dt>
                <dd className="font-medium">{impactLabels[action.impactArea ?? "synlighet"]}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Vanskelighet</dt>
                <dd className="font-medium">
                  <DifficultyLabel difficulty={action.difficulty} />
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Estimert tid</dt>
                <dd className="font-medium">{action.estimatedTimeMinutes} min</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Tillit</dt>
                <dd className="font-medium">{Math.round(action.confidence * 100)} %</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold">Quality gate</h2>
            <p className="mt-2 leading-7 text-slate-600">{action.qaDecision}</p>
            {action.qaIssues.length > 0 ? (
              <ul className="mt-4 grid gap-2 text-sm text-slate-600">
                {action.qaIssues.map((issue) => (
                  <li key={issue}>• {issue}</li>
                ))}
              </ul>
            ) : null}
          </Card>
        </div>
      </div>
    </VisibilityAppShell>
  );
}
