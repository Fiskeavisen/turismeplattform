# Innholdsmodell

Dette er første CMS-modell for turismeplattformen. Den finnes både som
TypeScript-typer i `src/lib/types.ts` og som Supabase-tabeller i
`supabase/migrations/0001_platform_foundation.sql`.

## Kjerne

- `tenants`: én kunde/nettside.
- `theme_settings`: logo, farger, fonter, mal og avrunding.
- `page_sections`: kontrollerte drag-and-drop-seksjoner på forsiden.
- `activities`: turer, aktiviteter, pakker og opplevelser.
- `accommodations`: hytter, rom og overnatting.
- `articles`: SEO/AEO-artikler og lokale guider.
- `faqs`: spørsmål og svar for søk, AI-svar og support.
- `reviews`: manuelle, Google- eller Trustpilot-baserte anmeldelser.
- `bookings`: bookinger og forespørsler.
- `booking_messages`: dialog knyttet til booking.
- `email_templates`: justerbare epostmaler.

## Språk

Kundetilpasset tekst lagres som lokaliserte felter:

- `nb`: norsk
- `en`: engelsk
- `de`: tysk

## Redigerbart design

Kunden skal kunne endre mye uten kode:

- Seksjonsrekkefølge.
- Synlighet per seksjon.
- Tittel, tekst, bilde og CTA.
- Designmal.
- Logo, farger, fonter og radius.

Dette gir fleksibilitet, men holder designet innenfor kontrollerte rammer.
