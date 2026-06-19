import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card } from "@/components/synlighet/ui";
import { visibilityOrganization, visibilitySite } from "@/lib/synlighet/demo-data";

const goalProfile = [
  ["Hovedmål", "Flere kvalifiserte henvendelser"],
  ["Viktigst å selge", "Regnskapstjenester for småbedrifter i Oslo"],
  ["Målgruppe", "Daglig leder eller gründer i bedrifter med 1–20 ansatte"],
  ["Geografi", "Oslo og omegn"],
  ["Kundeverdi", "Ca. 25 000–60 000 kr per år"],
  ["Ikke ønsket", "Små enkeltoppdrag med lav margin"],
  ["Tidshorisont", "Raske leads nå, men bygge organisk trafikk over 3–6 måneder"],
  ["Hva kan endres", "Tekst, CTA-er, landingssider og Google Ads-budsjett"],
];

export default function SettingsPage() {
  return (
    <VisibilityAppShell
      title="Innstillinger"
      description="Demo av organisasjon, nettsted, språk, land og CMS-type."
    >
      <div className="grid gap-6">
        <Card id="malprofil">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Målprofil</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Disse svarene gjør at vi kan prioritere tiltak etter det som faktisk betyr noe:
                riktige kunder, riktig område, verdi per kunde og hva dere kan endre selv.
              </p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Demo – kan redigeres senere
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {goalProfile.map(([label, value]) => (
              <label key={label} className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
                <input
                  value={value}
                  readOnly
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700"
                />
              </label>
            ))}
          </div>
        </Card>

        <Card>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["Organisasjon", visibilityOrganization.name],
              ["Plan", visibilityOrganization.plan],
              ["Nettsted", visibilitySite.domain],
              ["CMS", visibilitySite.cmsType],
              ["Land", visibilitySite.defaultCountry],
              ["Språk", visibilitySite.defaultLanguage],
            ].map(([label, value]) => (
              <label key={label} className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
                <input
                  value={value}
                  readOnly
                  className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-700"
                />
              </label>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
