import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  FeltbokShell,
  FieldLabel,
  SectionHeading,
} from "@/components/feltbok/feltbok-shell";
import {
  feltbokArticles,
  feltbokPrinciples,
  feltbokServices,
  feltbokStats,
  friMediaSites,
} from "@/lib/feltbok";
import { norskeBilder } from "@/lib/images";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: {
    nb: "Fri Media | Mediehus med åtte nisjenettsider",
    en: "Fri Media | A niche media house",
    de: "Fri Media | Medienhaus mit Nischenseiten",
  },
  description: {
    nb: "Fri Media er et eierdrevet mediehus i Skodje med åtte nisjenettsider innen fiske, jakt, friluftsliv, sikkerhet, frakt og ved, pluss innholdsproduksjon, annonsering og uavhengige tester.",
    en: "Fri Media is an owner-driven niche media house in Skodje.",
    de: "Fri Media ist ein inhabergeführtes Nischen-Medienhaus in Skodje.",
  },
});

export default function Home() {
  return (
    <FeltbokShell>
      <section className="border-b border-[#20201c]/12">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <FieldLabel>Felt notat 01 · Skodje</FieldLabel>
            <h1
              className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Vi lager nettsider for folk som vet hva de leter etter.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#20201c]/70">
              Fri Media er et lite, eierdrevet mediehus. Vi driver åtte
              nisjenettsider innen fiske, jakt, friluftsliv, sikkerhet, frakt og
              ved, av folk som faktisk er ute i feltet selv.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/om-oss"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#2f4034] px-6 font-semibold text-[#f3eee4] transition hover:bg-[#243228]"
              >
                Om mediehuset <ArrowRight size={17} />
              </Link>
              <Link
                href="/tjenester"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#20201c]/25 px-6 font-semibold transition hover:bg-[#20201c]/5"
              >
                For bedrifter
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#20201c]/12">
            <div
              className="aspect-[4/5] bg-cover bg-center"
              style={{ backgroundImage: `url('${norskeBilder.fjordbaat.hero}')` }}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#20201c]/80 to-transparent p-6 text-[#f3eee4]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f3eee4]/70">
                Felt
              </p>
              <p className="mt-2 max-w-sm text-xl font-semibold leading-snug">
                Innhold som hører hjemme der leseren faktisk er.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#20201c]/12 bg-[#faf6ee]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 md:grid-cols-4">
          {feltbokStats.map(([value, label]) => (
            <div key={label} className="px-2 py-8 text-center md:py-10">
              <p
                className="text-4xl font-black tracking-[-0.04em] text-[#2f4034] md:text-5xl"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                {value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#20201c]/55">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <FieldLabel>Nettstedene</FieldLabel>
            <div className="mt-4">
              <SectionHeading>Åtte nettsider, hver med egne lesere.</SectionHeading>
            </div>
            <p className="mt-5 max-w-xl leading-7 text-[#20201c]/68">
              Noen er rene aviser, andre er markedsplasser for folk i en bestemt
              nisje. Felles er at de er bygget for et publikum andre ikke når.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {friMediaSites.map((site) => (
            <article
              key={site.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#20201c]/12 bg-[#faf6ee]"
            >
              <div
                className="aspect-[16/10] bg-cover bg-center"
                style={{ backgroundImage: `url('${site.brandImage}')` }}
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-[#9c5a34]">{site.id} · {site.short}</p>
                  <span className="rounded-full border border-[#20201c]/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#20201c]/55">
                    {site.status}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-bold tracking-tight">{site.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#2f4034]">
                  {site.niche}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#20201c]/65">{site.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#20201c]/12 bg-[#faf6ee]">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <FieldLabel>Fra redaksjonene</FieldLabel>
              <div className="mt-4">
                <SectionHeading>Siste saker.</SectionHeading>
              </div>
            </div>
            <p className="text-sm text-[#20201c]/55">Et utvalg på tvers av nettstedene</p>
          </div>

          {(() => {
            const [lead, ...rest] = feltbokArticles;
            return (
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                <article className="group overflow-hidden rounded-xl border border-[#20201c]/12 bg-white/50">
                  <div
                    className="aspect-[16/9] bg-cover bg-center"
                    style={{ backgroundImage: `url('${norskeBilder[lead.image].hero}')` }}
                  />
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9c5a34]">
                      {lead.kicker} · {lead.category}
                    </p>
                    <h3
                      className="mt-3 text-2xl font-bold leading-snug tracking-tight md:text-3xl"
                      style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                    >
                      {lead.title}
                    </h3>
                    <p className="mt-3 text-sm font-medium text-[#2f4034]">{lead.site}</p>
                  </div>
                </article>

                <div className="grid gap-4">
                  {rest.map((article) => (
                    <article
                      key={article.title}
                      className="group flex items-center gap-4 overflow-hidden rounded-xl border border-[#20201c]/12 bg-white/50 p-3 pr-5"
                    >
                      <div
                        className="size-24 shrink-0 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url('${norskeBilder[article.image].url}')` }}
                      />
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9c5a34]">
                          {article.kicker} · {article.category}
                        </p>
                        <h3 className="mt-1.5 text-lg font-bold leading-snug tracking-tight">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-[#2f4034]">{article.site}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      <section className="border-y border-[#20201c]/12 bg-[#20201c] text-[#f3eee4]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0caa0]">
              Tre prinsipper
            </p>
            <h2
              className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.03em] md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Ingen flere.
            </h2>
          </div>
          <div className="grid gap-px sm:grid-cols-3">
            {feltbokPrinciples.map((p) => (
              <div key={p.number} className="border-t border-[#f3eee4]/15 pt-5 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 first:sm:border-l-0">
                <p
                  className="text-3xl font-black text-[#c0caa0]"
                  style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
                >
                  {p.number}
                </p>
                <h3 className="mt-3 text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#f3eee4]/65">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <FieldLabel>For næringslivet</FieldLabel>
            <div className="mt-4">
              <SectionHeading>Vi tar ti år med innhold ut til bedrifter.</SectionHeading>
            </div>
            <p className="mt-5 leading-7 text-[#20201c]/68">
              Du møter målgruppen din der den allerede følger med, ikke i en
              generisk feed.
            </p>
            <Link
              href="/tjenester"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#20201c]/25 px-6 font-semibold transition hover:bg-[#20201c]/5"
            >
              Se alle tjenester <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-[#20201c]/12 bg-[#20201c]/12 sm:grid-cols-2">
            {feltbokServices.map((service) => (
              <article key={service.title} className="bg-[#faf6ee] p-6">
                <h3 className="text-lg font-bold tracking-tight">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#20201c]/65">{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#20201c]/12 bg-[#faf6ee]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <FieldLabel>Lyst til å høre mer?</FieldLabel>
            <div className="mt-4">
              <SectionHeading>Slå av en prat. Vi tar telefonen selv.</SectionHeading>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:knut@frimedia.no"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#2f4034] px-6 font-semibold text-[#f3eee4] transition hover:bg-[#243228]"
            >
              Send e-post <ArrowUpRight size={16} />
            </a>
            <Link
              href="/annonser"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#20201c]/25 px-6 font-semibold transition hover:bg-white"
            >
              Be om mediekit
            </Link>
          </div>
        </div>
      </section>
    </FeltbokShell>
  );
}
