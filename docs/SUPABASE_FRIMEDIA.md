# Fri Media AS – Supabase-oppsett

Prosjekt: **Fri Media AS**  
Org: **FRI MEDIA AS** (`gsrlwfdkcszutzeqldvw`)  
Project ref: **`ppugutfpfygpimoniqxd`**  
URL: `https://ppugutfpfygpimoniqxd.supabase.co`  
Region: eu-central-1

## Status

- Turisme-migrasjon er kjørt (`platform_foundation`)
- Demo-tenant er opprettet (`nordskjaer-feriesenter`)
- Tabeller: tenants, theme_settings, page_sections, activities, accommodations,
  articles, bookings, booking_messages, email_templates, faqs, reviews

## Miljøvariabler

Legg i `.env.local` (lokal) og på ProISP-server:

```env
NEXT_PUBLIC_SITE_URL=https://turisme.frimedia.no
NEXT_PUBLIC_SUPABASE_URL=https://ppugutfpfygpimoniqxd.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<hent fra Supabase Dashboard → Settings → API>
```

Publishable key finnes under **Project Settings → API** (bruk `sb_publishable_…`).

Service role key skal **kun** ligge på server, aldri i frontend.

## Auth-oppsett (gjør i Dashboard)

1. **Authentication → URL Configuration**
   - Site URL: `https://turisme.frimedia.no` (eller `http://localhost:3000` ved lokal test)
   - Redirect URLs:
     - `https://turisme.frimedia.no/auth/callback`
     - `http://localhost:3000/auth/callback`

2. **Authentication → Users → Add user**
   - Opprett Frimedia-bruker (e-post + passord) for innlogging på `/login`

3. **Authentication → Providers**
   - E-post/passord bør være aktivert

## Sikkerhet (senere)

Supabase advisor viser at admin-RLS-policies er brede (`authenticated` med `true`).
Det er OK for demo/internal portal, men bør strammes inn med roller i
`app_metadata` før produksjon med flere kunder.
