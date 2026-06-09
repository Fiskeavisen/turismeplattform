import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createBookingWithAdapter } from "@/lib/booking/adapters";
import { buildAddonSelections, calculateNights } from "@/lib/booking/pricing";
import { bookingRequestSchema, type BookingRequestInput } from "@/lib/booking/schema";
import { accommodations, activities, bookingAddons } from "@/lib/demo-data";
import { createCheckout } from "@/lib/payments/providers";
import type { BookingAddonSelection } from "@/lib/types";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function resolveProduct(input: BookingRequestInput) {
  if (input.productType === "accommodation") {
    return accommodations.find((item) => item.id === input.productId);
  }

  return activities.find((item) => item.id === input.productId);
}

async function persistBookingToSupabase(
  input: BookingRequestInput,
  productTitle: string,
  addons: BookingAddonSelection[],
  totalAmount: number,
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  );

  const { data: tenant } = await supabase
    .from("tenants")
    .select("id")
    .eq("slug", "nordskjaer-feriesenter")
    .maybeSingle();

  if (!tenant) {
    return null;
  }

  const { data: booking } = await supabase
    .from("bookings")
    .insert({
      tenant_id: tenant.id,
      guest_name: input.guestName,
      guest_email: input.guestEmail,
      guest_phone: input.guestPhone,
      product_type: input.productType,
      product_id: UUID_PATTERN.test(input.productId) ? input.productId : null,
      product_title: productTitle,
      rental_unit_id:
        input.rentalUnitId && UUID_PATTERN.test(input.rentalUnitId)
          ? input.rentalUnitId
          : null,
      arrival_date: input.arrivalDate,
      departure_date: input.departureDate ?? null,
      guests: input.guests,
      payment_provider: input.paymentProvider,
      total_amount: totalAmount,
      addons,
      language: input.language,
      internal_notes: input.message ?? null,
    })
    .select("id")
    .maybeSingle();

  return booking?.id ?? null;
}

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = bookingRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ugyldig bookingforespørsel", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const product = resolveProduct(input);
  const nights = calculateNights(input.arrivalDate, input.departureDate);
  const baseAmount = product
    ? input.productType === "accommodation"
      ? product.priceFrom * nights
      : product.priceFrom * input.guests
    : 0;
  const addons = buildAddonSelections(bookingAddons, input.addonIds, nights, input.guests);
  const addonsAmount = addons.reduce((sum, addon) => sum + addon.amount, 0);
  const totalAmount = baseAmount + addonsAmount;
  const productTitle = product?.title.nb ?? input.productId;

  const adapterResult = await createBookingWithAdapter("internal", input);
  let bookingId = adapterResult.reference;

  const supabaseConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

  if (supabaseConfigured) {
    try {
      const savedId = await persistBookingToSupabase(input, productTitle, addons, totalAmount);

      if (savedId) {
        bookingId = savedId;
      }
    } catch {
      // Demoen skal fungere selv om Supabase-lagring feiler.
    }
  }

  const checkout = await createCheckout(input.paymentProvider, {
    bookingId,
    amount: totalAmount,
    currency: "NOK",
    customerEmail: input.guestEmail,
    description: `Booking ${productTitle}`,
    successUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/booking/takk`,
    cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/booking/avbrutt`,
  });

  return NextResponse.json({
    bookingId,
    adapter: adapterResult,
    checkout,
    pricing: {
      nights,
      baseAmount,
      addons,
      addonsAmount,
      totalAmount,
    },
    message:
      checkout.status === "unconfigured"
        ? "Booking er opprettet som demo. Betalingsleverandør må konfigureres."
        : "Bookingforespørsel opprettet.",
  });
}
