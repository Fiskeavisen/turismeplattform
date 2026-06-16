import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { visibilitySite } from "@/lib/synlighet/demo-data";

export default function AdminSitesPage() {
  return (
    <VisibilityAppShell admin title="Sites" description="Nettsteder, CMS-type og datainnhenting.">
      <Card>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">{visibilitySite.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{visibilitySite.domain} · {visibilitySite.cmsType}</p>
            </div>
            <StatusBadge status="mocked" />
          </div>
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
