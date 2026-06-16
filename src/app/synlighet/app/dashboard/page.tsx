import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ActionControls } from "@/components/synlighet/action-controls";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import {
  AppNotice,
  Card,
  DifficultyLabel,
  MetricCard,
  PriorityBadge,
  StatusBadge,
  formatPercent,
} from "@/components/synlighet/ui";
import { dashboardMetrics } from "@/lib/synlighet/demo-data";
import { getVisibilityDemoState } from "@/lib/synlighet/store";

export const dynamic = "force-dynamic";

export default function VisibilityDashboardPage() {
  const priorityActions = getVisibilityDemoState().actions.slice(0, 4);

  return (
    <VisibilityAppShell
      title="Organisk synlighet denne uken"
      description="Start med tiltakene som har høyest kombinasjon av potensial, relevans og gjennomførbarhet."
    >
      <div className="grid gap-6">
        <AppNotice />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <MetricCard label="Synlighetsscore" value={`${dashboardMetrics.visibilityScore} / 100`} />
          <MetricCard label="Endring" value={`+${dashboardMetrics.weeklyChange}`} tone="positive" />
          <MetricCard label="Nye tiltak" value={String(dashboardMetrics.newActions)} />
          <MetricCard label="Høy prioritet" value={String(dashboardMetrics.highPriority)} tone="warning" />
          <MetricCard label="Raske gevinster" value={String(dashboardMetrics.quickWins)} tone="positive" />
          <MetricCard label="Tekniske feil" value={String(dashboardMetrics.technicalIssues)} tone="warning" />
        </div>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Ukens prioriterte tiltak</h2>
              <p className="mt-1 text-sm text-slate-500">
                Shortlistet fra Search Console, GA4, crawl og quality gate.
              </p>
            </div>
            <Link
              href="/synlighet/app/actions"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-50"
            >
              Se alle tiltak <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {priorityActions.map((action) => (
              <article key={action.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{action.title}</h3>
                    <p className="mt-2 max-w-3xl leading-7 text-slate-600">{action.issue}</p>
                  </div>
                  <PriorityBadge score={action.priorityScore} />
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-5">
                  <span>Kategori: {action.category.replaceAll("_", " ")}</span>
                  <span>Tid: {action.estimatedTimeMinutes} min</span>
                  <span>Effekt: {action.expectedImpact}</span>
                  <span>Vanskelighet: <DifficultyLabel difficulty={action.difficulty} /></span>
                  <StatusBadge status={action.status} />
                </div>
                <div className="mt-4 rounded-xl bg-white p-4 text-sm leading-6 text-slate-600">
                  Datagrunnlag: {action.sourceData.impressions.toLocaleString("nb-NO")} visninger,{" "}
                  {action.sourceData.clicks} klikk, CTR {formatPercent(action.sourceData.ctr)}, posisjon{" "}
                  {action.sourceData.position.toLocaleString("nb-NO")}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/synlighet/app/actions/${action.id}`}
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Se forslag
                  </Link>
                </div>
                <ActionControls actionId={action.id} />
              </article>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
