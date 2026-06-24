import { AlertTriangle, CheckCircle2, Code2, Gauge, ListChecks, Wrench } from "lucide-react";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, MetricCard } from "@/components/synlighet/ui";
import { technicalAuditItems } from "@/lib/synlighet/demo-data";
import type { TechnicalAuditCategory, TechnicalAuditSeverity } from "@/lib/synlighet/types";

const categoryLabels: Record<TechnicalAuditCategory, string> = {
  indexing: "Indeksering",
  crawlability: "Crawl",
  sitemap: "Sitemap",
  canonical: "Canonical",
  page_speed: "Hastighet",
  broken_links: "Brutte lenker",
  structured_data: "Strukturert data",
  hreflang: "Språk/land",
  redirects: "Redirects",
};

const severityLabels: Record<TechnicalAuditSeverity, string> = {
  high: "Høy",
  medium: "Medium",
  low: "Lav",
};

const severityClassName: Record<TechnicalAuditSeverity, string> = {
  high: "bg-rose-100 text-rose-800",
  medium: "bg-[#fee2b8] text-[#7c3d12]",
  low: "bg-stone-100 text-stone-700",
};

export default function TechnicalHealthPage() {
  const openItems = technicalAuditItems.filter((item) => item.status === "open");
  const developerItems = technicalAuditItems.filter((item) => item.needsDeveloper).length;
  const affectedPages = technicalAuditItems.reduce((sum, item) => sum + item.affectedPages, 0);
  const highSeverity = technicalAuditItems.filter((item) => item.severity === "high").length;
  const healthScore = Math.max(0, 100 - highSeverity * 18 - openItems.length * 6);

  return (
    <VisibilityAppShell
      title="Teknisk helse"
      description="En enkel teknisk SEO-sjekk forklart uten fagprat. Målet er å vise hva som bør fikses først, og hvem som kan gjøre det."
    >
      <div className="grid gap-6">
        <section className="relative overflow-hidden rounded-[2rem] border border-amber-200 bg-[#fff2cf] shadow-sm shadow-amber-900/10">
          <div className="absolute -right-16 -top-16 size-40 rounded-full bg-[#f6c56b]/40 blur-2xl" />
          <div className="absolute -bottom-20 left-12 size-44 rounded-full bg-[#8fd3b0]/35 blur-2xl" />
          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex rotate-[-1deg] items-center gap-2 rounded-full bg-[#275444] px-3 py-1 text-xs font-semibold text-amber-50 shadow-sm">
                <Wrench size={14} />
                Steg-for-steg, ikke teknisk sjargong
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-stone-950 md:text-4xl">
                Vi oversetter tekniske SEO-feil til konkrete oppgaver.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-stone-700">
                Sitemap, canonical, brutte lenker og schema kan høres teknisk ut. Her viser vi hva
                det betyr på vanlig norsk, hvorfor det påvirker synlighet, og om kunden kan fikse
                det selv eller bør sende det til utvikler.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-[#fffaf2]/80 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#a85f1a]">Teknisk helsescore</p>
              <p className="mt-3 text-5xl font-semibold tracking-[-0.05em] text-stone-950">{healthScore}</p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                God nok til å jobbe videre med innhold, men noen tekniske feil bør ryddes før de
                tapper verdi.
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Åpne tekniske oppgaver" value={String(openItems.length)} icon={ListChecks} />
          <MetricCard label="Høy risiko" value={String(highSeverity)} tone="warning" icon={AlertTriangle} />
          <MetricCard label="Berørte sider" value={String(affectedPages)} icon={Gauge} />
          <MetricCard
            label="Trenger utvikler"
            value={String(developerItems)}
            hint="Resten kan ofte fikses i CMS"
            icon={Code2}
          />
        </div>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Fiks dette først</h2>
              <p className="mt-2 max-w-3xl leading-7 text-stone-600">
                Inspirert av tekniske SEO-audits, men kortet ned til oppgaver som faktisk kan
                gjennomføres.
              </p>
            </div>
            <span className="rounded-full bg-[#275444]/10 px-3 py-1 text-xs font-semibold text-[#275444]">
              Crawl + sitemap + struktur
            </span>
          </div>

          <div className="mt-6 grid gap-4">
            {technicalAuditItems.map((item) => (
              <article key={item.id} className="rounded-2xl border border-amber-200 bg-[#fffaf2] p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700">
                        {categoryLabels[item.category]}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityClassName[item.severity]}`}>
                        {severityLabels[item.severity]} prioritet
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-stone-700">
                        {item.needsDeveloper ? "Send til utvikler" : "Kan ofte fikses i CMS"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 max-w-3xl leading-7 text-stone-700">{item.plainLanguageIssue}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-[#8a4f19]">
                    {item.affectedPages} sider
                  </span>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr]">
                  <div className="rounded-xl bg-white p-4 text-sm leading-6 text-stone-700">
                    <p className="font-semibold text-stone-950">Hvorfor det betyr noe</p>
                    <p className="mt-2">{item.whyItMatters}</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-sm leading-6 text-stone-700">
                    <p className="font-semibold text-stone-950">Anbefalt fiks</p>
                    <p className="mt-2">{item.recommendedFix}</p>
                  </div>
                </div>

                <ol className="mt-4 grid gap-2 text-sm leading-6 text-stone-700">
                  {item.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 rounded-xl bg-white px-4 py-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#275444] text-xs font-bold text-amber-50">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-stone-600">
                  <span>Eksempel: {item.exampleUrl}</span>
                  <span>Estimert tid: {item.estimatedTimeMinutes} min</span>
                  <span className="inline-flex items-center gap-1 text-[#275444]">
                    <CheckCircle2 size={15} />
                    Forklart for ikke-eksperter
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
