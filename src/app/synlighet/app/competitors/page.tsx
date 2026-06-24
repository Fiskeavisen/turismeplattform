import Link from "next/link";
import { ArrowRight, SearchCheck, Swords, Target } from "lucide-react";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard } from "@/components/synlighet/ui";
import { competitorObservations, keywordClusters } from "@/lib/synlighet/demo-data";

export default function CompetitorsPage() {
  const strongestGap = keywordClusters.reduce((best, cluster) =>
    cluster.commercialValue > best.commercialValue ? cluster : best,
  );

  return (
    <VisibilityAppShell
      title="Konkurrenter"
      description="Kort konkurrent- og mulighetsanalyse. Ikke en stor rapport, men konkrete hull kunden kan tette."
    >
      <div className="grid gap-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-amber-200 bg-[#fff2cf] p-6 shadow-sm shadow-amber-900/10 md:p-8">
          <div className="absolute -right-16 -top-16 size-40 rounded-full bg-[#f6c56b]/40 blur-2xl" />
          <div className="absolute -bottom-16 left-12 size-40 rounded-full bg-[#8fd3b0]/35 blur-2xl" />
          <div className="max-w-3xl">
            <div className="inline-flex rotate-[-1deg] items-center gap-2 rounded-full bg-[#275444] px-3 py-1 text-xs font-semibold text-amber-50 shadow-sm">
              <Swords size={14} />
              Hvor ligger mulighetene?
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-stone-950 md:text-4xl">
              Vi ser etter hull konkurrentene dekker bedre enn deg.
            </h2>
            <p className="mt-4 leading-7 text-stone-700">
              Målet er ikke å kopiere konkurrenter. Målet er å finne de få temaene, sidene og
              kjøpsspørsmålene som kan gi vekst hvis de prioriteres riktig.
            </p>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard label="Observerte konkurrenter" value={String(competitorObservations.length)} icon={Swords} />
          <MetricCard
            label="Viktigste innholdsgap"
            value={`${100 - strongestGap.coverageScore} %`}
            hint={strongestGap.name}
            tone="warning"
            icon={Target}
          />
          <MetricCard
            label="Anbefalt neste steg"
            value="3"
            hint="konkrete muligheter først"
            icon={SearchCheck}
          />
        </div>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">3 muligheter du mangler</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Dette er handlingsorienterte hull, ikke en endeløs liste med søkeord.
              </p>
            </div>
            <Link
              href="/synlighet/app/queries"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-50"
            >
              Se alle muligheter <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {keywordClusters.slice(0, 3).map((cluster) => (
              <article key={cluster.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  Dekning {cluster.coverageScore} / 100
                </span>
                <h3 className="mt-4 font-semibold">{cluster.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{cluster.gap}</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  Neste steg: {cluster.recommendedNextStep}
                </p>
              </article>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Hvorfor konkurrentene vinner</h2>
          <p className="mt-2 leading-7 text-slate-600">
            Forklart i vanlig språk, slik at kunden ser hva som bør bygges, forbedres eller dokumenteres.
          </p>
          <div className="mt-6 grid gap-4">
            {competitorObservations.map((competitor) => (
              <article key={competitor.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{competitor.competitor}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {competitor.domain} · {competitor.sharedKeywords} felles søk
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    SERP-notat
                  </span>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Sterkere på</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{competitor.strongerOn.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Mønster</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{competitor.contentPatterns.join(", ")}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Anbefalt respons</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{competitor.recommendedResponse}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
