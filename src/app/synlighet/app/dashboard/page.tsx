import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Flame, ListChecks, Target, Wrench, Zap } from "lucide-react";
import { ActionControls } from "@/components/synlighet/action-controls";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { DonutScore, TrendChart } from "@/components/synlighet/graphics";
import { ScoreMeaning, TermLabel } from "@/components/synlighet/term-info";
import {
  AppNotice,
  Card,
  DifficultyLabel,
  MetricCard,
  PriorityBadge,
  StatusBadge,
  formatPercent,
} from "@/components/synlighet/ui";
import { dashboardMetrics, technicalAuditItems, visibilityTrend } from "@/lib/synlighet/demo-data";
import { getVisibilityDemoState } from "@/lib/synlighet/store";
import type { ActionImpactArea, ActionSource, VisibilityAction } from "@/lib/synlighet/types";

export const dynamic = "force-dynamic";

const sourceLabels: Record<ActionSource, string> = {
  search_console: "Search Console",
  ga4: "GA4",
  crawl: "Crawl",
  competitor: "Konkurrentanalyse",
  ads: "Annonser",
  manual: "Manuell vurdering",
};

const impactLabels: Record<ActionImpactArea, string> = {
  trafikk: "Trafikk",
  leads: "Leads",
  synlighet: "Synlighet",
  teknisk: "Teknisk",
  kostnad: "Kostnad",
};

function sourceText(action: VisibilityAction) {
  if (action.sources?.length) {
    return action.sources.map((source) => sourceLabels[source]).join(", ");
  }

  return "Search Console, GA4 og crawl";
}

export default function VisibilityDashboardPage() {
  const { actions } = getVisibilityDemoState();
  const weeklyActions = [...actions]
    .filter((action) => action.status !== "completed" && action.status !== "ignored")
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 5);
  const newActions = actions.filter((action) => action.status === "new").length;
  const highPriority = actions.filter((action) => action.priorityScore >= 85).length;
  const quickWins = actions.filter((action) => action.estimatedTimeMinutes <= 20).length;
  const estimatedTime = weeklyActions.reduce((sum, action) => sum + action.estimatedTimeMinutes, 0);
  const mainOpportunity = weeklyActions[0];
  const technicalIssues = technicalAuditItems.filter((item) => item.status === "open").length;

  return (
    <VisibilityAppShell
      title="Denne ukens oppgaver"
      description="Her er de tiltakene som mest sannsynlig gir bedre synlighet, flere riktige klikk eller lavere annonsekostnad nå."
    >
      <div className="grid gap-6">
        <AppNotice />

        <section className="relative overflow-hidden rounded-[2rem] border border-amber-200 bg-[#fff2cf] shadow-sm shadow-amber-900/10">
          <div className="absolute -right-16 -top-16 size-40 rounded-full bg-[#f6c56b]/40 blur-2xl" />
          <div className="absolute -bottom-20 left-12 size-44 rounded-full bg-[#8fd3b0]/35 blur-2xl" />
          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex rotate-[-1deg] items-center gap-2 rounded-full bg-[#275444] px-3 py-1 text-xs font-semibold text-amber-50 shadow-sm">
                <ListChecks size={14} />
                Operativ arbeidsliste
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-stone-950 md:text-4xl">
                Du har {weeklyActions.length} anbefalte tiltak denne uken.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-700 md:text-base">
                Vi viser ikke alt vi vet. Vi viser det du bør gjøre først, forklart med vanlig språk,
                estimert tidsbruk og datakilden bak anbefalingen.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={mainOpportunity ? `/synlighet/app/actions/${mainOpportunity.id}` : "/synlighet/app/actions"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#275444] px-5 text-sm font-semibold text-amber-50 shadow-sm hover:bg-[#1f4638]"
                >
                  Start med viktigste tiltak <ArrowRight size={15} />
                </Link>
                <Link
                  href="/synlighet/app/results"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-amber-300 bg-[#fffaf2]/70 px-5 text-sm font-semibold text-stone-800 hover:bg-[#fffaf2]"
                >
                  Se hva som har virket
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                ["Estimert effekt", mainOpportunity ? impactLabels[mainOpportunity.impactArea ?? "synlighet"] : "Synlighet"],
                ["Estimert tidsbruk", `${Math.round(estimatedTime / 60)} timer totalt`],
                ["Viktigste mulighet", mainOpportunity?.title ?? "Ingen åpne tiltak"],
              ].map(([label, text]) => (
                <div key={label} className="rounded-2xl border border-amber-200 bg-[#fffaf2]/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#a85f1a]">{label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-stone-900">{text}</p>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-2xl bg-[#275444]/10 px-4 py-3 text-sm text-[#275444]">
                <CheckCircle2 size={16} />
                Basert på kundens egne Google-data, crawl og prioriteringsregler.
              </div>
            </div>
          </div>
        </section>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Gjør dette først</h2>
              <p className="mt-1 text-sm text-slate-500">
                3-5 prioriterte oppgaver, ikke en lang varslingsliste.
              </p>
            </div>
            <Link
              href="/synlighet/app/actions"
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-50"
            >
              Se alle tiltak <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {weeklyActions.map((action, index) => (
              <article key={action.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="grid gap-4 lg:grid-cols-[auto_1fr_auto] lg:items-start">
                  <span className="grid size-9 place-items-center rounded-full bg-[#275444] text-sm font-semibold text-amber-50">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={action.status} />
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                        Effekt: {impactLabels[action.impactArea ?? "synlighet"]}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                        Kilde: {sourceText(action)}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{action.title}</h3>
                    <p className="mt-2 max-w-3xl leading-7 text-slate-600">{action.recommendation}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Hvorfor: {action.whyItMatters}
                    </p>
                  </div>
                  <PriorityBadge score={action.priorityScore} />
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-4">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={15} /> {action.estimatedTimeMinutes} min
                  </span>
                  <span>
                    Vanskelighet: <DifficultyLabel difficulty={action.difficulty} />
                  </span>
                  <span>Forventet effekt: {action.expectedImpact}</span>
                  <span>
                    <TermLabel term="ctr">CTR</TermLabel>: {formatPercent(action.sourceData.ctr)}
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-white p-4 text-sm leading-6 text-slate-600">
                  {action.sourceSummary ??
                    `Basert på ${action.sourceData.impressions.toLocaleString("nb-NO")} visninger, ${action.sourceData.clicks} klikk og posisjon ${action.sourceData.position.toLocaleString("nb-NO")}.`}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/synlighet/app/actions/${action.id}`}
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#275444] px-4 text-sm font-semibold text-amber-50 hover:bg-[#1f4638]"
                  >
                    Se tekstforslag
                  </Link>
                </div>
                <ActionControls actionId={action.id} />
              </article>
            ))}
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Åpne tiltak" value={String(newActions)} icon={ListChecks} />
          <MetricCard label="Høy prioritet" value={String(highPriority)} tone="warning" icon={Flame} />
          <MetricCard label="Raske gevinster" value={String(quickWins)} tone="positive" icon={Zap} />
          <MetricCard
            label="Teknisk helse"
            value={String(technicalIssues)}
            hint="Åpne tekniske oppgaver"
            tone={technicalIssues > 0 ? "warning" : "positive"}
            icon={Wrench}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Card className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                <TermLabel term="synlighetsscore">Synlighetsscore</TermLabel>
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Sekundær indikator, ikke hovedoppgaven.
              </p>
              <ScoreMeaning score={dashboardMetrics.visibilityScore} className="mt-3" />
            </div>
            <DonutScore score={dashboardMetrics.visibilityScore} label="av 100" />
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">Trend</h2>
            <p className="mt-1 text-sm text-slate-500">
              Brukes for å se retning etter at tiltak er gjennomført.
            </p>
            <TrendChart values={visibilityTrend.map((point) => point.score)} className="mt-4 text-slate-900" />
            <div className="mt-2 flex justify-between text-xs font-medium text-slate-400">
              {visibilityTrend.map((point) => (
                <span key={point.week}>{point.week}</span>
              ))}
            </div>
          </Card>
        </div>

        <Card className="border-sky-200 bg-sky-50">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-900">
                <Target size={14} />
                Bedre prioritering
              </div>
              <h2 className="mt-4 text-xl font-semibold">Målprofil gjør listen smartere</h2>
              <p className="mt-2 max-w-3xl leading-7 text-slate-700">
                Når kunden fyller inn hva som faktisk gir verdi, kan samme Google-data vektes mot
                riktige leads, lønnsomme tjenester, geografiske områder og produkter med høy margin.
              </p>
            </div>
            <Link
              href="/synlighet/app/settings#malprofil"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#275444] px-4 text-sm font-semibold text-amber-50 hover:bg-[#1f4638]"
            >
              Fyll ut målprofil <ArrowRight size={15} />
            </Link>
          </div>
        </Card>

        <Card className="border-amber-200 bg-[#fff4d8]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#8a4f19]">
                <Wrench size={14} />
                Teknisk SEO uten sjargong
              </div>
              <h2 className="mt-4 text-xl font-semibold">Sjekk om teknikken tapper verdi</h2>
              <p className="mt-2 max-w-3xl leading-7 text-stone-700">
                Vi forklarer sitemap, canonical, brutte lenker og schema som konkrete oppgaver,
                og viser hva kunden kan fikse selv og hva som bør sendes til utvikler.
              </p>
            </div>
            <Link
              href="/synlighet/app/technical"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#275444] px-4 text-sm font-semibold text-amber-50 hover:bg-[#1f4638]"
            >
              Se teknisk helse <ArrowRight size={15} />
            </Link>
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
