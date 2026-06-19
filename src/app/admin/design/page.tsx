import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  GripVertical,
} from "lucide-react";
import {
  CheckboxField,
  Field,
  FormSection,
  PageHeader,
  Panel,
  SaveButton,
  SelectInput,
  StatusPill,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { ImageUploader } from "@/components/admin/image-uploader";
import {
  accommodations,
  activities,
  articles,
  editableSections,
  instagramImageSource,
  touristCenter,
} from "@/lib/demo-data";
import { norskeBilder } from "@/lib/images";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

export const metadata = { title: "Design | Admin" };

const demoSlugByTheme: Record<string, string> = {
  coastal: "storhavet",
  fjord: "skogsro",
  premium: "fyrvokteren",
};

const designChoices = [
  {
    title: "Forside med søk i hero",
    description: "Best når målet er flest mulig direkte bookinger.",
  },
  {
    title: "Split-layout med bildegalleri",
    description: "Passer rolige destinasjoner med flere typer opphold.",
  },
  {
    title: "Editorial / premium",
    description: "Sterkt visuelt uttrykk for eksklusive opplevelser og høye priser.",
  },
];

const visualSettings = [
  {
    label: "Navigasjon",
    options: ["Transparent over hero", "Hvit toppmeny", "Mørk toppmeny"],
  },
  {
    label: "Bildeuttrykk",
    options: ["Kyst og fjell", "Skog og vann", "Mørkt premium", "Familievennlig"],
  },
  {
    label: "Knapper",
    options: ["Runde", "Myke hjørner", "Skarpe premium-knapper"],
  },
  {
    label: "Typografi",
    options: ["Klassisk serif", "Moderne sans", "Premium editorial"],
  },
];

const sectionCopy = {
  hero: {
    title: "Hero / førsteinntrykk",
    description:
      "Dette er det første gjesten ser. Bruk én tydelig overskrift, kort forklaring og et sterkt norsk bilde.",
    titleValue: "Bo ved havet på Nordskjær",
    textValue: touristCenter.tagline.nb,
    imageKey: "rorbuerKyst",
    ctaValue: "Søk ledige hytter",
  },
  booking: {
    title: "Bookingmodul",
    description:
      "Lar gjesten velge dato, boenhet og antall gjester. Denne bør ligge høyt på siden hvis booking er hovedmålet.",
    titleValue: "Finn ledig opphold",
    textValue: "Velg datoer og se hvilke enheter som er ledige.",
    imageKey: "brygge",
    ctaValue: "Sjekk ledighet",
  },
  accommodation: {
    title: "Overnatting",
    description:
      "Presenter hytter, leiligheter og hus. Tekst og bilder hentes fra boenhetene, men seksjonen kan ha egen introduksjon.",
    titleValue: "Velg boenheten som passer dere",
    textValue: accommodations.map((item) => item.title.nb).join(", "),
    imageKey: "skogshytte",
    ctaValue: "Se alle boenheter",
  },
  activities: {
    title: "Aktiviteter",
    description:
      "Vis aktiviteter som kan selges med eller uten overnatting. Viktig for turistsentre med dagsgjester.",
    titleValue: "Opplevelser på og ved havet",
    textValue: activities.map((item) => item.title.nb).join(", "),
    imageKey: "trebaat",
    ctaValue: "Se aktiviteter",
  },
  articles: {
    title: "Artikler / inspirasjon",
    description:
      "Brukes for SEO, AI-søk og inspirasjon før booking. Passer til guider, sesongtips og lokale anbefalinger.",
    titleValue: "Reiseinspirasjon",
    textValue: articles.map((item) => item.title.nb).join(", "),
    imageKey: "fjellDis",
    ctaValue: "Les mer",
  },
  reviews: {
    title: "Omtaler",
    description:
      "Viser publiserte omtaler fra Google, Trustpilot og manuelle kilder. Øker tillit før booking.",
    titleValue: "Dette sier våre gjester",
    textValue: "Publiser de beste omtalene fra admin-siden Omtaler.",
    imageKey: "nordlysSkog",
    ctaValue: "Se omtaler",
  },
  map: {
    title: "Kart og område",
    description:
      "Forklar hvor turistsenteret ligger, avstander og hva gjesten finner i nærheten.",
    titleValue: "Her finner du oss",
    textValue: touristCenter.location,
    imageKey: "fjordbaat",
    ctaValue: "Få veibeskrivelse",
  },
  faq: {
    title: "FAQ",
    description:
      "Svar på vanlige spørsmål om betaling, innsjekk, transport, aktiviteter og avbestilling.",
    titleValue: "Ofte stilte spørsmål",
    textValue: "Gjør gjesten trygg før booking.",
    imageKey: "vintervann",
    ctaValue: "Se alle spørsmål",
  },
  cta: {
    title: "Avsluttende CTA",
    description:
      "Siste tydelige oppfordring nederst på siden. Brukes for kontakt, booking eller forespørsel.",
    titleValue: "Klar for å planlegge oppholdet?",
    textValue: "Send forespørsel eller sjekk ledige datoer direkte.",
    imageKey: "moerkBoelge",
    ctaValue: "Start booking",
  },
} as const;

const sectionOrder = [
  ...editableSections,
  {
    id: "accommodation",
    type: "accommodation",
    title: "Overnatting",
    enabled: true,
    order: 4,
    settings: { columns: 2, showPrice: true },
  },
  {
    id: "map",
    type: "map",
    title: "Kart og område",
    enabled: true,
    order: 7,
    settings: { showDistances: true },
  },
  {
    id: "faq",
    type: "faq",
    title: "FAQ",
    enabled: true,
    order: 8,
    settings: { collapsible: true },
  },
  {
    id: "cta",
    type: "cta",
    title: "Avsluttende CTA",
    enabled: true,
    order: 9,
    settings: { style: "image" },
  },
].sort((a, b) => a.order - b.order);

const imageOptions = Object.entries(norskeBilder);

export default function AdminDesignPage() {
  const activeThemeId = "coastal";

  return (
    <>
      <PageHeader
        title="Design"
        description="Styr hele nettsiden: mal, farger, typografi, tekster, bilder og rekkefølgen på seksjoner. Hver del forklarer hva den brukes til."
      />

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {[
          ["1", "Velg uttrykk", "Mal, farger, font og navigasjon."],
          ["2", "Rediger innhold", "Tekster, bilder, knapper og seksjoner."],
          ["3", "Forhåndsvis", "Sjekk siden før endringene publiseres."],
        ].map(([step, title, text]) => (
          <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="flex size-8 items-center justify-center rounded-full bg-sky-950 text-sm font-semibold text-white">
              {step}
            </span>
            <p className="mt-3 font-semibold">{title}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Panel title="Designmal">
          <FormSection
            title="Layoutvalg"
            description="Velg hvordan siden skal bygges opp visuelt. Dette er mer enn farger: layouten påvirker hvordan gjesten leser og booker."
            className="mb-6"
          >
            <div className="grid gap-3 md:grid-cols-3">
              {designChoices.map((choice, index) => (
                <label
                  key={choice.title}
                  className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-900"
                >
                  <input
                    type="radio"
                    name="layout-choice"
                    defaultChecked={index === 0}
                    className="size-4 text-sky-900"
                  />
                  <span className="mt-3 block font-semibold">{choice.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">
                    {choice.description}
                  </span>
                </label>
              ))}
            </div>
          </FormSection>

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

          <FormSection
            title="Flere visuelle valg"
            description="Disse valgene gjør at samme innhold kan få ulikt uttrykk uten å bygge siden på nytt."
            className="mt-6"
          >
            <div className="grid gap-4">
              {visualSettings.map((setting) => (
                <Field key={setting.label} label={setting.label}>
                  <SelectInput defaultValue={setting.options[0]}>
                    {setting.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </SelectInput>
                </Field>
              ))}
            </div>
          </FormSection>
        </Panel>

        <div className="grid gap-6">
          <Panel title="Globale tekster og bilder">
            <div className="grid gap-5">
              <FormSection
                title="Identitet"
                description="Dette brukes i logo, footer, metadata og kontaktflater."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Navn på turistsenter">
                    <TextInput defaultValue={touristCenter.name} />
                  </Field>
                  <Field label="Sted / område">
                    <TextInput defaultValue={touristCenter.location} />
                  </Field>
                  <Field label="Telefon">
                    <TextInput defaultValue={touristCenter.phone} />
                  </Field>
                  <Field label="E-post">
                    <TextInput defaultValue={touristCenter.email} />
                  </Field>
                  <Field label="Kort slagord" className="md:col-span-2">
                    <TextArea rows={3} defaultValue={touristCenter.tagline.nb} />
                  </Field>
                </div>
              </FormSection>

              <FormSection
                title="Hovedbilde og hero"
                description="Heroen bør forklare hvor gjesten er, hva de kan gjøre og hvorfor de skal booke."
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Hero-overskrift" className="md:col-span-2">
                    <TextInput defaultValue="Bo ved havet på Nordskjær" />
                  </Field>
                  <Field label="Hero-tekst" className="md:col-span-2">
                    <TextArea rows={3} defaultValue={touristCenter.tagline.nb} />
                  </Field>
                  <Field label="Hero-bilde">
                    <SelectInput defaultValue="rorbuerKyst">
                      {imageOptions.map(([key, image]) => (
                        <option key={key} value={key}>
                          {image.motiv}
                        </option>
                      ))}
                    </SelectInput>
                  </Field>
                  <Field label="Knappetekst">
                    <TextInput defaultValue="Sjekk ledige hytter" />
                  </Field>
                </div>
              </FormSection>
            </div>
          </Panel>

          <Panel title="Bildekilder">
            <p className="mb-5 text-sm leading-6 text-slate-600">
              Velg hvor kunden henter bilder fra. Instagram krever Business/Creator-konto
              og kobling via Instagram Graph API. For hashtag må Meta-godkjenning være på plass.
            </p>

            <div className="grid gap-4">
              <FormSection
                title="Instagram"
                description="Hent bilder fra kundens egen Instagram-konto eller fra en godkjent hashtag. Anbefalt teknisk kobling: npm-pakken instagram-graph-api mot Meta Graph API."
              >
                <div className="grid gap-4 md:grid-cols-3">
                  <Field label="Bildekilde">
                    <SelectInput defaultValue={instagramImageSource.mode}>
                      <option value="account">Egen Instagram-konto</option>
                      <option value="hashtag">Hashtag</option>
                      <option value="manual">Manuell bildebank</option>
                    </SelectInput>
                  </Field>
                  <Field label="Instagram-konto">
                    <TextInput
                      defaultValue={instagramImageSource.accountHandle}
                      placeholder="@kundekonto"
                    />
                  </Field>
                  <Field label="Hashtag">
                    <TextInput
                      defaultValue={instagramImageSource.hashtag}
                      placeholder="visithelgeland"
                    />
                  </Field>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <CheckboxField
                    label="Bruk Instagram-bilder i bildevelgeren"
                    description="Når koblet til kan bildene velges i hero, seksjoner, artikler og aktivitetskort."
                    defaultChecked={instagramImageSource.connected}
                  />
                  <CheckboxField
                    label="Krev manuell godkjenning før publisering"
                    description="Anbefalt, slik at kunden slipper tilfeldige eller uegnede hashtag-bilder på nettsiden."
                    defaultChecked
                  />
                </div>
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                  <p className="font-semibold">Teknisk notat</p>
                  <p className="mt-1">
                    Instagram hashtag-søk støtter maks 30 unike hashtags per 7 dager og krever
                    Instagram Public Content Access. For produksjon bør vi bruke server-side Graph
                    API, cache bildene og lagre godkjente bildevalg i databasen.
                  </p>
                </div>
              </FormSection>
            </div>
          </Panel>

          <Panel title="Bildebank">
            <p className="mb-4 text-sm leading-6 text-slate-600">
              Last opp egne bilder eller velg fra en kuratert norsk bildebank. Bruk kystbilder
              på salgsflater, og mer rolige naturbilder på innholdssider.
            </p>
            <div className="mb-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
              <ImageUploader
                label="Last opp nytt bilde"
                previewClassName="h-40"
                helpText="Etter opplasting kan bilde-URL-en brukes i hero, seksjoner, artikler og aktivitetskort."
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {imageOptions.slice(0, 8).map(([key, image]) => (
                <label
                  key={key}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div
                    className="h-28 bg-cover bg-center transition group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url('${image.url}')` }}
                  />
                  <div className="flex items-start gap-2 p-3">
                    <input
                      type="radio"
                      name="image-bank"
                      defaultChecked={key === "rorbuerKyst"}
                      className="mt-1 size-4 text-sky-900"
                    />
                    <span>
                      <span className="block text-sm font-semibold">{key}</span>
                      <span className="mt-0.5 block text-xs leading-5 text-slate-500">
                        {image.motiv}
                      </span>
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        <Panel title="Forsidebygger" action="Legg til seksjon">
          <p className="mb-5 text-sm leading-6 text-slate-600">
            Hver seksjon kan skjules, flyttes og få egen tekst, bilde og knapp. Dette gjør
            det mulig å tilpasse sider for turistsentre med ulike typer overnatting og
            aktiviteter.
          </p>
          <div className="grid gap-4">
            {sectionOrder.map((section) => {
              const copy = sectionCopy[section.type as keyof typeof sectionCopy];

              if (!copy) {
                return null;
              }

              return (
                <FormSection
                  key={section.id}
                  title={copy.title}
                  description={copy.description}
                  className="bg-white"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <GripVertical size={18} />
                      <span>
                        Rekkefølge {section.order} · type {section.type}
                      </span>
                    </div>
                    <StatusPill active={section.enabled} labels={["Synlig", "Skjult"]} />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1fr_1fr_12rem]">
                    <Field label="Seksjonstittel">
                      <TextInput defaultValue={copy.titleValue} />
                    </Field>
                    <Field label="Knappetekst">
                      <TextInput defaultValue={copy.ctaValue} />
                    </Field>
                    <Field label="Synlighet">
                      <SelectInput defaultValue={section.enabled ? "visible" : "hidden"}>
                        <option value="visible">Synlig</option>
                        <option value="hidden">Skjult</option>
                      </SelectInput>
                    </Field>
                    <Field label="Forklarende tekst" className="lg:col-span-2">
                      <TextArea rows={3} defaultValue={copy.textValue} />
                    </Field>
                    <Field label="Bilde">
                      <SelectInput defaultValue={copy.imageKey}>
                        {imageOptions.map(([key, image]) => (
                          <option key={key} value={key}>
                            {image.motiv}
                          </option>
                        ))}
                      </SelectInput>
                    </Field>
                  </div>
                </FormSection>
              );
            })}
          </div>
        </Panel>

        <Panel title="Publisering og kontroll">
          <div className="grid gap-4 md:grid-cols-3">
            <CheckboxField
              label="Forhåndsvis før publisering"
              description="Endringer kan testes på demo-lenken før de publiseres for kunden."
              defaultChecked
            />
            <CheckboxField
              label="Behold bookingmodul øverst"
              description="Anbefalt for sider der direkte booking er viktigst."
              defaultChecked
            />
            <CheckboxField
              label="Optimaliser for søk og AI-svar"
              description="Holder seksjonstitler og beskrivelser tydelige for Google og AI-tjenester."
              defaultChecked
            />
          </div>
          <div className="mt-5 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
            <Link
              href="/demo/storhavet"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 px-5 text-sm font-semibold hover:bg-slate-50"
            >
              <Eye size={16} /> Forhåndsvis
            </Link>
            <SaveButton label="Lagre design" />
          </div>
        </Panel>
      </div>
    </>
  );
}
