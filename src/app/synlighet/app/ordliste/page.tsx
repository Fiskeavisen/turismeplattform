import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card } from "@/components/synlighet/ui";
import { ScoreScaleLegend } from "@/components/synlighet/term-info";
import { glossaryTerms } from "@/lib/synlighet/glossary";

export default function OrdlistePage() {
  return (
    <VisibilityAppShell
      title="Ordliste og forklaringer"
      description="Kort forklaring på begrepene du møter i tjenesten – på vanlig norsk. Du trenger ikke pugge dem."
    >
      <div className="grid gap-6">
        <Card>
          <h2 className="text-lg font-semibold">Hva er en god score?</h2>
          <p className="mt-1 text-sm text-slate-500">
            Synlighetsscoren går fra 0 til 100. Slik leser du den:
          </p>
          <div className="mt-4">
            <ScoreScaleLegend />
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Begreper</h2>
          <p className="mt-1 text-sm text-slate-500">
            De vanligste forkortelsene og hva de betyr for deg.
          </p>
          <dl className="mt-5 grid gap-4 md:grid-cols-2">
            {glossaryTerms.map((entry) => (
              <div key={entry.term} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <dt className="flex flex-wrap items-baseline gap-2">
                  <span className="text-base font-semibold text-slate-900">{entry.term}</span>
                  <span className="text-sm text-slate-500">{entry.name}</span>
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-600">{entry.long}</dd>
                {entry.benchmark ? (
                  <dd className="mt-3 rounded-xl bg-white px-3 py-2 text-sm leading-6 text-slate-600">
                    <span className="font-semibold text-slate-800">Hva er standard? </span>
                    {entry.benchmark}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
