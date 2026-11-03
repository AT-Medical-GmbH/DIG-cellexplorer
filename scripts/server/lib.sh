#!/usr/bin/env bash
# Gemeinsame Funktionen der Server-Skripte. Wird per `source` geladen.
set -euo pipefail

ce_log()  { printf '%s [cell-explorer] %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$*"; }
ce_fail() { ce_log "FEHLER: $*" >&2; exit 1; }

# Konfiguration: Umgebungsvariablen haben Vorrang vor der Datei.
ce_load_config() {
  local file="${CE_ENV_FILE:-}"
  if [ -z "$file" ]; then
    for c in /etc/atmed/cell-explorer.env "$HOME/.cell-explorer.env"; do
      [ -r "$c" ] && { file="$c"; break; }
    done
  fi
  if [ -n "$file" ]; then
    [ -r "$file" ] || ce_fail "Konfigurationsdatei nicht lesbar: $file"
    # Nur KEY=VALUE-Zeilen übernehmen, bereits gesetzte Variablen nicht überschreiben.
    while IFS='=' read -r key value; do
      value="${value%%#*}"
      value="${value%"${value##*[![:space:]]}"}"
      case "$key" in CE_*) [ -n "${!key:-}" ] || export "$key=$value" ;; esac
    done < <(grep -E '^CE_[A-Z_]+=' "$file" | sed -E 's/[[:space:]]+$//')
  fi
  : "${CE_REPO_DIR:?CE_REPO_DIR fehlt}" "${CE_WORK_DIR:?CE_WORK_DIR fehlt}" "${CE_RELEASES_DIR:?CE_RELEASES_DIR fehlt}"
  CE_ASSET_TIER="${CE_ASSET_TIER:-cc0}"
  CE_BASE_PATH="${CE_BASE_PATH:-/cellexplorer/}"
  CE_KEEP_RELEASES="${CE_KEEP_RELEASES:-5}"
  # Pfade und Werte, die später in Shell-Kommandos landen, streng prüfen.
  case "$CE_ASSET_TIER" in cc0|nc) ;; *) ce_fail "CE_ASSET_TIER muss cc0 oder nc sein" ;; esac
  case "$CE_BASE_PATH" in /*/) ;; *) ce_fail "CE_BASE_PATH muss mit / beginnen und enden" ;; esac
  for v in CE_REPO_DIR CE_WORK_DIR CE_RELEASES_DIR CE_ASSET_VAULT CE_INSTALL_DIR; do
    val="${!v:-}"
    [ -z "$val" ] && continue
    case "$val" in /*) ;; *) ce_fail "$v muss ein absoluter Pfad sein" ;; esac
    case "$val" in *..*|*" "*) ce_fail "$v enthält unzulässige Zeichen" ;; esac
  done
  export CE_ASSET_TIER CE_BASE_PATH CE_KEEP_RELEASES
}
