#!/usr/bin/env bash
# Legt den lokalen Medien-Tresor an (einmalig oder nach Änderung der Freigaben).
# Lädt die geprüften Dateien (SHA-256-geprüft durch prepare-assets.mjs) EINMAL aus der
# Upstream-Quelle und legt sie unter $CE_ASSET_VAULT ab. Danach baut der Server ohne
# Zugriff auf GitHub:  release.sh nutzt --from "$CE_ASSET_VAULT".
#
#   bash scripts/server/assets-vault-init.sh [cc0|nc]   (Standard: nc)
set -euo pipefail
here="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=lib.sh
source "$here/scripts/server/lib.sh"
ce_load_config
: "${CE_ASSET_VAULT:?CE_ASSET_VAULT fehlt}"
tier="${1:-nc}"
case "$tier" in cc0) flag=--cc0-only ;; nc) flag=--with-nc ;; *) ce_fail "Stufe: cc0 oder nc" ;; esac

tmp="$(mktemp -d "${TMPDIR:-/tmp}/ce-vault.XXXXXX")"
trap 'rm -rf "$tmp"' EXIT
ce_log "Hole Medien (Stufe $tier) …"
( cd "$here" && node scripts/prepare-assets.mjs "$flag" )   # schreibt nach public/, prüft SHA-256
mkdir -p "$CE_ASSET_VAULT/models" "$CE_ASSET_VAULT/nih-previews"
for f in "$here"/public/models/*.glb; do [ -e "$f" ] && cp -p "$f" "$CE_ASSET_VAULT/models/"; done
for f in "$here"/public/nih-previews/*.png; do [ -e "$f" ] && cp -p "$f" "$CE_ASSET_VAULT/nih-previews/"; done
( cd "$CE_ASSET_VAULT" && find . -type f ! -name SHA256SUMS -print0 | sort -z | xargs -0 sha256sum > SHA256SUMS )
ce_log "Tresor bereit: $CE_ASSET_VAULT"; cat "$CE_ASSET_VAULT/SHA256SUMS"
