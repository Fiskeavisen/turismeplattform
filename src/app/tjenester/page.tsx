import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeltbokShell, PageHero } from "@/components/feltbok/feltbok-shell";
import { feltbokServices } from "@/lib/feltbok";
import { norskeBilder } from "@/lib/images";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: {
    nb: "Tjenester | Fri Media",
    en: "Services | Fri Media",
    de: "Leistungen | Fri Media",
  },
  description: {
    nb: "Tjenester fra Fri Media: native ads, innholdsproduksjon, foto, video og displayannonsering i nisjekanaler.",
    en: "Fri Media services.",
    de: "Fri Media Leistungen.",
  },
});

export default function TjenesterPage() {
  return (
    <FeltbokShell>
      <PageHero
        label="Våre tjenester"
        title="Budskapet ditt bør stå der målgruppen følger med."
        text="Med flere magasiner i samme sjanger har vi en egen måte å formidle budskapet ditt på. Over ti år med innhold tar vi nå ut til næringslivet."
      >
        <div className="overflow-hidden rounded-2xl border border-[#20201c]/12">
          <div
            className="aspect-[4/3] bg-cover bg-center"
            style={{ backgroundImage: `url('${norskeBilder.kanoVann.hero}')` }}
          />
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          {feltbokServices.map((service) => (
            <article key={service.title} className="rounded-xl border border-[#20201c]/12 bg-[#faf6ee] p-7">
              <h2 className="text-2xl font-bold tracking-tight">{service.title}</h2>
              <p className="mt-3 leading-7 text-[#20201c]/68">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#20201c]/12 bg-[#20201c] text-[#f3eee4]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0caa0]">
              Hvorfor det virker
            </p>
            <h2
              className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.03em] md:text-5xl"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              De beste ambassadørene er engasjerte lesere.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-[#f3eee4]/68">
              Når innholdet ditt møter et publikum som allerede bryr seg om
              kategorien, blir du et naturlig valg, ikke en avbrytelse.
            </p>
          </div>
          <Link
            href="/annonser"
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-[#f3eee4] px-6 font-semibold text-[#20201c] transition hover:bg-white"
          >
            Se annonseformater <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </FeltbokShell>
  );
}
