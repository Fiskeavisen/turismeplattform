# Produktspesifikasjon: Synlighetsassistenten

Synlighetsassistenten er en tiltaksbasert organisk synlighetsplattform for bedrifter. Produktet gjør Search Console, Analytics, nettsideinnhold og AI-analyse om til en kort ukentlig oppgaveliste.

## Posisjonering

Løftet er ikke bedre rangering eller automatisert SEO. Løftet er:

> Ikke SEO-rapporter. Bare ukens viktigste tiltak, basert på dine egne Google-data.

Produktet skal hjelpe bedrifter å forstå hva de bør gjøre denne uken, på hvilken URL, hvorfor det haster, og hvordan effekten måles etterpå.

## Målgruppe

- Små og mellomstore bedrifter som har organisk trafikk, men mangler prioritering.
- Byråer som vil levere mer konkrete tiltak enn PDF-rapporter.
- Kunder som ønsker at Fri Media eller en partner utfører tiltakene for dem.

## Hovedflater

- Offentlig forside
- Prisside
- Eksempelrapport
- Innlogging og organisasjoner
- Onboarding
- Kundedashboard
- Tiltaksliste og tiltaksdetaljer
- URL-/sideanalyse
- Søkeord og Search Console-data
- AEO / AI-synlighet
- Lokal synlighet
- Rapporter
- Integrasjoner
- Internt adminpanel

## Kjerneobjekt: tiltak

Et tiltak skal alltid være konkret og målbart. Det bør ha:

- URL
- kategori
- prioritet
- datagrunnlag
- funn
- anbefalt endring
- hvorfor det betyr noe
- estimert tid
- vanskelighetsgrad
- forventet effekt
- status
- før/etter-måling

Eksempel:

> Legg til prisseksjon på `/regnskapsforer-oslo` fordi siden får mange visninger for prisrelaterte søk, men ikke svarer tydelig på pris.

## Analyseprinsipp

AI skal ikke finne tiltak fra rådata alene. Systemet skal først bruke datamodeller og regelmotorer til å finne muligheter. AI brukes deretter til å forklare, formulere forslag, prioritere og kvalitetssjekke.

Standard pipeline:

1. Hent Search Console-data.
2. Hent GA4-data.
3. Crawl viktige sider.
4. Normaliser data.
5. Finn muligheter med regelmotor.
6. Score muligheter.
7. Shortlist 10-30 kandidater.
8. Berik shortlist med AI.
9. Kjør anti-generic quality gate.
10. Lag 3-5 tiltak.
11. Generer ukesrapport.

## Google-oppsett

Onboarding og integrasjonssiden skal ha en tydelig bruksguide for Google Search Console og Google Analytics 4.

Guiden skal forklare:

- hvorfor begge kildene trengs
- hvilken Google-konto kunden bør bruke
- hvilke properties som skal velges
- hva systemet henter fra Search Console
- hva systemet henter fra GA4
- vanlige feil når properties eller data ikke vises
- at systemet kun ber om lesetilgang

Search Console brukes til synlighet før klikket. GA4 brukes til verdi etter klikket. Tiltak skal prioriteres bedre når begge kilder er koblet.

## Søkeordovervåkning

Søkeordovervåkning skal støtte tiltak, ikke bli et separat rank tracking-dashboard.

MVP-en skal vise:

- monitorerte søkeord med posisjon, CTR, klikk, visninger og vinnerside
- alerts for nær topp 3, lav CTR, posisjonsfall, nye søk og feil URL
- keyword clusters etter intensjon og anbefalt sidetype
- konkurrent-/SERP-notater som peker på konkrete innholdshull
- neste handling per søkeord eller cluster

Inspirasjon kan hentes fra SEMrush-funksjoner som position tracking, keyword gap, SERP features og competitor overview, men produktets språk og prioritering skal fortsatt være handlingsorientert.

## Autoritet og eksterne signaler

Rapportene skal også kunne gi råd som ikke bare handler om å endre egen nettside:

- bli nevnt på relevante eksterne sider
- få ekte omtaler fra samarbeidspartnere, kunder, bransje- og lokalmiljø
- bruke ekspertprofiler som kilder i egne og eksterne saker
- lenke ut til troverdige kilder når siden omtaler regler, frister, definisjoner eller dokumentasjon

Dette skal ikke bli linkspam. Produktet skal advare mot kjøpte lenker, irrelevante kataloger og tilfeldig utgående lenking. Rådene skal være knyttet til tillit, etterprøvbarhet og reelle relasjoner.

## Beskrivelseskvalitet

Systemet skal finne sider som har for svake beskrivelser, spesielt:

- produktsider i Shopify/WooCommerce
- kategorisider og samlinger
- tjenestesider med generisk intro eller meta description
- artikler som mangler kort svar, målgruppe eller neste steg

Et funn skal vise hva som mangler, for eksempel målgruppe, bruksområde, spesifikasjoner, inkludert/ikke inkludert, FAQ, trust eller CTA. Tiltaket skal gi en konkret brief for hva teksten bør dekke, ikke bare si “skriv mer tekst”.

Dette er særlig viktig for nettbutikker, der mange produkter ofte har tynne, like eller leverandørkopierte beskrivelser.

## Pakker

Starter er for små bedrifter med ett nettsted og få ukentlige tiltak.

Growth er hovedpakken med WordPress/Shopify-kobling, AEO-score, lokal synlighet, før/etter-måling og rapport.

Pro / Agency er for flere nettsteder, white-label, konkurrentanalyse, AI-synlighetsmonitor og eksport/API.

Done-for-you er for kunder som ønsker at tiltakene utføres av leverandør etter godkjenning.

## Produktprinsipper

- Handling over rapport.
- Konkret over generisk.
- Måling over løfter.
- Kundens egne data over generelle SEO-råd.
- Shortlist over støy.
- AI som assistent, ikke sannhetsmaskin.
- Ingen autopublisering i CMS.
- Ikke skaler tynt innhold før data og differensiering støtter det.

## Demo-MVP

Første demo bruker mock-data for Regnskapspartner Oslo AS. Den skal vise:

- Dashboard med organisk score og ukens tiltak.
- Tiltak med prioritet, URL, anbefaling og datagrunnlag.
- Før/etter-måling.
- URL-score for SEO/AEO.
- Søkeord og Search Console-eksempler.
- Rapporter og admin-godkjenning.
- Integrasjonsstatus for Google, WordPress og Shopify.
