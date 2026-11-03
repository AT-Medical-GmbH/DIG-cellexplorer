#!/usr/bin/env bash
# Legt das Bare-Repository auf dem Server an und füllt es aus einem Git-Bundle oder aus GitHub.
#
#   bash scripts/server/repo-init.sh --bundle /pfad/dig-cellexplorer-2026-11-03.bundle
#   bash scripts/server/repo-init.sh --from-github https://github.com/AT-Medical-GmbH/DIG-cellexplorer.git
#
# Verändert nichts an GitHub. Bricht ab, wenn $CE_REPO_DIR schon existiert (kein Überschreiben).
# Danach: main = Arbeitszweig (Schnellvorlauf), Löschen und Überschreiben von Verlauf ist gesperrt.
set -euo pipefail
here="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=lib.sh
source "$here/scripts/server/lib.sh"
ce_load_config
mode=""; src=""
while [ $# -gt 0 ]; do
  case "$1" in
    --bundle) mode=bundle; src="${2:-}"; shift 2 ;;
    --from-github) mode=github; src="${2:-}"; shift 2 ;;
    *) ce_fail "Unbekannte Option: $1" ;;
  esac
done
[ -n "$mode" ] && [ -n "$src" ] || ce_fail "Quelle fehlt (--bundle DATEI oder --from-github URL)"
[ ! -e "$CE_REPO_DIR" ] || ce_fail "$CE_REPO_DIR existiert bereits – nichts überschrieben"
work_branch="claude/dig-cellexplorer-init-i1f8al"

mkdir -p "$(dirname "$CE_REPO_DIR")"
if [ "$mode" = bundle ]; then
  [ -r "$src" ] || ce_fail "Bundle nicht lesbar: $src"
  if [ -r "$src.sha256" ]; then ( cd "$(dirname "$src")" && sha256sum -c "$(basename "$src").sha256" ) || ce_fail "Prüfsumme stimmt nicht"; fi
  git bundle verify "$src" >/dev/null || ce_fail "Bundle ungültig"
  git init -q --bare "$CE_REPO_DIR"
  git -C "$CE_REPO_DIR" fetch -q "$src" '+refs/heads/*:refs/heads/*'
else
  case "$src" in https://*) ;; *) ce_fail "Nur https-Adressen" ;; esac
  git clone -q --mirror "$src" "$CE_REPO_DIR"
fi
git -C "$CE_REPO_DIR" rev-parse --verify "refs/heads/$work_branch" >/dev/null || ce_fail "Arbeitszweig fehlt im Verlauf"
# main auf den Arbeitszweig setzen, nur wenn main ein Vorfahre ist (Schnellvorlauf)
if git -C "$CE_REPO_DIR" merge-base --is-ancestor refs/heads/main "refs/heads/$work_branch"; then
  git -C "$CE_REPO_DIR" update-ref refs/heads/main "refs/heads/$work_branch"
else
  ce_log "WARNUNG: main ist kein Vorfahre des Arbeitszweigs – main bleibt unverändert, bitte prüfen"
fi
git -C "$CE_REPO_DIR" symbolic-ref HEAD refs/heads/main
git -C "$CE_REPO_DIR" config receive.denyNonFastForwards true
git -C "$CE_REPO_DIR" config receive.denyDeletes true
git -C "$CE_REPO_DIR" fsck --no-dangling 2>&1 | tail -2 || true
ce_log "Repository bereit: $CE_REPO_DIR"
git -C "$CE_REPO_DIR" for-each-ref --format='  %(refname:short) %(objectname:short)' refs/heads
