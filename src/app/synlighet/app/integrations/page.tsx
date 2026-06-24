import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card, StatusBadge } from "@/components/synlighet/ui";
import { integrations } from "@/lib/synlighet/demo-data";

const googleSetupGuide = [
  {
    title: "Før du starter",
    steps: [
      "Bruk en Google-konto som har tilgang til både GA4 og Search Console.",
      "Sjekk at samme konto også har Google Ads-tilgang hvis betalte annonser skal overvåkes.",
      "Sjekk at domenet er verifisert i Search Console.",
      "Sjekk at GA4-property måler riktig nettsted og har datastream for web.",
    ],
  },
  {
    title: "Koble Search Console",
    steps: [
      "Trykk «Koble til Google» og logg inn med riktig Google-konto.",
      "Godkjenn lesetilgang til Search Console-data.",
      "Velg riktig property, helst domain property for hele domenet.",
      "Bekreft at systemet finner søk, sider, klikk, visninger, CTR og posisjon.",
    ],
  },
  {
    title: "Koble Google Analytics 4",
    steps: [
      "Velg GA4-konto, property og web stream for nettstedet.",
      "Gi lesetilgang til rapportdata.",
      "Kontroller at sessions, engagement og konverteringer hentes inn.",
      "Marker hvilke konverteringer som faktisk betyr lead, kjøp eller booking.",
    ],
  },
  {
    title: "Koble Google Ads",
    steps: [
      "Velg riktig Google Ads-konto eller MCC-konto.",
      "Gi lesetilgang til kampanje- og rapportdata.",
      "Kontroller at kampanjer, spend, klikk, konverteringer, CPA og landingssider hentes inn.",
      "Sjekk at konverteringene matcher GA4 eller annonsekontoens primære mål.",
    ],
  },
  {
    title: "Hvis noe ikke virker",
    steps: [
      "Finner du ikke property, mangler Google-kontoen tilgang.",
      "Har Search Console null data, er domenet ofte feil property eller nylig verifisert.",
      "Har GA4 null konverteringer, må key events settes opp i GA4 først.",
      "Finner du ikke Google Ads-konto, mangler brukeren ofte tilgang via annonsekonto eller MCC.",
      "Koble fra og koble til på nytt etter at tilgangene er rettet.",
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <VisibilityAppShell
      title="Integrasjoner"
      description="Koble til datakildene som gjør tiltakene konkrete. Google kan kjøres med mock-data i MVP."
    >
      <div className="grid gap-6">
        <Card>
          <div className="grid gap-4 md:grid-cols-2">
            {integrations.map((integration) => (
              <article key={integration.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold">{integration.name}</h2>
                  <StatusBadge status={integration.status} />
                </div>
                <p className="mt-3 leading-7 text-slate-600">{integration.description}</p>
                <p className="mt-4 text-sm font-medium text-slate-800">Neste steg: {integration.nextStep}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <button className="min-h-10 rounded-full bg-[#275444] px-4 text-sm font-semibold text-amber-50 hover:bg-[#1f4638]">
                    Koble til / test
                  </button>
                  <button className="min-h-10 rounded-full border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    Koble fra
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Bruksguide</p>
              <h2 className="mt-2 text-2xl font-semibold">Slik kobler du Google-kildene</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Search Console forteller hvilke søk og sider som gir synlighet. GA4 forteller hva trafikken gjør etter
                klikket. Google Ads forteller hva kunden betaler for. Kildene kobles sammen for å prioritere tiltak
                basert på både synlighet, kostnad og verdi.
              </p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Krever Google-tilgang
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {googleSetupGuide.map((section) => (
              <article key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold">{section.title}</h3>
                <ol className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
                  {section.steps.map((step, index) => (
                    <li key={step}>
                      <span className="font-semibold text-slate-950">{index + 1}. </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold">Tilganger vi ber om</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              MVP-en skal kun be om lesetilgang til rapportdata. Den skal ikke endre Google-kontoen, Analytics-oppsett,
              Search Console-verifisering eller annonsekampanjer uten eksplisitt godkjenning.
            </p>
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
