export type GlossaryTerm = {
  /** Forkortelse eller kortform, f.eks. "CTR". */
  term: string;
  /** Norsk navn, f.eks. "Klikkrate". */
  name: string;
  /** Én kort setning – brukes i tooltip. */
  short: string;
  /** Lengre forklaring – brukes på ordliste-siden. */
  long: string;
  /** Hva som regnes som bra / standard. */
  benchmark?: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "SEO",
    name: "Søkemotoroptimalisering",
    short: "Å gjøre nettsiden lettere å finne i Google uten å betale for annonser.",
    long: "SEO handler om å gjøre innholdet og siden din så tydelig og relevant at Google viser den høyere opp når folk søker. Bedre SEO gir mer gratis trafikk over tid.",
  },
  {
    term: "AEO",
    name: "Svaroptimalisering",
    short: "Å skrive innhold så tydelig at AI-tjenester (ChatGPT, Google AI) nevner deg i svarene.",
    long: "Stadig flere får svar direkte fra AI i stedet for å klikke seg rundt. AEO handler om å formulere innholdet ditt slik at slike svar plukker det opp og anbefaler bedriften din.",
  },
  {
    term: "CTR",
    name: "Klikkrate",
    short: "Andelen som klikker etter å ha sett deg. Klikk delt på visninger.",
    long: "CTR (Click-Through Rate) viser hvor mange som faktisk klikker når de ser deg i søkeresultatet eller i en annonse. Lav CTR med mange visninger betyr ofte at tittel eller beskrivelse ikke frister nok.",
    benchmark:
      "Organisk: topp 3 i Google har gjerne 15–30 %, mens plass 7–10 ofte ligger på 2–5 %. Søkeannonser: 2–5 % er vanlig.",
  },
  {
    term: "CTA",
    name: "Handlingsoppfordring",
    short: "Knappen eller lenken som forteller besøkende hva de skal gjøre, f.eks. «Bestill time».",
    long: "CTA (Call To Action) er det tydelige neste steget på en side – «Be om tilbud», «Ring oss», «Legg i kurv». Uten en klar CTA blir besøkende usikre på hva de skal gjøre.",
    benchmark: "Hver viktig side bør ha én tydelig, synlig CTA – ikke fem som konkurrerer.",
  },
  {
    term: "Visninger",
    name: "Visninger (impressions)",
    short: "Hvor mange ganger siden din ble vist i søk, før noen eventuelt klikket.",
    long: "Visninger forteller hvor ofte du dukker opp i søkeresultatene. Mange visninger men få klikk er et signal om at du er synlig, men ikke fristende nok å klikke på.",
  },
  {
    term: "Posisjon",
    name: "Gjennomsnittlig posisjon",
    short: "Hvor høyt opp du i snitt vises i Google-søk for et søkeord.",
    long: "Posisjon 1 er øverst. Jo lavere tall, jo høyere opp. Søk der du ligger på posisjon 4–10 er ofte de beste å forbedre – du er nesten på topp.",
    benchmark: "De tre øverste plassene får mesteparten av klikkene. Posisjon 4–10 er «nesten der».",
  },
  {
    term: "Konvertering",
    name: "Konvertering",
    short: "Når en besøkende gjør det du ønsker – kjøper, ringer eller sender en henvendelse.",
    long: "En konvertering er et målbart resultat: et salg, en utfylt kontaktskjema, en telefon. Det er dette synlighet til slutt skal føre til.",
  },
  {
    term: "Konverteringsrate",
    name: "Konverteringsrate",
    short: "Andelen besøkende som konverterer. Konverteringer delt på besøk.",
    long: "Konverteringsraten viser hvor effektiv siden er til å gjøre besøkende til kunder. Den påvirkes mest av innhold, tydelig CTA og tillit.",
    benchmark: "1–3 % er vanlig for mange nettsider. Nettbutikker ligger ofte litt lavere, tjenestesider litt høyere.",
  },
  {
    term: "CPC",
    name: "Kostnad per klikk",
    short: "Hva du i snitt betaler hver gang noen klikker på en annonse.",
    long: "CPC (Cost Per Click) er prisen per klikk i betalt annonsering. Den varierer mye med konkurranse og søkeord.",
  },
  {
    term: "CPA",
    name: "Kostnad per konvertering",
    short: "Hva det koster deg å få én konvertering (kunde eller henvendelse) via annonser.",
    long: "CPA (Cost Per Acquisition) er det viktigste tallet for lønnsomhet i annonsering: annonsekostnad delt på antall konverteringer. Stigende CPA betyr at du betaler mer for hver kunde.",
    benchmark: "En sunn CPA er lavere enn det en kunde er verdt for deg. Følg trenden – brå økning er et varsel.",
  },
  {
    term: "ROAS",
    name: "Avkastning på annonsekroner",
    short: "Inntekt delt på annonsekostnad. ROAS 4 betyr 4 kroner inn per krone brukt.",
    long: "ROAS (Return On Ad Spend) viser hvor mye du tjener per krone brukt på annonser. Den henger tett sammen med CPA og fortjenestemargin.",
    benchmark: "ROAS over 1 betyr at du tjener mer enn du bruker. Mange sikter mot 3–4x eller høyere.",
  },
  {
    term: "Kvalitetsscore",
    name: "Kvalitetsscore (Quality Score)",
    short: "Googles vurdering (1–10) av hvor relevant annonsen og landingssiden er.",
    long: "Kvalitetsscore påvirker både prisen din og hvor ofte annonsen vises. Bedre samsvar mellom søkeord, annonse og landingsside gir høyere score og lavere kostnad.",
    benchmark: "7–10 er bra. Under 5 betyr at du betaler mer enn nødvendig.",
  },
  {
    term: "Synlighetsscore",
    name: "Synlighetsscore",
    short: "Vår samlede score (0–100) for hvor lett bedriften din er å finne akkurat nå.",
    long: "Synlighetsscoren kombinerer flere signaler – posisjoner, klikk, innholdskvalitet og teknisk helse – til ett tall du kan følge over tid. Poenget er ikke tallet i seg selv, men retningen: stiger den når du gjør oppgavene?",
    benchmark: "70+ regnes som god synlighet. De fleste nye nettsider starter mellom 40 og 60.",
  },
];

export const glossaryMap: Record<string, GlossaryTerm> = Object.fromEntries(
  glossaryTerms.map((entry) => [entry.term.toLowerCase(), entry]),
);

export function getGlossaryTerm(term: string): GlossaryTerm | undefined {
  return glossaryMap[term.toLowerCase()];
}

export type ScoreBand = {
  label: string;
  tone: "weak" | "below" | "good" | "great" | "excellent";
  description: string;
};

export function getScoreBand(score: number): ScoreBand {
  if (score >= 90) {
    return { label: "Utmerket", tone: "excellent", description: "Blant de beste i nisjen. Hold på forspranget." };
  }
  if (score >= 75) {
    return { label: "Veldig god", tone: "great", description: "Solid synlighet. Finjuster og bygg videre." };
  }
  if (score >= 60) {
    return { label: "God", tone: "good", description: "Over standard. Noen tydelige muligheter igjen." };
  }
  if (score >= 40) {
    return { label: "Under middels", tone: "below", description: "Typisk startpunkt. Mye å hente på enkle grep." };
  }
  return { label: "Svak", tone: "weak", description: "Mye å hente. Start med de viktigste oppgavene." };
}

/** Generell forklaring av score-skalaen (0–100). */
export const scoreScaleExplainer =
  "Skalaen går fra 0 til 100. 70 eller mer regnes som god synlighet, og de fleste nye nettsider starter mellom 40 og 60. Det viktigste er at scoren stiger jevnt når du gjør oppgavene.";
