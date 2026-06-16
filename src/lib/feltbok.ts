import { norskeBilder, type NorskBildeNoekkel } from "@/lib/images";

export const feltbokNav = [
  { href: "/", label: "Forsiden" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/annonser", label: "Annonsér" },
  { href: "/tester", label: "Tester" },
];

export const feltbokStats = [
  ["8", "nisjenettsider"],
  ["45k+", "følgere"],
  ["10+", "år med innhold"],
  ["100%", "tydelig merking"],
];

export type FriMediaSite = {
  id: string;
  short: string;
  title: string;
  niche: string;
  text: string;
  status: string;
  image: NorskBildeNoekkel;
};

export const friMediaSites: FriMediaSite[] = [
  {
    id: "01",
    short: "FA",
    title: "Fiskeavisen.no",
    niche: "Sportsfiske og fritidsfiske",
    text: "Tester, tips og reportasjer fra elv, sjø og isfiske.",
    status: "Avis",
    image: "trebaat",
  },
  {
    id: "02",
    short: "JA",
    title: "Jegeravisen.no",
    niche: "Jakt, vilt og forvaltning",
    text: "Småvilt, storvilt, fuglejakt, utstyr og forvaltning.",
    status: "Avis",
    image: "fjelldal",
  },
  {
    id: "03",
    short: "IF",
    title: "iFri.no",
    niche: "Friluftsliv for alle",
    text: "Turforslag, padling, ski, vandring, foto og praktiske tips.",
    status: "Avis",
    image: "kanoVann",
  },
  {
    id: "04",
    short: "TT",
    title: "Testteam.no",
    niche: "Uavhengige produkttester",
    text: "Tester av friluftsutstyr, fra hodelykt til hengekøye til tursko.",
    status: "Tester",
    image: "skikjoerer",
  },
  {
    id: "05",
    short: "SA",
    title: "Sikkerhetsavisen.no",
    niche: "Sikkerhet og beredskap",
    text: "Forsvar, etterretning, beredskap og cybertrusler.",
    status: "Avis",
    image: "moerkBoelge",
  },
  {
    id: "06",
    short: "LA",
    title: "Lastet.no",
    niche: "Fraktmarkedsplass",
    text: "Sendere møter verifiserte transportører for møbler, paller, kjøretøy og flytting.",
    status: "Markedsplass",
    image: "rorbuerKyst",
  },
  {
    id: "07",
    short: "VB",
    title: "Vedbod.no",
    niche: "Ved i Norge",
    text: "Kjøpere legger ut anbud, lokale selgere konkurrerer.",
    status: "Markedsplass",
    image: "skogshytte",
  },
  {
    id: "08",
    short: "VM",
    title: "Vedmatch.no",
    niche: "Ved i Sverige",
    text: "Samme idé som Vedbod, tilpasset svenske kunder og selgere.",
    status: "Markedsplass",
    image: "granskog",
  },
];

export const friMediaImages = norskeBilder;

export const feltbokPrinciples = [
  {
    number: "I",
    title: "Nisje slår bredde",
    text: "Et lite, dypt forstått publikum er mer verdt enn et stort som bare halvt forstår oss.",
  },
  {
    number: "II",
    title: "Det redaksjonelle er gratis",
    text: "Naturen koster ingenting å gå ut i. Det skal heller ikke koste å lese om den.",
  },
  {
    number: "III",
    title: "Reklame merkes som reklame",
    text: "En test er en test. En annonse er en annonse. Ingen mellomting. Aldri.",
  },
];

export const feltbokServices = [
  {
    title: "Innholdsmarkedsføring / Native ads",
    text: "Vi utformer nye artikler eller løfter eksisterende innhold. SEO-optimalisert, publisert i riktig nisje og spredd i sosiale kanaler.",
  },
  {
    title: "Innholdsproduksjon",
    text: "Tekster, video, produkttekster, bloggartikler og guider for bedrifter som vil bygge et eget publikum over tid.",
  },
  {
    title: "Displayannonsering",
    text: "Synlighet på målgruppe-nisjede nettsteder der budskapet møter folk som allerede bryr seg om kategorien.",
  },
  {
    title: "Foto og video på oppdrag",
    text: "Bestillingsarbeid levert som filer til kundens egne kanaler, strengt adskilt fra det redaksjonelle.",
  },
];

export const advertisingFormats = [
  {
    name: "Display",
    text: "Standard IAB-formater i artikkel og sidefelt der nettsidene har annonseplass.",
    points: ["Kategorinær synlighet", "Geo- og demografimålretting der det gir mening", "God for merkevarebygging"],
  },
  {
    name: "Partner",
    text: "Følger en sesong eller kategori, for eksempel rypejakt eller alt om hodelykter.",
    points: ["Logo og introtekst", "Tilbakevendende plassering", "Uten å blande seg i det redaksjonelle"],
  },
  {
    name: "Innhold på oppdrag",
    text: "Foto, video, tekst, guider og produkttekster for kundens egne kanaler.",
    points: ["Bestillingsarbeid", "Leveres som filer", "Ikke det samme som en produkttest"],
  },
];

export const testCategories = [
  {
    title: "Fisketester",
    site: "Fiskeavisen.no",
    text: "Stenger, sneller, agn, vadere og ekkolodd.",
  },
  {
    title: "Jakttester",
    site: "Jegeravisen.no",
    text: "Sikter, klær, kniver, kikkerter og hundeutstyr.",
  },
  {
    title: "Friluftstester",
    site: "iFri.no / Testteam.no",
    text: "Telt, sko, sekker, hengekøyer og primus.",
  },
];

export const testRules = [
  "Du betaler aldri for å bli testet.",
  "Vi tar ikke imot spons for tester.",
  "Vi forhåndsgodkjenner aldri innhold.",
  "Utstyret returneres etter test.",
  "Produkter som ikke består, skriver vi om uten å pakke det inn.",
];

export type FeltbokArticle = {
  title: string;
  site: string;
  category: string;
  kicker: string;
  image: NorskBildeNoekkel;
};

/** Illustrative eksempelsaker som viser hvordan en felles forside-feed kan se ut. */
export const feltbokArticles: FeltbokArticle[] = [
  {
    title: "Stor test: seks havfiskestenger til under 2000 kroner",
    site: "Fiskeavisen.no",
    category: "Test",
    kicker: "Fiske",
    image: "seilbaatNatt",
  },
  {
    title: "Slik forbereder du hunden til årets jaktprøve",
    site: "Jegeravisen.no",
    category: "Guide",
    kicker: "Jakt",
    image: "vintervann",
  },
  {
    title: "Ti turforslag for høstferien i Sunnmørsalpene",
    site: "iFri.no",
    category: "Tur",
    kicker: "Friluft",
    image: "fjellDis",
  },
  {
    title: "Hodelykt-test: ni modeller satt på prøve i mørket",
    site: "Testteam.no",
    category: "Test",
    kicker: "Utstyr",
    image: "nordlysSkog",
  },
  {
    title: "Dette bør beredskapslageret hjemme inneholde",
    site: "Sikkerhetsavisen.no",
    category: "Analyse",
    kicker: "Beredskap",
    image: "nordlysVinter",
  },
];

export const feltbokContacts = [
  {
    role: "Daglig leder · Magasiner",
    name: "Knut Gartland",
    phone: "915 82 072",
    email: "knut@frimedia.no",
  },
  {
    role: "Styreleder · Markedsplasser",
    name: "Daniel Tilrem",
    phone: "920 89 813",
    email: "daniel@frimedia.no",
  },
];
