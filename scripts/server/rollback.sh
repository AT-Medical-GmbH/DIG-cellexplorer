#!/usr/bin/env bash
# Stellt einen archivierten Release wieder her.
#   bash scripts/server/rollback.sh            -> zeigt die verfügbaren Releases
#   bash scripts/server/rollback.sh <ID>       -> installiert Release <ID>
# Schnellster Notfall-Rückweg ohne Skript: Verzeichnis $CE_INSTALL_DIR umbenennen
# (die Route antwortet dann 404, der Menüpunkt verschwindet sofort).
set -euo pipefail
here="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=lib.sh
source "$here/scripts/server/lib.sh"
ce_load_config
: "${CE_INSTALL_DIR:?CE_INSTALL_DIR fehlt}"
if [ $# -eq 0 ]; then
  ce_log "Verfügbare Releases (neueste zuerst):"
  for d in $(ls -1dt "$CE_RELEASES_DIR"/*/ 2>/dev/null); do
    [ -f "$d/RELEASE.json" ] && printf '  %s  %s\n' "$(basename "$d")" "$(tr -d '\n ' < "$d/RELEASE.json" | cut -c1-120)"
  done
  exit 0
fi
id="$1"; case "$id" in *[!A-Za-z0-9TZ_-]*|"") ce_fail "Ungültige Release-ID" ;; esac
rel="$CE_RELEASES_DIR/$id"
[ -f "$rel/dist.tgz" ] || ce_fail "Release nicht gefunden: $id"
( cd "$rel" && sha256sum -c dist.tgz.sha256 >/dev/null ) || ce_fail "Prüfsumme des Archivs stimmt nicht"
parent="$(dirname "$CE_INSTALL_DIR")"; name="$(basename "$CE_INSTALL_DIR")"; stamp="$(date -u +%Y%m%dT%H%M%SZ)"
new="$parent/$name.new-$stamp"; prev="$parent/$name.prev-rollback-$stamp"
mkdir -p "$new"; tar -C "$new" -xzf "$rel/dist.tgz"
[ -f "$CE_INSTALL_DIR/.htaccess" ] && cp -p "$CE_INSTALL_DIR/.htaccess" "$new/.htaccess"
[ -d "$CE_INSTALL_DIR" ] && mv "$CE_INSTALL_DIR" "$prev"
mv "$new" "$CE_INSTALL_DIR"
ce_log "Zurückgestellt auf $id (bisherige Fassung: ${prev##*/})"
