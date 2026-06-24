import { CalendarDays } from "lucide-react";
import {
  ButtonLink,
  Card,
  PriorityBadge,
  SynlighetShell,
  SynlighetTopNav,
} from "@/components/synlighet/ui";
import { visibilityActions, visibilityOrganization, weeklyReport } from "@/lib/synlighet/demo-data";

export default function ExampleReportPage() {
  const topActions = visibilityActions.slice(0, 3);

  return (
    <SynlighetShell>
      <SynlighetTopNav />
      <section className="mx-auto max-w-5xl px-5 py-12 lg:py-16">
        <Card className="bg-white p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-800">
                Eksempelrapport
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
                Ukens oppgaver for å bli lettere å finne
              </h1>
              <p className="mt-3 text-slate-600">{visibilityOrganization.name}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <CalendarDays size={16} />
              {weeklyReport.weekStart} til {weeklyReport.weekEnd}
            </div>
          </div>

          <div className="grid gap-8 py-8">
            <section>
              <h2 className="text-xl font-semibold">Kort oppsummering</h2>
              <p className="mt-3 max-w-3xl leading-8 text-slate-700">{weeklyReport.summary}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Hvis du bare gjør 3 ting denne uken</h2>
              <div className="mt-5 grid gap-4">
                {topActions.map((action, index) => (
                  <article
                    key={action.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Tiltak {index + 1}</p>
                        <h3 className="mt-1 text-lg font-semibold">{action.title}</h3>
                      </div>
                      <PriorityBadge score={action.priorityScore} />
                    </div>
                    <p className="mt-3 leading-7 text-slate-600">{action.whyItMatters}</p>
                  </article>
                ))}
              </div>
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-emerald-50">
                <p className="text-sm font-semibold text-emerald-900">Raskeste gevinst</p>
                <p className="mt-2 leading-7 text-emerald-950">{weeklyReport.quickWin}</p>
              </Card>
              <Card className="bg-amber-50">
                <p className="text-sm font-semibold text-amber-900">Største risiko</p>
                <p className="mt-2 leading-7 text-amber-950">{weeklyReport.biggestRisk}</p>
              </Card>
            </div>

            <section className="rounded-2xl border border-amber-200 bg-[#fff2cf] p-6 text-stone-950">
              <h2 className="text-xl font-semibold">Vi måler om det virket</h2>
              <p className="mt-3 max-w-3xl leading-7 text-stone-700">
                Når du har gjort en oppgave, følger vi med en periode etterpå. Så sammenligner vi
                hvor mange som så og klikket på siden, hvor høyt den lå i søk, og hvor mange som
                tok kontakt eller kjøpte – før og etter endringen.
              </p>
              <div className="mt-5">
                <ButtonLink href="/synlighet/app/dashboard" variant="secondary">
                  Se dashboarddemo
                </ButtonLink>
              </div>
            </section>
          </div>
        </Card>
      </section>
    </SynlighetShell>
  );
}
