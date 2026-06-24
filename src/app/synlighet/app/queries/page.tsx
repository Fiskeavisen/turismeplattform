import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard, PriorityBadge, formatPercent } from "@/components/synlighet/ui";
import {
  competitorObservations,
  keywordAlerts,
  keywordClusters,
  monitoredKeywords,
  queryRows,
} from "@/lib/synlighet/demo-data";

function positionChange(current: number, previous: number) {
  const diff = previous - current;
  const prefix = diff > 0 ? "+" : "";
  return `${prefix}${diff.toLocaleString("nb-NO", { maximumFractionDigits: 1 })}`;
}

function alertTone(severity: string) {
  if (severity === "high") return "border-rose-200 bg-rose-50 text-rose-950";
  if (severity === "medium") return "border-amber-200 bg-amber-50 text-amber-950";
  return "border-slate-200 bg-slate-50 text-slate-800";
}

export default function QueriesPage() {
  const actionNeeded = monitoredKeywords.filter((keyword) => keyword.status === "action_needed").length;
  const averagePosition =
    monitoredKeywords.reduce((sum, keyword) => sum + keyword.position, 0) / monitoredKeywords.length;
  const improvingKeywords = monitoredKeywords.filter(
    (keyword) => keyword.position < keyword.previousPosition,
  ).length;

  return (
    <VisibilityAppShell
      title="Muligheter"
      description="Søk, sider og temaer der kunden har et konkret vekstpotensial. Søkeord brukes som signal, ikke som sluttprodukt."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Monitorerte søkeord" value={String(monitoredKeywords.length)} />
          <MetricCard
            label="Krever tiltak"
            value={String(actionNeeded)}
            tone={actionNeeded > 0 ? "warning" : "positive"}
          />
          <MetricCard
            label="Snittposisjon"
            value={averagePosition.toLocaleString("nb-NO", { maximumFractionDigits: 1 })}
          />
          <MetricCard label="Bedre siden sist" value={String(improvingKeywords)} tone="positive" />
        </div>

        <Card>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Mulighetsvarsler</h2>
              <p className="mt-1 text-sm text-slate-500">
                Varsler er bare nyttige når de peker til neste handling.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {keywordAlerts.length} aktive
            </span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {keywordAlerts.map((alert) => (
              <article key={alert.id} className={`rounded-2xl border p-5 ${alertTone(alert.severity)}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-wide">{alert.type.replaceAll("_", " ")}</p>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">
                    {alert.severity === "high" ? "Høy" : alert.severity === "medium" ? "Medium" : "Lav"}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{alert.title}</h3>
                <p className="mt-2 leading-7">{alert.description}</p>
                <p className="mt-4 text-sm font-semibold">Neste tiltak: {alert.recommendedAction}</p>
              </article>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-semibold">Monitorerte søkeord</h2>
            <p className="mt-1 text-sm text-slate-500">
              Posisjon, CTR, intensjon og vinnerside følges over tid.
            </p>
          </div>
          <div className="hidden grid-cols-[1.2fr_0.75fr_0.65fr_0.65fr_0.7fr_1fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
            <span>Søkeord</span>
            <span>Posisjon</span>
            <span>CTR</span>
            <span>Prioritet</span>
            <span>SERP</span>
            <span>Neste handling</span>
          </div>
          {monitoredKeywords.map((keyword) => (
            <article
              key={keyword.id}
              className="grid gap-4 border-b border-slate-100 p-5 last:border-b-0 lg:grid-cols-[1.2fr_0.75fr_0.65fr_0.65fr_0.7fr_1fr]"
            >
              <div>
                <h3 className="font-semibold">{keyword.keyword}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {keyword.currentUrl === keyword.targetUrl ? keyword.currentUrl : `${keyword.currentUrl} -> ${keyword.targetUrl}`}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {keyword.intent.replaceAll("_", " ")}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">{keyword.position.toLocaleString("nb-NO")}</p>
                <p className={keyword.position < keyword.previousPosition ? "text-sm text-emerald-700" : "text-sm text-rose-700"}>
                  {positionChange(keyword.position, keyword.previousPosition)} siden sist
                </p>
              </div>
              <div>
                <p className="font-semibold">{formatPercent(keyword.ctr)}</p>
                <p className="text-sm text-slate-500">{keyword.clicks} klikk</p>
              </div>
              <PriorityBadge score={keyword.priority} />
              <div className="flex flex-wrap gap-1">
                {keyword.serpFeatures.slice(0, 3).map((feature) => (
                  <span key={feature} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    {feature.replaceAll("_", " ")}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-6 text-slate-700">{keyword.nextAction}</p>
            </article>
          ))}
        </Card>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <Card>
            <h2 className="text-xl font-semibold">Keyword clusters</h2>
            <p className="mt-1 text-sm text-slate-500">
              Grupperer søkeuniverset etter intensjon og anbefalt sidetype.
            </p>
            <div className="mt-5 grid gap-4">
              {keywordClusters.map((cluster) => (
                <article key={cluster.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{cluster.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{cluster.intent.replaceAll("_", " ")}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                      Dekning {cluster.coverageScore} / 100
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{cluster.gap}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    Neste steg: {cluster.recommendedNextStep}
                  </p>
                </article>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold">Konkurrent-/SERP-notater</h2>
            <p className="mt-1 text-sm text-slate-500">
              Ikke full konkurrentanalyse, men nok til å se hva kunden mangler i søkeresultatet.
            </p>
            <div className="mt-5 grid gap-4">
              {competitorObservations.map((competitor) => (
                <article key={competitor.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold">{competitor.competitor}</h3>
                    <span className="text-sm text-slate-500">{competitor.sharedKeywords} felles søk</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    Sterkere på: {competitor.strongerOn.join(", ")}.
                  </p>
                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    Svar: {competitor.recommendedResponse}
                  </p>
                </article>
              ))}
            </div>
          </Card>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="border-b border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-semibold">Rå Search Console-rader</h2>
            <p className="mt-1 text-sm text-slate-500">
              Beholdes for sporbarhet, men tiltakene prioriteres i modulene over.
            </p>
          </div>
          <div className="hidden grid-cols-[1.2fr_1fr_0.5fr_0.7fr_0.6fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-50 p-4 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:grid">
            <span>Søk</span>
            <span>Side</span>
            <span>Klikk</span>
            <span>Visninger</span>
            <span>CTR</span>
            <span>Intensjon</span>
          </div>
          {queryRows.map((row) => (
            <div
              key={row.id}
              className="grid gap-3 border-b border-slate-100 p-4 text-sm last:border-b-0 lg:grid-cols-[1.2fr_1fr_0.5fr_0.7fr_0.6fr_0.8fr]"
            >
              <span className="font-medium">{row.query}</span>
              <span className="text-slate-600">{row.page}</span>
              <span>{row.clicks}</span>
              <span>{row.impressions.toLocaleString("nb-NO")}</span>
              <span>{formatPercent(row.ctr)}</span>
              <span>{row.intent.replaceAll("_", " ")}</span>
            </div>
          ))}
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
