import Link from "next/link";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import {
  Card,
  DifficultyLabel,
  PriorityBadge,
  StatusBadge,
  formatPercent,
} from "@/components/synlighet/ui";
import { getVisibilityDemoState } from "@/lib/synlighet/store";

export const dynamic = "force-dynamic";

export default function ActionsPage() {
  const { actions } = getVisibilityDemoState();

  return (
    <VisibilityAppShell
      title="Tiltak"
      description="Alle anbefalinger er knyttet til en URL, et konkret funn og et målbart neste steg."
    >
      <Card>
        <div className="grid gap-4">
          {actions.map((action) => (
            <Link
              key={action.id}
              href={`/synlighet/app/actions/${action.id}`}
              className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-slate-300 hover:bg-white"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={action.status} />
                    <StatusBadge status={action.qaStatus} />
                  </div>
                  <h2 className="mt-3 text-lg font-semibold">{action.title}</h2>
                  <p className="mt-2 max-w-3xl leading-7 text-slate-600">{action.recommendation}</p>
                </div>
                <PriorityBadge score={action.priorityScore} />
              </div>
              <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-4">
                <span>URL: {action.url}</span>
                <span>Tid: {action.estimatedTimeMinutes} min</span>
                <span>Vanskelighet: <DifficultyLabel difficulty={action.difficulty} /></span>
                <span>CTR: {formatPercent(action.sourceData.ctr)}</span>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
