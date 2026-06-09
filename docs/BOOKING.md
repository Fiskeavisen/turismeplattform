# Bookinggrunnmur

Booking er bygget som et adapterlag, slik at hver kunde kan bruke riktig nivå
uten at resten av nettsiden bygges om.

## Støttede nivåer

- `internal`: intern booking/forespørsel i Supabase.
- `external-link`: send gjest til eksisterende bookingløsning.
- `channel-manager`: adapterpunkt for tredjepart som håndterer flere kanaler.
- `booking-com`: adapterpunkt for Booking.com når kunden har riktig tilgang.

## Betaling

Betaling kobles separat fra booking:

- `stripe`: kortbetaling via Stripe Checkout.
- `vipps`: klart adapterpunkt for Vipps/MobilePay.
- `manual`: faktura, forespørsel eller betaling utenfor systemet.

## Neste produksjonssteg

1. Lagre booking i Supabase.
2. Send bekreftelse via epostmal.
3. Oppdater status ved betaling.
4. Legg inn tilgjengelighetskalender.
5. Koble til channel manager der kunden har avtale.
