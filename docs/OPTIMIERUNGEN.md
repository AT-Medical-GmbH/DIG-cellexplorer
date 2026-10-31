# Optimierungen und zusätzliche Funktionen (Vorschlagsliste)

Stand 2026-10-31. Grundlage: Sichtprüfung der deutschen Fassung im Browser (nur CC0-Assets),
Code-Durchsicht und die Vorgaben des Projekts (login-only, nicht kommerziell, kein Tracking).
**Nichts davon ist beauftragt**; die Liste ist die Entscheidungsgrundlage. Aufwand: S = Stunden,
M = 1–3 Tage, L = mehr als 3 Tage.

## Bereits umgesetzt (diese Überarbeitung)

| Thema | Wirkung |
| --- | --- |
| Quiz verriet die Antwort | Die Fußzeile zeigte den Zelltyp („Prokaryotische Zelle“) schon vor der Antwort. Entfernt. |
| Lernkarten ohne Bilder | Ohne Referenzbild stand nur „nicht verfügbar“. Jetzt erscheint ein Hinweis (Vorkommen, Typ), die Karte bleibt nutzbar. |
| „KI-Tutor“ ohne KI | Das Feld versprach einen Tutor, es gibt aber keinen. Jetzt „Lernimpulse“: vier Übungsaufgaben je Organell, ohne irreführendes Versprechen. |
| Eintippen im Quiz | Akzeptiert Alternativnamen (Leukozyt, Bakterium …) und ß/ss- sowie Umlaut-Varianten. |
| Favicon unter Unterpfad | Zeigte auf die Domain-Wurzel, jetzt über `BASE_URL`. |
| „Info“-Dialog | Behauptete Organe, Knochen, Viren; tatsächlich sieben Zelltypen. Korrigiert. |

## A. Qualität und Betrieb (empfohlen vor der Freigabe an Nutzer)

| # | Vorschlag | Nutzen | Aufwand |
| --- | --- | --- | --- |
| A1 | Fachliche Prüfung der deutschen Inhalte durch eine fachkundige Person, Prüfvermerk (Name, Datum) je Präparat sichtbar | Pflicht für ein Lernangebot; schützt vor Übersetzungsfehlern | M (Prüfer) |
| A2 | Mobilansicht (390 px) und Tablet prüfen und anpassen; die Oberfläche ist für Breitbild gebaut | Viele Nutzer kommen mobil | M |
| A3 | Barrierefreiheit: Kontrast (WCAG AA wie die Website), Tastaturbedienung, Screenreader-Beschriftungen, Fokusreihenfolge in Dialogen | Rechtliche und praktische Zugänglichkeit | M |
| A4 | Ladezeit: Das JavaScript ist etwa 2,3 MB; Szene, Quiz und Dialoge nachladen (Code-Splitting) | Schnellerer Start im iframe | M |
| A5 | Fehlerseite statt Konsolenfehler, wenn ein Modell fehlt (derzeit Fallback, aber ein unbehandelter Fehler in der Konsole) | Sauberes Verhalten, bessere Überwachung | S |
| A6 | Content-Security-Policy für die Route `/cellexplorer/` (Werte stehen in `DEPLOYMENT.md`) | Härtung | S |
| A7 | `npm audit fix` und Abhängigkeitsprüfung (12 Hinweise, 6 hoch, überwiegend Build-Werkzeuge) | Sicherheit | S–M |
| A8 | CI wieder nutzbar machen (Abrechnungssperre der Organisation) oder Build auf dem Server als Pflichtschritt | Nachvollziehbare Prüfung vor jedem Release | S (Andreas) |
| A9 | Texte aus dem Code in eine Sprachdatei auslagern (`src/i18n/de.ts`) | Pflegbar durch Nicht-Entwickler; später Englisch möglich | M |

## B. Lernwirkung (inhaltlich der größte Hebel)

| # | Vorschlag | Nutzen | Aufwand |
| --- | --- | --- | --- |
| B1 | Wissensfragen statt nur „Welches Modell ist das?“: Mehrfachauswahl zu Funktion und Aufbau (z. B. „Wo entsteht ATP?“) mit Erklärung nach der Antwort, abgeleitet aus den vorhandenen Hinweisen | Prüfungsnahes Lernen | M |
| B2 | Lernkarten mit Wiederholungsintervallen (Leitner/Spaced Repetition): schwache Karten kommen häufiger | Nachhaltigeres Lernen | M |
| B3 | Mehr Präparate und Organellen (Endoplasmatisches Retikulum, Ribosomen, Zytoskelett, Erythrozyt, Thrombozyt) | Deckt mehr vom Lehrplan ab; nur mit geprüften CC0-/eigenen Modellen | L |
| B4 | Quellenangaben je Aussage (Lehrbuch, Leitlinie) und Lernziele je Präparat | Glaubwürdigkeit für Fachpublikum | M |
| B5 | Notizen als PDF oder Text exportieren; Lernzusammenfassung zum Ausdrucken | Praktischer Nutzen im Kurs | S–M |
| B6 | Suche mit Synonymen (Leukozyt, Mitochondrium/Mitochondrien) und Glossar | Auffindbarkeit | S |

## C. Verbindung zur AT-Medical-Plattform (jeweils Entscheidung nötig)

| # | Vorschlag | Nutzen | Hinweis |
| --- | --- | --- | --- |
| C1 | Lernstand je Benutzerkonto speichern statt nur im Browser (WordPress-Benutzermeta über eine kleine REST-Schnittstelle des MU-Plugins) | Fortschritt gilt auf allen Geräten | Datenschutzhinweis nötig; kein Tracking, nur eigener Stand |
| C2 | Einbettung in einen Moodle-Kurs (iframe oder LTI) und Rückmeldung des Quiz-Ergebnisses | Teil der Akademie-Kurse | Moodle bleibt vorerst ausgeklammert |
| C3 | Direktlinks auf ein Präparat (`?praeparat=neuron`) und Höhenanpassung des iframes | Verlinkung aus Kursen und Beiträgen | S |
| C4 | Rückmeldeknopf („Fehler oder Verbesserung melden“) zum Helpdesk | Qualitätsverbesserung ohne Tracking | S |
| C5 | Verknüpfung mit ChemBioMed Cards (gleiche Navigation, Querverweise) | Zusammenhängendes Angebot | S–M |

## D. Später

- Eigene, rechtlich saubere 3D-Modelle statt Fremdmodelle (Auftrag oder Eigenbau), damit alle Präparate ohne Lizenzauflagen nutzbar sind.
- Echter KI-Lernassistent mit Quellenbindung (nur nach eigener Datenschutz- und Risikoprüfung, keine Patientendaten).
- Gruppen- und Kursauswertung für Lehrende (nur mit Einwilligung und Datenschutzkonzept).
