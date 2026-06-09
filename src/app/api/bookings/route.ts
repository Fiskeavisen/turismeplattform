import { NextResponse } from "next/server";
import { createBookingWithAdapter } from "@/lib/booking/adapters";
import { bookingRequestSchema } from "@/lib/booking/schema";
import { createCheckout } from "@/lib/payments/providers";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = bookingRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ugyldig bookingforespørsel", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const adapterResult = await createBookingWithAdapter("internal", parsed.data);
  const bookingId = adapterResult.reference;
  const checkout = await createCheckout(parsed.data.paymentProvider, {
    bookingId,
    amount: 2500,
    currency: "NOK",
    customerEmail: parsed.data.guestEmail,
    description: `Booking ${parsed.data.productId}`,
    successUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/booking/takk`,
    cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/booking/avbrutt`,
  });

  return NextResponse.json({
    bookingId,
    adapter: adapterResult,
    checkout,
    message:
      checkout.status === "unconfigured"
        ? "Booking er opprettet som demo. Betalingsleverandør må konfigureres."
        : "Bookingforespørsel opprettet.",
  });
}
