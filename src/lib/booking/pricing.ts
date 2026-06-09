import type { AddonPriceType, BookingAddon, BookingAddonSelection } from "@/lib/types";

export function calculateNights(arrivalDate: string, departureDate?: string) {
  if (!arrivalDate || !departureDate) {
    return 1;
  }

  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);
  const diff = Math.round((departure.getTime() - arrival.getTime()) / 86_400_000);

  return Math.max(diff, 1);
}

export function calculateAddonAmount(
  addon: { priceNok: number; priceType: AddonPriceType },
  nights: number,
  guests: number,
) {
  if (addon.priceType === "per_night") {
    return addon.priceNok * nights;
  }

  if (addon.priceType === "per_person") {
    return addon.priceNok * guests;
  }

  return addon.priceNok;
}

export function buildAddonSelections(
  addons: BookingAddon[],
  selectedIds: string[],
  nights: number,
  guests: number,
): BookingAddonSelection[] {
  return addons
    .filter((addon) => addon.active && selectedIds.includes(addon.id))
    .map((addon) => ({
      id: addon.id,
      name: addon.name.nb,
      priceNok: addon.priceNok,
      priceType: addon.priceType,
      amount: calculateAddonAmount(addon, nights, guests),
    }));
}

export function addonPriceTypeLabel(priceType: AddonPriceType) {
  const labels: Record<AddonPriceType, string> = {
    per_stay: "per opphold",
    per_night: "per natt",
    per_person: "per person",
  };

  return labels[priceType];
}
