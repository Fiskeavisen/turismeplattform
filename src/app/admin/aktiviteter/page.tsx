import { Baby, Clock, Gauge, ShoppingCart, Tag, Users } from "lucide-react";
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
import { activities } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Aktiviteter | Admin" };

const difficultyLabels = {
  lett: "Lett",
  middels: "Middels",
  krevende: "Krevende",
} as const;

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
            <div className="grid xl:grid-cols-[340px_minmax(0,1fr)]">
              <div
                className="relative min-h-80 bg-cover bg-center"
                style={{ backgroundImage: `url('${activity.imageUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                  Fra {formatCurrency(activity.priceFrom)}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                    Slik vises aktiviteten
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold leading-tight">
                    {activity.title.nb}
                  </h2>
                  <div className="mt-5 grid grid-cols-4 gap-2 text-center text-sm">
                    <ActivityFact icon={Clock} value={activity.duration} label="Varighet" />
                    <ActivityFact
                      icon={Gauge}
                      value={difficultyLabels[activity.difficulty]}
                      label="Nivå"
                    />
                    <ActivityFact icon={Baby} value={`${activity.minAge}+`} label="Alder" />
                    <ActivityFact
                      icon={Tag}
                      value={formatCurrency(activity.priceFrom)}
                      label="Pris"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-5 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{activity.title.nb}</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {activity.duration} · {difficultyLabels[activity.difficulty].toLowerCase()} ·{" "}
                      {activity.minAge}+ år · maks {activity.capacity} gjester
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill active={activity.visible} labels={["Synlig", "Skjult"]} />
                    <StatusPill active={activity.bookable} labels={["Bookbar", "Forespørsel"]} />
                    <StatusPill
                      active={activity.sellStandalone}
                      labels={["Selges separat", "Kun med opphold"]}
                    />
                  </div>
                </div>

                <FormSection
                  title="Grunninfo"
                  description="Disse feltene styrer kortet gjesten ser på nettsiden og detaljsiden for aktiviteten."
                >
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
                    <Field label="Vanskelighetsgrad">
                      <SelectInput
                        defaultValue={activity.difficulty}
                      >
                        <option value="lett">Lett</option>
                        <option value="middels">Middels</option>
                        <option value="krevende">Krevende</option>
                      </SelectInput>
                    </Field>
                    <Field label="Aldersgrense">
                      <TextInput type="number" min={0} defaultValue={activity.minAge} />
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
                  <div className="grid gap-3 lg:grid-cols-3">
                    <CheckboxField
                      label="Vis på nettsiden"
                      description="Skru av hvis aktiviteten er sesongstengt eller ikke skal markedsføres."
                      defaultChecked={activity.visible}
                    />
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

function ActivityFact({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Clock;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-white/90 p-2.5 text-slate-950 backdrop-blur">
      <Icon className="mx-auto text-violet-700" size={20} />
      <p className="mt-1 text-xs font-semibold">{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-slate-500">{label}</p>
    </div>
  );
}
