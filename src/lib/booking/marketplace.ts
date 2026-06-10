import { norskeBilder } from "@/lib/images";

export type MarketplaceProductType = "overnatting" | "opplevelse";

export type MarketplaceBookingMode = "internal" | "channel-manager" | "external-link";

export type MarketplaceChannel =
  | "Direkte"
  | "Connect"
  | "Airbnb"
  | "Booking.com"
  | "Hotels.com"
  | "Visit Norway";

export type MarketplacePartner = {
  id: string;
  name: string;
  location: string;
  description: string;
  websitePath: string;
  contactEmail: string;
  channels: MarketplaceChannel[];
};

type BlockedPeriod = {
  from: string;
  to: string;
};

type MarketplaceProductBase = {
  id: string;
  partnerId: string;
  type: MarketplaceProductType;
  title: string;
  slug: string;
  description: string;
  location: string;
  imageUrl: string;
  priceFrom: number;
  guestsMax: number;
  bookingMode: MarketplaceBookingMode;
  channels: MarketplaceChannel[];
};

export type MarketplaceAccommodation = MarketplaceProductBase & {
  type: "overnatting";
  minNights: number;
  units: Array<{
    id: string;
    name: string;
    blockedPeriods: BlockedPeriod[];
  }>;
};

export type MarketplaceActivity = MarketplaceProductBase & {
  type: "opplevelse";
  duration: string;
  capacityPerDay: number;
  blockedDates: string[];
  bookedSeats: Array<{
    date: string;
    seats: number;
  }>;
};

export type MarketplaceProduct = MarketplaceAccommodation | MarketplaceActivity;

export type MarketplaceSearchFilters = {
  from?: string;
  to?: string;
  guests?: number;
  productType?: MarketplaceProductType | "alle";
  query?: string;
};

export type MarketplaceSearchResult = {
  product: MarketplaceProduct;
  partner: MarketplacePartner;
  available: boolean;
  availableUnits: number;
  availableSeats: number;
  totalCapacity: number;
  availabilityLabel: string;
  channelLabel: string;
};

export const marketplacePartners: MarketplacePartner[] = [
  {
    id: "nordskjaer",
    name: "Nordskjær Feriesenter",
    location: "Nordskjær",
    description: "Hytter, båt, havfiske og fjellturer ved kysten.",
    websitePath: "/demo/storhavet",
    contactEmail: "booking@nordskjaer-demo.no",
    channels: ["Direkte", "Connect", "Booking.com"],
  },
  {
    id: "helgeland-kajakk",
    name: "Helgeland Kajakk",
    location: "Sandnessjøen",
    description: "Guidede padleturer, familieturer og kurs langs Helgelandskysten.",
    websitePath: "/booking-systemer",
    contactEmail: "hei@helgeland-kajakk.demo",
    channels: ["Direkte", "Connect", "Visit Norway"],
  },
  {
    id: "fjordro",
    name: "Fjordro Overnatting",
    location: "Mosjøen",
    description: "Små hytter og leiligheter for par, familier og arbeidsreisende.",
    websitePath: "/booking-systemer",
    contactEmail: "booking@fjordro.demo",
    channels: ["Direkte", "Connect", "Airbnb", "Hotels.com"],
  },
  {
    id: "oyeventyr",
    name: "Øyeventyr Helgeland",
    location: "Dønna",
    description: "Båtturer, øyhopping og lokale matopplevelser.",
    websitePath: "/booking-systemer",
    contactEmail: "post@oyeventyr.demo",
    channels: ["Direkte", "Connect", "Booking.com"],
  },
];

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: "nordskjaer-hytte-type-1",
    partnerId: "nordskjaer",
    type: "overnatting",
    title: "Hytte type 1 med båt",
    slug: "hytte-type-1-med-bat",
    description: "Moderne hytte for familier og små grupper, med kort vei til brygge og turstier.",
    location: "Nordskjær",
    imageUrl: norskeBilder.brygge.url,
    priceFrom: 1890,
    guestsMax: 7,
    bookingMode: "internal",
    channels: ["Direkte", "Connect", "Booking.com"],
    minNights: 2,
    units: [
      { id: "hytte-1", name: "Hytte 1", blockedPeriods: [] },
      { id: "hytte-2", name: "Hytte 2", blockedPeriods: [{ from: "2026-07-12", to: "2026-07-16" }] },
      { id: "hytte-3", name: "Hytte 3", blockedPeriods: [] },
      { id: "hytte-4", name: "Hytte 4", blockedPeriods: [{ from: "2026-08-01", to: "2026-08-05" }] },
    ],
  },
  {
    id: "fjordro-skogshytte",
    partnerId: "fjordro",
    type: "overnatting",
    title: "Skogshytte ved fjorden",
    slug: "skogshytte-ved-fjorden",
    description: "Rolig overnatting med terrasse, kjøkken og kort vei til fjord og turområder.",
    location: "Mosjøen",
    imageUrl: norskeBilder.skogshytte.url,
    priceFrom: 1490,
    guestsMax: 5,
    bookingMode: "channel-manager",
    channels: ["Direkte", "Connect", "Airbnb", "Hotels.com"],
    minNights: 1,
    units: [
      { id: "fjordro-1", name: "Skogshytte 1", blockedPeriods: [{ from: "2026-06-28", to: "2026-06-30" }] },
      { id: "fjordro-2", name: "Skogshytte 2", blockedPeriods: [] },
      { id: "fjordro-3", name: "Skogshytte 3", blockedPeriods: [{ from: "2026-07-20", to: "2026-07-23" }] },
    ],
  },
  {
    id: "fjordro-leilighet",
    partnerId: "fjordro",
    type: "overnatting",
    title: "Sentral leilighet for to",
    slug: "sentral-leilighet-for-to",
    description: "Praktisk base for korte opphold, jobb, kurs og opplevelser i regionen.",
    location: "Mosjøen",
    imageUrl: norskeBilder.vintervann.url,
    priceFrom: 990,
    guestsMax: 2,
    bookingMode: "channel-manager",
    channels: ["Direkte", "Connect", "Airbnb"],
    minNights: 1,
    units: [
      { id: "fjordro-leil-1", name: "Leilighet A", blockedPeriods: [] },
      { id: "fjordro-leil-2", name: "Leilighet B", blockedPeriods: [{ from: "2026-07-10", to: "2026-07-14" }] },
    ],
  },
  {
    id: "helgeland-kajakk-familietur",
    partnerId: "helgeland-kajakk",
    type: "opplevelse",
    title: "Guidet kajakktur for familier",
    slug: "guidet-kajakktur-for-familier",
    description: "Trygg padletur med lokal guide, rolig tempo og utstyr inkludert.",
    location: "Sandnessjøen",
    imageUrl: norskeBilder.kanoVann.url,
    priceFrom: 890,
    guestsMax: 12,
    bookingMode: "internal",
    channels: ["Direkte", "Connect", "Visit Norway"],
    duration: "3 timer",
    capacityPerDay: 12,
    blockedDates: ["2026-07-22"],
    bookedSeats: [
      { date: "2026-07-12", seats: 4 },
      { date: "2026-08-04", seats: 2 },
    ],
  },
  {
    id: "oyeventyr-battur",
    partnerId: "oyeventyr",
    type: "opplevelse",
    title: "Båttur og øyhopping",
    slug: "battur-og-oyhopping",
    description: "Dagstur mellom øyer, lokale historier og stopp for enkel servering.",
    location: "Dønna",
    imageUrl: norskeBilder.seilbaatNatt.url,
    priceFrom: 1290,
    guestsMax: 18,
    bookingMode: "external-link",
    channels: ["Direkte", "Connect", "Booking.com"],
    duration: "4 timer",
    capacityPerDay: 18,
    blockedDates: ["2026-08-01"],
    bookedSeats: [
      { date: "2026-07-12", seats: 12 },
      { date: "2026-07-13", seats: 18 },
    ],
  },
  {
    id: "nordskjaer-havfiske",
    partnerId: "nordskjaer",
    type: "opplevelse",
    title: "Havfiske med båt",
    slug: "havfiske-med-bat",
    description: "Guidet fisketur med lokalkjent skipper og gode fiskeplasser fra Nordskjær.",
    location: "Nordskjær",
    imageUrl: norskeBilder.trebaat.url,
    priceFrom: 1290,
    guestsMax: 12,
    bookingMode: "internal",
    channels: ["Direkte", "Connect"],
    duration: "2 timer",
    capacityPerDay: 12,
    blockedDates: [],
    bookedSeats: [{ date: "2026-08-04", seats: 6 }],
  },
];

function toTimestamp(date: string) {
  return new Date(`${date}T00:00:00Z`).getTime();
}

function periodsOverlap(period: BlockedPeriod, from: string, to: string) {
  return toTimestamp(period.from) < toTimestamp(to) && toTimestamp(period.to) > toTimestamp(from);
}

function channelLabel(mode: MarketplaceBookingMode) {
  const labels: Record<MarketplaceBookingMode, string> = {
    internal: "Bookes direkte i plattformen",
    "channel-manager": "Klar for channel manager",
    "external-link": "Sender videre til ekstern kanal",
  };

  return labels[mode];
}

function getAvailableUnits(product: MarketplaceAccommodation, from?: string, to?: string) {
  if (!from || !to) {
    return product.units.length;
  }

  return product.units.filter(
    (unit) => !unit.blockedPeriods.some((period) => periodsOverlap(period, from, to)),
  ).length;
}

function getAvailableSeats(product: MarketplaceActivity, date?: string) {
  if (!date) {
    return product.capacityPerDay;
  }

  if (product.blockedDates.includes(date)) {
    return 0;
  }

  const bookedSeats = product.bookedSeats
    .filter((booking) => booking.date === date)
    .reduce((sum, booking) => sum + booking.seats, 0);

  return Math.max(product.capacityPerDay - bookedSeats, 0);
}

function matchesQuery(product: MarketplaceProduct, partner: MarketplacePartner, query?: string) {
  if (!query?.trim()) {
    return true;
  }

  const normalized = query.trim().toLowerCase();
  const haystack = [
    product.title,
    product.description,
    product.location,
    partner.name,
    partner.location,
    partner.description,
    ...product.channels,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

export function searchMarketplaceAvailability(filters: MarketplaceSearchFilters = {}) {
  const guests = Math.max(filters.guests ?? 1, 1);
  const productType = filters.productType ?? "alle";

  return marketplaceProducts
    .map((product): MarketplaceSearchResult | null => {
      const partner = marketplacePartners.find((item) => item.id === product.partnerId);

      if (!partner) {
        return null;
      }

      if (productType !== "alle" && product.type !== productType) {
        return null;
      }

      if (guests > product.guestsMax || !matchesQuery(product, partner, filters.query)) {
        return null;
      }

      if (product.type === "overnatting") {
        const availableUnits = getAvailableUnits(product, filters.from, filters.to);

        return {
          product,
          partner,
          available: availableUnits > 0,
          availableUnits,
          availableSeats: availableUnits * product.guestsMax,
          totalCapacity: product.units.length,
          availabilityLabel:
            availableUnits > 0
              ? `${availableUnits} ledige ${availableUnits === 1 ? "enhet" : "enheter"}`
              : "Fullbooket i perioden",
          channelLabel: channelLabel(product.bookingMode),
        };
      }

      const availableSeats = getAvailableSeats(product, filters.from);

      return {
        product,
        partner,
        available: availableSeats >= guests,
        availableUnits: availableSeats > 0 ? 1 : 0,
        availableSeats,
        totalCapacity: product.capacityPerDay,
        availabilityLabel:
          availableSeats >= guests
            ? `${availableSeats} ledige ${availableSeats === 1 ? "plass" : "plasser"}`
            : "Ikke nok ledige plasser",
        channelLabel: channelLabel(product.bookingMode),
      };
    })
    .filter((result): result is MarketplaceSearchResult => Boolean(result))
    .sort((a, b) => Number(b.available) - Number(a.available) || a.product.priceFrom - b.product.priceFrom);
}
