# Kundeonboarding Med AI

Målet er at en ny kunde kan legges inn på under en time: AI henter alt som
finnes om kunden fra eksisterende nettside og kilder, og fyller ut én
strukturert profil som resten av plattformen bygger på.

## Slik fungerer det

1. **AI fyller ut profilen.** Lim inn prompten under i en ny AI-økt sammen med
   kundens nettadresse. AI leser nettsiden og lager `customers/<slug>.json`.
2. **Vi kvalitetssikrer.** Sjekk priser, kontaktinfo, avtaler og det AI ikke
   fant: betalingsavtaler, Booking.com-status, bilder og logo.
3. **Profilen styrer skreddersøm.** Mal, farger, tone, produkter, FAQ,
   artikkelideer og integrasjoner leses fra profilen når siden bygges.

Schemaet ligger i `src/lib/customer-profile.ts`. Eksempel: `customers/nordskjaer.json`.

## Prompt-mal (kopier og lim inn)

```text
Vi skal sette opp en ny kunde i turismeplattformen.

Kunde: <NAVN>
Nettside: <URL>
Eventuelle andre kilder: <Google Maps-profil, Facebook, brosjyre osv.>

Gjør følgende:
1. Les kundens nettside og kildene over.
2. Fyll ut en komplett kundeprofil som JSON etter schemaet i
   src/lib/customer-profile.ts. Bruk customers/nordskjaer.json som referanse.
3. Hent ut: alle overnattingstyper, alle aktiviteter, priser, kontaktinfo,
   beliggenhet, reisevei, historie/fortelling, bildekreditering og det som
   gjør kunden unik (uniqueSellingPoints).
4. Skriv tagline og story i kundens egen tone, ikke generisk reklamespråk.
5. Foreslå mal (coastal, fjord eller premium) basert på kundens uttrykk,
   og begrunn valget kort i internalNotes.
6. Lag minst 5 artikkelideer og 5 SEO-nøkkelord basert på sted og produkt.
7. Lag FAQ basert på spørsmål gjester faktisk vil stille.
8. Marker alt du IKKE fant (betalingsavtaler, Booking.com-status, logo,
   GA/Search Console-tilgang) i internalNotes, så vi kan spørre kunden.
9. Lagre filen som customers/<slug>.json og valider mot schemaet.
```

## Sjekkliste etter AI-utfylling

Dette kan AI sjelden finne selv og må avklares med kunden:

- [ ] Logo i god kvalitet og originalbilder (fotograf/kreditering)
- [ ] Stripe-/Vipps-avtale eller ønske om kun forespørsel
- [ ] Booking.com / channel manager-status
- [ ] Tilgang til Google Analytics og Search Console
- [ ] Domenetilgang og DNS
- [ ] Priser og sesongregler
- [ ] Avbestillingsregler og vilkår

## Fra profil til ferdig side

Når profilen er godkjent:

1. Velg mal fra profilen (`brand.template`) og juster farger ved behov.
2. Generer demo-innhold/seed-data fra profilen (aktiviteter, hytter, FAQ,
   artikkelutkast på tre språk).
3. Sett opp integrasjoner etter `integrations`-blokken.
4. Kjør `docs/LAUNCH_CHECKLIST.md` før kunden får se siden.
