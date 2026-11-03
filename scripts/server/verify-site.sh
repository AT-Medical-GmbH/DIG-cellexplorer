#!/usr/bin/env bash
# Prüft von außen (ohne Anmeldung), dass die Anwendung NICHT für Gäste erreichbar ist
# und die Schutz-Header stimmen. Die Prüfung als angemeldeter Nutzer bleibt manuell
# (siehe docs/SERVER-BETRIEB.md, Abschnitt Abnahme).
set -euo pipefail
here="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=lib.sh
source "$here/scripts/server/lib.sh"
ce_load_config
site="${CE_SITE_URL:-}"; [ -n "$site" ] || ce_fail "CE_SITE_URL fehlt"
fail=0
check() {  # check <Pfad> <erwartete Codes, Leerzeichen getrennt>
  code="$(curl -s -o /dev/null -m 15 -w '%{http_code}' "$site$1" || echo 000)"
  case " $2 " in *" $code "*) echo "OK   $1 -> $code" ;; *) echo "FAIL $1 -> $code (erwartet: $2)"; fail=1 ;; esac
}
check "${CE_BASE_PATH}" "302 303 401 403"
check "${CE_BASE_PATH}index.html" "302 303 401 403"
check "${CE_BASE_PATH}models/animal-cell-nih.glb" "302 303 401 403 404"
check "/wp-content/atmed-private/cellexplorer/index.html" "403 404"
hdr="$(curl -s -I -m 15 "$site${CE_BASE_PATH}" || true)"
echo "$hdr" | grep -qi '^x-frame-options: deny' && { echo "FAIL X-Frame-Options: DENY gesetzt (iframe nicht möglich)"; fail=1; } || echo "OK   kein X-Frame-Options: DENY"
exit "$fail"
