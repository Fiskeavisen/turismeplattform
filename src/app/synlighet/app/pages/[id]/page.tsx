import { notFound } from "next/navigation";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard } from "@/components/synlighet/ui";
import { descriptionAudits, pageSnapshots } from "@/lib/synlighet/demo-data";

export default async function PageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = pageSnapshots.find((item) => item.id === id);

  if (!page) {
    notFound();
  }

  const descriptionAudit = descriptionAudits.find((audit) => audit.url === page.url);

  return (
    <VisibilityAppShell title={page.url} description={page.metaDescription}>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="grid gap-6">
          <Card>
            <h2 className="text-xl font-semibold">Sideanalyse</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-4">
              <MetricCard label="SEO-score" value={`${page.seoScore} / 100`} />
              <MetricCard label="AEO-score" value={`${page.aeoScore} / 100`} />
              <MetricCard label="Lokal score" value={`${page.localScore} / 100`} />
              <MetricCard
                label="Beskrivelse"
                value={`${page.descriptionScore} / 100`}
                tone={page.descriptionScore < 55 ? "warning" : "neutral"}
              />
            </div>
            <dl className="mt-6 grid gap-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Title</dt>
                <dd className="mt-1 text-slate-800">{page.title}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">H1</dt>
                <dd className="mt-1 text-slate-800">{page.h1}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Sidetype</dt>
                <dd className="mt-1 text-slate-800">{page.pageType}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Ord</dt>
                <dd className="mt-1 text-slate-800">{page.wordCount.toLocaleString("nb-NO")}</dd>
              </div>
            </dl>
          </Card>
          {descriptionAudit ? (
          <Card>
            <h2 className="text-xl font-semibold">Beskrivelseskvalitet</h2>
            <p className="mt-2 leading-7 text-slate-600">{descriptionAudit.issue}</p>
            <div className="mt-5 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-500">Anbefalt brief</p>
              <p className="mt-2 leading-7 text-slate-800">{descriptionAudit.recommendedDescriptionBrief}</p>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Mangler</h3>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                  {descriptionAudit.missingElements.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Foreslåtte seksjoner</h3>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
                  {descriptionAudit.suggestedSections.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
          ) : null}
        </div>
        <div className="grid gap-6 self-start">
          <Card>
            <h2 className="text-lg font-semibold">Funn</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
              {page.issues.map((issue) => (
                <li key={issue}>• {issue}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold">Muligheter</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
              {page.opportunities.map((opportunity) => (
                <li key={opportunity}>• {opportunity}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </VisibilityAppShell>
  );
}
