import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { weeklyReport } from "@/lib/synlighet/demo-data";

export default function AdminReportsPage() {
  return (
    <VisibilityAppShell admin title="Rapportkontroll" description="Godkjenn eller marker rapporter for manuell vurdering.">
      <Card>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Ukens organiske synlighetstiltak</h2>
              <p className="mt-2 max-w-3xl leading-7 text-slate-600">{weeklyReport.summary}</p>
            </div>
            <StatusBadge status="needs_review" />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button className="min-h-10 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800">
              Godkjenn
            </button>
            <button className="min-h-10 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Rediger
            </button>
            <button className="min-h-10 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Marker needs_review
            </button>
          </div>
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
