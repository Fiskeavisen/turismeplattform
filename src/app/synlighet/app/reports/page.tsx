import Link from "next/link";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { getVisibilityDemoState } from "@/lib/synlighet/store";

export const dynamic = "force-dynamic";

export default function ReportsPage() {
  const { report } = getVisibilityDemoState();

  return (
    <VisibilityAppShell
      title="Rapporter"
      description="Korte ukesrapporter med tiltak, risiko og målepunkter. Ikke månedlige PDF-er uten neste steg."
    >
      <Card>
        <Link
          href={`/synlighet/app/reports/${report.id}`}
          className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:bg-white"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Ukens organiske synlighetstiltak</h2>
              <p className="mt-2 text-sm text-slate-500">
                {report.weekStart} til {report.weekEnd}
              </p>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">{report.summary}</p>
            </div>
            <StatusBadge status={report.status === "needs_review" ? "needs_review" : "connected"} />
          </div>
        </Link>
      </Card>
    </VisibilityAppShell>
  );
}
