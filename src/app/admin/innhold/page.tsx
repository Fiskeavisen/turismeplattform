import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/ui";
import { articles, faqItems, reviews } from "@/lib/demo-data";

export const metadata = { title: "Innhold | Admin" };

export default function AdminContentPage() {
  const publishedReviews = reviews.filter((review) => review.published).length;

  return (
    <>
      <PageHeader
        title="Innhold"
        description="Artikler og FAQ som bygger synlighet i Google og AI-svartjenester. Omtaler administreres i egen seksjon."
      />

      <Panel className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Omtaler og reviews</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {publishedReviews} omtaler er publisert på nettsiden. Svar, godkjenn og koble til
              Google og Trustpilot under Omtaler.
            </p>
          </div>
          <Link
            href="/admin/omtaler"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Gå til omtaler <ArrowRight size={15} />
          </Link>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Artikler" action="Ny artikkel">
          <div className="grid gap-3">
            {articles.map((article) => (
              <article
                key={article.id}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 p-3"
              >
                <div
                  className="size-16 shrink-0 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url('${article.imageUrl}')` }}
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{article.title.nb}</p>
                  <p className="text-sm text-slate-500">
                    {article.category} · {article.readingMinutes} min lesing
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="FAQ" action="Nytt spørsmål">
          <div className="grid gap-3">
            {faqItems
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-semibold">{item.question.nb}</p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.answer.nb}</p>
                </div>
              ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
