import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, formatPercent } from "@/components/synlighet/ui";
import { queryRows } from "@/lib/synlighet/demo-data";

export default function QueriesPage() {
  return (
    <VisibilityAppShell
      title="Søkeord"
      description="Search Console-data normalisert til intensjon, side og neste mulighet."
    >
      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-[1.2fr_1fr_0.5fr_0.7fr_0.6fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-50 p-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>Søk</span>
          <span>Side</span>
          <span>Klikk</span>
          <span>Visninger</span>
          <span>CTR</span>
          <span>Intensjon</span>
        </div>
        {queryRows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[1.2fr_1fr_0.5fr_0.7fr_0.6fr_0.8fr] gap-4 border-b border-slate-100 p-4 text-sm last:border-b-0"
          >
            <span className="font-medium">{row.query}</span>
            <span className="text-slate-600">{row.page}</span>
            <span>{row.clicks}</span>
            <span>{row.impressions.toLocaleString("nb-NO")}</span>
            <span>{formatPercent(row.ctr)}</span>
            <span>{row.intent.replaceAll("_", " ")}</span>
          </div>
        ))}
      </Card>
    </VisibilityAppShell>
  );
}
