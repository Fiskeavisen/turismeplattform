import { Check } from "lucide-react";

const trustPoints = [
  "Stripe, Vipps eller kort",
  "Manuell forespørsel mulig",
  "Bekreftelse på e-post med en gang",
];

const fieldClass =
  "mt-1.5 block h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 focus:border-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-800/20";

const labelClass = "text-xs font-semibold uppercase tracking-wide text-slate-600";

export function BookingSearchCard() {
  return (
    <div id="booking" className="rounded-[2rem] bg-white p-5 text-slate-950 shadow-2xl">
      <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
        <p className="text-sm text-amber-100">Bookingmodul</p>
        <h2 className="mt-2 text-2xl font-semibold">Søk og betal på samme sted</h2>
      </div>

      <form className="grid gap-4 p-4" action="/api/bookings" method="post">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-arrival" className={labelClass}>
              Ankomst
            </label>
            <input id="booking-arrival" name="arrivalDate" type="date" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="booking-departure" className={labelClass}>
              Avreise
            </label>
            <input
              id="booking-departure"
              name="departureDate"
              type="date"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-guests" className={labelClass}>
              Gjester
            </label>
            <select id="booking-guests" name="guests" defaultValue="2" className={fieldClass}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "gjest" : "gjester"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="booking-type" className={labelClass}>
              Type
            </label>
            <select id="booking-type" name="productType" defaultValue="all" className={fieldClass}>
              <option value="all">Alle produkter</option>
              <option value="accommodation">Hytter og overnatting</option>
              <option value="activity">Aktiviteter og turer</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          className="h-12 rounded-xl bg-sky-950 px-5 font-semibold text-white hover:bg-sky-900"
        >
          Søk ledige opplevelser
        </button>

        <div className="grid gap-2 text-sm text-slate-600">
          {trustPoints.map((item) => (
            <p key={item} className="flex items-center gap-2">
              <Check className="text-emerald-600" size={16} /> {item}
            </p>
          ))}
        </div>
      </form>
    </div>
  );
}
