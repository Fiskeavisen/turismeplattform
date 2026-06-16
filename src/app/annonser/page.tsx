import { FeltbokShell, FieldLabel, PageHero, SectionHeading } from "@/components/feltbok/feltbok-shell";
import { advertisingFormats, friMediaSites } from "@/lib/feltbok";
import { norskeBilder } from "@/lib/images";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: {
    nb: "Annonsér | Fri Media",
    en: "Advertise | Fri Media",
    de: "Werben | Fri Media",
  },
  description: {
    nb: "Annonsering hos Fri Media: display, partnerflater og innhold på oppdrag, med tydelig kanalstatus for åtte nisjenettsider.",
    en: "Advertise with Fri Media.",
    de: "Werben mit Fri Media.",
  },
});

export default function AnnonserPage() {
  return (
    <FeltbokShell>
      <PageHero
        label="Annonsér"
        title="Hver kanal har sitt eget publikum og sin egen takt."
        text="Det vi gjør sammen formes etter hvilken rekkevidde du trenger og hvor du hører hjemme. Be om mediekit for det som er aktuelt for deg."
      >
        <div className="overflow-hidden rounded-2xl border border-[#20201c]/12">
          <div
            className="aspect-[4/3] bg-cover bg-center"
            style={{ backgroundImage: `url('${norskeBilder.fjellDis.hero}')` }}
          />
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {advertisingFormats.map((format) => (
            <article key={format.name} className="rounded-xl border border-[#20201c]/12 bg-[#faf6ee] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9c5a34]">
                {format.name}
              </p>
              <p className="mt-4 leading-7 text-[#20201c]/68">{format.text}</p>
              <ul className="mt-6 space-y-2 border-t border-[#20201c]/12 pt-5 text-sm text-[#20201c]/75">
                {format.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-[#2f4034]">·</span> {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#20201c]/12 bg-[#faf6ee]">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="max-w-2xl">
            <FieldLabel>Kanalstatus</FieldLabel>
            <div className="mt-4">
              <SectionHeading>Ikke alle kanaler selges likt.</SectionHeading>
            </div>
            <p className="mt-5 leading-7 text-[#20201c]/68">
              Noen kanaler passer dårlig med kommersielt innhold, enten på grunn
              av tema eller funksjon. Der holder vi det rent. Det er et bevisst
              valg.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl border border-[#20201c]/12">
            <div className="hidden bg-[#20201c] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#f3eee4]/70 md:grid md:grid-cols-[0.7fr_1.6fr_2fr_1fr]">
              <span>Spor</span>
              <span>Nettsted</span>
              <span>Nisje</span>
              <span>Status</span>
            </div>
            {friMediaSites.map((site, index) => (
              <div
                key={site.id}
                className={`grid items-center gap-2 px-5 py-4 md:grid-cols-[0.7fr_1.6fr_2fr_1fr] ${
                  index % 2 === 0 ? "bg-white/60" : "bg-[#f3eee4]"
                }`}
              >
                <p className="font-mono text-xs text-[#9c5a34]">{site.id}</p>
                <h3 className="font-bold tracking-tight">{site.title}</h3>
                <p className="text-sm text-[#20201c]/65">{site.niche}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2f4034]">
                  {site.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FeltbokShell>
  );
}
