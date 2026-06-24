export type PromptCategory =
  | "article"
  | "service_page"
  | "product_description"
  | "meta"
  | "faq"
  | "geo"
  | "ads";

export type PromptTemplate = {
  id: string;
  category: PromptCategory;
  title: string;
  description: string;
  whenToUse: string;
  outputFormat: string;
  prompt: string;
};

export const promptTemplates: PromptTemplate[] = [
  {
    id: "article-brief",
    category: "article",
    title: "Lag artikkelutkast fra søkeord og målgruppe",
    description: "Gir kunden en strukturert artikkel som svarer tydelig, uten å bli generisk.",
    whenToUse: "Når en side eller artikkel bør dekke et søk bedre enn i dag.",
    outputFormat: "Tittel, ingress, disposisjon, avsnitt, FAQ og internlenker.",
    prompt: `Du er en norsk innholdsstrateg.

Mål: Skriv et artikkelutkast som hjelper en potensiell kunde å ta et bedre valg.

Bedrift: [firmanavn]
Nettside: [domene]
Målgruppe: [hvem skal vi nå]
Søkeord/spørsmål: [søkeord eller spørsmål]
Viktigste tilbud: [tjeneste/produkt]
Geografi: [sted/område]
Ønsket handling: [hva skal leseren gjøre etterpå]

Krav:
- Skriv på tydelig norsk, uten unødvendig fagprat.
- Start med et kort direkte svar.
- Forklar hva leseren bør vurdere før de velger leverandør.
- Ta med 3–5 naturlige FAQ-spørsmål.
- Foreslå 3 interne lenker vi bør legge inn.
- Ikke finn på fakta, priser eller referanser. Marker heller [trenger fakta].`,
  },
  {
    id: "service-page",
    category: "service_page",
    title: "Forbedre en tjenesteside",
    description: "Prompt for å gjøre en eksisterende tjenesteside mer tydelig og konverterende.",
    whenToUse: "Når siden får trafikk, men få henvendelser eller lav CTR.",
    outputFormat: "Ny H1, intro, seksjoner, CTA-er og trust-elementer.",
    prompt: `Du er en senior UX-skribent og SEO-rådgiver.

Forbedre denne tjenestesiden:
URL: [url]
Eksisterende tekst: [lim inn tekst]
Målgruppe: [målgruppe]
Viktigste kundeproblem: [problem]
Ønsket handling: [CTA]

Lag:
1. Ny H1 og kort intro.
2. Seksjonen "Når passer dette for deg?"
3. Seksjonen "Hva får du hjelp med?"
4. En kort prisseksjon eller forklaring på hva som påvirker pris.
5. 3 trust-punkter som ikke høres ut som reklame.
6. Én tydelig CTA.

Språk: enkelt norsk. Unngå tomme superlativer som "best", "ledende" og "skreddersydd" uten bevis.`,
  },
  {
    id: "product-description",
    category: "product_description",
    title: "Skriv bedre produktbeskrivelse",
    description: "For nettbutikker eller produktsider med svak beskrivelse.",
    whenToUse: "Når produktbeskrivelsen er kort, generell eller mangler bruksverdi.",
    outputFormat: "Kort intro, fordeler, spesifikasjoner, FAQ og metatekst.",
    prompt: `Du er en norsk e-commerce copywriter.

Produkt: [produktnavn]
Kategori: [kategori]
Målgruppe: [hvem kjøper]
Viktigste bruksområde: [bruk]
Eksisterende beskrivelse: [lim inn tekst]
Kjente fakta/spesifikasjoner: [fakta]

Skriv:
- Kort beskrivelse (maks 80 ord)
- Utfyllende beskrivelse (150–250 ord)
- 5 fordeler forklart med kundeverdi
- 3 spørsmål og svar
- Meta title og meta description

Ikke finn på spesifikasjoner. Hvis noe mangler, skriv [trenger fakta].`,
  },
  {
    id: "meta-ctr",
    category: "meta",
    title: "Forbedre title og meta for bedre CTR",
    description: "Gjør søkeresultatet mer klikkbart uten clickbait.",
    whenToUse: "Når posisjonen er grei, men CTR er lav.",
    outputFormat: "5 title-varianter, 5 metabeskrivelser og anbefalt valg.",
    prompt: `Du er en SEO-spesialist som skriver for norske søkeresultater.

Side: [url]
Primært søkeord: [søkeord]
Nåværende title: [title]
Nåværende meta description: [meta]
Målgruppe: [målgruppe]
Viktig differensiator: [hvorfor velge oss]

Lag:
- 5 title-varianter på norsk
- 5 meta descriptions på norsk
- Én anbefalt kombinasjon
- Kort forklaring på hvorfor den bør gi bedre CTR

Unngå overdrivelser. Ikke lov resultater vi ikke kan dokumentere.`,
  },
  {
    id: "faq-aeo",
    category: "faq",
    title: "Lag FAQ som svarmotorer forstår",
    description: "Gir tydelige spørsmål/svar som passer både mennesker og svarmotorer.",
    whenToUse: "Når siden bør svare bedre på konkrete spørsmål.",
    outputFormat: "8 FAQ-er med korte svar og forslag til plassering.",
    prompt: `Du er en rådgiver for tydelig nettsideinnhold.

Tema: [tema]
Side: [url]
Målgruppe: [målgruppe]
Vanlige spørsmål/søk: [liste]
Viktigste tjeneste/produkt: [tjeneste]

Lag 8 FAQ-spørsmål med korte, konkrete svar.
Krav:
- Svar direkte i første setning.
- Bruk enkelt språk.
- Marker hvor svaret bør plasseres på siden.
- Ikke finn på priser, regler eller fakta. Skriv [trenger kilde] der fakta må bekreftes.`,
  },
  {
    id: "geo-entity",
    category: "geo",
    title: "Styrk GEO: entitet, kilder og omtaler",
    description: "Prompt for å gjøre bedriften lettere å forstå og nevne i generative svarmotorer.",
    whenToUse: "Når bedriften ikke nevnes i AI-svar eller mangler eksterne signaler.",
    outputFormat: "Entitetsbeskrivelse, kildebehov, omtaleplan og sideendringer.",
    prompt: `Du er en rådgiver for GEO (Generative Engine Optimization).

Bedrift: [firmanavn]
Nettside: [domene]
Tjenester: [liste]
Geografi: [område]
Viktigste konkurrenter: [konkurrenter]
Eksisterende Om oss-tekst: [tekst]
Eksterne omtaler/kilder vi har: [liste]

Lag:
1. En tydelig entitetsbeskrivelse av bedriften.
2. Hvilke fakta som bør være konsekvente på nettside, Google Business Profile og eksterne profiler.
3. 5 relevante steder bedriften naturlig bør bli nevnt.
4. Forslag til Om oss-seksjon som styrker tillit uten å høres generisk ut.
5. Hvilke påstander som trenger kilder.

Ikke foreslå kjøpte lenker eller irrelevante kataloger.`,
  },
  {
    id: "ads-landing",
    category: "ads",
    title: "Forbedre landingsside for annonser",
    description: "Knytter annonsebudskap, søkeintensjon og CTA bedre sammen.",
    whenToUse: "Når CPA øker eller landingssiden ikke matcher annonsen.",
    outputFormat: "Hero, seksjoner, CTA, FAQ og testhypoteser.",
    prompt: `Du er en performance-rådgiver og landingsside-skribent.

Kampanje: [kampanjenavn]
Annonsetekst: [annonsetekst]
Landingsside: [url]
Mål: [lead/salg/booking]
Nåværende CPA/CVR: [tall]
Målgruppe: [målgruppe]

Lag forslag til:
- Hero-overskrift og undertekst som matcher annonsen.
- Én tydelig CTA.
- 3 seksjoner som fjerner friksjon.
- 5 FAQ-spørsmål.
- 3 A/B-testhypoteser.

Fokuser på å redusere CPA og øke riktig type henvendelser, ikke bare flere klikk.`,
  },
];

export const promptCategoryLabels: Record<PromptCategory, string> = {
  article: "Artikler",
  service_page: "Tjenestesider",
  product_description: "Produkttekster",
  meta: "Title/meta",
  faq: "FAQ / svar",
  geo: "GEO",
  ads: "Annonser",
};
