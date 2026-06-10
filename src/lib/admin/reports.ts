import { bookings, rentalUnits } from "@/lib/demo-data";
import type { ReportPeriod, ReportType } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const DAY_MS = 24 * 60 * 60 * 1000;

export const reportTypes: Array<{ id: ReportType; label: string; description: string }> = [
  {
    id: "belegg",
    label: "Belegg",
    description: "Hvor fullt det er per utleieenhet og boenhetstype.",
  },
  {
    id: "omsetning",
    label: "Omsetning",
    description: "Inntekter fra overnatting, fordelt på enheter og produkter.",
  },
  {
    id: "aktiviteter",
    label: "Aktiviteter",
    description: "Solgte opplevelser og inntekt uten overnatting.",
  },
  {
    id: "mersalg",
    label: "Mersalg",
    description: "Tilvalg som sengetøy, båt og sluttrenhold.",
  },
  {
    id: "kilder",
    label: "Bookingkilder",
    description: "Hvor bookingene kommer fra og hva de genererer.",
  },
];

export const reportPeriods: Array<{ id: ReportPeriod; label: string }> = [
  { id: "30d", label: "Siste 30 dager" },
  { id: "90d", label: "Siste 90 dager" },
  { id: "year", label: "I år" },
];

function parseDate(value: string) {
  return new Date(`${value}T00:00:00Z`).getTime();
}

function nightsBetween(arrival: string, departure?: string) {
  if (!departure) return 1;
  return Math.max(1, Math.round((parseDate(departure) - parseDate(arrival)) / DAY_MS));
}

function isStayBooking(productTitle: string) {
  return productTitle.toLowerCase().includes("hytte");
}

export function getOccupancyReport() {
  const unitStats = rentalUnits.map((unit) => {
    const unitBookings = bookings.filter(
      (booking) =>
        booking.rentalUnitId === unit.id &&
        booking.status !== "cancelled" &&
        booking.departureDate,
    );

    const bookedNights = unitBookings.reduce(
      (sum, booking) => sum + nightsBetween(booking.arrivalDate, booking.departureDate),
      0,
    );

    // Demo-vindu: 90 dager i sommersesongen
    const windowNights = 90;
    const occupancyRate = Math.round((bookedNights / windowNights) * 100);

    return {
      unitId: unit.id,
      unitName: unit.name,
      bookedNights,
      windowNights,
      occupancyRate: Math.min(occupancyRate, 100),
      revenue: unitBookings.reduce((sum, booking) => sum + booking.totalAmount, 0),
      bookingCount: unitBookings.length,
    };
  });

  const averageOccupancy = Math.round(
    unitStats.reduce((sum, unit) => sum + unit.occupancyRate, 0) / unitStats.length,
  );

  return { unitStats, averageOccupancy };
}

export function getRevenueReport() {
  const stayBookings = bookings.filter(
    (booking) => isStayBooking(booking.productTitle) && booking.status !== "cancelled",
  );
  const activityBookings = bookings.filter(
    (booking) => !isStayBooking(booking.productTitle) && booking.status !== "cancelled",
  );

  const stayRevenue = stayBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const activityRevenue = activityBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const addonRevenue = bookings.reduce(
    (sum, booking) =>
      sum + (booking.addons?.reduce((addonSum, addon) => addonSum + addon.amount, 0) ?? 0),
    0,
  );

  const byProduct = Object.entries(
    bookings.reduce<Record<string, number>>((acc, booking) => {
      if (booking.status === "cancelled") return acc;
      acc[booking.productTitle] = (acc[booking.productTitle] ?? 0) + booking.totalAmount;
      return acc;
    }, {}),
  ).map(([product, amount]) => ({ product, amount }));

  return {
    total: stayRevenue + activityRevenue,
    stayRevenue,
    activityRevenue,
    addonRevenue,
    byProduct: byProduct.sort((a, b) => b.amount - a.amount),
  };
}

export function getActivityReport() {
  return bookings
    .filter((booking) => !isStayBooking(booking.productTitle) && booking.status !== "cancelled")
    .map((booking) => ({
      id: booking.id,
      title: booking.productTitle,
      date: booking.arrivalDate,
      guests: booking.guests,
      amount: booking.totalAmount,
      source: booking.source,
      standalone: true,
    }));
}

export function getAddonReport() {
  const totals = new Map<string, { name: string; count: number; amount: number }>();

  for (const booking of bookings) {
    for (const addon of booking.addons ?? []) {
      const current = totals.get(addon.id) ?? { name: addon.name, count: 0, amount: 0 };
      current.count += 1;
      current.amount += addon.amount;
      totals.set(addon.id, current);
    }
  }

  return [...totals.values()].sort((a, b) => b.amount - a.amount);
}

export function getSourceReport() {
  return Object.entries(
    bookings.reduce<Record<string, { count: number; amount: number }>>((acc, booking) => {
      if (booking.status === "cancelled") return acc;
      const current = acc[booking.source] ?? { count: 0, amount: 0 };
      current.count += 1;
      current.amount += booking.totalAmount;
      acc[booking.source] = current;
      return acc;
    }, {}),
  ).map(([source, stats]) => ({ source, ...stats }));
}

export function formatReportPeriod(period: ReportPeriod) {
  return reportPeriods.find((item) => item.id === period)?.label ?? period;
}

export function formatReportAmount(amount: number) {
  return formatCurrency(amount);
}
