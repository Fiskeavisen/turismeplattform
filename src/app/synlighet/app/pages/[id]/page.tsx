import { notFound } from "next/navigation";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard } from "@/components/synlighet/ui";
import { pageSnapshots } from "@/lib/synlighet/demo-data";

export default async function PageDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = pageSnapshots.find((item) => item.id === id);

  if (!page) {
    notFound();
  }

  return (
    <VisibilityAppShell title={page.url} description={page.metaDescription}>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card>
          <h2 className="text-xl font-semibold">Sideanalyse</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <MetricCard label="SEO-score" value={`${page.seoScore} / 100`} />
            <MetricCard label="AEO-score" value={`${page.aeoScore} / 100`} />
            <MetricCard label="Lokal score" value={`${page.localScore} / 100`} />
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
              <dt className="font-semibold text-slate-500">Ord</dt>
              <dd className="mt-1 text-slate-800">{page.wordCount.toLocaleString("nb-NO")}</dd>
            </div>
          </dl>
        </Card>
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
