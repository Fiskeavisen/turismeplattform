import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { visibilityOrganization, visibilitySite } from "@/lib/synlighet/demo-data";

export default function AdminCustomersPage() {
  return (
    <VisibilityAppShell admin title="Kunder" description="Kundeliste med plan, domene og status.">
      <Card>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">{visibilityOrganization.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{visibilitySite.domain} · {visibilityOrganization.plan}</p>
            </div>
            <StatusBadge status="connected" />
          </div>
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
