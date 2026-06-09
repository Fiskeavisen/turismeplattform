import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { accommodations, bookings as demoBookings, rentalUnits as demoRentalUnits } from "@/lib/demo-data";

type UnitAvailability = {
  id: string;
  name: string;
  available: boolean;
};

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function overlapsPeriod(
  arrivalDate: string,
  departureDate: string | undefined,
  from: string,
  to: string,
) {
  const start = new Date(arrivalDate).getTime();
  const end = departureDate
    ? new Date(departureDate).getTime()
    : start + 86_400_000;

  return start < new Date(to).getTime() && end > new Date(from).getTime();
}

function demoAvailability(accommodationId: string, from: string, to: string): UnitAvailability[] {
  return demoRentalUnits
    .filter((unit) => unit.accommodationId === accommodationId && unit.active)
    .map((unit) => {
      const busy = demoBookings.some(
        (booking) =>
          booking.rentalUnitId === unit.id &&
          booking.status !== "cancelled" &&
          overlapsPeriod(booking.arrivalDate, booking.departureDate, from, to),
      );

      return { id: unit.id, name: unit.name, available: !busy };
    });
}

async function supabaseAvailability(
  accommodationId: string,
  from: string,
  to: string,
): Promise<UnitAvailability[] | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  );

  let accommodationUuid = UUID_PATTERN.test(accommodationId) ? accommodationId : null;

  if (!accommodationUuid) {
    const slug = accommodations.find((item) => item.id === accommodationId)?.slug;

    if (!slug) {
      return null;
    }

    const { data: accommodation } = await supabase
      .from("accommodations")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    accommodationUuid = accommodation?.id ?? null;
  }

  if (!accommodationUuid) {
    return null;
  }

  const { data: units, error: unitsError } = await supabase
    .from("rental_units")
    .select("id, name")
    .eq("accommodation_id", accommodationUuid)
    .eq("active", true)
    .order("name");

  if (unitsError || !units || units.length === 0) {
    return null;
  }

  const { data: busyIds, error: busyError } = await supabase.rpc("busy_rental_unit_ids", {
    p_accommodation_id: accommodationUuid,
    p_from: from,
    p_to: to,
  });

  if (busyError) {
    return null;
  }

  const busySet = new Set<string>((busyIds ?? []) as string[]);

  return units.map((unit) => ({
    id: unit.id,
    name: unit.name,
    available: !busySet.has(unit.id),
  }));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accommodationId = searchParams.get("accommodationId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!accommodationId || !from || !to) {
    return NextResponse.json(
      { error: "Mangler accommodationId, from eller to." },
      { status: 400 },
    );
  }

  if (new Date(from).getTime() >= new Date(to).getTime()) {
    return NextResponse.json(
      { error: "Avreise må være etter ankomst." },
      { status: 400 },
    );
  }

  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  let units: UnitAvailability[] | null = null;
  let source: "supabase" | "demo" = "demo";

  if (supabaseConfigured) {
    units = await supabaseAvailability(accommodationId, from, to);

    if (units) {
      source = "supabase";
    }
  }

  units ??= demoAvailability(accommodationId, from, to);

  return NextResponse.json({ accommodationId, from, to, source, units });
}
