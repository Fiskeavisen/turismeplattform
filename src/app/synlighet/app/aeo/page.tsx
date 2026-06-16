import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { aiVisibilityTests, pageSnapshots } from "@/lib/synlighet/demo-data";

export default function AeoPage() {
  return (
    <VisibilityAppShell
      title="AEO / Synlighet i AI-svar"
      description="Her ser du hvor godt sidene dine er forberedt på å bli brukt i AI-svar. Vi gir ingen garantier, men peker på hva som kan gjøre innholdet tydeligere."
    >
      <div className="grid gap-6">
        <Card className="bg-sky-50">
          <h2 className="text-lg font-semibold">Hva betyr dette?</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Flere og flere spør AI-tjenester som ChatGPT og Google AI i stedet for å klikke seg
            rundt på Google. AEO handler om å skrive innholdet ditt klart nok til at slike svar
            faktisk nevner og anbefaler deg. Tallet under viser hvor klar hver side er – jo høyere,
            jo bedre.
          </p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Hvor klar er hver side for AI-svar?</h2>
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
          <h2 className="text-xl font-semibold">Vi spør AI om bransjen din</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Vi stiller AI-tjenester typiske spørsmål kundene dine kan stille, og sjekker om
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
