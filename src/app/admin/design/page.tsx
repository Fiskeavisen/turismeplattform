import Link from "next/link";
import { ArrowUpRight, GripVertical } from "lucide-react";
import { PageHeader, Panel, StatusPill } from "@/components/admin/ui";
import { editableSections } from "@/lib/demo-data";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

export const metadata = { title: "Design | Admin" };

const demoSlugByTheme: Record<string, string> = {
  coastal: "storhavet",
  fjord: "skogsro",
  premium: "fyrvokteren",
};

export default function AdminDesignPage() {
  const activeThemeId = "coastal";

  return (
    <>
      <PageHeader
        title="Design"
        description="Velg mal, juster farger og styr rekkefølgen på seksjonene på forsiden. Innholdet beholdes når malen byttes."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Designmal">
          <div className="grid gap-4">
            {themes.map((theme) => {
              const active = theme.id === activeThemeId;

              return (
                <div
                  key={theme.id}
                  className={cn(
                    "rounded-2xl border p-4",
                    active ? "border-sky-900 ring-1 ring-sky-900" : "border-slate-200",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                        style={{
                          background: theme.tokens.primary,
                          color: theme.tokens.primaryForeground,
                        }}
                      >
                        Aa
                      </span>
                      <div>
                        <p className="font-semibold">
                          {theme.name}
                          {active ? (
                            <span className="ml-2 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                              I bruk
                            </span>
                          ) : null}
                        </p>
                        <p className="text-sm text-slate-500">{theme.tagline}</p>
                      </div>
                    </div>
                    <Link
                      href={`/demo/${demoSlugByTheme[theme.id]}`}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-slate-300 px-4 text-sm font-semibold hover:bg-slate-50"
                    >
                      Forhåndsvis <ArrowUpRight size={15} />
                    </Link>
                  </div>
                  <div className="mt-3 flex gap-2">
                    {[
                      theme.tokens.primary,
                      theme.tokens.accent,
                      theme.tokens.background,
                      theme.tokens.surfaceMuted,
                      theme.tokens.text,
                    ].map((color) => (
                      <span
                        key={color}
                        className="h-6 w-10 rounded-md ring-1 ring-slate-200"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Forsidebygger" action="Legg til seksjon">
          <div className="grid gap-3">
            {editableSections
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="text-slate-400" size={18} />
                    <div>
                      <p className="font-semibold">{section.title}</p>
                      <p className="text-sm text-slate-500">
                        {section.type} · rekkefølge {section.order}
                      </p>
                    </div>
                  </div>
                  <StatusPill active={section.enabled} labels={["Synlig", "Skjult"]} />
                </div>
              ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
