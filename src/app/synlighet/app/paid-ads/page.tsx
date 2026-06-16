import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { TermLabel } from "@/components/synlighet/term-info";
import { Card, MetricCard, StatusBadge } from "@/components/synlighet/ui";
import { paidAdsAlerts, paidAdsCampaigns, paidLandingPageObservations } from "@/lib/synlighet/demo-data";

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

  return (
    <VisibilityAppShell
      title="Betalte annonser"
      description="Overvåk Google Ads, Meta og landingssider med fokus på sløsing, CPA, konverteringer og samspill med organisk synlighet."
    >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Spend siste periode" value={currency.format(totalSpend)} />
          <MetricCard label="Konverteringer" value={totalConversions.toLocaleString("nb-NO")} tone="positive" />
          <MetricCard label="Snitt CPA" value={currency.format(weightedCpa)} tone="warning" />
          <MetricCard label="Kritiske varsler" value={highSeverityAlerts.toString()} tone="warning" />
        </div>

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
                  <p className="mt-4 text-sm font-semibold text-slate-900">Tiltak: {alert.recommendedAction}</p>
                </article>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Kampanjer</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Kampanje</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Spend</th>
                  <th className="px-4 py-3"><TermLabel term="ctr">CTR</TermLabel></th>
                  <th className="px-4 py-3"><TermLabel term="cpc">CPC</TermLabel></th>
                  <th className="px-4 py-3">Konv.</th>
                  <th className="px-4 py-3"><TermLabel term="cpa">CPA</TermLabel></th>
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
