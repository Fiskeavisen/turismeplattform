# Automatisk deploy fra GitHub til ProISP

Etter oppsett skjer alt automatisk når du pusher til `main`:

1. GitHub Actions bygger appen
2. Ferdig bygg pushes til `deploy`-grenen
3. GitHub logger inn på ProISP via SSH og oppdaterer `demo.frimedia.no`

Du trenger **ikke** kjøre `git pull` eller restart manuelt etter hver push.

---

## Én-gangs oppsett (ca. 5 min)

### 1. Finn SSH-verten til ProISP

I cPanel → **SSH Access** (eller spør ProISP). Typisk én av:

- `frimedia.no`
- `ssh.frimedia.no`
- `cpanel3.proisp.no`

Test fra PC:

```powershell
ssh frimeuhl@DIN-SSH-VERT
```

### 2. Opprett deploy-nøkkel for GitHub Actions

Kjør **på din PC** (PowerShell):

```powershell
cd "C:\Users\104745dati\OneDrive - Aschehoug\Skrivebord\Flo\turismeplattform"
ssh-keygen -t ed25519 -f .deploy/github_actions_deploy -N '""' -C "github-actions-turismeplattform"
```

### 3. Legg **offentlig** nøkkel på serveren

Vis nøkkelen:

```powershell
Get-Content .deploy/github_actions_deploy.pub
```

Logg inn på ProISP (SSH) **én siste gang** og lim inn:

```bash
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo "LIM_INN_OFFENTLIG_NOKKEL_HER" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 4. Bootstrap app-mappen på serveren (én gang)

På ProISP:

```bash
bash -s << 'EOF'
mkdir -p ~/demo.frimedia.no && cd ~/demo.frimedia.no
git init -b main
git remote add origin git@github.com:Fiskeavisen/turismeplattform.git 2>/dev/null || git remote set-url origin git@github.com:Fiskeavisen/turismeplattform.git
git fetch origin
git checkout -f -B deploy origin/deploy
cat > .env.local << 'ENVEOF'
NEXT_PUBLIC_SITE_URL=https://demo.frimedia.no
NEXT_PUBLIC_SUPABASE_URL=https://ppugutfpfygpimoniqxd.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_suH0x0Nx6mWnDIfIDN85nA_thrWbY-w
ENVEOF
EOF
```

(Svar ja på SSH-passordfrase hvis git spør.)

### 5. Legg hemmeligheter i GitHub

Kjør **på PC** (bytt `DIN-SSH-VERT`):

```powershell
gh secret set DEPLOY_HOST --body "DIN-SSH-VERT" --repo Fiskeavisen/turismeplattform
gh secret set DEPLOY_USER --body "frimeuhl" --repo Fiskeavisen/turismeplattform
gh secret set DEPLOY_PATH --body "/home/frimeuhl/demo.frimedia.no" --repo Fiskeavisen/turismeplattform
gh secret set DEPLOY_PORT --body "22" --repo Fiskeavisen/turismeplattform
Get-Content .deploy/github_actions_deploy | gh secret set DEPLOY_SSH_KEY --repo Fiskeavisen/turismeplattform
```

### 6. Test

Push til `main` eller kjør workflow manuelt:

**GitHub → Actions → «Bygg og deploy til demo.frimedia.no» → Run workflow**

Sjekk at deploy-steget blir grønt, deretter `https://demo.frimedia.no/`.

---

## Feilsøking

| Symptom | Løsning |
|---------|---------|
| Deploy-steget hoppes over | `DEPLOY_HOST` og `DEPLOY_SSH_KEY` mangler i GitHub Secrets |
| Permission denied (publickey) | Offentlig nøkkel ikke i `~/.ssh/authorized_keys` |
| 403 Forbidden på nettsiden | `.htaccess` mangler — deploy-grenen inkluderer den nå automatisk |
| git fetch feiler på server | Sjekk at serverens deploy key til GitHub fungerer (`ssh -T git@github.com`) |

---

## Hva skjer ved hver push

```
main (kode) → GitHub Actions bygger → deploy-gren → SSH til ProISP → restart
```

Samme mønster som dine andre sider — bare konfigurer secrets én gang.
