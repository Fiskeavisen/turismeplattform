"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

type GoalField = {
  id: string;
  label: string;
  helper: string;
  options: string[];
  initialValue: string;
  customPlaceholder: string;
};

const customValue = "__custom__";

const goalFields: GoalField[] = [
  {
    id: "mainGoal",
    label: "Hovedmål",
    helper: "Hva er viktigst at synligheten skal gi dere?",
    initialValue: "Flere kvalifiserte henvendelser",
    customPlaceholder: "F.eks. flere demo-bookinger fra større bedrifter",
    options: [
      "Flere kvalifiserte henvendelser",
      "Flere salg i nettbutikk",
      "Flere bookinger eller reservasjoner",
      "Bli mer synlig lokalt",
      "Redusere annonsekostnad",
      "Bygge merkevare over tid",
    ],
  },
  {
    id: "priorityOffer",
    label: "Viktigst å selge",
    helper: "Hvilke tjenester eller produkter bør vi prioritere først?",
    initialValue: "Regnskapstjenester for småbedrifter i Oslo",
    customPlaceholder: "F.eks. serviceavtaler, pakkereiser, produktkategori eller rådgivning",
    options: [
      "Tjenester med høy margin",
      "Produkter med høy margin",
      "Tjenester dere vil selge mer av",
      "Produkter dere har mye på lager av",
      "Sesongbaserte tilbud",
      "Regnskapstjenester for småbedrifter i Oslo",
    ],
  },
  {
    id: "audience",
    label: "Målgruppe",
    helper: "Hvem er mest verdt å nå?",
    initialValue: "Daglig leder eller gründer i bedrifter med 1–20 ansatte",
    customPlaceholder: "F.eks. familier, hytteeiere, daglig ledere eller innkjøpere",
    options: [
      "Lokale privatkunder",
      "Små og mellomstore bedrifter",
      "Daglig leder eller gründer i bedrifter med 1–20 ansatte",
      "Eksisterende kunder som kan kjøpe mer",
      "Nye kunder som sammenligner leverandører",
      "Kunder med akutt behov",
    ],
  },
  {
    id: "geography",
    label: "Geografi",
    helper: "Hvor er kundene dere helst vil ha?",
    initialValue: "Oslo og omegn",
    customPlaceholder: "F.eks. Bergen sentrum, Norge, Norden eller hele Europa",
    options: ["Nærområdet", "Kommunen", "Fylket/regionen", "Hele Norge", "Norden", "Oslo og omegn"],
  },
  {
    id: "customerValue",
    label: "Kundeverdi",
    helper: "Omtrent hvor mye er en god kunde verdt?",
    initialValue: "Ca. 25 000–60 000 kr per år",
    customPlaceholder: "F.eks. 5 000 kr per ordre eller 150 000 kr per år",
    options: [
      "Under 5 000 kr",
      "5 000–25 000 kr",
      "Ca. 25 000–60 000 kr per år",
      "60 000–150 000 kr",
      "Over 150 000 kr",
      "Vet ikke ennå",
    ],
  },
  {
    id: "unwanted",
    label: "Ikke ønsket",
    helper: "Hva bør vi ikke skaffe mer av?",
    initialValue: "Små enkeltoppdrag med lav margin",
    customPlaceholder: "F.eks. feil geografisk område, lav margin eller mye support",
    options: [
      "Små enkeltoppdrag med lav margin",
      "Kunder utenfor området vårt",
      "Henvendelser om tjenester vi ikke tilbyr",
      "Kunder som bare sammenligner laveste pris",
      "For små ordre",
      "Ingen tydelige begrensninger",
    ],
  },
  {
    id: "timeHorizon",
    label: "Tidshorisont",
    helper: "Hvor raskt må tiltakene gi effekt?",
    initialValue: "Raske leads nå, men bygge organisk trafikk over 3–6 måneder",
    customPlaceholder: "F.eks. vi trenger salg før høysesong om 8 uker",
    options: [
      "Raske leads nå",
      "Resultater innen 1–3 måneder",
      "Bygge organisk trafikk over 3–6 måneder",
      "Bygge autoritet over 6–12 måneder",
      "Raske leads nå, men bygge organisk trafikk over 3–6 måneder",
      "Ingen hast, kvalitet viktigst",
    ],
  },
  {
    id: "editableScope",
    label: "Hva kan endres",
    helper: "Hva har dere faktisk mulighet til å justere?",
    initialValue: "Tekst, CTA-er, landingssider og Google Ads-budsjett",
    customPlaceholder: "F.eks. kun tekst, ikke design eller utvikling",
    options: [
      "Kun tekst på eksisterende sider",
      "Tekst og CTA-er",
      "Tekst, CTA-er og nye landingssider",
      "Google Ads-budsjett og landingssider",
      "Tekst, CTA-er, landingssider og Google Ads-budsjett",
      "Vi trenger at byrået gjør endringene",
    ],
  },
];

type FieldState = Record<string, { selected: string; custom: string }>;

function createInitialState(): FieldState {
  return Object.fromEntries(
    goalFields.map((field) => [field.id, { selected: field.initialValue, custom: "" }]),
  );
}

export function GoalProfileForm() {
  const [fields, setFields] = useState<FieldState>(() => createInitialState());

  const summary = useMemo(
    () =>
      goalFields.map((field) => {
        const value = fields[field.id];
        return {
          label: field.label,
          value: value.selected === customValue ? value.custom || "Eget svar mangler" : value.selected,
        };
      }),
    [fields],
  );

  function updateSelected(id: string, selected: string) {
    setFields((current) => ({
      ...current,
      [id]: { ...current[id], selected },
    }));
  }

  function updateCustom(id: string, custom: string) {
    setFields((current) => ({
      ...current,
      [id]: { ...current[id], custom },
    }));
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        {goalFields.map((field) => {
          const value = fields[field.id];
          const usesCustom = value.selected === customValue;

          return (
            <label key={field.id} className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">{field.label}</span>
              <span className="text-sm leading-6 text-stone-600">{field.helper}</span>
              <select
                value={value.selected}
                onChange={(event) => updateSelected(field.id, event.target.value)}
                className="h-11 rounded-xl border border-amber-200 bg-[#fffaf2] px-3.5 text-sm text-stone-800 outline-none focus:border-[#275444] focus:ring-2 focus:ring-[#275444]/15"
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
                <option value={customValue}>Annet – skriv selv</option>
              </select>
              {usesCustom ? (
                <input
                  value={value.custom}
                  onChange={(event) => updateCustom(field.id, event.target.value)}
                  placeholder={field.customPlaceholder}
                  className="h-11 rounded-xl border border-amber-200 bg-white px-3.5 text-sm text-stone-800 outline-none focus:border-[#275444] focus:ring-2 focus:ring-[#275444]/15"
                />
              ) : null}
            </label>
          );
        })}
      </div>

      <div className="rounded-2xl border border-amber-200 bg-[#fff4d8] p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#275444]">
          <CheckCircle2 size={16} />
          Slik prioriterer vi med svarene
        </div>
        <div className="mt-4 grid gap-2 text-sm leading-6 text-stone-700 md:grid-cols-2">
          {summary.map((item) => (
            <div key={item.label} className="rounded-xl bg-[#fffaf2] px-3 py-2">
              <span className="font-semibold">{item.label}:</span> {item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
