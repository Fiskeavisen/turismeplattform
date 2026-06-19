import Link from "next/link";
import { ArrowRight, Flame, ListChecks, Target, Users, Wrench, Zap } from "lucide-react";
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
import { dashboardMetrics, visibilityTrend } from "@/lib/synlighet/demo-data";
import { getVisibilityDemoState } from "@/lib/synlighet/store";

export const dynamic = "force-dynamic";

export default function VisibilityDashboardPage() {
  const { actions } = getVisibilityDemoState();
  const priorityActions = actions.slice(0, 4);

  const newActions = actions.filter((action) => action.status === "new").length;
  const highPriority = actions.filter((action) => action.priorityScore >= 85).length;
  const quickWins = actions.filter((action) => action.estimatedTimeMinutes <= 20).length;

  return (
    <VisibilityAppShell
      title="Organisk synlighet denne uken"
      description="Start med tiltakene som har høyest kombinasjon av potensial, relevans og gjennomførbarhet."
    >
      <div className="grid gap-6">
        <AppNotice />

        <section className="overflow-hidden rounded-[1.75rem] border border-slate-900 bg-slate-950 text-white shadow-sm">
          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100">
                <Target size={14} />
                Nytt: bedre råd med målprofil
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                Fortell oss hva som faktisk er viktig, så prioriterer vi smartere.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                Samme datagrunnlag kan gi ulike råd. En nettbutikk vil kanskje løfte høy-margin-produkter,
                mens en lokal bedrift trenger flere riktige henvendelser. Med noen få svar kan vi vekte
                tiltak etter mål, kundeverdi og geografisk fokus.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/synlighet/app/settings#malprofil"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-slate-950 hover:bg-slate-100"
                >
                  Fyll ut målprofil <ArrowRight size={15} />
                </Link>
                <Link
                  href="/synlighet/app/ordliste"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Se hvordan score leses
                </Link>
              </div>
            </div>

            <div className="grid gap-3">
              {[
                ["Hovedmål", "Flere riktige leads, bookinger eller salg"],
                ["Viktigst å selge", "Tjenester, produkter eller områder med høy verdi"],
                ["Målgruppe", "Hvem dere helst vil nå – og hvem dere ikke vil ha mer av"],
              ].map(([label, text], index) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sky-400/15 text-sm font-bold text-sky-100">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{label}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                <Users size={16} />
                Vi venter med «snitt blant våre kunder» til vi har nok ekte data.
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <Card className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">
                <TermLabel term="synlighetsscore">Synlighetsscore</TermLabel>
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                +{dashboardMetrics.weeklyChange} siden forrige uke
              </p>
              <ScoreMeaning score={dashboardMetrics.visibilityScore} className="mt-3" />
            </div>
            <DonutScore score={dashboardMetrics.visibilityScore} label="av 100" />
          </Card>
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Utvikling de siste ukene</h2>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Stigende trend
              </span>
            </div>
            <TrendChart values={visibilityTrend.map((point) => point.score)} className="mt-4 text-slate-900" />
            <div className="mt-2 flex justify-between text-xs font-medium text-slate-400">
              {visibilityTrend.map((point) => (
                <span key={point.week}>{point.week}</span>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Nye tiltak" value={String(newActions)} icon={ListChecks} />
          <MetricCard label="Høy prioritet" value={String(highPriority)} tone="warning" icon={Flame} />
          <MetricCard label="Raske gevinster" value={String(quickWins)} tone="positive" icon={Zap} />
          <MetricCard
            label="Tekniske feil"
            value={String(dashboardMetrics.technicalIssues)}
            tone="warning"
            icon={Wrench}
          />
        </div>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Ukens prioriterte tiltak</h2>
              <p className="mt-1 text-sm text-slate-500">
                Shortlistet fra Search Console, GA4, crawl og quality gate.
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
            {priorityActions.map((action) => (
              <article key={action.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{action.title}</h3>
                    <p className="mt-2 max-w-3xl leading-7 text-slate-600">{action.issue}</p>
                  </div>
                  <PriorityBadge score={action.priorityScore} />
                </div>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-5">
                  <span>Kategori: {action.category.replaceAll("_", " ")}</span>
                  <span>Tid: {action.estimatedTimeMinutes} min</span>
                  <span>Effekt: {action.expectedImpact}</span>
                  <span>Vanskelighet: <DifficultyLabel difficulty={action.difficulty} /></span>
                  <StatusBadge status={action.status} />
                </div>
                <div className="mt-4 rounded-xl bg-white p-4 text-sm leading-6 text-slate-600">
                  Datagrunnlag: {action.sourceData.impressions.toLocaleString("nb-NO")}{" "}
                  <TermLabel term="visninger">visninger</TermLabel>, {action.sourceData.clicks} klikk,{" "}
                  <TermLabel term="ctr">CTR</TermLabel> {formatPercent(action.sourceData.ctr)},{" "}
                  <TermLabel term="posisjon">posisjon</TermLabel>{" "}
                  {action.sourceData.position.toLocaleString("nb-NO")}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/synlighet/app/actions/${action.id}`}
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Se forslag
                  </Link>
                </div>
                <ActionControls actionId={action.id} />
              </article>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
