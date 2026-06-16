import Link from "next/link";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard } from "@/components/synlighet/ui";
import { pageSnapshots } from "@/lib/synlighet/demo-data";

export default function PagesOverviewPage() {
  return (
    <VisibilityAppShell
      title="Sider"
      description="URL-er fra crawl og Search Console, med SEO-, AEO- og lokal score."
    >
      <Card>
        <div className="grid gap-4">
          {pageSnapshots.map((page) => (
            <Link
              key={page.id}
              href={`/synlighet/app/pages/${page.id}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:bg-white"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{page.url}</h2>
                  <p className="mt-1 text-sm text-slate-500">{page.title}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {page.pageType}
                  </p>
                </div>
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                  {page.statusCode}
                </span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-4">
                <MetricCard label="SEO-score" value={`${page.seoScore} / 100`} />
                <MetricCard label="AEO-score" value={`${page.aeoScore} / 100`} />
                <MetricCard label="Lokal score" value={`${page.localScore} / 100`} />
                <MetricCard
                  label="Beskrivelse"
                  value={`${page.descriptionScore} / 100`}
                  tone={page.descriptionScore < 55 ? "warning" : "neutral"}
                />
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </VisibilityAppShell>
  );
}
