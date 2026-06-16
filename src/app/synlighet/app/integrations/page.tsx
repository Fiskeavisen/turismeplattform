import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { integrations } from "@/lib/synlighet/demo-data";

export default function IntegrationsPage() {
  return (
    <VisibilityAppShell
      title="Integrasjoner"
      description="Google kan kjøres med mock-data. WordPress og Shopify er draft-only i MVP og publiserer aldri automatisk."
    >
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          {integrations.map((integration) => (
            <article key={integration.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">{integration.name}</h2>
                <StatusBadge status={integration.status} />
              </div>
              <p className="mt-3 leading-7 text-slate-600">{integration.description}</p>
              <p className="mt-4 text-sm font-medium text-slate-800">Neste steg: {integration.nextStep}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button className="min-h-10 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800">
                  Test connection
                </button>
                <button className="min-h-10 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  Koble fra
                </button>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
