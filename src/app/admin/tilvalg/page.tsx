import { PageHeader, Panel, StatusPill } from "@/components/admin/ui";
import { addonPriceTypeLabel } from "@/lib/booking/pricing";
import { bookingAddons, bookings } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export const metadata = { title: "Tilvalg | Admin" };

export default function AdminAddonsPage() {
  const soldPerAddon = new Map<string, number>();

  for (const booking of bookings) {
    for (const addon of booking.addons ?? []) {
      soldPerAddon.set(addon.id, (soldPerAddon.get(addon.id) ?? 0) + addon.amount);
    }
  }

  return (
    <>
      <PageHeader
        title="Tilvalg og mersalg"
        description="Produkter gjesten kan legge til i bookingen. Prisen beregnes automatisk per natt, per person eller per opphold."
        action="Nytt tilvalg"
      />

      <Panel>
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          {bookingAddons.map((addon) => (
            <div
              key={addon.id}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white p-4 last:border-b-0"
            >
              <div>
                <p className="font-semibold">{addon.name.nb}</p>
                <p className="text-sm text-slate-500">
                  {formatCurrency(addon.priceNok)} {addonPriceTypeLabel(addon.priceType)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm text-slate-500">
                  Solgt:{" "}
                  <strong className="text-slate-950">
                    {formatCurrency(soldPerAddon.get(addon.id) ?? 0)}
                  </strong>
                </p>
                <StatusPill active={addon.active} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Tilvalg vises i bookingflyten etter at gjesten har valgt enhet, og
          summeres automatisk i totalprisen og i bekreftelsen.
        </p>
      </Panel>
    </>
  );
}
