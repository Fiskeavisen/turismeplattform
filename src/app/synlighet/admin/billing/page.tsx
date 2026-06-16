import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard, StatusBadge } from "@/components/synlighet/ui";
import { visibilityOrganization } from "@/lib/synlighet/demo-data";

export default function AdminBillingPage() {
  return (
    <VisibilityAppShell admin title="Abonnement" description="Plan, MRR-placeholder og kommersiell status.">
      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard label="Plan" value={visibilityOrganization.plan} />
        <MetricCard label="MRR placeholder" value="2 490 kr" />
        <MetricCard label="Status" value="Aktiv" tone="positive" />
      </div>
      <Card className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">{visibilityOrganization.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fakturering er ikke koblet til Stripe ennå. Dette er administrativ plassholder for MVP.
            </p>
          </div>
          <StatusBadge status="needs_setup" />
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
