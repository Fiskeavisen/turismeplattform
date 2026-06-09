#!/bin/bash
# Kjøres automatisk av GitHub Actions etter hvert vellykket bygg.
set -euo pipefail

APP_DIR="${DEPLOY_PATH:-/home/frimeuhl/demo.frimedia.no}"
APP_USER="${DEPLOY_USER:-frimeuhl}"
APP_ROOT="${APP_ROOT:-demo.frimedia.no}"

cd "$APP_DIR"

if [ ! -d .git ]; then
  echo "FEIL: $APP_DIR er ikke et git-repo. Kjør server-bootstrap.sh én gang."
  exit 1
fi

git fetch origin deploy
git checkout -f -B deploy origin/deploy

mkdir -p tmp
touch tmp/restart.txt

if command -v cloudlinux-selector >/dev/null 2>&1; then
  cloudlinux-selector restart --json --interpreter nodejs --user "$APP_USER" --app-root "$APP_ROOT" || true
fi

echo "Deploy ferdig: $(git rev-parse --short HEAD)"
