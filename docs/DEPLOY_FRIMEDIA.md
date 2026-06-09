# Deploy på frimedia.no (ProISP)

Anbefalt adresse: **`https://turisme.frimedia.no`** (subdomene) eller
**`https://demo.frimedia.no`**.

## Oversikt

1. Push kode til GitHub.
2. Opprett eget Supabase-prosjekt for turismeplattformen (ikke del med andre apper).
3. Sett miljøvariabler på serveren.
4. Bygg og start med PM2.
5. Pek nginx/subdomene mot port 3000.
6. Opprett første bruker i Supabase Auth.

## Viktig om Supabase

Bruk et **eget, tomt** Supabase-prosjekt for turismeplattformen. Ikke legg
turismetabellene inn i et eksisterende produksjonsprosjekt med andre tabeller.

Etter nytt prosjekt:

1. Kopier **Project URL** og **publishable key** (anon eller `sb_publishable_…`).
2. Kjør migrasjonen i `supabase/migrations/0001_platform_foundation.sql`
   via Supabase SQL Editor eller CLI.
3. Under **Authentication → URL Configuration**, sett:
   - Site URL: `https://turisme.frimedia.no`
   - Redirect URLs: `https://turisme.frimedia.no/auth/callback`
4. Under **Authentication → Users**, opprett første innloggingsbruker for Frimedia.

## Miljøvariabler på serveren

Opprett `.env.local` i prosjektmappen (aldri commit denne filen):

```env
NEXT_PUBLIC_SITE_URL=https://turisme.frimedia.no
NEXT_PUBLIC_SUPABASE_URL=https://DITT-PROSJEKT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=...kun på server, aldri i frontend...
```

## Automatisk deploy (anbefalt)

Se **`docs/AUTO_DEPLOY.md`** — etter én-gangs oppsett deployer GitHub Actions
automatisk til `demo.frimedia.no` hver gang du pusher til `main`. Du trenger ikke
kjøre SSH-kommandoer manuelt ved hver oppdatering.

## Manuelle steg (kun første gang / feilsøking)

```bash
# 1. Gå til web-root eller egen mappe
cd ~/domains/frimedia.no  # tilpass sti etter ProISP-oppsett

# 2. Klon repo (bytt ut med deres GitHub-URL)
git clone https://github.com/DITT-ORG/turismeplattform.git
cd turismeplattform

# 3. Node-versjon (trenger 20+)
node -v

# 4. Installer og bygg
npm ci
npm run build

# 5. Start med PM2
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # følg instruksjonene PM2 skriver ut
```

## Oppdatering etter ny kode på GitHub

```bash
cd ~/domains/frimedia.no/turismeplattform
git pull
npm ci
npm run build
pm2 restart turismeplattform
```

## Nginx (subdomene turisme.frimedia.no)

Eksempel server-blokk (tilpass sti og SSL):

```nginx
server {
    listen 443 ssl http2;
    server_name turisme.frimedia.no;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

SSL kan ofte settes opp via ProISP/cPanel (Let's Encrypt).

## Hva du får etter deploy

| URL | Beskrivelse |
|-----|-------------|
| `/` | Nordskjær-demo (offentlig) |
| `/login` | Innlogging |
| `/portal` | Hub – krever innlogging |
| `/admin` | Admin-demo – krever innlogging |
| `/maler` | Designmaler |
| `/pakker` | Salgspakker |

## Feilsøking

- **Blank side / 502:** Sjekk `pm2 logs turismeplattform` og at port 3000 kjører.
- **Innlogging feiler:** Sjekk Supabase URL + key og redirect URL i Supabase Dashboard.
- **Admin redirecter til login:** Brukeren finnes ikke eller feil passord – opprett bruker i Supabase.
- **Build feiler på server:** Sjekk Node-versjon (`node -v` ≥ 20).
