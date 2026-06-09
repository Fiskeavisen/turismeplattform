import type {
  Accommodation,
  Activity,
  AnalyticsSummary,
  Article,
  Booking,
  EditableSection,
  EmailTemplate,
  FAQItem,
  Review,
  ThemeSettings,
} from "./types";
import { themes } from "./themes";

export const touristCenter = {
  name: "Nordskjær Feriesenter",
  tagline: {
    nb: "Moderne hytter, båt og naturopplevelser mellom hav og fjell.",
    en: "Modern cabins, boats and nature experiences between ocean and mountains.",
    de: "Moderne Hütten, Boote und Naturerlebnisse zwischen Meer und Bergen.",
  },
  location: "Nordskjær, Vestlandskysten",
  phone: "+47 70 00 00 00",
  email: "booking@nordskjaer-demo.no",
  coordinates: "62.4000, 5.9000",
};

export const themeSettings: ThemeSettings = {
  template: "coastal",
  logoUrl: "/logo-placeholder.svg",
  primaryColor: "#082f49",
  secondaryColor: "#e8dfcf",
  accentColor: "#d6a75f",
  backgroundColor: "#f7f3eb",
  headingFont: "serif",
  bodyFont: "sans",
  borderRadius: "rounded",
};

export const templates = themes.map((theme) => ({
  id: theme.id,
  name: theme.name,
  description: theme.tagline,
}));

export const editableSections: EditableSection[] = [
  {
    id: "hero",
    type: "hero",
    title: "Forsidehero",
    enabled: true,
    order: 1,
    settings: { layout: "split", imagePosition: "right", showBooking: true },
  },
  {
    id: "booking",
    type: "booking",
    title: "Bookingmodul",
    enabled: true,
    order: 2,
    settings: { mode: "availability", providers: "stripe,vipps,manual" },
  },
  {
    id: "activities",
    type: "activities",
    title: "Aktiviteter",
    enabled: true,
    order: 3,
    settings: { columns: 4, showPrice: true },
  },
  {
    id: "articles",
    type: "articles",
    title: "Reiseinspirasjon",
    enabled: true,
    order: 4,
    settings: { columns: 3, seoMode: true },
  },
  {
    id: "reviews",
    type: "reviews",
    title: "Anmeldelser",
    enabled: true,
    order: 5,
    settings: { source: "manual", showRating: true },
  },
];

export const activities: Activity[] = [
  {
    id: "rib-safari",
    title: {
      nb: "Havfiske med båt",
      en: "Sea fishing with boat",
      de: "Meeresangeln mit Boot",
    },
    slug: "havfiske-med-bat",
    teaser: {
      nb: "Bo ved havet og dra rett ut til gode fiskeplasser fra Nordskjær.",
      en: "Stay by the sea and head straight to good fishing spots from Nordskjær.",
      de: "Wohnen Sie am Meer und fahren Sie direkt zu guten Angelplätzen ab Nordskjær.",
    },
    description: {
      nb: "En trygg, guidet tur med lokalkjent skipper og stopp ved skjulte perler.",
      en: "A safe guided tour with a local skipper and stops at hidden gems.",
      de: "Eine sichere geführte Tour mit lokalem Skipper und besonderen Stopps.",
    },
    category: "sea",
    duration: "2 timer",
    priceFrom: 1290,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    capacity: 12,
    bookable: true,
  },
  {
    id: "kayak",
    title: {
      nb: "Båttur til Måkøy fyr",
      en: "Boat trip to Måkøy lighthouse",
      de: "Bootsfahrt zum Leuchtturm Måkøy",
    },
    slug: "battur-til-makoy-fyr",
    teaser: {
      nb: "Opplev fyr, kystlandskap og havutsikt på en kort og minneverdig tur.",
      en: "Experience lighthouse history, coastal scenery and ocean views.",
      de: "Erleben Sie Leuchtturmgeschichte, Küstenlandschaft und Meerblick.",
    },
    description: {
      nb: "Passer for både nybegynnere og erfarne gjester som vil tett på naturen.",
      en: "Suitable for beginners and experienced guests who want nature up close.",
      de: "Für Anfänger und erfahrene Gäste, die Natur aus der Nähe erleben wollen.",
    },
    category: "sea",
    duration: "3 timer",
    priceFrom: 890,
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    capacity: 8,
    bookable: true,
  },
  {
    id: "mountain-hike",
    title: {
      nb: "Fjellturer fra Nordskjær",
      en: "Mountain hikes from Nordskjær",
      de: "Bergtouren ab Nordskjær",
    },
    slug: "guidet-fjelltur",
    teaser: {
      nb: "Lokale stier, utsikt mot havet og historier fra kysten.",
      en: "Local trails, ocean views and stories from the coast.",
      de: "Lokale Wege, Meerblick und Geschichten von der Küste.",
    },
    description: {
      nb: "En fleksibel tur som kan tilpasses vær, gruppe og ambisjonsnivå.",
      en: "A flexible hike adjusted to weather, group and ambition level.",
      de: "Eine flexible Wanderung je nach Wetter, Gruppe und Ambition.",
    },
    category: "mountain",
    duration: "4 timer",
    priceFrom: 690,
    imageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    capacity: 16,
    bookable: true,
  },
  {
    id: "food-night",
    title: {
      nb: "Dagstur til kystbyen",
      en: "Day trip to the coastal town",
      de: "Tagesausflug in die Küstenstadt",
    },
    slug: "dagstur-til-kystbyen",
    teaser: {
      nb: "Bruk Nordskjær som rolig base og opplev byliv, fjorder og kystkultur.",
      en: "Use Nordskjær as a calm base for town life, fjords and coastal culture.",
      de: "Nutzen Sie Nordskjær als ruhige Basis für Stadtleben, Fjorde und Küstenkultur.",
    },
    description: {
      nb: "Et sosialt kveldsarrangement for grupper, bedrifter og reisefølger.",
      en: "A social evening experience for groups, companies and travellers.",
      de: "Ein geselliges Abendangebot für Gruppen, Firmen und Reisende.",
    },
    category: "food",
    duration: "3 timer",
    priceFrom: 1190,
    imageUrl:
      "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&w=1200&q=80",
    capacity: 24,
    bookable: true,
  },
];

export const accommodations: Accommodation[] = [
  {
    id: "sea-cabin",
    title: {
      nb: "Hytte type 1 med båt",
      en: "Cabin type 1 with boat",
      de: "Hütte Typ 1 mit Boot",
    },
    slug: "sjohytte-panoramautsikt",
    description: {
      nb: "Moderne hytte for familier og små grupper, med kort vei til brygge og turstier.",
      en: "Modern cabin for families and small groups, close to pier and trails.",
      de: "Moderne Hütte für Familien und kleine Gruppen, nahe Steg und Wegen.",
    },
    beds: 6,
    guests: 7,
    priceFrom: 1890,
    imageUrl:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Båt kan legges til", "Kjøkken", "Wifi", "Terrasse"],
  },
  {
    id: "basecamp-room",
    title: {
      nb: "Hytte type 2 for familier",
      en: "Cabin type 2 for families",
      de: "Hütte Typ 2 für Familien",
    },
    slug: "basecamp-rom",
    description: {
      nb: "Enkelt, hyggelig og praktisk for aktive gjester som vil bruke dagen ute.",
      en: "Simple, welcoming and practical for active guests spending days outside.",
      de: "Einfach, freundlich und praktisch für aktive Gäste.",
    },
    beds: 2,
    guests: 2,
    priceFrom: 990,
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    amenities: ["Frokostvalg", "Wifi", "Felles tørkerom"],
  },
];

export const articles: Article[] = [
  {
    id: "48-hours",
    title: {
      nb: "48 timer ved kysten",
      en: "48 hours on the coast",
      de: "48 Stunden an der Küste",
    },
    slug: "48-timer-ved-kysten",
    excerpt: {
      nb: "En komplett helgeguide med hav, fjell, mat og lokale opplevelser.",
      en: "A complete weekend guide with ocean, mountains, food and local life.",
      de: "Ein Wochenendguide mit Meer, Bergen, Essen und lokalen Erlebnissen.",
    },
    category: "guide",
    readingMinutes: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "best-season",
    title: {
      nb: "Når bør du reise?",
      en: "When should you visit?",
      de: "Wann sollten Sie reisen?",
    },
    slug: "nar-bor-du-reise",
    excerpt: {
      nb: "Hva som passer best for fiske, fjelltur, familietur og roligere dager.",
      en: "What suits fishing, hiking, family trips and calmer days.",
      de: "Was zu Angeln, Wandern, Familienreisen und ruhigeren Tagen passt.",
    },
    category: "season",
    readingMinutes: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "local-guide",
    title: {
      nb: "Lokale tips før du booker",
      en: "Local tips before booking",
      de: "Lokale Tipps vor der Buchung",
    },
    slug: "lokale-tips-for-du-booker",
    excerpt: {
      nb: "Slik velger du riktig opplevelse, riktig dag og riktig utstyr.",
      en: "How to choose the right experience, day and equipment.",
      de: "So wählen Sie Erlebnis, Tag und Ausrüstung richtig aus.",
    },
    category: "local",
    readingMinutes: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
];

export const bookings: Booking[] = [
  {
    id: "BK-2048",
    guestName: "Maria Jensen",
    guestEmail: "maria@example.com",
    guestPhone: "+47 900 00 100",
    productTitle: "Sjøhytte med panoramautsikt",
    arrivalDate: "2026-07-12",
    departureDate: "2026-07-16",
    guests: 4,
    status: "confirmed",
    paymentProvider: "stripe",
    totalAmount: 7560,
    source: "website",
    language: "nb",
  },
  {
    id: "BK-2049",
    guestName: "Thomas Berger",
    guestEmail: "thomas@example.de",
    guestPhone: "+49 151 000000",
    productTitle: "RIB-safari i øyriket",
    arrivalDate: "2026-08-04",
    guests: 6,
    status: "paid",
    paymentProvider: "vipps",
    totalAmount: 7740,
    source: "partner",
    language: "de",
  },
  {
    id: "BK-2050",
    guestName: "Emma Wilson",
    guestEmail: "emma@example.co.uk",
    guestPhone: "+44 7700 000000",
    productTitle: "Kajakk mellom holmer",
    arrivalDate: "2026-06-28",
    guests: 2,
    status: "pending",
    paymentProvider: "manual",
    totalAmount: 1780,
    source: "website",
    language: "en",
  },
];

export const emailTemplates: EmailTemplate[] = [
  {
    id: "booking-created",
    name: "Booking mottatt",
    trigger: "booking_created",
    subject: {
      nb: "Vi har mottatt bookingen din",
      en: "We have received your booking",
      de: "Wir haben Ihre Buchung erhalten",
    },
    preview: {
      nb: "Takk for bookingen. Her finner du praktisk informasjon og neste steg.",
      en: "Thank you for booking. Here is practical information and next steps.",
      de: "Danke für Ihre Buchung. Hier finden Sie Informationen und nächste Schritte.",
    },
  },
  {
    id: "pre-arrival",
    name: "Før ankomst",
    trigger: "pre_arrival",
    subject: {
      nb: "Velkommen snart til Nordskjær Feriesenter",
      en: "Welcome soon to Nordskjær Feriesenter",
      de: "Bald willkommen im Nordskjær Feriesenter",
    },
    preview: {
      nb: "Her er pakkeliste, veibeskrivelse, værinfo og innsjekk.",
      en: "Here is packing list, directions, weather info and check-in.",
      de: "Hier sind Packliste, Anfahrt, Wetterinfos und Check-in.",
    },
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "boat-included",
    category: "stay",
    order: 1,
    question: {
      nb: "Er båt inkludert ved hytteopphold?",
      en: "Is a boat included with the cabin stay?",
      de: "Ist ein Boot beim Hüttenaufenthalt inklusive?",
    },
    answer: {
      nb: "Ja, hytteopphold kan settes opp med egen liten motorbåt eller som tillegg, avhengig av kundens oppsett.",
      en: "Yes, cabin stays can be configured with a small motorboat or as an add-on, depending on the setup.",
      de: "Ja, Hüttenaufenthalte können je nach Einrichtung mit kleinem Motorboot oder als Zusatz gebucht werden.",
    },
  },
  {
    id: "payment-options",
    category: "payment",
    order: 2,
    question: {
      nb: "Kan gjester betale med Vipps eller kort?",
      en: "Can guests pay with Vipps or card?",
      de: "Können Gäste mit Vipps oder Karte bezahlen?",
    },
    answer: {
      nb: "Plattformen har adapter for Stripe, Vipps/MobilePay og manuell betaling. Kundens egne avtaler avgjør hva som aktiveres.",
      en: "The platform supports Stripe, Vipps/MobilePay and manual payment. The customer's own agreements decide what is enabled.",
      de: "Die Plattform unterstützt Stripe, Vipps/MobilePay und manuelle Zahlung. Die Verträge des Kunden bestimmen, was aktiviert wird.",
    },
  },
  {
    id: "travel-nordskjaer",
    category: "travel",
    order: 3,
    question: {
      nb: "Hvordan kommer man seg til Nordskjær?",
      en: "How do guests get to Nordskjær?",
      de: "Wie kommen Gäste nach Nordskjær?",
    },
    answer: {
      nb: "Nordskjær ligger ytterst mot havet på Vestlandskysten, med kort vei til nærmeste tettsted og dagsturmuligheter til byer og fjorder.",
      en: "Nordskjær is located by the open ocean on the west coast, close to the nearest town and day trips to cities and fjords.",
      de: "Nordskjær liegt am offenen Meer an der Westküste, nahe dem nächsten Ort und mit Tagesausflügen zu Städten und Fjorden.",
    },
  },
];

export const reviews: Review[] = [
  {
    id: "review-kari",
    guestName: "Kari",
    rating: 5,
    source: "manual",
    date: "2026-05-12",
    quote: {
      nb: "Fantastisk plass. Hytta var moderne, utsikten var rå og båten gjorde ferien komplett.",
      en: "Fantastic place. The cabin was modern, the view was stunning and the boat completed the holiday.",
      de: "Fantastischer Ort. Die Hütte war modern, die Aussicht stark und das Boot machte den Urlaub komplett.",
    },
  },
  {
    id: "review-martin",
    guestName: "Martin",
    rating: 5,
    source: "google",
    date: "2026-06-03",
    quote: {
      nb: "Perfekt base for fiske, fjellturer og rolige kvelder ved havet.",
      en: "Perfect base for fishing, hikes and quiet evenings by the sea.",
      de: "Perfekte Basis für Angeln, Wanderungen und ruhige Abende am Meer.",
    },
  },
];

export const analyticsSummary: AnalyticsSummary = {
  visitors: 18420,
  conversionRate: 4.8,
  topSources: [
    { source: "Google organisk", visitors: 8200 },
    { source: "Visit Norway / partnere", visitors: 4100 },
    { source: "Instagram", visitors: 2600 },
    { source: "Direkte trafikk", visitors: 2100 },
  ],
  topQueries: [
    { query: "hytte ved havet vestlandet", clicks: 420 },
    { query: "rib safari helgeland", clicks: 318 },
    { query: "kajakk og overnatting norge", clicks: 276 },
  ],
  aeoScore: 82,
};
