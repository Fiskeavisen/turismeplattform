import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, PriorityBadge, StatusBadge } from "@/components/synlighet/ui";
import { visibilityActions } from "@/lib/synlighet/demo-data";

export default function AdminActionsPage() {
  return (
    <VisibilityAppShell admin title="Tiltak QA" description="Se anbefalinger med quality gate-status.">
      <Card>
        <div className="grid gap-4">
          {visibilityActions.map((action) => (
            <article key={action.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={action.qaStatus} />
                    <StatusBadge status={action.status} />
                  </div>
                  <h2 className="mt-3 font-semibold">{action.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{action.qaDecision}</p>
                </div>
                <PriorityBadge score={action.priorityScore} />
              </div>
            </article>
          ))}
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
