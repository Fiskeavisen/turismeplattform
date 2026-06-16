import { VisibilityAppShell } from "@/components/synlighet/app-shell";
import { Card } from "@/components/synlighet/ui";
import { visibilityOrganization, visibilitySite } from "@/lib/synlighet/demo-data";

export default function SettingsPage() {
  return (
    <VisibilityAppShell
      title="Innstillinger"
      description="Demo av organisasjon, nettsted, språk, land og CMS-type."
    >
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
    </VisibilityAppShell>
  );
}
