# Implementeringsplan: Synlighetsassistenten

Synlighetsassistenten bygges først som en demo-MVP med mock-data, slik at produktet kan vises på Fri Media før eget domene, database og Google-integrasjoner er ferdig koblet på.

## Testflate

Første versjon legges under `/synlighet` i eksisterende Fri Media-app. Det gjør at vi kan teste på `demo.frimedia.no/synlighet` uten å overta forsiden eller eksisterende `/admin`.

Senere kan samme app mappes til et eget subdomene, for eksempel `synlighet.frimedia.no`, med host-basert rewrite i `src/proxy.ts` eller et separat deploy-oppsett. Eget domene kan kobles på når DNS og hosting er klart.

## Fase 1: Foundation

- Dokumenter produkt, datamodell og arkitektur.
- Legg inn TypeScript-typer for organisasjoner, sites, tiltak, anbefalinger, målinger, rapporter og integrasjoner.
- Lag realistiske demo-data for Regnskapspartner Oslo AS.
- Bygg offentlig forside, prisside og eksempelrapport.
- Hold alt kjørbart uten eksterne API-nøkler.

## Fase 2: Demo kundepanel

- Bygg `/synlighet/app/dashboard` med handling først, ikke graf først.
- Bygg tiltaksliste og tiltaksdetalj med status, datagrunnlag, anbefaling, steg og før/etter-måling.
- Bygg sider/URL-analyse, søkeord, AEO/AI-synlighet, lokal synlighet, rapporter, integrasjoner og innstillinger med demo-data.
- Legg inn empty states og tydelige “mock mode”-signaler.

## Fase 3: Analysemodell

- Implementer modulær regelmotor som returnerer `Opportunity[]`.
- Start med regler for lav CTR, answer readiness, internlenking, trust, lokal synlighet og content gap.
- Score muligheter på potensial, verdi, tillit, enkelhet, vanskelighet og risiko.
- Kjør kvalitetssjekk før anbefalinger vises.

## Fase 4: AI

- Lag OpenAI-service med structured JSON-output.
- Bruk AI kun på shortlist av muligheter.
- Logg modell, tokens og estimert kostnad.
- Gi fallback-anbefalinger når `OPENAI_API_KEY` mangler.
- Ikke send secrets eller store rådatasett til AI.

## Fase 5: Google og crawler

- Legg service-lag for Google OAuth, Search Console og GA4.
- Bruk mock-data når miljøvariabler mangler eller `MOCK_MODE=true`.
- Lag enkel crawler med sitemap, topp-URL-er, rate limiting, timeout og HTML-ekstraksjon.
- Lag page snapshots for title, meta, H1, headings, canonical, robots, schema og lenker.

## Fase 6: Rapporter og admin

- Generer kort ukesrapport med 3-5 viktigste tiltak.
- Bygg adminflater for kunder, sites, rapportgodkjenning, AI-kostnader, integrasjonsfeil og QA.
- La rapporter ha status: `draft`, `needs_review`, `approved`, `sent`, `failed`.

## Fase 7: CMS-integrasjoner

- WordPress: test connection, les sider/innlegg og opprett utkast-stub.
- Shopify: test connection, les produkter, samlinger, sider og blogginnlegg.
- Ikke autopubliser. Alle CMS-endringer skal kreve eksplisitt godkjenning.

## Aksept for demo-MVP

- Appen kan kjøres lokalt og på Fri Media med mock-data.
- Brukeren ser konkrete ukentlige tiltak knyttet til URL, data og anbefalt endring.
- Tiltak kan markeres som utført og viser før/etter-måling.
- Rapport kan vises og godkjennes i admin.
- Integrasjoner viser status og tydelig hva som er klart, testet eller stubbet.
