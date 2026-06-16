# Google-oppsett for Synlighetsassistenten

Denne guiden forklarer hvordan en kunde kobler Google Search Console og Google Analytics 4 til Synlighetsassistenten.

## Hvorfor begge må kobles til

Search Console viser hva som skjer før klikket:

- søkeord
- URL-er
- klikk
- visninger
- CTR
- gjennomsnittlig posisjon

Google Analytics 4 viser hva som skjer etter klikket:

- sessions
- engagement
- konverteringer
- landingssider
- trafikkverdi

Systemet trenger begge for å prioritere tiltak etter synlighet og verdi.

## Før kunden starter

Kunden bør sjekke dette først:

- Google-kontoen har tilgang til riktig Search Console-property.
- Domenet er verifisert i Search Console.
- Google-kontoen har tilgang til riktig GA4-konto og property.
- GA4 har web stream for riktig domene.
- Viktige konverteringer er satt opp som key events i GA4.

## Koble Search Console

1. Gå til `Synlighet -> Integrasjoner`.
2. Velg `Google Search Console`.
3. Trykk `Koble til / test`.
4. Logg inn med Google-kontoen som har tilgang til domenet.
5. Godkjenn lesetilgang.
6. Velg riktig property.
7. Kjør test.

Foretrukket property er domain property, for eksempel `example.no`, fordi den dekker både `https`, `http`, `www` og subdomener. Hvis kunden kun har URL-prefix property, må den matche nettstedet som analyseres.

## Koble Google Analytics 4

1. Gå til `Synlighet -> Integrasjoner`.
2. Velg `Google Analytics 4`.
3. Trykk `Koble til / test`.
4. Logg inn med Google-kontoen som har GA4-tilgang.
5. Velg riktig konto, property og web stream.
6. Kontroller at systemet finner sessions og landingssider.
7. Marker hvilke konverteringer som skal telle som lead, kjøp, booking eller annen verdi.

## Feilsøking

Hvis Search Console-property ikke vises:

- Google-kontoen mangler tilgang.
- Domenet er ikke verifisert.
- Kunden er logget inn med feil Google-konto.
- Property er URL-prefix og matcher ikke domenet som er lagt inn.

Hvis Search Console viser null data:

- Property er nylig opprettet og har ikke historikk ennå.
- Feil variant av domenet er valgt.
- Nettstedet har lite eller ingen organisk synlighet i valgt periode.

Hvis GA4-property ikke vises:

- Google-kontoen mangler Analytics-tilgang.
- Kunden har tilgang til feil konto eller property.
- GA4 er ikke opprettet for nettstedet.

Hvis GA4 mangler konverteringer:

- Key events er ikke satt opp.
- Skjema, kjøp eller booking sender ikke events til GA4.
- Konverteringene finnes, men har andre event-navn enn forventet.

## Tilgangsprinsipp

Synlighetsassistenten skal kun be om lesetilgang til rapportdata. Systemet skal ikke:

- endre Google-kontoen
- endre GA4-oppsett
- endre Search Console-verifisering
- publisere eller slette data

## Intern sjekkliste

Før første rapport sendes:

- Search Console har minst 28 dager med data.
- GA4 henter landingssider og sessions.
- Minst én konvertering eller verdiindikator er valgt.
- Domenet i systemet matcher Google-property.
- Første crawl er kjørt.
- Første tiltak har både søkedata og sideanalyse som datagrunnlag.
