import { notFound } from "next/navigation";
import { ActionControls } from "@/components/synlighet/action-controls";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import {
  Card,
  DifficultyLabel,
  MetricCard,
  PriorityBadge,
  StatusBadge,
  formatPercent,
} from "@/components/synlighet/ui";
import { getActionById } from "@/lib/synlighet/store";

export const dynamic = "force-dynamic";

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
              <h2 className="text-xl font-semibold">Før/etter-måling</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Tiltak utført: {action.completedAt}. Målt etter 28 dager.
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
            <dl className="mt-5 grid gap-4 text-sm">
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
