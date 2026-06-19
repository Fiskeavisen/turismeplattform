import { Building2, Home, House } from "lucide-react";
import {
  Field,
  FormSection,
  PageHeader,
  Panel,
  SaveButton,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { ImageUploader } from "@/components/admin/image-uploader";
import { accommodations, rentalUnits } from "@/lib/demo-data";
import type { AccommodationType } from "@/lib/types";

export const metadata = { title: "Overnatting | Admin" };

const accommodationTypes: Array<{ value: AccommodationType; label: string; icon: typeof House }> = [
  { value: "hytte", label: "Hytte", icon: House },
  { value: "leilighet", label: "Leilighet", icon: Building2 },
  { value: "hus", label: "Hus", icon: Home },
];

export default function AdminAccommodationPage() {
  return (
    <>
      <PageHeader
        title="Overnatting"
        description="Boenheter for turistsentre: hytter, leiligheter og hus med egne priser, kapasitet, fasiliteter og konkrete utleieenheter."
        action="Ny boenhet"
      />

      <Panel title="Typer kunden kan tilby" className="mb-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {accommodationTypes.map(({ value, label, icon: Icon }) => {
            const count = accommodations.filter((item) => item.type === value).length;

            return (
              <div key={value} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <Icon size={18} className="text-sky-900" />
                <p className="mt-3 font-semibold">{label}</p>
                <p className="mt-1 text-sm text-slate-600">
                  {count > 0 ? `${count} aktiv i demoen` : "Kan legges til for kunden"}
                </p>
              </div>
            );
          })}
        </div>
      </Panel>

      <div className="grid gap-6">
        {accommodations.map((accommodation) => {
          const units = rentalUnits.filter(
            (unit) => unit.accommodationId === accommodation.id,
          );
          const typeLabel = accommodationTypes.find((type) => type.value === accommodation.type)?.label;

          return (
            <Panel key={accommodation.id}>
              <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
                <ImageUploader
                  label="Hovedbilde"
                  currentImageUrl={accommodation.imageUrl}
                  previewClassName="h-52 xl:h-80"
                  variant="overlay"
                  helpText="Last opp eget bilde for boenheten. Dette blir hovedbildet på kort og detaljside."
                />

                <div className="grid gap-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold">{accommodation.title.nb}</h2>
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
                      {typeLabel}
                    </span>
                  </div>

                  <FormSection
                    title="Grunninfo"
                    description="Navn, type og beskrivelse som vises på nettsiden og i booking."
                  >
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Navn" className="lg:col-span-2">
                        <TextInput defaultValue={accommodation.title.nb} />
                      </Field>
                      <Field label="Type">
                        <SelectInput defaultValue={accommodation.type}>
                          {accommodationTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </SelectInput>
                      </Field>
                      <Field label="Fra-pris per natt" hint="Viser «fra X kr/natt» på nettsiden.">
                        <TextInput type="number" min={0} defaultValue={accommodation.priceFrom} />
                      </Field>
                      <Field label="Beskrivelse" className="lg:col-span-2">
                        <TextArea rows={3} defaultValue={accommodation.description.nb} />
                      </Field>
                    </div>
                  </FormSection>

                  <FormSection title="Kapasitet">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Maks gjester">
                        <TextInput type="number" min={1} defaultValue={accommodation.guests} />
                      </Field>
                      <Field label="Antall senger">
                        <TextInput type="number" min={1} defaultValue={accommodation.beds} />
                      </Field>
                    </div>
                  </FormSection>

                  <FormSection
                    title="Fasiliteter"
                    description="Vises som små merkelapper på boenheten."
                  >
                    <TextInput
                      defaultValue={accommodation.amenities.join(", ")}
                      placeholder="Båt kan legges til, Kjøkken, Wifi"
                    />
                  </FormSection>

                  <FormSection
                    title="Utleieenheter"
                    description="Konkrete enheter gjesten velger i bookingflyten."
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      {units.map((unit) => (
                        <div
                          key={unit.id}
                          className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                        >
                          <Field label="Enhetsnavn">
                            <TextInput defaultValue={unit.name} />
                          </Field>
                          <label className="mt-3 flex items-center gap-2.5 text-sm font-medium text-slate-700">
                            <input
                              type="checkbox"
                              defaultChecked={unit.active}
                              className="size-4 rounded border-slate-300 text-sky-900 focus:ring-sky-900/20"
                            />
                            Synlig for gjester
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormSection>

                  <div className="flex justify-end border-t border-slate-200 pt-4">
                    <SaveButton label="Lagre boenhet" />
                  </div>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
