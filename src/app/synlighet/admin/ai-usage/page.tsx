import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card } from "@/components/synlighet/ui";
import { aiUsageLogs } from "@/lib/synlighet/demo-data";

export default function AdminAiUsagePage() {
  return (
    <VisibilityAppShell admin title="AI-kostnader" description="Tokenbruk og estimert kost per kunde og oppgavetype.">
      <Card className="overflow-hidden p-0">
        <div className="grid grid-cols-5 gap-4 border-b border-slate-200 bg-slate-50 p-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>Dato</span>
          <span>Modell</span>
          <span>Oppgave</span>
          <span>Tokens</span>
          <span>Kost</span>
        </div>
        {aiUsageLogs.map((log) => (
          <div key={log.id} className="grid grid-cols-5 gap-4 border-b border-slate-100 p-4 text-sm last:border-b-0">
            <span>{log.createdAt}</span>
            <span>{log.model}</span>
            <span>{log.taskType}</span>
            <span>{(log.inputTokens + log.outputTokens).toLocaleString("nb-NO")}</span>
            <span>{log.costEstimate.toFixed(3)} USD</span>
          </div>
        ))}
      </Card>
    </VisibilityAppShell>
  );
}
