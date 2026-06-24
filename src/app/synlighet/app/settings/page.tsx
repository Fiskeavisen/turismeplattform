import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { GoalProfileForm } from "@/components/synlighet/goal-profile-form";
import { Card } from "@/components/synlighet/ui";
import { visibilityOrganization, visibilitySite } from "@/lib/synlighet/demo-data";

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
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                Velg det som passer best. Du trenger ikke kunne markedsføring, og alle felt har
                «Annet – skriv selv» hvis standardvalgene ikke passer.
              </p>
            </div>
            <span className="rounded-full bg-[#275444]/10 px-3 py-1 text-xs font-semibold text-[#275444]">
              Demo – redigerbar lokalt
            </span>
          </div>
          <div className="mt-6">
            <GoalProfileForm />
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
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</span>
                <input
                  value={value}
                  readOnly
                  className="h-11 rounded-xl border border-amber-200 bg-[#fffaf2] px-3.5 text-sm text-stone-700"
                />
              </label>
            ))}
          </div>
        </Card>
      </div>
    </VisibilityAppShell>
  );
}
