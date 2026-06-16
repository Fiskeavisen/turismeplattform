import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { integrations } from "@/lib/synlighet/demo-data";

export default function AdminIntegrationsPage() {
  return (
    <VisibilityAppShell admin title="Integrasjoner" description="Overvåk status, sync og feil på tvers av kunder.">
      <Card>
        <div className="grid gap-4">
          {integrations.map((integration) => (
            <article key={integration.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="font-semibold">{integration.name}</h2>
                <StatusBadge status={integration.status} />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{integration.description}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sist synket: {integration.lastSyncedAt ?? "Ikke synket"}
              </p>
            </article>
          ))}
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
