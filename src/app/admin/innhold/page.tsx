import { Star } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/ui";
import { articles, faqItems, reviews } from "@/lib/demo-data";

export const metadata = { title: "Innhold | Admin" };

export default function AdminContentPage() {
  return (
    <>
      <PageHeader
        title="Innhold"
        description="Artikler, FAQ og anmeldelser som bygger synlighet i Google og AI-svartjenester."
      />

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

        <Panel title="Anmeldelser" className="xl:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <figure key={review.id} className="rounded-2xl border border-slate-200 p-5">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} size={15} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-6">“{review.quote.nb}”</blockquote>
                <figcaption className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {review.guestName} · {review.source} · {review.date}
                </figcaption>
              </figure>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
