import { z } from "zod";

/**
 * Kundeprofilen er plattformens "single source of truth" for én kunde.
 *
 * Arbeidsflyt:
 * 1. AI leser kundens eksisterende nettside og fyller ut en JSON-fil i `customers/`.
 * 2. Vi kvalitetssikrer profilen sammen med kunden.
 * 3. Profilen brukes til å generere innhold, velge mal og sette opp integrasjoner.
 *
 * Se `docs/CUSTOMER_ONBOARDING.md` for prompt og prosess.
 */

const localizedString = z.object({
  nb: z.string().min(1),
  en: z.string().optional().default(""),
  de: z.string().optional().default(""),
});

const accommodationInput = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  beds: z.number().int().min(0).optional(),
  guests: z.number().int().min(0).optional(),
  priceFromNok: z.number().int().min(0).optional(),
  amenities: z.array(z.string()).default([]),
  imageHints: z.array(z.string()).default([]),
});

const activityInput = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z
    .enum(["sea", "mountain", "culture", "family", "food", "other"])
    .default("other"),
  durationText: z.string().optional(),
  priceFromNok: z.number().int().min(0).optional(),
  bookable: z.boolean().default(true),
  imageHints: z.array(z.string()).default([]),
});

const faqInput = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
  category: z
    .enum(["booking", "travel", "stay", "activities", "payment"])
    .default("stay"),
});

export const customerProfileSchema = z.object({
  // Identitet
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Bruk små bokstaver, tall og bindestrek"),
  name: z.string().min(2),
  businessType: z.enum([
    "feriesenter",
    "hytteutleie",
    "aktivitetsleverandor",
    "destinasjon",
    "hotell",
    "camping",
  ]),
  existingWebsiteUrl: z.url().optional(),
  socialLinks: z.array(z.url()).default([]),

  // Sted og kontakt
  location: z.object({
    place: z.string().min(1),
    region: z.string().min(1),
    country: z.string().default("NO"),
    coordinates: z.string().optional(),
    travelInfo: z.string().optional(),
    nearbyDestinations: z.array(z.string()).default([]),
  }),
  contact: z.object({
    phone: z.string().optional(),
    altPhone: z.string().optional(),
    email: z.email().optional(),
    address: z.string().optional(),
  }),

  // Merkevare og design
  brand: z.object({
    tagline: localizedString,
    story: z.string().min(1),
    toneOfVoice: z
      .enum(["varm", "eventyrlig", "premium", "familievennlig", "rolig"])
      .default("varm"),
    template: z.enum(["coastal", "fjord", "premium"]).default("coastal"),
    primaryColor: z.string().optional(),
    accentColor: z.string().optional(),
    logoUrl: z.string().optional(),
    photoCredits: z.string().optional(),
  }),

  // Språk
  languages: z.array(z.enum(["nb", "en", "de"])).default(["nb", "en", "de"]),

  // Produkter
  accommodations: z.array(accommodationInput).default([]),
  activities: z.array(activityInput).default([]),
  uniqueSellingPoints: z.array(z.string()).min(1),

  // Innhold
  faq: z.array(faqInput).default([]),
  articleIdeas: z.array(z.string()).default([]),
  seoKeywords: z.array(z.string()).default([]),

  // Integrasjoner og avtaler
  integrations: z.object({
    bookingMode: z
      .enum(["request", "internal-payment", "external-link", "channel-manager"])
      .default("request"),
    externalBookingUrl: z.url().optional(),
    channelManager: z.string().optional(),
    onBookingCom: z.boolean().default(false),
    payments: z.array(z.enum(["stripe", "vipps", "card", "invoice"])).default([]),
    googleAnalyticsId: z.string().optional(),
    searchConsoleVerified: z.boolean().default(false),
    reviewSources: z.array(z.enum(["google", "trustpilot", "manual"])).default(["manual"]),
  }),

  // Internt
  internalNotes: z.string().optional(),
});

export type CustomerProfile = z.infer<typeof customerProfileSchema>;

export function parseCustomerProfile(data: unknown): CustomerProfile {
  return customerProfileSchema.parse(data);
}
