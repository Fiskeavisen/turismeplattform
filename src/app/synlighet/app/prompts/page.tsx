import { ClipboardCheck, FilePenLine, Library, Sparkles } from "lucide-react";
import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { CopyPromptButton } from "@/components/synlighet/copy-prompt-button";
import { Card } from "@/components/synlighet/ui";
import { promptCategoryLabels, promptTemplates } from "@/lib/synlighet/prompt-templates";

const starterChecklist = [
  "Lim inn målgruppe, side og fakta før du kjører prompten.",
  "Be modellen markere usikre fakta med [trenger fakta].",
  "Bruk outputen som utkast, ikke som ferdig publisering.",
];

export default function PromptWorkshopPage() {
  return (
    <VisibilityAppShell
      title="Promptverksted"
      description="Ferdige prompts kundene kan bruke i sin egen LLM, for artikler, landingssider, GEO og annonser."
    >
      <div className="grid gap-6">
        <section className="overflow-hidden rounded-[1.75rem] border border-slate-900 bg-slate-950 text-white shadow-sm">
          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-100">
                <FilePenLine size={14} />
                For kunder som allerede bruker egne modeller
              </div>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                Gi kunden en god prompt, ikke bare et råd.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                Mange bruker allerede ChatGPT, Claude eller Gemini. Da bør vi hjelpe dem med
                tydelige arbeidsoppgaver de kan ta med seg: artikkelutkast, metatekster,
                landingssider, FAQ og GEO-forbedringer.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <ClipboardCheck size={16} />
                Bruk slik
              </div>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
                {starterChecklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 text-emerald-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <Library className="size-5 text-sky-800" />
            <p className="mt-3 text-3xl font-semibold">{promptTemplates.length}</p>
            <p className="mt-1 text-sm text-slate-500">promptmaler</p>
          </Card>
          <Card className="p-5">
            <Sparkles className="size-5 text-emerald-700" />
            <p className="mt-3 text-3xl font-semibold">0</p>
            <p className="mt-1 text-sm text-slate-500">prompts som krever vår API-nøkkel</p>
          </Card>
          <Card className="p-5">
            <FilePenLine className="size-5 text-amber-700" />
            <p className="mt-3 text-3xl font-semibold">100 %</p>
            <p className="mt-1 text-sm text-slate-500">kan brukes i kundens egen LLM</p>
          </Card>
        </div>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Promptmaler</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Velg en mal, fyll inn feltene i hakeparentes, og kopier til kundens egen modell.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Ikke autopubliser
            </span>
          </div>

          <div className="mt-6 grid gap-5">
            {promptTemplates.map((template) => (
              <article key={template.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <div className="grid gap-4 p-5 lg:grid-cols-[0.85fr_1.15fr]">
                  <div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {promptCategoryLabels[template.category]}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold">{template.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{template.description}</p>
                    <dl className="mt-4 grid gap-3 text-sm">
                      <div>
                        <dt className="font-semibold text-slate-900">Når brukes den?</dt>
                        <dd className="mt-1 leading-6 text-slate-600">{template.whenToUse}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-900">Output</dt>
                        <dd className="mt-1 leading-6 text-slate-600">{template.outputFormat}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {template.prompt}
                    </pre>
                    <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
                      <CopyPromptButton prompt={template.prompt} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
