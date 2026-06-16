import { CheckCircle2 } from "lucide-react";
import { FeltbokShell, FieldLabel, PageHero, SectionHeading } from "@/components/feltbok/feltbok-shell";
import { testCategories, testRules } from "@/lib/feltbok";
import { norskeBilder } from "@/lib/images";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: {
    nb: "Tester | Fri Media",
    en: "Tests | Fri Media",
    de: "Tests | Fri Media",
  },
  description: {
    nb: "Uavhengige produkttester hos Fri Media: fiske, jakt og friluftsliv. Ingen spons, alt returneres etter test.",
    en: "Independent product tests at Fri Media.",
    de: "Unabhängige Produkttests bei Fri Media.",
  },
});

export default function TesterPage() {
  return (
    <FeltbokShell>
      <PageHero
        label="Tester"
        title="En test er en test. Aldri en kjøpt omtale."
        text="Vi tester utstyr som passer leserne våre, fra hodelykt til hengekøye. Hver test publiseres på nettsiden med riktig publikum, og det meste samles på Testteam."
      >
        <div className="overflow-hidden rounded-2xl border border-[#20201c]/12">
          <div
            className="aspect-[4/3] bg-cover bg-center"
            style={{ backgroundImage: `url('${norskeBilder.skogshytte.hero}')` }}
          />
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-2xl">
          <FieldLabel>Kategorier</FieldLabel>
          <div className="mt-4">
            <SectionHeading>Tester ligger der utstyret hører hjemme.</SectionHeading>
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testCategories.map((category) => (
            <article key={category.title} className="rounded-xl border border-[#20201c]/12 bg-[#faf6ee] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9c5a34]">
                {category.site}
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">{category.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#20201c]/65">{category.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#20201c]/12 bg-[#20201c] text-[#f3eee4]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0caa0]">
              Spillereglene
            </p>
            <h2
              className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.03em] md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              Tydelige regler gjør testene verdt noe.
            </h2>
          </div>
          <ul className="grid gap-3">
            {testRules.map((rule) => (
              <li key={rule} className="flex items-center gap-3 border-b border-[#f3eee4]/12 pb-3 text-[#f3eee4]/80">
                <CheckCircle2 size={18} className="shrink-0 text-[#c0caa0]" /> {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-xl border border-[#20201c]/12 bg-[#faf6ee] p-8">
          <FieldLabel>Vil du sende inn et produkt?</FieldLabel>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#20201c]/72">
            Send en kort e-post til <a href="mailto:knut@frimedia.no" className="font-semibold text-[#2f4034] underline underline-offset-4">knut@frimedia.no</a>: hva produktet er, hvilken kategori, og når det lanseres. Du får svar om vi har kapasitet og hvilken redaksjon som tar det.
          </p>
        </div>
      </section>
    </FeltbokShell>
  );
}
