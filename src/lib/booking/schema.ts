import { z } from "zod";

export const bookingRequestSchema = z.object({
  productId: z.string().min(1),
  productType: z.enum(["activity", "accommodation"]),
  arrivalDate: z.string().min(1),
  departureDate: z.string().optional(),
  guests: z.coerce.number().int().min(1).max(40),
  guestName: z.string().min(2),
  guestEmail: z.email(),
  guestPhone: z.string().min(6),
  language: z.enum(["nb", "en", "de"]).default("nb"),
  paymentProvider: z.enum(["stripe", "vipps", "manual"]).default("manual"),
  message: z.string().max(1200).optional(),
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
