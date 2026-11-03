#!/usr/bin/env bash
# Prüfungen wie in .github/workflows/ci.yml, aber ohne GitHub Actions.
# Aufruf im Projektverzeichnis:  bash scripts/server/ci-local.sh
set -euo pipefail
cd "$(dirname "$0")/../.."

echo "== Abhängigkeiten (npm ci)"
npm ci --no-audit --no-fund

echo "== Typprüfung und Build (Wurzelpfad)"
npm run build

echo "== Tests"
npm test

echo "== Wächter: keine ungeprüften Medien im Repository"
tracked="$(git ls-files \
  'public/models/*' 'public/cell-renders/*' 'public/cell-renders-transparent/*' \
  'public/texture-references/*' 'docs/media/*' \
  'public/nih-previews/animal-cell-nih.png' 'public/nih-previews/neuron-nih.png' \
  2>/dev/null | grep -v '/README\.md$' || true)"
if [ -n "$tracked" ]; then
  echo "FEHLER: ungeprüfte Medien sind versioniert (siehe docs/ASSET_REVIEW.md):" >&2
  echo "$tracked" >&2
  exit 1
fi

echo "== Wächter: Lizenz und Herkunftsvermerk"
grep -q "Copyright (c) 2026 cclank" LICENSE
grep -q "cclank/cell-architecture-studio" docs/THIRD_PARTY_NOTICES.md

echo "OK: alle Prüfungen bestanden."
