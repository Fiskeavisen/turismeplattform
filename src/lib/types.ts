export type Locale = "nb" | "en" | "de";

export type SiteTemplate = "coastal" | "fjord" | "premium";

export type PaymentProvider = "stripe" | "vipps" | "manual";

export type BookingStatus =
  | "draft"
  | "pending"
  | "confirmed"
  | "paid"
  | "cancelled";

export type SectionType =
  | "hero"
  | "booking"
  | "activities"
  | "accommodation"
  | "articles"
  | "reviews"
  | "map"
  | "faq"
  | "cta";

export type EditableSection = {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  order: number;
  settings: Record<string, string | number | boolean>;
};

export type ThemeSettings = {
  template: SiteTemplate;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: "soft" | "rounded" | "sharp";
};

export type LocalizedString = Record<Locale, string>;

export type Activity = {
  id: string;
  title: LocalizedString;
  slug: string;
  teaser: LocalizedString;
  description: LocalizedString;
  category: "sea" | "mountain" | "culture" | "family" | "food";
  duration: string;
  priceFrom: number;
  imageUrl: string;
  capacity: number;
  bookable: boolean;
  sellStandalone: boolean;
};

export type AccommodationType = "hytte" | "leilighet" | "hus";

export type Accommodation = {
  id: string;
  type: AccommodationType;
  title: LocalizedString;
  slug: string;
  description: LocalizedString;
  beds: number;
  guests: number;
  priceFrom: number;
  imageUrl: string;
  amenities: string[];
};

export type RentalUnit = {
  id: string;
  accommodationId: string;
  name: string;
  active: boolean;
};

export type AddonPriceType = "per_stay" | "per_night" | "per_person";

export type BookingAddon = {
  id: string;
  name: LocalizedString;
  priceNok: number;
  priceType: AddonPriceType;
  active: boolean;
  sortOrder: number;
};

export type BookingAddonSelection = {
  id: string;
  name: string;
  priceNok: number;
  priceType: AddonPriceType;
  amount: number;
};

export type Article = {
  id: string;
  title: LocalizedString;
  slug: string;
  excerpt: LocalizedString;
  category: "guide" | "season" | "activity" | "local";
  readingMinutes: number;
  imageUrl: string;
};

export type Booking = {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  productTitle: string;
  rentalUnitId?: string;
  rentalUnitName?: string;
  arrivalDate: string;
  departureDate?: string;
  guests: number;
  status: BookingStatus;
  paymentProvider: PaymentProvider;
  totalAmount: number;
  addons?: BookingAddonSelection[];
  source: "website" | "booking-com" | "airbnb" | "manual" | "partner";
  language: Locale;
};

export type EmailTemplate = {
  id: string;
  name: string;
  subject: LocalizedString;
  preview: LocalizedString;
  trigger: "booking_created" | "payment_received" | "pre_arrival" | "post_stay";
};

export type FAQItem = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
  category: "booking" | "travel" | "stay" | "activities" | "payment";
  order: number;
};

export type ReviewReply = {
  text: LocalizedString;
  date: string;
  author: string;
};

export type Review = {
  id: string;
  guestName: string;
  rating: number;
  source: "manual" | "google" | "trustpilot";
  quote: LocalizedString;
  date: string;
  published: boolean;
  reply?: ReviewReply;
  productLabel?: string;
};

export type ReviewIntegration = {
  id: "google" | "trustpilot" | "manual";
  name: string;
  connected: boolean;
  lastSync?: string;
  reviewCount: number;
  averageRating: number;
  description: string;
};

export type ReportPeriod = "30d" | "90d" | "year";

export type ReportType =
  | "belegg"
  | "omsetning"
  | "aktiviteter"
  | "mersalg"
  | "kilder";

export type AnalyticsSummary = {
  visitors: number;
  conversionRate: number;
  topSources: Array<{ source: string; visitors: number }>;
  topQueries: Array<{ query: string; clicks: number }>;
  aeoScore: number;
};
