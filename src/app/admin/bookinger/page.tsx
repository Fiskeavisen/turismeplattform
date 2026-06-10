import { PageHeader, Panel } from "@/components/admin/ui";
import { bookings } from "@/lib/demo-data";
import { bookingStatusClass, bookingStatusLabel, cn, formatCurrency } from "@/lib/utils";

export const metadata = { title: "Bookinger | Admin" };

export default function AdminBookingsPage() {
  return (
    <>
      <PageHeader
        title="Bookinger"
        description="Alle bookinger med enhet, tilvalg, betaling og kilde. Klikk en booking for å følge opp gjesten."
        action="Ny booking"
      />

      <Panel>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="grid gap-4 border-b border-slate-200 bg-white p-5 last:border-b-0 md:grid-cols-[1.4fr_1fr_auto]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {booking.id}
                </p>
                <p className="mt-1 font-semibold">{booking.guestName}</p>
                <p className="text-sm text-slate-500">
                  {booking.guestEmail} · {booking.guestPhone}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {booking.productTitle}
                  {booking.rentalUnitName ? ` · ${booking.rentalUnitName}` : ""}
                </p>
                {booking.addons && booking.addons.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {booking.addons.map((addon) => (
                      <span
                        key={addon.id}
                        className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900"
                      >
                        {addon.name} · {formatCurrency(addon.amount)}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="text-sm">
                <p className="font-semibold">
                  {booking.arrivalDate}
                  {booking.departureDate ? ` – ${booking.departureDate}` : ""}
                </p>
                <p className="mt-1 text-slate-500">
                  {booking.guests} gjester · {booking.language.toUpperCase()}
                </p>
                <p className="mt-1 text-slate-500">
                  {booking.source} · {booking.paymentProvider}
                </p>
              </div>
              <div className="flex items-center gap-3 md:flex-col md:items-end md:justify-center">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    bookingStatusClass(booking.status),
                  )}
                >
                  {bookingStatusLabel(booking.status)}
                </span>
                <strong className="text-lg">{formatCurrency(booking.totalAmount)}</strong>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
