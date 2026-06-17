#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE="$ROOT/site"
VERSION="${1:?Usage: stage-site.sh <cache-version>}"

if sed --version >/dev/null 2>&1; then
  sed_inplace() { sed -i "$@"; }
else
  sed_inplace() { sed -i '' "$@"; }
fi

rm -rf "$SITE"
mkdir -p "$SITE"

cp "$ROOT/index.html" "$ROOT/favicon.ico" "$ROOT/robots.txt" "$ROOT/sitemap.xml" "$SITE/"
cp -r "$ROOT/assets" "$SITE/"
cp "$ROOT/.nojekyll" "$SITE/"

cache_bust() {
  local asset="$1"
  local query="${asset}?v=${VERSION}"

  sed_inplace \
    -e "s|href=\"${asset}\"|href=\"${query}\"|g" \
    -e "s|src=\"${asset}\"|src=\"${query}\"|g" \
    "$SITE/index.html"
}

for asset in \
  "./assets/css/style.css" \
  "./assets/js/script.js" \
  "./favicon.ico" \
  "./assets/images/logo.svg" \
  "./assets/images/logo.png" \
  "./assets/images/favicon-48x48.png" \
  "./assets/images/apple-touch-icon.png" \
  "./assets/images/profile.jpeg"
do
  cache_bust "$asset"
done

for ext in jpg jpeg png; do
  sed_inplace "s|\\(\\./assets/images/[^\"]*\\.${ext}\\)\"|\\1?v=${VERSION}\"|g" "$SITE/index.html"
done

echo "Staged site with cache version: ${VERSION}"
