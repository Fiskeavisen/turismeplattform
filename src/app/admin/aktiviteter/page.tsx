import { Clock, ShoppingCart, Users } from "lucide-react";
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
import { activities } from "@/lib/demo-data";

export const metadata = { title: "Aktiviteter | Admin" };

export default function AdminActivitiesPage() {
  return (
    <>
      <PageHeader
        title="Aktiviteter"
        description="Opplevelser gjestene kan booke som del av oppholdet eller kjøpe separat, for eksempel fisketur, båttur, guidet tur eller lokal opplevelse."
        action="Ny aktivitet"
      />

      <Panel title="Salg av aktiviteter" className="mb-6">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <ShoppingCart size={18} className="text-sky-900" />
            <p className="mt-3 font-semibold">Kjøp uten overnatting</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Slå på for aktiviteter som skal kunne kjøpes av dagsgjester og lokale gjester.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Clock size={18} className="text-sky-900" />
            <p className="mt-3 font-semibold">Fast tidspunkt eller forespørsel</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Aktiviteten kan enten bookes direkte eller sendes som forespørsel til vertskapet.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <Users size={18} className="text-sky-900" />
            <p className="mt-3 font-semibold">Kapasitet per tur</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Kapasitet styrer hvor mange gjester som kan kjøpe samme aktivitet.
            </p>
          </div>
        </div>
      </Panel>

      <div className="grid gap-6">
        {activities.map((activity) => (
          <Panel key={activity.id} className="overflow-hidden p-0">
            <div className="grid lg:grid-cols-[280px_minmax(0,1fr)]">
              <div
                className="h-48 bg-cover bg-center lg:h-auto lg:min-h-full"
                style={{ backgroundImage: `url('${activity.imageUrl}')` }}
              />

              <div className="grid gap-5 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{activity.title.nb}</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {activity.duration} · maks {activity.capacity} gjester
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill active={activity.bookable} labels={["Bookbar", "Forespørsel"]} />
                    <StatusPill
                      active={activity.sellStandalone}
                      labels={["Selges separat", "Kun med opphold"]}
                    />
                  </div>
                </div>

                <FormSection title="Grunninfo">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Navn" className="lg:col-span-2">
                      <TextInput defaultValue={activity.title.nb} />
                    </Field>
                    <Field label="Kort salgstekst" className="lg:col-span-2">
                      <TextArea rows={3} defaultValue={activity.teaser.nb} />
                    </Field>
                    <Field label="Varighet">
                      <TextInput defaultValue={activity.duration} placeholder="2 timer" />
                    </Field>
                    <Field label="Kapasitet">
                      <TextInput type="number" min={1} defaultValue={activity.capacity} />
                    </Field>
                    <Field label="Pris fra">
                      <TextInput type="number" min={0} defaultValue={activity.priceFrom} />
                    </Field>
                  </div>
                </FormSection>

                <FormSection title="Booking og salg">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <CheckboxField
                      label="Kan bookes direkte"
                      description="Gjesten kan fullføre booking uten manuell oppfølging."
                      defaultChecked={activity.bookable}
                    />
                    <CheckboxField
                      label="Kan kjøpes uten overnatting"
                      description="Aktiviteten kan selges til dagsgjester og lokale gjester."
                      defaultChecked={activity.sellStandalone}
                    />
                  </div>
                </FormSection>

                <div className="flex justify-end border-t border-slate-200 pt-4">
                  <SaveButton label="Lagre aktivitet" />
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
