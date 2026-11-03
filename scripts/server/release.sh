#!/usr/bin/env bash
# Baut und installiert einen Cell-Explorer-Release auf dem eigenen Server.
#
#   bash scripts/server/release.sh [REF] [--no-install]
#
#   REF            Branch, Tag oder Commit im Repository $CE_REPO_DIR (Standard: main)
#   --no-install   nur bauen, prüfen und archivieren; nicht nach $CE_INSTALL_DIR kopieren
#
# Ablauf: sauberer Export von REF -> Prüfungen (ci-local.sh) -> Medien aus dem Tresor ->
# Build für den Unterpfad -> Inhaltsprüfung von dist/ -> RELEASE.json -> Archiv ->
# Installation mit Rückweg (vorherige Fassung bleibt als Verzeichnis erhalten).
# Es wird nichts gelöscht, was nicht von diesem Skript selbst angelegt wurde.
set -euo pipefail
here="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=lib.sh
source "$here/scripts/server/lib.sh"

ref="main"; install=1
for a in "$@"; do
  case "$a" in
    --no-install) install=0 ;;
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    -*) ce_fail "Unbekannte Option: $a" ;;
    *) ref="$a" ;;
  esac
done
case "$ref" in *[!A-Za-z0-9._/@-]*|"") ce_fail "Ungültiger Ref: $ref" ;; esac

ce_load_config
: "${CE_ASSET_VAULT:?CE_ASSET_VAULT fehlt}"
[ "$install" = 1 ] && : "${CE_INSTALL_DIR:?CE_INSTALL_DIR fehlt (oder --no-install nutzen)}"
[ -d "$CE_ASSET_VAULT/models" ] || ce_fail "Medien-Tresor fehlt: erst scripts/server/assets-vault-init.sh ausführen"

mkdir -p "$CE_WORK_DIR" "$CE_RELEASES_DIR"
exec 9>"$CE_WORK_DIR/.release.lock"
flock -n 9 || ce_fail "Ein anderer Release läuft bereits"

commit="$(git -C "$CE_REPO_DIR" rev-parse --verify "$ref^{commit}")" || ce_fail "Ref nicht gefunden: $ref"
id="$(date -u +%Y%m%dT%H%M%SZ)-${commit:0:8}"
build="$CE_WORK_DIR/build-$id"
ce_log "Release $id (Ref $ref, Stufe $CE_ASSET_TIER)"
mkdir -p "$build"
cleanup() { rm -rf "$build"; }
trap cleanup EXIT

# 1. Sauberer Export genau dieses Commits (kein Arbeitsverzeichnis-Zustand).
git -C "$CE_REPO_DIR" archive "$commit" | tar -x -C "$build"
# ci-local.sh nutzt `git ls-files`; dafür ein Wegwerf-Repository mit dem Export anlegen.
( cd "$build" && git init -q && git add -A >/dev/null 2>&1 && \
  git -c user.name=release -c user.email=release@localhost commit -q -m "export $commit" )

# 2. Prüfungen
( cd "$build" && bash scripts/server/ci-local.sh )

# 3. Medien aus dem lokalen Tresor (SHA-256-geprüft, kein Netzzugriff auf GitHub)
flag=--cc0-only; [ "$CE_ASSET_TIER" = nc ] && flag=--with-nc
( cd "$build" && node scripts/prepare-assets.mjs "$flag" --from "$CE_ASSET_VAULT" )

# 4. Build für den Unterpfad
( cd "$build" && VITE_BASE_PATH="$CE_BASE_PATH" npm run build )

# 5. Inhaltsprüfung von dist/: nur freigegebene Medien dürfen enthalten sein
allowed_models="bacteria-wall-nih.glb"; allowed_prev="bacteria-wall-nih.png"
if [ "$CE_ASSET_TIER" = nc ]; then
  allowed_models="$allowed_models animal-cell-nih.glb neuron-nih.glb"
  allowed_prev="$allowed_prev animal-cell-nih.png neuron-nih.png"
fi
dist="$build/dist"
[ -f "$dist/index.html" ] || ce_fail "dist/index.html fehlt"
grep -q "${CE_BASE_PATH}assets/" "$dist/index.html" || ce_fail "index.html verweist nicht auf ${CE_BASE_PATH}assets/ (falscher Basispfad?)"
bad=0
check_dir() {  # check_dir <Verzeichnis> <erlaubte Dateien>
  local d="$1"; shift
  [ -d "$dist/$d" ] || return 0
  while IFS= read -r f; do
    b="$(basename "$f")"; [ "$b" = README.md ] && continue
    case " $* " in *" $b "*) ;; *) echo "Nicht freigegeben: $d/$b" >&2; bad=1 ;; esac
  done < <(find "$dist/$d" -type f)
}
check_dir models $allowed_models
check_dir nih-previews $allowed_prev
for d in cell-renders cell-renders-transparent texture-references media; do
  [ -d "$dist/$d" ] || continue
  extra="$(find "$dist/$d" -type f ! -name README.md | head -3)"
  [ -z "$extra" ] || { echo "Nicht freigegeben in $d/: $extra" >&2; bad=1; }
done
[ "$bad" = 0 ] || ce_fail "dist/ enthält nicht freigegebene Dateien – Abbruch, nichts installiert"

# 6. Release-Beschreibung
node -e '
const fs=require("fs");
const [dist, id, commit, ref, tier, base]=process.argv.slice(1);
fs.writeFileSync(dist+"/RELEASE.json", JSON.stringify({release:id,commit,ref,assetTier:tier,basePath:base,builtAt:new Date().toISOString(),node:process.version},null,2)+"\n");
' "$dist" "$id" "$commit" "$ref" "$CE_ASSET_TIER" "$CE_BASE_PATH"

# 7. Archiv für den Rückweg
rel="$CE_RELEASES_DIR/$id"; mkdir -p "$rel"
tar -C "$dist" -czf "$rel/dist.tgz" .
( cd "$rel" && sha256sum dist.tgz > dist.tgz.sha256 )
cp "$dist/RELEASE.json" "$rel/RELEASE.json"
ce_log "Archiviert: $rel"

if [ "$install" = 0 ]; then ce_log "Fertig (ohne Installation)."; exit 0; fi

# 8. Installation: neue Fassung neben die alte, dann umbenennen (kurzes Zeitfenster, kein Löschen)
parent="$(dirname "$CE_INSTALL_DIR")"; name="$(basename "$CE_INSTALL_DIR")"
[ -d "$parent" ] || ce_fail "Zielverzeichnis fehlt: $parent"
new="$parent/$name.new-$id"; prev="$parent/$name.prev-$id"
mkdir -p "$new"; tar -C "$new" -xzf "$rel/dist.tgz"
[ -f "$new/index.html" ] || ce_fail "Entpacken fehlgeschlagen"
[ -f "$CE_INSTALL_DIR/.htaccess" ] && cp -p "$CE_INSTALL_DIR/.htaccess" "$new/.htaccess"   # Zugriffssperre erhalten
if [ -d "$CE_INSTALL_DIR" ]; then mv "$CE_INSTALL_DIR" "$prev"; fi
mv "$new" "$CE_INSTALL_DIR"
ce_log "Installiert: $CE_INSTALL_DIR (vorherige Fassung: ${prev##*/})"

# 9. Alte vorherige Fassungen und Archive begrenzen (nur Verzeichnisse mit diesem Namensmuster)
ls -1dt "$parent/$name.prev-"* 2>/dev/null | tail -n +$((CE_KEEP_RELEASES + 1)) | while read -r old; do
  case "$old" in "$parent/$name.prev-"*) rm -rf -- "$old" ;; esac
done
ls -1dt "$CE_RELEASES_DIR"/*/ 2>/dev/null | tail -n +$((CE_KEEP_RELEASES + 1)) | while read -r old; do
  [ -f "$old/dist.tgz" ] && rm -rf -- "$old"
done
ce_log "Fertig. Prüfen: bash scripts/server/verify-site.sh"
