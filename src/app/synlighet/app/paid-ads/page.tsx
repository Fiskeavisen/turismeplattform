import { ArrowRight, Lightbulb, ShieldAlert, WalletCards } from "lucide-react";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { TermLabel } from "@/components/synlighet/term-info";
import { Card, MetricCard, StatusBadge } from "@/components/synlighet/ui";
import {
  paidAdsAlerts,
  paidAdsCampaigns,
  paidAdsRecommendations,
  paidLandingPageObservations,
} from "@/lib/synlighet/demo-data";

const currency = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
  maximumFractionDigits: 0,
});

const percent = new Intl.NumberFormat("nb-NO", {
  style: "percent",
  maximumFractionDigits: 1,
});

export default function PaidAdsPage() {
  const totalSpend = paidAdsCampaigns.reduce((sum, campaign) => sum + campaign.spend, 0);
  const totalConversions = paidAdsCampaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const totalClicks = paidAdsCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const weightedCpa = totalConversions > 0 ? totalSpend / totalConversions : 0;
  const highSeverityAlerts = paidAdsAlerts.filter((alert) => alert.severity === "high").length;
  const topRecommendation = [...paidAdsRecommendations].sort((a, b) => b.priority - a.priority)[0];
  const estimatedSavings = paidAdsRecommendations.reduce(
    (sum, recommendation) => sum + (recommendation.estimatedMonthlySavings ?? 0),
    0,
  );

  return (
    <VisibilityAppShell
      title="Betalte annonser"
      description="Overvåk Google Ads, Meta og landingssider med fokus på sløsing, CPA, konverteringer og samspill med organisk synlighet."
    >
      <div className="grid gap-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-amber-200 bg-[#fff2cf] shadow-sm shadow-amber-900/10">
          <div className="absolute -right-16 -top-16 size-40 rounded-full bg-[#f6c56b]/40 blur-2xl" />
          <div className="absolute -bottom-16 left-12 size-40 rounded-full bg-[#8fd3b0]/35 blur-2xl" />
          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex rotate-[-1deg] items-center gap-2 rounded-full bg-[#275444] px-3 py-1 text-xs font-semibold text-amber-50 shadow-sm">
                <ShieldAlert size={14} />
                Annonseovervåkning
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-stone-950 md:text-4xl">
                Vi finner hvor annonsekronene lekker, og hva som bør fikses først.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-700 md:text-base">
                Betalte annonser bør ikke vurderes isolert. Vi kobler Google Ads, Meta, landingssider og
                organisk synlighet, slik at rådene handler om faktisk lønnsomhet, ikke bare klikk.
              </p>
            </div>
            <div className="grid gap-3">
              <div className="rounded-2xl border border-amber-200 bg-[#fffaf2]/80 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#a85f1a]">Viktigste tips nå</p>
                <h3 className="mt-2 text-xl font-semibold">{topRecommendation.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-700">{topRecommendation.recommendation}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-[#fee2b8] px-3 py-1 text-[#7c3d12]">
                    Prioritet {topRecommendation.priority}/100
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-stone-700">
                    {topRecommendation.estimatedTimeMinutes} min å starte
                  </span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#275444]/10 p-4">
                  <WalletCards className="size-5 text-[#275444]" />
                  <p className="mt-3 text-2xl font-semibold">{currency.format(estimatedSavings)}</p>
                  <p className="mt-1 text-xs leading-5 text-stone-700">mulig månedlig budsjettforbedring</p>
                </div>
                <div className="rounded-2xl bg-[#fffaf2]/80 p-4">
                  <Lightbulb className="size-5 text-[#a85f1a]" />
                  <p className="mt-3 text-2xl font-semibold">{paidAdsRecommendations.length}</p>
                  <p className="mt-1 text-xs leading-5 text-stone-700">konkrete annonsetips</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Spend siste periode" value={currency.format(totalSpend)} />
          <MetricCard label="Konverteringer" value={totalConversions.toLocaleString("nb-NO")} tone="positive" />
          <MetricCard label="Snitt CPA" value={currency.format(weightedCpa)} tone="warning" />
          <MetricCard label="Kritiske varsler" value={highSeverityAlerts.toString()} tone="warning" />
        </div>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Anbefalte annonsetiltak</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Sortert etter kombinasjon av kostnad, risiko, potensial og hvor raskt tiltaket kan startes.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Tips + budsjett + landingsside
            </span>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {paidAdsRecommendations.map((recommendation) => {
              const campaign = recommendation.campaignId
                ? paidAdsCampaigns.find((item) => item.id === recommendation.campaignId)
                : undefined;

              return (
                <article key={recommendation.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {campaign?.name ?? "Konto / samlet vurdering"}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">{recommendation.title}</h3>
                    </div>
                    <span
                      className={
                        recommendation.priority >= 90
                          ? "rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700"
                          : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                      }
                    >
                      {recommendation.priority}/100
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{recommendation.insight}</p>
                  <div className="mt-4 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700">
                    <p className="font-semibold text-slate-950">Tips: {recommendation.recommendation}</p>
                    <p className="mt-2 text-slate-600">{recommendation.whyItMatters}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-700">
                      Effekt: {recommendation.expectedImpact}
                    </span>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-700">
                      {recommendation.estimatedTimeMinutes} min
                    </span>
                    {recommendation.estimatedMonthlySavings ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
                        Mulig sparing {currency.format(recommendation.estimatedMonthlySavings)}/mnd
                      </span>
                    ) : null}
                  </div>
                  <ol className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
                    {recommendation.steps.map((step, index) => (
                      <li key={step} className="flex gap-2">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#275444] text-[11px] font-bold text-amber-50">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Varsler som krever handling</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Målet er å stoppe tap først, deretter finne hva som kan skaleres.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {totalClicks.toLocaleString("nb-NO")} betalte klikk analysert
            </span>
          </div>
          <div className="mt-5 grid gap-4">
            {paidAdsAlerts.map((alert) => {
              const campaign = paidAdsCampaigns.find((item) => item.id === alert.campaignId);

              return (
                <article key={alert.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {campaign?.name ?? "Ukjent kampanje"}
                      </p>
                      <h3 className="mt-1 font-semibold">{alert.title}</h3>
                    </div>
                    <span
                      className={
                        alert.severity === "high"
                          ? "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
                          : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                      }
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{alert.description}</p>
                  <p className="mt-4 text-sm font-semibold text-slate-900">
                    Tiltak: {alert.recommendedAction}
                  </p>
                </article>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Kampanjer</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Kampanje</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Spend</th>
                  <th className="px-4 py-3"><TermLabel term="ctr">CTR</TermLabel></th>
                  <th className="px-4 py-3"><TermLabel term="cpc">CPC</TermLabel></th>
                  <th className="px-4 py-3">Konv.</th>
                  <th className="px-4 py-3"><TermLabel term="cpa">CPA</TermLabel></th>
                  <th className="px-4 py-3">Neste tips</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {paidAdsCampaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">{campaign.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{campaign.landingPage}</p>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={campaign.status === "enabled" ? "connected" : "needs_review"} />
                    </td>
                    <td className="px-4 py-4">{currency.format(campaign.spend)}</td>
                    <td className="px-4 py-4">{percent.format(campaign.ctr)}</td>
                    <td className="px-4 py-4">{currency.format(campaign.cpc)}</td>
                    <td className="px-4 py-4">{campaign.conversions}</td>
                    <td className="px-4 py-4">{currency.format(campaign.costPerConversion)}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex max-w-xs items-center gap-1 text-xs font-medium leading-5 text-slate-600">
                        {campaign.nextAction} <ArrowRight size={13} className="shrink-0" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Landingssider for betalt trafikk</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {paidLandingPageObservations.map((page) => (
              <article key={page.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold">{page.url}</h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {page.pageScore} / 100
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-slate-500">Paid spend</dt>
                    <dd className="mt-1 font-semibold">{currency.format(page.paidSpend)}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Paid konv.</dt>
                    <dd className="mt-1 font-semibold">{page.paidConversions}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Organiske klikk</dt>
                    <dd className="mt-1 font-semibold">{page.organicClicks}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm leading-6 text-slate-600">{page.issue}</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">{page.recommendedAction}</p>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
