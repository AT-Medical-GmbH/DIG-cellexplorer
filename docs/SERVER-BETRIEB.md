# Cell Explorer auf den eigenen Servern von AT Medical

Stand 2026-11-03. Zweck: Das Projekt wird von GitHub auf die eigenen Server übernommen, dort gebaut,
produktiv gestellt und als Grundlage für die automatisierte Erstellung weiterer Karten und Inhalte genutzt.
**Vorschlag und Betriebsanleitung; Pfade und Hostwahl sind vom Betreiber zu bestätigen.**

## 1. Ausgangslage

| Thema | Stand |
| --- | --- |
| Code und Verlauf | GitHub `AT-Medical-GmbH/DIG-cellexplorer`. Die Arbeit liegt auf dem Zweig `claude/dig-cellexplorer-init-i1f8al`, `main` steht noch auf `19ec0b6`. |
| CI | GitHub Actions ist wegen der Abrechnungssperre der Organisation nicht nutzbar. Ersatz: `scripts/server/ci-local.sh`. |
| Medien | Nicht im Repository. `scripts/prepare-assets.mjs` holt geprüfte Dateien aus `raw.githubusercontent.com` (Upstream, SHA-256-geprüft). Für den Serverbetrieb: einmal holen, dann aus dem lokalen Tresor bauen (`--from`). |
| Abhängigkeiten | `npm ci` braucht die npm-Registry (nicht GitHub). Optional später ein lokaler Cache/Spiegel. |
| Auslieferung | WordPress (`ATMED-wordpress`, MU-Plugin `atmed-cellexplorer.php`) liefert `wp-content/atmed-private/cellexplorer/` nur an angemeldete Nutzer. |
| Tracker | Issues #3–#10 und PRs: gesichert in `docs/migration/GITHUB-EXPORT-2026-11-03.md`. |

## 2. Zielbild

```
Entwickler / Claude-Sitzungen ──push──▶ Git-Repository auf dem Server (Quelle der Wahrheit)
                                              │
                          scripts/server/release.sh <ref>
                                              │  1 sauberer Export des Commits
                                              │  2 ci-local.sh (Typprüfung, Build, Tests, Wächter)
                                              │  3 Medien aus dem Tresor (SHA-256, ohne GitHub)
                                              │  4 Build für /cellexplorer/
                                              │  5 Inhaltsprüfung von dist/ (nur freigegebene Medien)
                                              │  6 Archiv + RELEASE.json, 7 Installation mit Rückweg
                                              ▼
              wp-content/atmed-private/cellexplorer/  ──▶ MU-Plugin ──▶ nur angemeldete Nutzer
```

Empfohlene Verzeichnisse auf dem Host (Vorschlag, passend zu `/srv/atmed/projekte/…`):

| Zweck | Pfad |
| --- | --- |
| Repository | `/srv/atmed/projekte/cell-explorer/repo.git` |
| Build-Arbeitsordner (flüchtig) | `/srv/atmed/projekte/cell-explorer/work` |
| Archivierte Releases (Rückweg) | `/srv/atmed/projekte/cell-explorer/releases` |
| Medien-Tresor | `/srv/atmed/projekte/cell-explorer/assets-vault` |
| Installationsziel | `/srv/atmed/stacks/wordpress/wordpress/wp-content/atmed-private/cellexplorer` |

Konfiguration: `scripts/server/release.env.example` nach `/etc/atmed/cell-explorer.env` kopieren (enthält keine Geheimnisse).

## 3. Umzugsplan (nichts wird gelöscht; GitHub bleibt bis zu einer ausdrücklichen Entscheidung unverändert)

| # | Schritt | Prüfpunkt |
| --- | --- | --- |
| 1 | Bare-Repository anlegen und füllen: `bash scripts/server/repo-init.sh --bundle dig-cellexplorer-2026-11-03.bundle` (oder `--from-github <https-Adresse>`); setzt `main` auf den Arbeitszweig und sperrt Löschen und Überschreiben von Verlauf | `git -C repo.git branch -a` zeigt `main` und `claude/dig-cellexplorer-init-i1f8al`; `git fsck` ohne Fehler |
| 2 | Spiegel gegen GitHub abgleichen | `git ls-remote` beider Seiten liefert dieselben Commit-IDs |
| 3 | `main` auf den Stand des Arbeitszweigs setzen (Schnellvorlauf, `main` ist Vorfahre): `git -C repo.git branch -f main claude/dig-cellexplorer-init-i1f8al` | `git log main` beginnt mit dem Merge von PR 18 oder neuer |
| 4 | Medien-Tresor anlegen: `bash scripts/server/assets-vault-init.sh nc` (einmalig, braucht kurz Zugriff auf `raw.githubusercontent.com`) | `SHA256SUMS` im Tresor, Dateien wie in `docs/ASSET_REVIEW.md` |
| 5 | Probe-Release ohne Installation: `bash scripts/server/release.sh main --no-install` | Ausgabe „Archiviert“, `RELEASE.json` im Archiv |
| 6 | Installation auf Staging, dann Abnahme (Abschnitt 6) | Checkliste vollständig |
| 7 | Produktiv installieren: `bash scripts/server/release.sh main`, danach `bash scripts/server/verify-site.sh` | Gast: 403/Weiterleitung; kein `X-Frame-Options: DENY` |
| 8 | Arbeits-Remotes umstellen: `origin` zeigt auf den Server, GitHub bleibt als `github` (nur lesen) | `git remote -v` |
| 9 | **Entscheidung Andreas:** GitHub-Repository als Spiegel behalten, archivieren oder löschen. Vor jeder Abschaltung: Originale der Issues exportieren (`gh issue list --state all --json …`) | Freigabe schriftlich |
| 10 | `package.json` (`repository`, `bugs`, `homepage`), `.github/` und Dependabot-Konfiguration an den neuen Ort anpassen oder entfernen | Build und Tests grün |

Rückweg bei Problemen: `bash scripts/server/rollback.sh` listet Releases, `rollback.sh <ID>` stellt einen zurück.
Notfall ohne Skript: Verzeichnis `…/atmed-private/cellexplorer` umbenennen (Route 404, Menüpunkt verschwindet).

## 4. Betrieb

- **Release auslösen:** manuell (`release.sh <ref>`) oder per Server-Auftrag nach Merge/Freigabe. Ein automatischer Live-Gang ohne Freigabe-Schritt ist **nicht** vorgesehen.
- **Medienstufe:** `CE_ASSET_TIER=nc` entspricht der Entscheidung vom 2026-10-31 (CC BY-NC-SA, nicht kommerziell, Namensnennung). `cc0` baut ohne diese Modelle. Die unklaren Modelle (Pflanzenzelle, weiße Blutzelle) und alle erzeugten Bilder werden nie ausgeliefert; `release.sh` bricht ab, wenn sie in `dist/` landen.
- **Sicherung:** Repository, Tresor und Releases in die bestehende Restic-Sicherung (ATINFRA-backup) aufnehmen. Der Tresor ist aus der Quelle wiederherstellbar, die Releases sind zusätzlich als Archiv vorhanden.
- **Überwachung:** `verify-site.sh` als täglicher Check (Healthchecks/Nightly von ATINFRA-control). Kein Tracking in der App.
- **Berechtigungen:** Das Release-Skript läuft unter einem Benutzer mit Schreibrecht auf das Installationsziel, nicht als root. Es liest und schreibt keine Geheimnisse.

## 5. Automatisierte Erstellung weiterer Karten und Inhalte

Die App hat heute keine datengetriebene Inhaltsschicht: Texte stehen in `src/data/cells.ts`. Für die Automatisierung
gilt eine feste Kette, in der **keine Stufe übersprungen** wird:

1. **Entwurf erzeugen** (Generator auf dem Server, z. B. die vorhandene E-Learning-Produktion): schreibt nur Entwurfsdateien in einen Eingangsordner, nie direkt in `main`.
2. **Maschinenprüfung:** Schema (Pflichtfelder, Längen, erlaubte Werte), Quellenangaben vorhanden, keine Behandlungsempfehlungen (Regeln aus `docs/MEDICAL_EDUCATION_SCOPE.md`). Fehlerhafte Entwürfe werden zurückgewiesen.
3. **Fachliche Prüfung durch eine Person** (Name und Datum im Datensatz), Status `entwurf → in_pruefung → freigegeben`.
4. **Zusammenführen** per Commit in das Repository, danach `ci-local.sh`.
5. **Release** nach Freigabe (Abschnitt 4).

Gewählter Umfang (2026-11-03): Weiterentwicklung der 3D-Oberfläche sowie Lernkarten und E-Learning-Einheiten.

| Bereich | Weg | Was automatisierbar ist | Was nicht |
| --- | --- | --- | --- |
| **3D-Oberfläche** (App) | normale Entwicklung: Commit im Server-Repository, `ci-local.sh`, Release nach Freigabe | Bau, Prüfung, Archiv, Installation, Rückweg | Entscheidung über Funktionen und Aussehen |
| **Lernkarten** (Text: Frage, Antwort, Erklärung, Quelle) | Datenformat (JSON mit Schema) plus Kartenansicht in der App | Entwurf, Schemaprüfung, Aufnahme in die App | fachliche Freigabe |
| **E-Learning-Einheiten** | vorhandene E-Learning-Produktion auf `ATMED-core` (Generator, Prüfstufe, Warteschlange) mit Import in Moodle | Entwurf und Maschinenprüfung | Freigabe der Musterurteile, Import erst nach Freigabe |
| **Weitere 3D-Präparate** (später) | zusätzlich nötig: lizenzgeprüftes GLB-Modell | Begleittexte | Modelle, Aufnahme nur über `docs/ASSET_REVIEW.md` |

Voraussetzung für die Lernkarten in der App: ein Datenformat außerhalb des Programmcodes und ein Prüfskript. Das wird
umgesetzt, sobald die laufende Inhaltsprüfung (`docs/INHALTSPRUEFUNG-DE.md`) abgestimmt ist, damit beide nicht
gegeneinander an `src/data/cells.ts` arbeiten.

## 6. Abnahme (nach jeder Installation)

- [ ] Abgemeldet: `/cellexplorer/`, `/cellexplorer/assets/…` und die Modell-URLs liefern 403 oder leiten zur Anmeldung; kein Menüpunkt.
- [ ] Angemeldet: Menüpunkt Akademie → Cell Explorer direkt über „ChemBioMed Cards“; Seite im Website-Rahmen; iframe nicht leer.
- [ ] `/wp-content/atmed-private/cellexplorer/index.html` → 403.
- [ ] Header: `Cache-Control: private`, `X-Robots-Tag: noindex…`, kein `X-Frame-Options: DENY`.
- [ ] Modelle laden ohne 4xx; Namensnennung unter der Bühne und im Info-Dialog sichtbar.
- [ ] Mobil (390 px) bedienbar.
- [ ] Datenschutzerklärung nennt den lokalen Browser-Speicher (Entwurf: `docs/DATENSCHUTZ-ENTWURF.md`).

## 7. Entscheidungen

Getroffen am 2026-11-03 (Andreas Tremml, Chat):

1. **Git-Host:** einfaches Bare-Repository per SSH auf `ATMED-core` (`scripts/server/repo-init.sh`). Kein zusätzlicher Webdienst. Der Tracker bleibt vorerst als Exportdokument im Repository; ein Forgejo-Betrieb kann später nach Staging-Test nachgezogen werden.
2. **GitHub:** bleibt vorerst unverändert (nichts löschen, nichts archivieren). Eine spätere Abschaltung braucht eine eigene Freigabe und vorher den vollständigen Export der Issues.
3. **Umfang der Automatisierung:** Weiterentwicklung der 3D-Oberfläche **und** ergänzend Lernkarten und E-Learning-Einheiten.

Noch offen:

- **SSH-Zugang für Schreibrechte** auf das Repository (welche Benutzer/Schlüssel dürfen pushen; Vorschlag: ein eigener Benutzer `git` ohne Shell-Login, Schlüssel nur für die Betreiber und die Server-Sitzung).
- **Wer löst Releases aus** (Vorschlag: die Server-Sitzung `claude-code-atmed-core` nach ausdrücklicher Freigabe, nie automatisch).
- **Anbindung an die bestehende E-Learning-Produktion** (Abschnitt 5): Aufnahme der Einheiten in Moodle läuft dort, nicht über die App.
