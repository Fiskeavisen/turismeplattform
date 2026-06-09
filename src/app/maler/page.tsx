import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { themes, type ThemeDefinition } from "@/lib/themes";

export const metadata = {
  title: "Designmaler | Turismeplattform",
  description:
    "Tre gjennomarbeidede designmaler for turismesider: Kyst & eventyr, Fjord & ro og Premium resort.",
};

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-[#f7f3eb] px-6 py-14 text-slate-950">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky-900"
        >
          <ArrowLeft size={16} /> Tilbake til demo
        </Link>

        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-900">
            Designmaler
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em]">
            Tre maler. Én grunnmur.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Kunden velger mal i admin og kan bytte når som helst. Innholdet er
            det samme, kun uttrykket endres: farger, typografi, hjørner og
            stemning. Forhåndsvisningene under bruker malenes faktiske
            design-tokens.
          </p>
        </div>

        <div className="mt-12 grid gap-8">
          {themes.map((theme) => (
            <TemplateShowcase key={theme.id} theme={theme} />
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Malvalg lagres per kunde i kundeprofilen og i `theme_settings` i
          databasen. Farger og logo kan justeres innenfor hver mal uten å
          påvirke lesbarhet og kontrast.
        </p>
      </div>
    </main>
  );
}

function TemplateShowcase({ theme }: { theme: ThemeDefinition }) {
  const { tokens } = theme;

  return (
    <section className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        {/* Info */}
        <div className="p-8 lg:p-10">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">{theme.name}</h2>
            {theme.id === "coastal" ? (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Valgt for Flø-demoen
              </span>
            ) : null}
          </div>
          <p className="mt-2 font-medium text-slate-700">{theme.tagline}</p>
          <p className="mt-4 leading-7 text-slate-600">{theme.description}</p>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ideell for
          </p>
          <div className="mt-2 grid gap-2">
            {theme.idealFor.map((item) => (
              <p key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="mt-0.5 shrink-0 text-emerald-600" size={16} />
                {item}
              </p>
            ))}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Fargepalett
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            {[
              ["Primær", tokens.primary],
              ["Aksent", tokens.accent],
              ["Bakgrunn", tokens.background],
              ["Flate", tokens.surface],
              ["Tekst", tokens.text],
            ].map(([label, color]) => (
              <div key={label} className="text-center">
                <div
                  className="h-10 w-14 rounded-lg ring-1 ring-slate-200"
                  style={{ background: color }}
                />
                <p className="mt-1 text-[11px] font-medium text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live preview med malens egne tokens */}
        <div
          className="flex flex-col justify-between gap-6 p-8 lg:p-10"
          style={{
            background: tokens.background,
            color: tokens.text,
            fontFamily: tokens.bodyFontStack,
          }}
        >
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: tokens.mutedText }}
            >
              Forhåndsvisning
            </p>
            <h3
              className="mt-4 text-4xl leading-tight"
              style={{ fontFamily: tokens.headingFontStack, fontWeight: 600 }}
            >
              Bo ved havet på vakre Flø
            </h3>
            <p className="mt-3 max-w-md leading-7" style={{ color: tokens.mutedText }}>
              Moderne hytter med egen båt, fisketurer og naturopplevelser
              mellom fjord, fjell og Atlanterhavet.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span
                className="inline-flex min-h-11 items-center px-6 text-sm font-semibold"
                style={{
                  background: tokens.primary,
                  color: tokens.primaryForeground,
                  borderRadius: tokens.radiusControl,
                }}
              >
                Finn ledig hytte
              </span>
              <span
                className="inline-flex min-h-11 items-center border px-6 text-sm font-semibold"
                style={{
                  borderColor: tokens.border,
                  color: tokens.text,
                  borderRadius: tokens.radiusControl,
                }}
              >
                Utforsk opplevelser
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between gap-4 p-5"
            style={{
              background: tokens.surface,
              borderRadius: tokens.radiusCard,
              border: `1px solid ${tokens.border}`,
            }}
          >
            <div>
              <p className="text-sm font-semibold">Hytte type 1 med båt</p>
              <p className="mt-1 text-sm" style={{ color: tokens.mutedText }}>
                7 senger · egen motorbåt
              </p>
            </div>
            <span
              className="inline-flex min-h-10 items-center px-4 text-sm font-semibold"
              style={{
                background: tokens.accent,
                color: tokens.accentForeground,
                borderRadius: tokens.radiusControl,
              }}
            >
              Fra 1 890 kr
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
