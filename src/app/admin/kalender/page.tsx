import { PageHeader, Panel } from "@/components/admin/ui";
import { accommodations, bookings, rentalUnits } from "@/lib/demo-data";
import { bookingStatusLabel, cn } from "@/lib/utils";
import type { Booking } from "@/lib/types";

export const metadata = { title: "Kalender | Admin" };

const DAY_MS = 24 * 60 * 60 * 1000;

const statusCellClass: Record<string, string> = {
  pending: "bg-amber-400/90",
  confirmed: "bg-sky-700",
  paid: "bg-emerald-600",
};

function parseDate(value: string) {
  return new Date(`${value}T00:00:00Z`).getTime();
}

function formatDay(timestamp: number) {
  const date = new Date(timestamp);
  const weekday = date.toLocaleDateString("nb-NO", { weekday: "short", timeZone: "UTC" });
  return { day: date.getUTCDate(), weekday: weekday.replace(".", "") };
}

/** Finner bookingen som dekker enheten på gitt dag (avreisedag regnes som utsjekket). */
function bookingForCell(unitId: string, timestamp: number): Booking | undefined {
  return bookings.find((booking) => {
    if (booking.rentalUnitId !== unitId || booking.status === "cancelled") {
      return false;
    }
    const arrival = parseDate(booking.arrivalDate);
    const departure = booking.departureDate ? parseDate(booking.departureDate) : arrival + DAY_MS;
    return timestamp >= arrival && timestamp < departure;
  });
}

export default function AdminCalendarPage() {
  const unitBookings = bookings.filter((booking) => booking.rentalUnitId);

  // Vinduet legges rundt bookingene slik at kalenderen alltid viser aktivitet.
  const minArrival = Math.min(...unitBookings.map((booking) => parseDate(booking.arrivalDate)));
  const maxDeparture = Math.max(
    ...unitBookings.map((booking) =>
      parseDate(booking.departureDate ?? booking.arrivalDate),
    ),
  );
  const windowStart = minArrival - 2 * DAY_MS;
  const dayCount = Math.min(Math.round((maxDeparture - windowStart) / DAY_MS) + 3, 28);
  const days = Array.from({ length: dayCount }, (_, index) => windowStart + index * DAY_MS);

  const monthLabel = new Date(windowStart).toLocaleDateString("nb-NO", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <PageHeader
        title="Kalender"
        description="Belegg per utleieenhet. Fargen viser bookingstatus, og avreisedagen er ledig for ny innsjekk."
      />

      <Panel title={`Belegg fra ${monthLabel}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[56rem] border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 w-36 bg-white p-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Enhet
                </th>
                {days.map((timestamp) => {
                  const { day, weekday } = formatDay(timestamp);
                  const isWeekend = [0, 6].includes(new Date(timestamp).getUTCDay());

                  return (
                    <th
                      key={timestamp}
                      className={cn(
                        "p-1.5 text-center font-medium",
                        isWeekend ? "bg-slate-50" : "bg-white",
                      )}
                    >
                      <span className="block text-[10px] uppercase text-slate-400">{weekday}</span>
                      <span className="text-slate-700">{day}</span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {accommodations.map((accommodation) => {
                const units = rentalUnits.filter(
                  (unit) => unit.accommodationId === accommodation.id,
                );

                return [
                  <tr key={accommodation.id}>
                    <td
                      colSpan={days.length + 1}
                      className="sticky left-0 bg-white px-2 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-sky-900"
                    >
                      {accommodation.title.nb}
                    </td>
                  </tr>,
                  ...units.map((unit) => (
                    <tr key={unit.id}>
                      <td className="sticky left-0 z-10 border-t border-slate-100 bg-white p-2 font-medium">
                        {unit.name}
                        {!unit.active ? (
                          <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                            Skjult
                          </span>
                        ) : null}
                      </td>
                      {days.map((timestamp) => {
                        const booking = bookingForCell(unit.id, timestamp);
                        const isWeekend = [0, 6].includes(new Date(timestamp).getUTCDay());

                        return (
                          <td
                            key={timestamp}
                            title={
                              booking
                                ? `${booking.guestName} · ${bookingStatusLabel(booking.status)} (${booking.id})`
                                : undefined
                            }
                            className={cn(
                              "h-9 border-t border-slate-100 p-0.5",
                              isWeekend && !booking ? "bg-slate-50" : undefined,
                            )}
                          >
                            {booking ? (
                              <span
                                className={cn(
                                  "block h-full w-full rounded-md",
                                  statusCellClass[booking.status] ?? "bg-slate-400",
                                )}
                              />
                            ) : null}
                          </td>
                        );
                      })}
                    </tr>
                  )),
                ];
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-slate-600">
          {[
            ["bg-emerald-600", "Betalt"],
            ["bg-sky-700", "Bekreftet"],
            ["bg-amber-400/90", "Venter på betaling"],
          ].map(([colorClass, label]) => (
            <span key={label} className="flex items-center gap-2">
              <span className={cn("size-3.5 rounded", colorClass)} /> {label}
            </span>
          ))}
          <span className="flex items-center gap-2">
            <span className="size-3.5 rounded border border-slate-300 bg-white" /> Ledig
          </span>
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Panel title="Kommende innsjekk">
          <div className="grid gap-3">
            {unitBookings
              .slice()
              .sort((a, b) => parseDate(a.arrivalDate) - parseDate(b.arrivalDate))
              .map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 text-sm"
                >
                  <div>
                    <p className="font-semibold">{booking.guestName}</p>
                    <p className="text-slate-500">
                      {booking.rentalUnitName} · {booking.guests} gjester
                    </p>
                  </div>
                  <p className="font-semibold">{booking.arrivalDate}</p>
                </div>
              ))}
          </div>
        </Panel>

        <Panel title="Slik fungerer kalenderen">
          <ul className="grid gap-2.5 text-sm leading-6 text-slate-600">
            <li>· Bookinger fra nettsiden legges inn automatisk når gjesten betaler.</li>
            <li>· Manuelle bookinger (telefon/e-post) kan legges inn og blokkerer datoene.</li>
            <li>· Avreisedag frigjøres automatisk slik at ny gjest kan sjekke inn samme dag.</li>
            <li>· Skjulte enheter vises i kalenderen, men kan ikke bookes på nettsiden.</li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
