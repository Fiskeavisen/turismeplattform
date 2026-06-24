import Link from "next/link";
import { ArrowRight, BarChart3, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard, formatPercent } from "@/components/synlighet/ui";
import { getVisibilityDemoState } from "@/lib/synlighet/store";

export const dynamic = "force-dynamic";

function percentChange(before: number, after: number) {
  if (before === 0) return "Nytt";
  return `${Math.round(((after - before) / before) * 100)} %`;
}

export default function ResultsPage() {
  const { actions } = getVisibilityDemoState();
  const measuredActions = actions.filter((action) => action.measurement);
  const totalClicksBefore = measuredActions.reduce((sum, action) => sum + (action.measurement?.clicksBefore ?? 0), 0);
  const totalClicksAfter = measuredActions.reduce((sum, action) => sum + (action.measurement?.clicksAfter ?? 0), 0);
  const totalConversionsBefore = measuredActions.reduce(
    (sum, action) => sum + (action.measurement?.conversionsBefore ?? 0),
    0,
  );
  const totalConversionsAfter = measuredActions.reduce(
    (sum, action) => sum + (action.measurement?.conversionsAfter ?? 0),
    0,
  );

  return (
    <VisibilityAppShell
      title="Resultater"
      description="Før/etter-måling for tiltak som er gjennomført. Målet er å vise fremdrift ærlig, ikke love mer enn dataene viser."
    >
      <div className="grid gap-6">
        <section className="rounded-[1.75rem] border border-slate-900 bg-slate-950 p-6 text-white md:p-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
              <BarChart3 size={14} />
              Hva virket?
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
              Vi måler tiltakene etter at de er utført.
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Når en oppgave er fullført, følger vi klikk, visninger, CTR, posisjon og konverteringer.
              Noen tiltak virker raskt. Andre trenger mer tid. Begge deler skal være synlig.
            </p>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            label="Organiske klikk"
            value={`+${percentChange(totalClicksBefore, totalClicksAfter)}`}
            hint={`${totalClicksBefore} -> ${totalClicksAfter} klikk`}
            tone="positive"
            icon={MousePointerClick}
          />
          <MetricCard
            label="Konverteringer"
            value={`+${totalConversionsAfter - totalConversionsBefore}`}
            hint={`${totalConversionsBefore} -> ${totalConversionsAfter} mål`}
            tone="positive"
            icon={Users}
          />
          <MetricCard
            label="Målte tiltak"
            value={String(measuredActions.length)}
            hint="Tiltak med før/etter-data"
            icon={TrendingUp}
          />
        </div>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Tiltak med målt effekt</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Viser hva som skjedde etter gjennomføring. Tolkning bør alltid ses sammen med sesong,
                konkurrentendringer og andre endringer på nettsiden.
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              Før/etter
            </span>
          </div>

          <div className="mt-6 grid gap-4">
            {measuredActions.map((action) => {
              const measurement = action.measurement;
              if (!measurement) return null;

              return (
                <article key={action.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{action.recommendation}</p>
                    </div>
                    <Link
                      href={`/synlighet/app/actions/${action.id}`}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      Se tiltak <ArrowRight size={15} />
                    </Link>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm md:grid-cols-5">
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-slate-500">Klikk</p>
                      <p className="mt-1 font-semibold">
                        {measurement.clicksBefore} {"->"} {measurement.clicksAfter}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-slate-500">Visninger</p>
                      <p className="mt-1 font-semibold">
                        {measurement.impressionsBefore.toLocaleString("nb-NO")} {"->"}{" "}
                        {measurement.impressionsAfter.toLocaleString("nb-NO")}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-slate-500">CTR</p>
                      <p className="mt-1 font-semibold">
                        {formatPercent(measurement.ctrBefore)} {"->"} {formatPercent(measurement.ctrAfter)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-slate-500">Posisjon</p>
                      <p className="mt-1 font-semibold">
                        {measurement.positionBefore.toLocaleString("nb-NO")} {"->"}{" "}
                        {measurement.positionAfter.toLocaleString("nb-NO")}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-4">
                      <p className="text-slate-500">Leads</p>
                      <p className="mt-1 font-semibold">
                        {measurement.conversionsBefore} {"->"} {measurement.conversionsAfter}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
