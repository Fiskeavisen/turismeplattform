import { notFound } from "next/navigation";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { ReportControls } from "@/components/synlighet/report-controls";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { getVisibilityDemoState } from "@/lib/synlighet/store";

export const dynamic = "force-dynamic";

export default async function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { report } = getVisibilityDemoState();

  if (id !== report.id) {
    notFound();
  }

  return (
    <VisibilityAppShell
      title="Ukens oppgaver for å bli lettere å finne"
      description={`${report.weekStart} til ${report.weekEnd}`}
    >
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <StatusBadge status={report.status === "needs_review" ? "needs_review" : "connected"} />
          <ReportControls reportId={report.id} />
        </div>
        <div className="mt-6 grid gap-6">
          <section>
            <h2 className="text-xl font-semibold">Kort oppsummering</h2>
            <p className="mt-3 max-w-3xl leading-8 text-slate-700">{report.summary}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Hvis du bare gjør tre ting</h2>
            <ol className="mt-4 grid gap-3">
              {report.focusActions.map((action, index) => (
                <li key={action} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Autoritet utenfor egen nettside</h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-600">
              Noen synlighetstiltak handler om hva andre troverdige kilder sier om bedriften,
              og om egne sider dokumenterer påstander godt nok.
            </p>
            <div className="mt-4 grid gap-3">
              {report.authorityAdvice.map((advice) => (
                <div key={advice} className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {advice}
                </div>
              ))}
            </div>
          </section>
          <section className="grid gap-4 md:grid-cols-2">
            <Card className="bg-emerald-50">
              <h3 className="font-semibold text-emerald-950">Raskeste gevinst</h3>
              <p className="mt-2 leading-7 text-emerald-950">{report.quickWin}</p>
            </Card>
            <Card className="bg-amber-50">
              <h3 className="font-semibold text-amber-950">Største risiko</h3>
              <p className="mt-2 leading-7 text-amber-950">{report.biggestRisk}</p>
            </Card>
          </section>
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
