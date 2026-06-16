import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { aiVisibilityTests, pageSnapshots } from "@/lib/synlighet/demo-data";

export default function AeoPage() {
  return (
    <VisibilityAppShell
      title="AEO / AI-synlighet"
      description="Eksperimentell monitor for svarvennlighet, testspørsmål og innholdshull. Ingen garantier om AI-synlighet."
    >
      <div className="grid gap-6">
        <Card>
          <h2 className="text-xl font-semibold">Answer readiness per side</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {pageSnapshots.map((page) => (
              <article key={page.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold">{page.url}</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{page.aeoScore} / 100</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {page.opportunities[0] ?? "Ingen tydelig AEO-mulighet funnet."}
                </p>
              </article>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">AI-synlighetstester</h2>
          <div className="mt-5 grid gap-4">
            {aiVisibilityTests.map((test) => (
              <article key={test.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="font-semibold">{test.prompt}</h3>
                  <StatusBadge status={test.mentionedBrand ? "connected" : "needs_review"} />
                </div>
                <p className="mt-3 leading-7 text-slate-600">{test.summary}</p>
                <p className="mt-3 text-sm text-slate-500">
                  Hull: {test.gaps.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
