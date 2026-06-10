import { BedDouble, Building2, Home, House, Save, Users } from "lucide-react";
import { PageHeader, Panel, StatusPill } from "@/components/admin/ui";
import { accommodations, rentalUnits } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";
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
        <div className="grid gap-3 md:grid-cols-3">
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

          return (
            <Panel key={accommodation.id}>
              <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <div
                  className="h-44 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url('${accommodation.imageUrl}')` }}
                />
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-semibold">{accommodation.title.nb}</h2>
                        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
                          {accommodationTypes.find((type) => type.value === accommodation.type)?.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {accommodation.description.nb}
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      {formatCurrency(accommodation.priceFrom)}
                      <span className="text-sm font-normal text-slate-500">/natt</span>
                    </p>
                  </div>

                  <form className="mt-5 grid gap-4 rounded-2xl bg-slate-50 p-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_11rem_9rem_9rem]">
                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        Navn
                        <input
                          defaultValue={accommodation.title.nb}
                          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                        />
                      </label>
                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        Type
                        <select
                          defaultValue={accommodation.type}
                          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                        >
                          {accommodationTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        Gjester
                        <input
                          type="number"
                          min={1}
                          defaultValue={accommodation.guests}
                          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                        />
                      </label>
                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        Senger
                        <input
                          type="number"
                          min={1}
                          defaultValue={accommodation.beds}
                          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1fr_12rem]">
                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        Beskrivelse
                        <textarea
                          defaultValue={accommodation.description.nb}
                          rows={3}
                          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                        />
                      </label>
                      <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                        Fra-pris per natt
                        <input
                          type="number"
                          min={0}
                          defaultValue={accommodation.priceFrom}
                          className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none focus:border-sky-900 focus:ring-2 focus:ring-sky-900/10"
                        />
                      </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <BedDouble size={16} /> {accommodation.beds} senger
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={16} /> {accommodation.guests} gjester
                      </span>
                      <button
                        type="button"
                        className="ml-auto inline-flex min-h-10 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        <Save size={15} /> Lagre boenhet
                      </button>
                    </div>
                  </form>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {accommodation.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Utleieenheter
                  </p>
                  <div className="mt-2 grid gap-2 md:grid-cols-2">
                    {units.map((unit) => (
                      <div
                        key={unit.id}
                        className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium"
                      >
                        <input
                          defaultValue={unit.name}
                          aria-label={`Navn på ${unit.name}`}
                          className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1 outline-none focus:border-slate-300 focus:bg-white"
                        />
                        <StatusPill active={unit.active} labels={["Aktiv", "Av"]} />
                        <label className="flex items-center gap-2 text-xs text-slate-500">
                          <input type="checkbox" defaultChecked={unit.active} />
                          Synlig
                        </label>
                      </div>
                    ))}
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
