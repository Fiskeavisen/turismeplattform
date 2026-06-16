import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card } from "@/components/synlighet/ui";

const logs = [
  ["2026-06-16 09:00", "sync.mock.completed", "Search Console mock-data ble lastet."],
  ["2026-06-16 09:04", "analysis.run.completed", "6 tiltak generert fra regelmotor og quality gate."],
  ["2026-06-16 09:08", "report.needs_review", "Ukesrapport venter på godkjenning."],
];

export default function AdminLogsPage() {
  return (
    <VisibilityAppShell admin title="Feil og logger" description="Audit- og systemlogg for MVP-demoen.">
      <Card>
        <div className="grid gap-3">
          {logs.map(([time, event, message]) => (
            <div key={event} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <p className="font-semibold">{event}</p>
              <p className="mt-1 text-slate-600">{message}</p>
              <p className="mt-2 text-xs text-slate-500">{time}</p>
            </div>
          ))}
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
