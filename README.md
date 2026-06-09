# Turismeplattform

Gjenbrukbar grunnmur for moderne turistsider bygget med Next.js, TypeScript,
Tailwind og Supabase-struktur. Første demo bruker Flø som pilot, slik at
løsningen kan selges til feriesentre, hytteutleie, aktivitetsselskaper og
destinasjonsaktører.

## Hva som finnes nå

- Moderne demoforside med bookingmodul, aktiviteter, overnatting, artikler,
  anmeldelser, språk og AEO/statistikk.
- Admin-demo for seksjonsbygger, designmaler, bookinger, trafikkilder,
  AEO-score og epostmaler.
- Datamodeller for tre språk: norsk, engelsk og tysk.
- Betalingsadapter for Stripe, Vipps og manuell betaling.
- Booking-API med Zod-validering.
- Supabase SSR-klienter og proxy for auth/session-refresh.
- Supabase-migrasjon for tenants, tema, seksjoner, aktiviteter, overnatting,
  artikler, bookinger, meldinger og epostmaler.
- Kundeprofil-schema (`src/lib/customer-profile.ts`) og AI-onboarding av nye
  kunder fra eksisterende nettside, se `docs/CUSTOMER_ONBOARDING.md`.
- Tre designmaler som ekte design-tokens (`src/lib/themes.ts`) med
  forhåndsvisning på `/maler`.

## Kommandoer

```bash
npm run dev
npm run lint
npm run build
```

## Produktretning

Plattformen skal gjøre det mulig å levere nye turistnettsider raskt uten at vi
må gjøre alle småendringer selv. Kunden skal kunne styre:

- Farger, fonter, logo og bilder.
- Forsideseksjoner som kan flyttes, skjules og legges til.
- Aktiviteter, overnatting, artikler og praktisk informasjon.
- Epostmaler og bookingkommunikasjon.
- Språkinnhold på norsk, engelsk og tysk.

## Betaling og booking

Bookingflyten er laget med adaptertankegang:

- `stripe`: klar for Stripe Checkout når nøkler er lagt i miljøvariabler.
- `vipps`: adapterpunkt for Vipps/MobilePay ePayment når kunde har avtale.
- `manual`: forespørsel, faktura eller betaling utenfor systemet.

Neste steg er å lagre bookinger i Supabase og koble statusendringer mot epost.

## Supabase

Migrasjonen ligger i `supabase/migrations/0001_platform_foundation.sql`.
Alle offentlige tabeller har RLS aktivert. Før produksjon må policyene strammes
inn mot reelle roller og tenant-tilgang.

## Deploy på frimedia.no

Se [docs/DEPLOY_FRIMEDIA.md](docs/DEPLOY_FRIMEDIA.md) for ProISP-oppsett med PM2,
nginx og Supabase Auth.

Etter deploy:

- `/login` – innlogging
- `/portal` – hub for demo-sider og admin (krever innlogging)
- `/admin` – adminpanel (krever innlogging)

## Kjent punkt

`npm audit` rapporterer en moderat PostCSS-advarsel via `next@16.2.8`. Automatisk
fix vil per nå installere `next@16.3.0-preview.0`, som feilet på Windows med SWC.
Prosjektet er derfor låst til fungerende `next@16.2.8` inntil Next publiserer en
stabil patch uten dette problemet.
