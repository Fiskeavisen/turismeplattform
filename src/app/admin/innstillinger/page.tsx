import { CreditCard, Globe2, Share2 } from "lucide-react";
import {
  CheckboxField,
  Field,
  FormSection,
  PageHeader,
  Panel,
  SaveButton,
  StatusPill,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { emailTemplates, socialMediaLinks, touristCenter } from "@/lib/demo-data";

export const metadata = { title: "Innstillinger | Admin" };

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader
        title="Innstillinger"
        description="Kontaktinformasjon, språk og automatiske e-poster til gjestene."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Virksomhet">
          <FormSection
            title="Kontakt og profil"
            description="Dette vises i header, footer, kontaktskjema, strukturert data og e-poster."
          >
            <div className="grid gap-4">
              <Field label="Navn på virksomhet">
                <TextInput defaultValue={touristCenter.name} />
              </Field>
              <Field label="Kort beskrivelse / slagord">
                <TextArea rows={3} defaultValue={touristCenter.tagline.nb} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Sted">
                  <TextInput defaultValue={touristCenter.location} />
                </Field>
                <Field label="GPS-koordinater">
                  <TextInput defaultValue={touristCenter.coordinates} />
                </Field>
                <Field label="Telefon">
                  <TextInput defaultValue={touristCenter.phone} />
                </Field>
                <Field label="E-post">
                  <TextInput defaultValue={touristCenter.email} />
                </Field>
              </div>
            </div>
            <div className="mt-5 flex justify-end border-t border-slate-200 pt-5">
              <SaveButton label="Lagre virksomhet" />
            </div>
          </FormSection>
        </Panel>

        <Panel title="Språk">
          <p className="text-sm leading-6 text-slate-600">
            Alt innhold vedlikeholdes på tre språk. Gjesten får riktig språk
            automatisk, og e-poster sendes på språket bookingen ble gjort på.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["Norsk", "Hovedspråk"],
              ["English", "Aktiv"],
              ["Deutsch", "Aktiv"],
            ].map(([language, status]) => (
              <span
                key={language}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium"
              >
                <Globe2 size={15} className="text-slate-400" />
                {language}
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  {status}
                </span>
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Sosiale medier" className="xl:col-span-2">
          <p className="text-sm leading-6 text-slate-600">
            Legg inn kanalene kunden bruker. Synlige kanaler kan vises i footer,
            kontaktseksjoner og i rich snippets der det er relevant.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {socialMediaLinks.map((social) => (
              <div key={social.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-semibold">
                    <Share2 size={16} className="text-sky-900" /> {social.label}
                  </p>
                  <StatusPill active={social.visible} labels={["Synlig", "Skjult"]} />
                </div>
                <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
                  <Field label="Brukernavn">
                    <TextInput defaultValue={social.username} placeholder="@brukernavn" />
                  </Field>
                  <Field label="Lenke">
                    <TextInput defaultValue={social.url} placeholder="https://..." />
                  </Field>
                </div>
                <div className="mt-3">
                  <CheckboxField
                    label={`Vis ${social.label} på nettsiden`}
                    description="Kan vises i footer, kontaktseksjon og eventuelt som ikon i toppmenyen."
                    defaultChecked={social.visible}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end border-t border-slate-200 pt-5">
            <SaveButton label="Lagre sosiale medier" />
          </div>
        </Panel>

        <Panel title="Betaling" className="xl:col-span-2">
          <p className="text-sm leading-6 text-slate-600">
            Gjesten velger betalingsmåte i bookingflyten. Leverandørene aktiveres
            med kundens egne avtaler og nøkler.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              {
                name: "Stripe",
                detail: "Kortbetaling med automatisk bekreftelse",
                configured: Boolean(process.env.STRIPE_SECRET_KEY),
              },
              {
                name: "Vipps / MobilePay",
                detail: "Norges mest brukte mobilbetaling",
                configured: Boolean(
                  process.env.VIPPS_CLIENT_ID && process.env.VIPPS_CLIENT_SECRET,
                ),
              },
              {
                name: "Manuell forespørsel",
                detail: "Booking bekreftes og faktureres av vertskapet",
                configured: true,
              },
            ].map((provider) => (
              <div
                key={provider.name}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="flex items-center gap-2 font-semibold">
                    <CreditCard size={16} className="text-slate-400" /> {provider.name}
                  </p>
                  <StatusPill
                    active={provider.configured}
                    labels={["Aktiv", "Ikke konfigurert"]}
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{provider.detail}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="E-postmaler" className="xl:col-span-2" action="Ny mal">
          <div className="grid gap-3 md:grid-cols-2">
            {emailTemplates.map((template) => (
              <article key={template.id} className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {template.trigger}
                </p>
                <p className="mt-1.5 font-semibold">{template.name}</p>
                <p className="mt-1 text-sm text-slate-600">Emne: {template.subject.nb}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{template.preview.nb}</p>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
