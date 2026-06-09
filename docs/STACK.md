# Teknisk stack

## Valgt grunnmur

- **Frontend:** Next.js App Router, TypeScript og React.
- **Design:** Tailwind CSS med egne, gjenbrukbare komponenter.
- **Database og auth:** Supabase med RLS fra start.
- **Admin/CMS:** Egen admin bygget i Next.js, med Supabase som innholdslager.
- **Betaling:** Adapterlag for Stripe, Vipps/MobilePay og manuell betaling.
- **Booking:** Egen bookingmodell med mulighet for eksterne adaptere.
- **SEO/AEO:** Metadata, sitemap, robots, JSON-LD, FAQ og artikkelstruktur.
- **Deploy:** GitHub som kilde, deretter Vercel/Netlify eller egen Node-hosting.

## Hvorfor egen admin i stedet for Sanity/Payload nå

Planen nevnte headless CMS som mulig retning. For denne plattformen er egen admin
mer riktig som første grunnmur fordi vi trenger tett kobling mellom:

- Forsidebygger og designmaler.
- Booking og kundekommunikasjon.
- Betaling og bookingstatus.
- Statistikk, Search Console og AEO.
- Fremtidig multi-kunde/tenant-struktur.

Dette gjør at kundene kan endre innhold og design selv, mens vi beholder en
kontrollert blokkmodell som ikke ødelegger kvaliteten på sidene.

## Integrasjonsstrategi

Alle eksterne tjenester bør kobles via adaptere:

- `payments`: Stripe, Vipps og manuell betaling.
- `booking`: intern booking, ekstern lenke, channel manager og Booking.com.
- `analytics`: Google Analytics, Search Console og manuell demo-data.
- `reviews`: manuelle anmeldelser, Google og Trustpilot.

Adaptere gjør at nye kunder kan bruke ulike avtaler uten at produktet må bygges
om for hver leveranse.
