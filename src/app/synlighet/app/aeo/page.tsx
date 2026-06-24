import { Compass, Network, SearchCheck, type LucideIcon } from "lucide-react";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { TermLabel } from "@/components/synlighet/term-info";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { aiVisibilityTests, pageSnapshots } from "@/lib/synlighet/demo-data";

const answerSignals: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: SearchCheck, title: "Svar", text: "Har siden korte, presise svar på spørsmål kundene faktisk stiller?" },
  { icon: Network, title: "Signaler", text: "Er navn, tjenester, sted og kilder konsekvente på tvers av nettet?" },
  { icon: Compass, title: "Valg", text: "Blir bedriften nevnt når svarmotorer sammenligner alternativer?" },
];

export default function AeoPage() {
  return (
    <VisibilityAppShell
      title="Svarmotorer"
      description="AEO og GEO samlet: hvor lett bedriften din er å forstå, sitere og anbefale i moderne søk og svarmotorer."
    >
      <div className="grid gap-6">
        <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
                <Compass size={14} />
                Ikke hype. Bare tydelighet.
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                Bli enklere å velge når folk spør etter råd, ikke bare søker etter lenker.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                <TermLabel term="aeo">AEO</TermLabel> handler om klare svar på egne sider.
                {" "}<TermLabel term="geo">GEO</TermLabel> handler om at bedriften fremstår tydelig
                og troverdig på tvers av kilder, omtaler og beskrivelser.
              </p>
            </div>
            <div className="grid gap-3">
              {answerSignals.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Icon className="size-5 text-sky-800" />
                  <p className="mt-3 font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Card>
          <h2 className="text-xl font-semibold">Hvor klar er hver side for svarmotorer?</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {pageSnapshots.map((page) => (
              <article key={page.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-semibold">{page.url}</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{page.aeoScore} / 100</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {page.opportunities[0] ?? "Ingen tydelig AEO-mulighet funnet."}
                </p>
              </article>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">Vi tester spørsmål markedet kan stille</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Vi stiller typiske spørsmål kundene dine kan stille i svarmotorer, og sjekker om
            bedriften din blir nevnt. «Må vurderes» betyr at du ikke ble nevnt ennå.
          </p>
          <div className="mt-5 grid gap-4">
            {aiVisibilityTests.map((test) => (
              <article key={test.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="font-semibold">{test.prompt}</h3>
                  <StatusBadge status={test.mentionedBrand ? "connected" : "needs_review"} />
                </div>
                <p className="mt-3 leading-7 text-slate-600">{test.summary}</p>
                <p className="mt-3 text-sm text-slate-500">
                  Hull: {test.gaps.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
