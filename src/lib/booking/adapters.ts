import type { BookingRequestInput } from "./schema";

export type BookingAdapterKind =
  | "internal"
  | "external-link"
  | "channel-manager"
  | "booking-com";

export type BookingAdapterResult = {
  kind: BookingAdapterKind;
  status: "accepted" | "redirect" | "unconfigured";
  reference: string;
  redirectUrl?: string;
  message: string;
};

export async function createBookingWithAdapter(
  kind: BookingAdapterKind,
  input: BookingRequestInput,
): Promise<BookingAdapterResult> {
  if (kind === "external-link") {
    return {
      kind,
      status: "redirect",
      reference: input.productId,
      redirectUrl: process.env.EXTERNAL_BOOKING_URL,
      message: "Send gjesten videre til ekstern bookingløsning.",
    };
  }

  if (kind === "channel-manager" || kind === "booking-com") {
    return {
      kind,
      status: "unconfigured",
      reference: input.productId,
      message:
        "Adapterpunkt er klart, men krever kundens channel manager/API-avtale før aktivering.",
    };
  }

  return {
    kind: "internal",
    status: "accepted",
    reference: `BK-${Date.now()}`,
    message: "Booking lagres internt og kan følges opp fra admin.",
  };
}
