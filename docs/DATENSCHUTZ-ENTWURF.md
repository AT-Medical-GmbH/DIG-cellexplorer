# Entwurf: Abschnitt für die Datenschutzerklärung (Cell Explorer)

Stand 31.10.2026. Entwurf, rechtlich nicht geprüft, nicht live eingesetzt.

## Cell Explorer (Akademie, nur für angemeldete Nutzer)

Der Cell Explorer ist ein interaktives 3D-Lernangebot und nur nach Anmeldung erreichbar. Die Anwendung wird ausschließlich von unserem eigenen Server ausgeliefert. Es werden keine Inhalte von Drittanbietern nachgeladen, kein Tracking und keine Analysewerkzeuge eingesetzt, und es werden keine Cookies gesetzt.

Zur Speicherung Ihres Lernstands nutzt die Anwendung den lokalen Speicher Ihres Browsers (localStorage). Die Einträge beginnen mit `cas-`. Gespeichert werden: Favoriten, zuletzt betrachtete Zellen, eigene Notizen, Lernfortschritt und Erfahrungspunkte, Tagesaufgabe, Quiz-Ergebnisse und -Verlauf, gewählte Akzentfarbe, Tonwahl im Quiz und ob die Einführung bereits angezeigt wurde. Diese Daten verbleiben auf Ihrem Gerät. Sie werden nicht an uns oder Dritte übertragen und nicht mit Ihrem Benutzerkonto verknüpft.

Der Zugriff auf den lokalen Speicher ist nach unserer Einschätzung für die von Ihnen gewünschte Nutzung der Anwendung erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können die Daten jederzeit in den Einstellungen Ihres Browsers (Websitedaten löschen) entfernen; die Quiz-Daten lassen sich zusätzlich in der Anwendung zurücksetzen. Ohne die Daten funktioniert die Anwendung weiter, Ihr Lernstand beginnt dann neu.

Beim Aufruf der Anwendung verarbeitet unser Server die für jede Seitenauslieferung üblichen Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt, abgerufene Datei) in den Server-Protokollen; hierzu gilt der Abschnitt zu Server-Logfiles dieser Datenschutzerklärung.

Die 3D-Modelle stammen aus dem NIH 3D Print Exchange (Namensnennung und Lizenz sind in der Anwendung angegeben). Links dorthin werden erst durch Ihren Klick geöffnet.

## Hinweise für die Prüfung (nicht Teil des Textes)

- Prüfen, ob Notizen als „Gesundheitsdaten“ eingegeben werden könnten (Hinweis „keine Patientendaten eingeben“ in der App ergänzen?).
- Cloudflare-Einblendung (Web-Analytics-Skript) kommt von der Website-Infrastruktur, nicht von der App; das deckt die bestehende Website-Datenschutzerklärung ab. Bitte dort bestätigen.
- Schlüsselliste Quelle: `src/lib/storageKeys.ts`.
