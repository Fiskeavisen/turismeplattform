import { FeltbokShell, FieldLabel, PageHero, SectionHeading } from "@/components/feltbok/feltbok-shell";
import { feltbokContacts, feltbokPrinciples, friMediaSites } from "@/lib/feltbok";
import { norskeBilder } from "@/lib/images";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: {
    nb: "Om oss | Fri Media",
    en: "About | Fri Media",
    de: "Über uns | Fri Media",
  },
  description: {
    nb: "Om Fri Media AS: et lite, eierdrevet mediehus i Skodje med åtte nisjenettsider.",
    en: "About Fri Media AS.",
    de: "Über Fri Media AS.",
  },
});

export default function OmOssPage() {
  return (
    <FeltbokShell>
      <PageHero
        label="Hvem vi er · Felt notat 02"
        title="Det begynte med ei fiskestang."
        text="Det startet med Fiskeavisen, en avis for folk som faktisk fisker, av folk som faktisk fisker. Samme tilnærming virket på flere felt, og i dag driver vi åtte nettsider."
      >
        <div className="overflow-hidden rounded-2xl border border-[#20201c]/12">
          <div
            className="aspect-[4/3] bg-cover bg-center"
            style={{ backgroundImage: `url('${norskeBilder.brygge.hero}')` }}
          />
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-2xl">
          <FieldLabel>Det vi tror på</FieldLabel>
          <div className="mt-4">
            <SectionHeading>Tre prinsipper. Ingen flere.</SectionHeading>
          </div>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[#20201c]/12 bg-[#20201c]/12 md:grid-cols-3">
          {feltbokPrinciples.map((p) => (
            <article key={p.number} className="bg-[#faf6ee] p-7">
              <p
                className="text-3xl font-black text-[#2f4034]"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
              >
                {p.number}
              </p>
              <h3 className="mt-3 text-xl font-bold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#20201c]/65">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#20201c]/12 bg-[#faf6ee]">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="max-w-2xl">
            <FieldLabel>Nettstedene</FieldLabel>
            <div className="mt-4">
              <SectionHeading>Åtte nettsider, ikke ett magasin.</SectionHeading>
            </div>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl border border-[#20201c]/12">
            {friMediaSites.map((site, index) => (
              <div
                key={site.id}
                className={`grid items-center gap-4 px-5 py-4 md:grid-cols-[0.7fr_1.6fr_2fr_0.9fr] ${
                  index % 2 === 0 ? "bg-[#faf6ee]" : "bg-[#f3eee4]"
                }`}
              >
                <p className="font-mono text-xs text-[#9c5a34]">{site.id} · {site.short}</p>
                <h3 className="text-lg font-bold tracking-tight">{site.title}</h3>
                <p className="text-sm leading-6 text-[#20201c]/65">{site.text}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2f4034]">
                  {site.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="max-w-2xl">
          <FieldLabel>Folkene</FieldLabel>
          <div className="mt-4">
            <SectionHeading>Hvem du snakker med.</SectionHeading>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {feltbokContacts.map((person) => (
            <article key={person.email} className="rounded-xl border border-[#20201c]/12 bg-[#faf6ee] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9c5a34]">
                {person.role}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">{person.name}</h3>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#20201c]/70">
                <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="hover:text-[#20201c]">
                  {person.phone}
                </a>
                <a href={`mailto:${person.email}`} className="hover:text-[#20201c]">
                  {person.email}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </FeltbokShell>
  );
}
