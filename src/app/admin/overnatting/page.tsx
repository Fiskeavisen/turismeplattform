import { BedDouble, Users } from "lucide-react";
import { PageHeader, Panel, StatusPill } from "@/components/admin/ui";
import { accommodations, rentalUnits } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Overnatting | Admin" };

export default function AdminAccommodationPage() {
  return (
    <>
      <PageHeader
        title="Overnatting"
        description="Hyttetyper og de konkrete utleieenhetene gjestene booker. Pris, kapasitet og fasiliteter styres per type."
        action="Ny hyttetype"
      />

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
                      <h2 className="text-xl font-semibold">{accommodation.title.nb}</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {accommodation.description.nb}
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      {formatCurrency(accommodation.priceFrom)}
                      <span className="text-sm font-normal text-slate-500">/natt</span>
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <BedDouble size={16} /> {accommodation.beds} senger
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={16} /> {accommodation.guests} gjester
                    </span>
                  </div>

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
                  <div className="mt-2 flex flex-wrap gap-2">
                    {units.map((unit) => (
                      <span
                        key={unit.id}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium"
                      >
                        {unit.name}
                        <StatusPill active={unit.active} labels={["Aktiv", "Av"]} />
                      </span>
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
