import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard, StatusBadge } from "@/components/synlighet/ui";
import {
  aiUsageLogs,
  integrations,
  visibilityActions,
  visibilityOrganization,
  visibilitySite,
  weeklyReport,
} from "@/lib/synlighet/demo-data";

export default function VisibilityAdminPage() {
  const openActions = visibilityActions.filter((action) => !["completed", "ignored"].includes(action.status)).length;
  const aiCost = aiUsageLogs.reduce((sum, log) => sum + log.costEstimate, 0);

  return (
    <VisibilityAppShell
      admin
      title="Kvalitetskontroll"
      description="Internt panel for å godkjenne rapporter, følge integrasjoner og kontrollere AI-kostnader."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Kunder" value="1" />
          <MetricCard label="Åpne tiltak" value={String(openActions)} />
          <MetricCard label="Integrasjonsfeil" value="0" />
          <MetricCard label="AI-kost 30 dager" value={`${aiCost.toFixed(3)} USD`} />
        </div>
        <Card>
          <h2 className="text-xl font-semibold">Kundeliste</h2>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{visibilityOrganization.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{visibilitySite.domain} · Growth · MRR placeholder</p>
              </div>
              <StatusBadge status="connected" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Siste rapport: {weeklyReport.weekEnd}. Åpne tiltak: {openActions}. Integrasjoner:{" "}
              {integrations.map((item) => item.name).join(", ")}.
            </p>
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
