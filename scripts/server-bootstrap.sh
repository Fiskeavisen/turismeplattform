#!/bin/bash
# Én-gangs oppsett på ProISP (SSH). Etter dette tar GitHub Actions over.
set -euo pipefail

APP_DIR="${1:-/home/frimeuhl/demo.frimedia.no}"
REPO="git@github.com:Fiskeavisen/turismeplattform.git"

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -d .git ]; then
  git init -b main
  git remote add origin "$REPO" 2>/dev/null || git remote set-url origin "$REPO"
fi

git fetch origin
git checkout -f -B deploy origin/deploy 2>/dev/null || git checkout -f -B main origin/main

cat > .env.local << 'EOF'
NEXT_PUBLIC_SITE_URL=https://demo.frimedia.no
NEXT_PUBLIC_SUPABASE_URL=https://ppugutfpfygpimoniqxd.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_suH0x0Nx6mWnDIfIDN85nA_thrWbY-w
EOF

echo "Bootstrap ferdig i $APP_DIR"
echo "Legg GitHub Actions sin offentlige nøkkel i ~/.ssh/authorized_keys (se docs/AUTO_DEPLOY.md)"
