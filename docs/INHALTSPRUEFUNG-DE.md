# Cell Explorer – fachliche Prüfung und Übersetzung der Lerninhalte

> **Nachtrag 31.10.2026:** Die Beanstandungen „falsch“, „ungenau“ und „unsicher“ (ohne reine Englisch-Fehler) wurden in den deutschen Stand b5da551 übernommen (Branch `feat/fachkorrekturen-nc-audit`). Die Spalte „Abnahme“ bleibt für Andreas offen. Bei „unsicher“ wurde die vorsichtigere Formulierung gewählt; eine Quellenprüfung am Lehrbuch steht aus. Nicht übernommen: U10/U11 (KI-Tutor, in b5da551 bereits durch „Lernimpulse“ ersetzt), U05/U06 (in b5da551 korrigiert), B01/X02 (Englisch-Fehler, nicht relevant).


Stand: 31.10.2026, 17:45 Uhr · Auftrag #209 Teil b · Quelle: `src/src/data/cells.ts` sowie sichtbare Texte in `src/components/*.tsx` und `src/lib/*.ts` (nur gelesen, nichts geändert).
In der App heißt das Lehrmittel „Cell Architecture Studio“, im Auftrag „Cell Explorer“. Der Name sollte vor der Übersetzung festgelegt werden.

Bewertungsstufen:
- **korrekt**: fachlich richtig, keine Änderung nötig.
- **vereinfacht**: für die Lehre vertretbar. Der Vorschlag ist optional.
- **ungenau**: missverständlich oder nur teilweise richtig. Änderung empfohlen.
- **falsch**: fachlich falsch. Änderung nötig.
- **sprachlich falsch**: Fehler im englischen Original. Die deutsche Fassung ist davon nicht betroffen.
- **unsicher, Quelle prüfen**: Das kann ich nicht sicher beurteilen. Bitte vor der Abnahme an einer Lehrbuchquelle prüfen.

Übersetzungsgrundsatz: Kundentexte stehen in der Sie-Form („in Ihrem Körper“). Fachbegriffe folgen der deutschen Histologie und Zytologie (z. B. Zellkern, Kernhülle, Kernpore, Mitochondrium, raues endoplasmatisches Retikulum, Zellwand, Myelinscheide, Sarkolemm).

---

## 1. Kurzfazit

- **Geprüfte Aussagen:** 190. Davon stammen 170 aus `cells.ts` (7 Zellen, 22 Strukturen, 3 Mikroskop-Beschriftungen) und 20 aus den Oberflächentexten mit Lerninhalt oder Beschriftung.
- **Beanstandungen:** 26.
  - 4 falsch
  - 2 sprachlich falsch (nur im englischen Original)
  - 17 ungenau
  - 3 unsicher, Quelle prüfen
- **Vereinfacht, aber vertretbar:** 25 Aussagen. Die Vorschläge dazu sind optional.
- **Korrekt:** 138 Aussagen.
- **Technischer Hinweis ohne fachliche Bewertung:** 1 (U14).
- **Gesamturteil:** Die Inhalte sind überwiegend richtig und angemessen vereinfacht. Kein klinischer Kontext ist gefährlich falsch. Diese Punkte sollten vor der Freigabe korrigiert werden:
  1. **M20** – Lage der Muskelmitochondrien („zwischen den Fasern“) ist falsch.
  2. **P08** – Lage des Pflanzenzellkerns („meist zentral“) ist falsch.
  3. **W01 und M01** – Zelltypen werden zu stark verallgemeinert: „Leukozyt“ beschreibt hier nur Granulozyten, „Muskelzelle“ nur Skelettmuskelfasern.
  4. **U02** – Der Begriff „Organelle“ wird für Strukturen verwendet, die keine Organellen sind.
  5. **U05 und U06** – Der Infotext beschreibt den Inhalt und die Herkunft der Modelle falsch.

---

## 2. Prüftabelle je Zelle

### 2.1 Pflanzenzelle (`plant`)

| Nr. | Feld | Original (EN) | Deutsche Übersetzung | Bewertung | Korrekturvorschlag | Abnahme [ ] |
|---|---|---|---|---|---|---|
| P01 | Name | Plant Cell | Pflanzenzelle | korrekt | – | [ ] |
| P02 | Typ | Eukaryotic Cell | Eukaryotische Zelle | korrekt | – | [ ] |
| P03 | Klinischer Kontext | A useful non-human baseline for teaching why cell walls and chloroplasts are absent from patient tissue samples. | Eine nützliche nichtmenschliche Vergleichsbasis, um zu erklären, warum Zellwände und Chloroplasten in Gewebeproben von Patienten fehlen. | **ungenau** | Menschliche Zellen haben keine Zellwand und keine Chloroplasten. Pflanzenmaterial kann aber in Patientenproben vorkommen (z. B. Nahrungsreste in Bronchialsekret, Mageninhalt, Stuhl). Vorschlag: „Nichtmenschliche Vergleichszelle: Menschliche Zellen besitzen weder Zellwand noch Chloroplasten. Findet man solche Strukturen in einer Patientenprobe, handelt es sich um Pflanzenmaterial, etwa Nahrungsreste.“ | [ ] |
| P04 | Vorkommen (Titel) | Leaves, stems, roots | Blätter, Sprossachsen (Stängel), Wurzeln | korrekt | – | [ ] |
| P05 | Vorkommen (Text) | Plant cells form tissues that store energy, move water, and turn sunlight into sugars. | Pflanzenzellen bilden Gewebe, die Energie speichern, Wasser leiten und Lichtenergie in Zucker umwandeln. | vereinfacht | – | [ ] |
| P06 | Zellkern: Name/Untertitel | Nucleus – The control center | Zellkern (Nucleus) – Die Steuerzentrale | korrekt | – | [ ] |
| P07 | Zellkern: Größe | 5 to 10 µm in diameter | 5–10 µm Durchmesser | korrekt | – | [ ] |
| P08 | Zellkern: Lage | Usually central | Meist zentral | **falsch** | In ausdifferenzierten Pflanzenzellen drängt die große Zentralvakuole den Kern an den Rand (wandständig). Zentral liegt er nur in jungen, teilungsfähigen Zellen. Die Angabe widerspricht P23. Vorschlag: „In jungen Zellen zentral, in ausgewachsenen Zellen meist wandständig“. | [ ] |
| P09 | Zellkern: im LM sichtbar | Yes | Im Lichtmikroskop sichtbar: ja | korrekt | – | [ ] |
| P10 | Zellkern: Notiz | The nucleus is surrounded by a double membrane called the nuclear envelope, which contains pores that regulate molecular traffic. | Der Zellkern ist von einer Doppelmembran umgeben, der Kernhülle. Ihre Kernporen regeln den Stoffaustausch zwischen Kern und Zytoplasma. | korrekt | – | [ ] |
| P11 | Zellkern: Wussten Sie schon? | The nucleus was one of the first cell structures discovered. | Der Zellkern gehörte zu den ersten entdeckten Zellstrukturen. | korrekt | Optional: „1831 von Robert Brown in Orchideenzellen beschrieben.“ | [ ] |
| P12 | Chloroplast: Name/Untertitel | Chloroplast – The light harvester | Chloroplast – Der Lichtsammler | korrekt | – | [ ] |
| P13 | Chloroplast: Aufgabe | Photosynthesis | Photosynthese | korrekt | – | [ ] |
| P14 | Chloroplast: Farbstoff | Chlorophyll | Chlorophyll | vereinfacht | Optional: „Chlorophyll a und b, dazu Carotinoide“. | [ ] |
| P15 | Chloroplast: im LM sichtbar | Often | Häufig | vereinfacht | „Ja, in grünem Gewebe gut sichtbar. Wurzelzellen haben in der Regel keine Chloroplasten.“ | [ ] |
| P16 | Chloroplast: Notiz | Chloroplasts convert light energy into chemical energy and give many plant tissues their green color. | Chloroplasten wandeln Lichtenergie in chemische Energie um und geben vielen Pflanzengeweben ihre grüne Farbe. | korrekt | – | [ ] |
| P17 | Chloroplast: Wussten Sie schon? | A single leaf cell can contain dozens of chloroplasts. | Eine einzelne Blattzelle kann Dutzende Chloroplasten enthalten. | korrekt | – | [ ] |
| P18 | Vakuole: Name/Untertitel | Vacuole – The pressure reservoir | Vakuole (Zentralvakuole) – Der Druckspeicher | korrekt | – | [ ] |
| P19 | Vakuole: Volumen | Large central space | Großer zentraler Raum | korrekt | – | [ ] |
| P20 | Vakuole: Inhalt | Water and solutes | Wasser und gelöste Stoffe (Zellsaft) | korrekt | – | [ ] |
| P21 | Vakuole: Funktion | Turgor support | Aufrechterhaltung des Turgors (Zellinnendruck) | korrekt | – | [ ] |
| P22 | Vakuole: Notiz | The central vacuole stores water, ions, and small molecules while helping the plant cell remain firm. | Die Zentralvakuole speichert Wasser, Ionen und kleine Moleküle und sorgt dafür, dass die Pflanzenzelle prall bleibt. | korrekt | – | [ ] |
| P23 | Vakuole: Wussten Sie schon? | Vacuoles can occupy most of a mature plant cell. | Vakuolen können den größten Teil einer ausgewachsenen Pflanzenzelle einnehmen. | korrekt | Optional: „bis zu etwa 90 % des Zellvolumens“ (siehe Abschnitt 3). | [ ] |
| P24 | Zellwand: Name/Untertitel | Cell Wall – The rigid frame | Zellwand – Der feste Rahmen | korrekt | – | [ ] |
| P25 | Zellwand: Material | Cellulose rich | Cellulosereich | vereinfacht | Optional: „Cellulose, Hemicellulosen, Pektine; im Holz zusätzlich Lignin“. | [ ] |
| P26 | Zellwand: Lage | Outer boundary | Äußere Begrenzung | vereinfacht | „Außerhalb der Zellmembran“. | [ ] |
| P27 | Zellwand: Funktion | Protection | Schutz | vereinfacht | „Schutz, Formgebung, Widerlager für den Turgor“. | [ ] |
| P28 | Zellwand: Notiz | The cell wall gives plant cells their regular shape and protects the membrane beneath it. | Die Zellwand gibt Pflanzenzellen ihre regelmäßige Form und schützt die darunterliegende Zellmembran. | korrekt | – | [ ] |
| P29 | Zellwand: Wussten Sie schon? | Cell walls help plants stand upright without a skeleton. | Zellwände helfen Pflanzen, ohne Skelett aufrecht zu stehen. | vereinfacht | „Zellwände und Turgor helfen Pflanzen …“ | [ ] |

Hinweis Pflanzenzelle: Die Strukturliste nennt keine Mitochondrien. Weil die Tierzelle das Mitochondrium als Hauptstruktur zeigt, könnten Lernende glauben, Pflanzenzellen hätten keine. Vorschlag: In P05 oder P10 ergänzen: „Pflanzenzellen besitzen ebenfalls Mitochondrien.“

### 2.2 Weiße Blutzelle / Leukozyt (`whiteBlood`)

| Nr. | Feld | Original (EN) | Deutsche Übersetzung | Bewertung | Korrekturvorschlag | Abnahme [ ] |
|---|---|---|---|---|---|---|
| W01 | Name | White Blood Cell | Weiße Blutzelle (Leukozyt) | **ungenau** | Leukozyten sind eine Gruppe aus Granulozyten, Monozyten und Lymphozyten. Die gezeigten Merkmale (gelappter Kern, Granula) gehören zum Granulozyten, vor allem zum neutrophilen. Vorschlag: „Leukozyt (hier: neutrophiler Granulozyt)“ oder ein Satz, dass Lymphozyten anders aussehen. | [ ] |
| W02 | Typ | Immune Cell | Immunzelle | korrekt | – | [ ] |
| W03 | Klinischer Kontext | Immune cell morphology is a bridge from basic cell biology to how clinicians interpret infection, inflammation, and blood smears. | Die Morphologie der Immunzellen verbindet die Zellbiologie mit der klinischen Beurteilung von Infektion, Entzündung und Blutausstrich. | korrekt | Optional: „… z. B. im Differenzialblutbild“. | [ ] |
| W04 | Vorkommen (Titel) | Blood, lymph, tissues | Blut, Lymphe, Gewebe | korrekt | – | [ ] |
| W05 | Vorkommen (Text) | White blood cells move through blood and tissue spaces to identify threats and coordinate immune defense. | Leukozyten bewegen sich durch Blut und Gewebsräume, erkennen Krankheitserreger und koordinieren die Immunabwehr. | vereinfacht | – | [ ] |
| W06 | Lysosom: Name/Untertitel | Lysosome – The cleanup vesicle | Lysosom – Das Aufräumbläschen | korrekt | – | [ ] |
| W07 | Lysosom: Größe | About 1 µm | Etwa 1 µm | **ungenau** | 1 µm ist eher die Obergrenze. Vorschlag: „ca. 0,1–1 µm“. | [ ] |
| W08 | Lysosom: Inhalt | Digestive enzymes | Verdauungsenzyme | vereinfacht | Optional: „saure Hydrolasen (pH etwa 4,5–5)“. | [ ] |
| W09 | Lysosom: Aufgabe | Breakdown | Abbau | korrekt | – | [ ] |
| W10 | Lysosom: Notiz | Lysosomes help immune cells digest engulfed material and recycle worn cellular components. | Lysosomen helfen Immunzellen, aufgenommenes (phagozytiertes) Material zu verdauen und verbrauchte Zellbestandteile abzubauen und wiederzuverwerten. | korrekt | – | [ ] |
| W11 | Lysosom: Wussten Sie schon? | White blood cells rely heavily on vesicles for defense. | Leukozyten sind für ihre Abwehr stark auf Vesikel angewiesen. | vereinfacht | – | [ ] |
| W12 | Kern: Name/Untertitel | Lobed Nucleus – Flexible genome vault | Gelappter (segmentierter) Zellkern – Der flexible Erbgutspeicher | korrekt | – | [ ] |
| W13 | Kern: Form | Often lobed | Oft gelappt | vereinfacht | Optional: „Segmentiert bei Granulozyten (neutrophil meist 3–5 Segmente), gebuchtet bei Monozyten, rund bei Lymphozyten“. | [ ] |
| W14 | Kern: Lage | Central | Zentral | vereinfacht | Beim segmentierten Kern wenig aussagekräftig. Besser streichen oder: „füllt einen großen Teil der Zelle“. | [ ] |
| W15 | Kern: im LM sichtbar | Yes, with stain | Ja, nach Färbung | korrekt | Optional: „z. B. Pappenheim-Färbung“. | [ ] |
| W16 | Kern: Notiz | Many white blood cells have a lobed nucleus that helps them squeeze through tight spaces. | Viele Leukozyten haben einen gelappten Kern, der ihnen hilft, sich durch enge Zwischenräume zu zwängen. | vereinfacht | „Granulozyten haben einen segmentierten Kern. Seine Verformbarkeit erleichtert vermutlich den Durchtritt durch die Gefäßwand (Diapedese).“ Die Funktion gilt als wahrscheinlich, ist aber nicht abschließend belegt. | [ ] |
| W17 | Kern: Wussten Sie schon? | Nuclear shape is one clue used to identify immune cell types. | Die Kernform ist ein Merkmal zur Unterscheidung von Immunzelltypen. | korrekt | – | [ ] |
| W18 | Granula: Name/Untertitel | Granules – The chemical packets | Granula – Die Wirkstoffpäckchen | korrekt | – | [ ] |
| W19 | Granula: Inhalt | Proteins and enzymes | Proteine und Enzyme | korrekt | Optional: „z. B. Myeloperoxidase, Elastase; bei Basophilen Histamin“. | [ ] |
| W20 | Granula: Verwendung | Defense | Abwehr | korrekt | – | [ ] |
| W21 | Granula: Sichtbarkeit | Stain dependent | Färbungsabhängig | korrekt | – | [ ] |
| W22 | Granula: Notiz | Granules store molecules that help immune cells respond quickly to infection or inflammation. | Granula speichern Moleküle, mit denen Immunzellen rasch auf Infektion oder Entzündung reagieren. | korrekt | – | [ ] |
| W23 | Granula: Wussten Sie schon? | Some immune cells are named by how their granules stain. | Manche Immunzellen sind nach dem Färbeverhalten ihrer Granula benannt. | korrekt | Optional: „neutrophile, eosinophile und basophile Granulozyten“. | [ ] |

### 2.3 Nervenzelle (`neuron`)

| Nr. | Feld | Original (EN) | Deutsche Übersetzung | Bewertung | Korrekturvorschlag | Abnahme [ ] |
|---|---|---|---|---|---|---|
| N01 | Name | Neuron | Neuron | korrekt | – | [ ] |
| N02 | Typ | Nerve Cell | Nervenzelle | korrekt | – | [ ] |
| N03 | Klinischer Kontext | Neuron shape helps learners connect cell structure with bedside neuroanatomy, reflexes, sensation, and motor signaling. | Die Gestalt des Neurons hilft, den Zellaufbau mit der klinischen Neuroanatomie, mit Reflexen, Sensibilität und Motorik zu verknüpfen. | korrekt | – | [ ] |
| N04 | Vorkommen (Titel) | Brain, spinal cord, nerves | Gehirn, Rückenmark, Nerven | **ungenau** | Die Zellkörper liegen in Gehirn, Rückenmark und Ganglien. Periphere Nerven enthalten nur die Fortsätze (Axone). Vorschlag: „Gehirn, Rückenmark, Ganglien (Fortsätze in peripheren Nerven)“. | [ ] |
| N05 | Vorkommen (Text) | Neurons carry electrical and chemical signals through long branching networks. | Neurone leiten elektrische und chemische Signale über weit verzweigte Netzwerke. | korrekt | – | [ ] |
| N06 | Axon: Name/Untertitel | Axon – The signal highway | Axon – Die Signalautobahn | korrekt | – | [ ] |
| N07 | Axon: Länge | µm to over 1 metre | Von wenigen µm bis über 1 m | korrekt | – | [ ] |
| N08 | Axon: Isolierung | Myelin sheath | Myelinscheide | **ungenau** | Nicht alle Axone sind myelinisiert. Vorschlag: „Myelinscheide (nicht bei allen Axonen; marklos sind z. B. die C-Fasern)“. | [ ] |
| N09 | Axon: im LM sichtbar | Yes, with stain | Ja, nach Färbung | korrekt | Optional: „z. B. Silberimprägnation“. | [ ] |
| N10 | Axon: Notiz | Some axons in the human body run from the spine to the foot, making neurons among the longest cells in nature. | Manche Axone im menschlichen Körper verlaufen von der Wirbelsäule bis zum Fuß. Damit gehören Neurone zu den längsten Zellen der Natur. | **ungenau** | „spine“ bedeutet Wirbelsäule. Gemeint ist das Rückenmark. Vorschlag: „Manche Axone verlaufen vom unteren Rückenmark bis in den Fuß …“ | [ ] |
| N11 | Axon: Wussten Sie schon? | A nerve impulse can travel at over 100 metres per second. | Ein Nervenimpuls kann sich mit über 100 Metern pro Sekunde ausbreiten. | korrekt | Optional: „in schnellen, myelinisierten Fasern (bis etwa 120 m/s); marklose Fasern leiten mit unter 2 m/s“. | [ ] |
| N12 | Soma: Name/Untertitel | Soma – The cell body | Soma (Perikaryon) – Der Zellkörper | korrekt | – | [ ] |
| N13 | Soma: enthält | Nucleus | Zellkern | korrekt | – | [ ] |
| N14 | Soma: Aufgabe | Metabolic hub | Stoffwechselzentrum | korrekt | – | [ ] |
| N15 | Soma: Form | Rounded | Rundlich | vereinfacht | „Vielgestaltig (z. B. pyramidenförmig, sternförmig, birnenförmig)“. | [ ] |
| N16 | Soma: Notiz | The soma maintains the neuron and integrates signals arriving from branching dendrites. | Das Soma versorgt die Nervenzelle und verrechnet die Signale, die über die verzweigten Dendriten eintreffen. | vereinfacht | Optional: „… das Aktionspotenzial entsteht am Axonhügel“. | [ ] |
| N17 | Soma: Wussten Sie schon? | Most neuron proteins are made in or near the soma. | Die meisten Proteine des Neurons werden im Soma oder in seiner Nähe gebildet. | korrekt | Optional: „Sichtbar als Nissl-Schollen (raues endoplasmatisches Retikulum)“. | [ ] |
| N18 | Dendriten: Name/Untertitel | Dendrites – The receiving branches | Dendriten – Die Empfangsäste | korrekt | – | [ ] |
| N19 | Dendriten: Form | Branched | Verzweigt | korrekt | – | [ ] |
| N20 | Dendriten: Aufgabe | Input | Signaleingang | korrekt | – | [ ] |
| N21 | Dendriten: Oberfläche | Often spiny | Oft mit Dornen (dendritische Spines) besetzt | korrekt | – | [ ] |
| N22 | Dendriten: Notiz | Dendrites increase the surface area available for receiving signals from other cells. | Dendriten vergrößern die Oberfläche, über die Signale anderer Zellen empfangen werden. | korrekt | – | [ ] |
| N23 | Dendriten: Wussten Sie schon? | A single neuron can receive thousands of synaptic inputs. | Ein einzelnes Neuron kann Tausende synaptische Eingänge erhalten. | korrekt | – | [ ] |

### 2.4 Epithelzelle (`epithelial`)

| Nr. | Feld | Original (EN) | Deutsche Übersetzung | Bewertung | Korrekturvorschlag | Abnahme [ ] |
|---|---|---|---|---|---|---|
| E01 | Name | Epithelial Cell | Epithelzelle | korrekt | – | [ ] |
| E02 | Typ | Human Tissue Cell | Menschliche Gewebezelle | vereinfacht | Epithel gibt es bei allen Tieren. Für die Medizin ist die Angabe vertretbar. | [ ] |
| E03 | Klinischer Kontext | Epithelial polarity and tight junctions make this cell type central to barriers, absorption, and pathology slide interpretation. | Durch ihre Polarität und ihre Tight Junctions ist die Epithelzelle zentral für Barrieren, Resorption und die Beurteilung histopathologischer Schnitte. | korrekt | Optional: „Die meisten bösartigen Tumoren (Karzinome) gehen vom Epithel aus.“ | [ ] |
| E04 | Vorkommen (Titel) | Skin, intestine, airways | Haut, Darm, Atemwege | vereinfacht | Das Modell zeigt eine resorbierende Darmepithelzelle (Enterozyt, einschichtiges Zylinderepithel mit Bürstensaum). Die Haut hat ein mehrschichtiges verhorntes Plattenepithel, die Atemwege ein Flimmerepithel mit Kinozilien. Vorschlag: einen Satz ergänzen, dass Epithelien je nach Ort sehr verschieden aussehen. | [ ] |
| E05 | Vorkommen (Text) | Epithelial cells form protective sheets and absorption surfaces across the body. | Epithelzellen bilden im ganzen Körper schützende Zellverbände und resorbierende Oberflächen. | korrekt | – | [ ] |
| E06 | Mikrovilli: Name/Untertitel | Microvilli – The absorption brush | Mikrovilli – Der Resorptions-Bürstensaum | korrekt | – | [ ] |
| E07 | Mikrovilli: Länge | 0.5 to 1 µm | 0,5–1 µm | **unsicher, Quelle prüfen** | Für den Bürstensaum des Dünndarms werden häufig etwa 1–2 µm angegeben. Bitte am Lehrbuch prüfen. | [ ] |
| E08 | Mikrovilli: Lage | Apical surface | Apikale (lumenseitige) Oberfläche | korrekt | – | [ ] |
| E09 | Mikrovilli: Aufgabe | Surface area | Oberflächenvergrößerung | korrekt | – | [ ] |
| E10 | Mikrovilli: Notiz | Microvilli increase surface area for absorption and secretion along epithelial sheets. | Mikrovilli vergrößern in Epithelverbänden die Oberfläche für Resorption und Sekretion. | korrekt | – | [ ] |
| E11 | Mikrovilli: Wussten Sie schon? | Intestinal microvilli form a dense brush border. | Die Mikrovilli des Darms bilden einen dichten Bürstensaum. | korrekt | – | [ ] |
| E12 | Tight Junctions: Name/Untertitel | Tight Junctions – The sealed seams | Tight Junctions (Zonulae occludentes, Verschlusskontakte) – Die abgedichteten Nähte | korrekt | – | [ ] |
| E13 | Tight Junctions: Lage | Between cells | Zwischen den Zellen | vereinfacht | „Zwischen Nachbarzellen, am apikalen Rand der Seitenflächen (Schlussleistenkomplex)“. | [ ] |
| E14 | Tight Junctions: Aufgabe | Barrier | Barriere | korrekt | – | [ ] |
| E15 | Tight Junctions: Sichtbarkeit | EM preferred | Am besten im Elektronenmikroskop | korrekt | – | [ ] |
| E16 | Tight Junctions: Notiz | Tight junctions link neighboring epithelial cells and control what passes between them. | Tight Junctions verbinden benachbarte Epithelzellen und kontrollieren, was zwischen ihnen hindurchtritt (parazellulärer Weg). | korrekt | – | [ ] |
| E17 | Tight Junctions: Wussten Sie schon? | Epithelial barriers are essential for organ boundaries. | Epithelbarrieren sind für die Abgrenzung der Organe unerlässlich. | vereinfacht | – | [ ] |
| E18 | Zellkern: Name/Untertitel | Nucleus – The instruction store | Zellkern – Der Bauplanspeicher | korrekt | – | [ ] |
| E19 | Zellkern: Lage | Basal to central | Basal bis zentral | korrekt | – | [ ] |
| E20 | Zellkern: Form | Oval | Oval | vereinfacht | Optional: „oval (Zylinderepithel), rund (kubisches Epithel), abgeflacht (Plattenepithel)“. | [ ] |
| E21 | Zellkern: im LM sichtbar | Yes | Ja | korrekt | – | [ ] |
| E22 | Zellkern: Notiz | The epithelial nucleus stores genetic information and changes position depending on tissue shape. | Der Kern der Epithelzelle speichert die Erbinformation und verändert seine Lage je nach Gewebeform. | **ungenau** | Der Text klingt, als wandere der Kern. Vorschlag: „Lage und Form des Kerns richten sich nach der Zellform (flach, kubisch, zylindrisch).“ | [ ] |
| E23 | Zellkern: Wussten Sie schon? | Nuclear shape helps pathologists read tissue samples. | Die Kernform hilft Pathologen bei der Beurteilung von Gewebeproben. | korrekt | Optional: „z. B. Kernatypien bei Dysplasie und Karzinom“. | [ ] |

### 2.5 Bakterienzelle (`bacteria`)

| Nr. | Feld | Original (EN) | Deutsche Übersetzung | Bewertung | Korrekturvorschlag | Abnahme [ ] |
|---|---|---|---|---|---|---|
| B01 | Name | Bacteria Cell | Bakterienzelle | **sprachlich falsch** | Richtiges Englisch: „Bacterial Cell“. Die deutsche Fassung „Bakterienzelle“ ist richtig. | [ ] |
| B02 | Typ | Prokaryotic Cell | Prokaryotische Zelle | korrekt | – | [ ] |
| B03 | Klinischer Kontext | Cell wall structure provides a clinically relevant path from microscopy and Gram staining to antimicrobial mechanism discussions. | Der Aufbau der Zellwand führt klinisch relevant von Mikroskopie und Gram-Färbung zu den Wirkmechanismen von Antibiotika. | korrekt | Ergänzung empfohlen (siehe Abschnitt 4): „Bakterien ohne Zellwand (z. B. Mykoplasmen) sind gegen Betalaktam-Antibiotika von Natur aus unempfindlich.“ | [ ] |
| B04 | Vorkommen (Titel) | Soil, water, gut, skin | Boden, Wasser, Darm, Haut | korrekt | – | [ ] |
| B05 | Vorkommen (Text) | Bacteria live in nearly every environment and can exist as independent single cells. | Bakterien leben in nahezu jedem Lebensraum und können als selbstständige Einzelzellen existieren. | korrekt | – | [ ] |
| B06 | Nukleoid: Name/Untertitel | Nucleoid – The naked genome | Nukleoid (Kernäquivalent) – Das Erbgut ohne Kernhülle | vereinfacht | „Nackt“ bedeutet hier „ohne Kernhülle“. Die deutsche Übersetzung sagt das direkt. | [ ] |
| B07 | Nukleoid: Größe | About 1 µm region | Bereich von etwa 1 µm | **unsicher, Quelle prüfen** | Die Größe hängt von Zellgröße und Wachstumsphase ab. Oft nimmt das Nukleoid einen großen Teil des Zytoplasmas ein. Vorschlag: Angabe streichen oder belegen. | [ ] |
| B08 | Nukleoid: Membran | None | Keine | korrekt | – | [ ] |
| B09 | Nukleoid: im LM sichtbar | No, EM only | Nein, nur im Elektronenmikroskop | **ungenau** | „In der üblichen Lichtmikroskopie (z. B. Gram) nicht sichtbar. Mit DNA-Fluoreszenzfarbstoffen (z. B. DAPI) im Fluoreszenzmikroskop darstellbar.“ | [ ] |
| B10 | Nukleoid: Notiz | Unlike eukaryotic cells, bacteria have no nuclear envelope. Their DNA floats in a cytoplasm region called the nucleoid. | Anders als eukaryotische Zellen haben Bakterien keine Kernhülle. Ihre DNA schwimmt in einem Bereich des Zytoplasmas, dem Nukleoid. | vereinfacht | „Schwimmt“ ist irreführend, denn die DNA ist stark verdichtet. Vorschlag: „Ihre DNA, meist ein ringförmiges, stark verdichtetes Chromosom, liegt ohne Membran im Nukleoid. Dazu kommen oft Plasmide, die z. B. Resistenzgene tragen können.“ | [ ] |
| B11 | Nukleoid: Wussten Sie schon? | There are more bacterial cells in your body than many people expect. | In Ihrem Körper gibt es mehr Bakterienzellen, als viele erwarten. | **ungenau** | Die Aussage ist vage und erinnert an die überholte Faustregel „zehnmal mehr Bakterien als Körperzellen“. Vorschlag: „Im und am Körper leben ungefähr so viele Bakterien, wie der Körper eigene Zellen hat (je etwa 3–4 × 10¹³), vor allem im Dickdarm.“ Quelle: Sender, Fuchs, Milo, PLoS Biology 2016. | [ ] |
| B12 | Zellwand: Name/Untertitel | Cell Wall – The protective shell | Zellwand – Die Schutzhülle | korrekt | – | [ ] |
| B13 | Zellwand: Material | Peptidoglycan | Peptidoglykan (Murein) | korrekt | – | [ ] |
| B14 | Zellwand: Aufgabe | Shape and defense | Formgebung und Schutz | korrekt | Optional: „vor allem Schutz vor dem Platzen durch osmotischen Druck“. | [ ] |
| B15 | Zellwand: Lage | Outside membrane | Außerhalb der Zellmembran | korrekt | Optional: „Gramnegative Bakterien haben außerhalb der Zellwand eine zusätzliche äußere Membran.“ | [ ] |
| B16 | Zellwand: Notiz | The bacterial cell wall helps cells resist pressure and gives many species their characteristic shapes. | Die bakterielle Zellwand hilft, dem Innendruck standzuhalten, und gibt vielen Arten ihre typische Form. | korrekt | Optional: „(Kokken, Stäbchen, Spirillen)“. | [ ] |
| B17 | Zellwand: Wussten Sie schon? | Gram staining reveals differences in bacterial wall structure. | Die Gram-Färbung macht Unterschiede im Zellwandaufbau sichtbar. | korrekt | Optional: „grampositiv: dicke Mureinschicht, blauviolett; gramnegativ: dünne Mureinschicht mit äußerer Membran, rot“. | [ ] |
| B18 | Geißel: Name/Untertitel | Flagellum – The swimming tail | Flagellum (Geißel) – Der Schwimmschwanz | **ungenau** | Die Bakteriengeißel dreht sich wie ein Propeller und schlägt nicht wie ein Schwanz. Vorschlag: „Der rotierende Antrieb“. | [ ] |
| B19 | Geißel: Aufgabe | Movement | Fortbewegung | korrekt | – | [ ] |
| B20 | Geißel: Form | Helical filament | Schraubenförmiges Filament | korrekt | – | [ ] |
| B21 | Geißel: im LM sichtbar | Special stain | Nur mit Spezialfärbung | korrekt | Optional: „Geißelfärbung. Die Geißel ist mit etwa 20 nm dünner als die Auflösungsgrenze des Lichtmikroskops.“ | [ ] |
| B22 | Geißel: Notiz | Some bacteria rotate flagella like tiny motors to move through liquid environments. | Manche Bakterien drehen ihre Geißeln wie winzige Motoren, um sich in Flüssigkeiten fortzubewegen. | korrekt | – | [ ] |
| B23 | Geißel: Wussten Sie schon? | Bacterial flagella are powered by ion gradients. | Bakteriengeißeln werden durch Ionengradienten angetrieben. | korrekt | Optional: „(Protonen oder Natriumionen, nicht direkt durch ATP)“. | [ ] |

### 2.6 Tierzelle (`animal`)

| Nr. | Feld | Original (EN) | Deutsche Übersetzung | Bewertung | Korrekturvorschlag | Abnahme [ ] |
|---|---|---|---|---|---|---|
| T01 | Name | Animal Cell | Tierzelle (tierische Zelle) | korrekt | – | [ ] |
| T02 | Typ | Eukaryotic Cell | Eukaryotische Zelle | korrekt | – | [ ] |
| T03 | Klinischer Kontext | This general eukaryotic model helps learners anchor organelle functions before applying them to human tissues and disease mechanisms. | Dieses allgemeine Modell einer eukaryotischen Zelle hilft, die Aufgaben der Organellen zu verankern, bevor sie auf menschliche Gewebe und Krankheitsmechanismen übertragen werden. | korrekt | – | [ ] |
| T04 | Vorkommen (Titel) | Animal tissues | Tierische Gewebe | korrekt | – | [ ] |
| T05 | Vorkommen (Text) | Animal cells form flexible tissues with membranes, internal organelles, and specialized signaling structures. | Tierische Zellen bilden flexible Gewebe mit Membranen, inneren Organellen und spezialisierten Signalstrukturen. | vereinfacht | „Flexibel“ stimmt nur im Vergleich zur Pflanzenzelle (Knochen ist nicht flexibel). Vorschlag: „Tierische Zellen haben keine Zellwand und bilden Gewebe mit …“ | [ ] |
| T06 | Mitochondrium: Name/Untertitel | Mitochondrion – The energy converter | Mitochondrium – Der Energiewandler | korrekt | – | [ ] |
| T07 | Mitochondrium: Länge | 1 to 10 µm | 1–10 µm | vereinfacht | Als Spannweite plausibel. Typisch sind etwa 1–2 µm Länge und 0,5–1 µm Dicke. | [ ] |
| T08 | Mitochondrium: Membran | Double | Doppelmembran | korrekt | – | [ ] |
| T09 | Mitochondrium: Aufgabe | ATP production | ATP-Bildung | korrekt | – | [ ] |
| T10 | Mitochondrium: Notiz | Mitochondria convert fuel molecules into usable cellular energy through folded inner membranes. | Mitochondrien wandeln Nährstoffmoleküle mithilfe ihrer gefalteten Innenmembran (Cristae) in nutzbare Zellenergie um. | korrekt | Optional: „Atmungskette, oxidative Phosphorylierung“. | [ ] |
| T11 | Mitochondrium: Wussten Sie schon? | Mitochondria contain their own small DNA genome. | Mitochondrien besitzen ein eigenes kleines Genom (mitochondriale DNA). | korrekt | Optional klinisch: „Die mitochondriale DNA wird mütterlich vererbt. Defekte verursachen Mitochondriopathien.“ | [ ] |
| T12 | Zellkern: Name/Untertitel | Nucleus – The command room | Zellkern – Die Kommandozentrale | korrekt | – | [ ] |
| T13 | Zellkern: Form | Rounded | Rundlich | vereinfacht | – | [ ] |
| T14 | Zellkern: Membran | Double | Doppelmembran (Kernhülle) | korrekt | – | [ ] |
| T15 | Zellkern: im LM sichtbar | Yes | Ja | korrekt | – | [ ] |
| T16 | Zellkern: Notiz | The nucleus stores chromosomes and regulates which genes are active in a cell. | Der Zellkern enthält die Chromosomen und steuert, welche Gene in einer Zelle aktiv sind. | korrekt | – | [ ] |
| T17 | Zellkern: Wussten Sie schon? | Not all animal cells keep a nucleus. Mature red blood cells lose theirs. | Nicht alle tierischen Zellen behalten ihren Zellkern. Reife rote Blutkörperchen verlieren ihn. | **ungenau** | Das gilt nur für Säugetiere. Vögel, Reptilien, Amphibien und Fische haben kernhaltige Erythrozyten. Vorschlag: „Reife Erythrozyten des Menschen und anderer Säugetiere sind kernlos.“ Optional klinisch: „Kernhaltige Vorstufen (Normoblasten) im Blut eines Erwachsenen sind ein krankhafter Befund.“ | [ ] |
| T18 | Golgi: Name/Untertitel | Golgi Apparatus – The packaging stack | Golgi-Apparat – Der Verpackungsstapel | korrekt | – | [ ] |
| T19 | Golgi: Form | Flattened stacks | Stapel abgeflachter Zisternen | korrekt | – | [ ] |
| T20 | Golgi: Aufgabe | Modify and sort | Modifizieren und sortieren | korrekt | – | [ ] |
| T21 | Golgi: Lage | Near nucleus | Kernnah | korrekt | – | [ ] |
| T22 | Golgi: Notiz | The Golgi apparatus modifies, sorts, and ships proteins and lipids to their destinations. | Der Golgi-Apparat verändert, sortiert und versendet Proteine und Lipide an ihre Zielorte. | korrekt | – | [ ] |
| T23 | Golgi: Wussten Sie schon? | Secretory cells often have a prominent Golgi apparatus. | Sekretorische Zellen haben oft einen ausgeprägten Golgi-Apparat. | korrekt | Optional: „z. B. Plasmazellen mit heller Zone neben dem Kern“. | [ ] |

### 2.7 Muskelzelle (`muscle`)

| Nr. | Feld | Original (EN) | Deutsche Übersetzung | Bewertung | Korrekturvorschlag | Abnahme [ ] |
|---|---|---|---|---|---|---|
| M01 | Name | Muscle Cell | Muskelzelle | **ungenau** | Der Inhalt beschreibt nur die Skelettmuskelfaser. Glatte Muskelzellen und Herzmuskelzellen sind anders gebaut. Vorschlag: „Skelettmuskelfaser“. Ergänzung empfohlen: „vielkernig, die Kerne liegen am Rand“. | [ ] |
| M02 | Typ | Muscle Fiber | Muskelfaser | korrekt | – | [ ] |
| M03 | Klinischer Kontext | Muscle fiber architecture links microscopic structure with contraction, fatigue, rehabilitation, and neuromuscular disease teaching. | Der Aufbau der Muskelfaser verknüpft die mikroskopische Struktur mit Kontraktion, Ermüdung, Rehabilitation und neuromuskulären Erkrankungen. | korrekt | – | [ ] |
| M04 | Vorkommen (Titel) | Skeletal muscles | Skelettmuskulatur | korrekt | – | [ ] |
| M05 | Vorkommen (Text) | Muscle fibers contain repeating contractile bundles that shorten to generate force. | Muskelfasern enthalten sich wiederholende kontraktile Einheiten, die sich verkürzen und so Kraft erzeugen. | vereinfacht | Optional: „Myofibrillen aus hintereinander liegenden Sarkomeren; Aktin- und Myosinfilamente gleiten aneinander vorbei“. | [ ] |
| M06 | Myofibrille: Name/Untertitel | Myofibril – The contracting thread | Myofibrille – Der kontraktile Faden | korrekt | – | [ ] |
| M07 | Myofibrille: Durchmesser | About 1 µm | Etwa 1 µm | korrekt | – | [ ] |
| M08 | Myofibrille: Anordnung | Striated bundles | Quergestreifte Bündel | korrekt | – | [ ] |
| M09 | Myofibrille: im LM sichtbar | Yes, banded | Ja, quergestreift | korrekt | – | [ ] |
| M10 | Myofibrille: Notiz | Each muscle fiber contains hundreds to thousands of myofibrils running its full length, packed tightly together. | Jede Muskelfaser enthält Hunderte bis Tausende dicht gepackte Myofibrillen, die über ihre gesamte Länge verlaufen. | korrekt | – | [ ] |
| M11 | Myofibrille: Wussten Sie schon? | A single muscle fiber can be up to 30 cm long. | Eine einzelne Muskelfaser kann bis zu 30 cm lang sein. | **unsicher, Quelle prüfen** | Die Literaturangaben schwanken. Vorsichtiger Vorschlag: „Skelettmuskelfasern können mehrere Zentimeter lang werden, in langen Muskeln über 10 cm.“ | [ ] |
| M12 | Sarkolemm: Name/Untertitel | Sarcolemma – The excitable membrane | Sarkolemm – Die erregbare Membran | korrekt | – | [ ] |
| M13 | Sarkolemm: Lage | Outer surface | Äußere Oberfläche | korrekt | – | [ ] |
| M14 | Sarkolemm: Aufgabe | Signal spread | Erregungsausbreitung | korrekt | – | [ ] |
| M15 | Sarkolemm: Art | Cell membrane | Zellmembran (der Muskelfaser) | korrekt | – | [ ] |
| M16 | Sarkolemm: Notiz | The sarcolemma conducts electrical signals that trigger contraction throughout the muscle fiber. | Das Sarkolemm leitet elektrische Signale weiter, die in der gesamten Muskelfaser die Kontraktion auslösen. | korrekt | – | [ ] |
| M17 | Sarkolemm: Wussten Sie schon? | Membrane signals reach deep into fibers through T tubules. | Über die T-Tubuli (transversale Tubuli) gelangen die Membransignale tief in die Faser. | korrekt | Optional: „… und lösen dort die Calciumfreisetzung aus dem sarkoplasmatischen Retikulum aus“. | [ ] |
| M18 | Mitochondrien: Name/Untertitel | Mitochondria – The endurance supply | Mitochondrien – Der Ausdauerlieferant | korrekt | – | [ ] |
| M19 | Mitochondrien: Aufgabe | Energy supply | Energieversorgung | korrekt | – | [ ] |
| M20 | Mitochondrien: Lage | Between fibers | Zwischen den Fasern | **falsch** | Eine Muskelfaser ist eine ganze Zelle. Die Mitochondrien liegen in der Faser zwischen den Myofibrillen und unter dem Sarkolemm. Vorschlag: „Zwischen den Myofibrillen und unter dem Sarkolemm“. | [ ] |
| M21 | Mitochondrien: Dichte | Activity dependent | Aktivitätsabhängig | korrekt | Optional: „Typ-I-Fasern (langsame, ausdauernde Fasern) sind besonders mitochondrienreich“. | [ ] |
| M22 | Mitochondrien: Notiz | Muscle cells need many mitochondria because contraction consumes large amounts of ATP. | Muskelzellen brauchen viele Mitochondrien, weil die Kontraktion große Mengen ATP verbraucht. | korrekt | – | [ ] |
| M23 | Mitochondrien: Wussten Sie schon? | Endurance training can increase mitochondrial density. | Ausdauertraining kann die Mitochondriendichte erhöhen. | korrekt | – | [ ] |

### 2.8 Mikroskop-Beschriftungen (gleich bei allen 7 Zellen)

| Nr. | Feld | Original (EN) | Deutsche Übersetzung | Bewertung | Korrekturvorschlag | Abnahme [ ] |
|---|---|---|---|---|---|---|
| X01 | Ansicht 1 | Light Microscope | Lichtmikroskop | korrekt | – | [ ] |
| X02 | Ansicht 2 | Stained Selection | (wörtlich: „Gefärbte Auswahl“) | **falsch** | Das ist offenbar ein Schreibfehler für „Stained Section“. Richtig: „Gefärbter Schnitt“ bzw. „Färbepräparat“. | [ ] |
| X03 | Ansicht 3 | Electron Microscope | Elektronenmikroskop | korrekt | – | [ ] |

### 2.9 Oberflächentexte mit Lerninhalt oder Beschriftung

| Nr. | Ort | Original (EN) | Deutsche Übersetzung | Bewertung | Korrekturvorschlag | Abnahme [ ] |
|---|---|---|---|---|---|---|
| U01 | Willkommen, Schritt 1 (Titel) | Welcome to Cell Architecture Studio | Willkommen im Cell Architecture Studio | korrekt | Produktnamen festlegen (siehe Kopf). | [ ] |
| U02 | Willkommen, Schritt 1 (Text) und Überschrift „Organelle Details“ im rechten Feld | Explore seven interactive cell specimens, inspect their organelles, and compare how cellular structures support different biological roles. | Erkunden Sie sieben interaktive Zellpräparate, untersuchen Sie ihre Organellen und vergleichen Sie, wie Zellstrukturen verschiedene biologische Aufgaben erfüllen. | **ungenau** | Axon, Dendriten, Soma, Mikrovilli, Tight Junctions, Zellwand, Geißel, Myofibrille und Sarkolemm sind keine Organellen. Vorschlag: „Zellbestandteile“ bzw. „Strukturen“; Überschrift „Strukturdetails“. | [ ] |
| U03 | Willkommen, Schritte 2–4 (Bedienung) | Browse & study / Test yourself / Pro tips (Bedienhinweise) | Stöbern und lernen / Selbst testen / Profi-Tipps | korrekt | Reine Bedienungstexte. Mit übersetzen, keine fachliche Aussage. | [ ] |
| U04 | Info-Fenster, Untertitel | Explore life at the microscopic level in interactive 3D. | Entdecken Sie das Leben auf mikroskopischer Ebene, interaktiv in 3D. | korrekt | – | [ ] |
| U05 | Info-Fenster „Specimens“ | 7 interactive 3D models across cells, organs, bones, viruses, macromolecules and botanical specimens. | 7 interaktive 3D-Modelle aus Zellen, Organen, Knochen, Viren, Makromolekülen und botanischen Präparaten. | **falsch** | Es gibt nur 7 Zellen, keine Organe, Knochen, Viren oder Makromoleküle. Die Kategorien sind im Code vorgesehen, aber leer. Vorschlag: „7 interaktive Zellmodelle“. | [ ] |
| U06 | Info-Fenster „3D models“ | Sourced from the NIH 3D Print Exchange … Specimens without a listed model use procedural geometry. | Stammen aus dem NIH 3D Print Exchange … Präparate ohne aufgeführtes Modell verwenden berechnete Geometrie. | **ungenau** | Laut `cells.ts` stammen die Modelle der Pflanzenzelle und des Leukozyten nicht von NIH, sondern aus lokalen Nutzerdateien („User … GLB“). Sie stehen nicht in der Liste, verwenden aber auch keine berechnete Geometrie. Herkunft und Lizenz dieser zwei Modelle sind ungeklärt (siehe Abschnitt 5). | [ ] |
| U07 | Info-Fenster „Quiz“ | Identify specimens across casual, timed, type-it and survival modes; scores and history are saved locally in your browser. | Präparate erkennen in den Modi „Locker“, „Auf Zeit“, „Eintippen“ und „Überleben“. Punkte und Verlauf werden lokal in Ihrem Browser gespeichert. | korrekt | – | [ ] |
| U08 | Info-Fenster, Fußzeile | Built as an educational project. Not for clinical use. | Als Lernprojekt erstellt. Nicht für den klinischen Einsatz. | korrekt | Unbedingt beibehalten. | [ ] |
| U09 | Rechtes Feld, Beschriftungen | Biological Notes / Clinical Context / Fun Fact / Where It Occurs / Mastery | Biologische Notizen / Klinischer Bezug / Wussten Sie schon? / Vorkommen / Lernstand | korrekt | – | [ ] |
| U10 | Rechtes Feld „AI Tutor“ | AI Tutor / Prompt staged for AI tutor | KI-Tutor / Frage für den KI-Tutor vorbereitet | **ungenau** | Laut Quelltext ist kein Tutor angebunden. Ein Klick speichert die Frage nur und zeigt „AI tutor prompt staged.“. Lernende erwarten eine Antwort. Nur festgestellt. | [ ] |
| U11 | Rechtes Feld, Tutor-Vorschläge (Vorlagen) | Explain how ${organelle} helps a ${cell} stay alive. / Quiz me on the visual differences between … / Guide me through finding … / Connect ${cell} structure to one clinical observation without giving medical advice. | Erklären Sie, wie [Struktur] einer [Zelle] beim Überleben hilft. / … | **sprachlich falsch** | Die englischen Vorlagen ergeben Grammatikfehler: „a Animal Cell“, „a Epithelial Cell“, „Granules helps“, „Microvilli helps“, „Mitochondria helps“. Im Deutschen braucht jede Vorlage Genus und Numerus je Struktur. Der Zusatz „ohne medizinischen Rat“ ist sinnvoll und sollte bleiben. | [ ] |
| U12 | Rechtes Feld „Current lesson focus“ | Locate X, explain its role, then compare it with the matching structure in Y. | Finden Sie X, erklären Sie seine Aufgabe und vergleichen Sie es mit der entsprechenden Struktur in Y. | **ungenau** | Nicht jede Struktur hat ein Gegenstück in der Vergleichszelle (z. B. Chloroplast gegenüber Tierzelle, Axon gegenüber Muskelzelle). Vorschlag: „… und prüfen Sie, ob Y eine entsprechende Struktur besitzt.“ | [ ] |
| U13 | Quiz, Einstieg | Specimen Quiz – Identify the 3D model from 4 options. | Präparate-Quiz – Erkennen Sie das 3D-Modell unter 4 Antwortmöglichkeiten. | korrekt | – | [ ] |
| U14 | Quiz, Modus „Type it“ | Type the specimen name… | Namen des Präparats eintippen … | Hinweis | Nur festgestellt: Die Eingabe wird nur mit dem englischen Namen verglichen (bis zu 2 Tippfehler erlaubt). Nach der Übersetzung braucht es deutsche Namen und Synonyme (z. B. Leukozyt, Nervenzelle). Laut Normalisierungsregel wird „ß“ entfernt, „weiße“ würde also falsch verglichen. | [ ] |
| U15 | Quiz, Ergebnis | Cell biology master! / Solid knowledge. / Keep exploring! / Unstoppable! / Great run! / Keep training! / New best score! | Meister der Zellbiologie! / Solides Wissen. / Weiter entdecken! / Nicht zu stoppen! / Starker Lauf! / Weiter üben! / Neue Bestleistung! | korrekt | – | [ ] |
| U16 | Karteikarten | What specimen is this? / Occurs in: / Reference image not available / Tap the card to reveal the answer | Welches Präparat ist das? / Vorkommen: / Referenzbild nicht verfügbar / Tippen Sie auf die Karte, um die Lösung zu sehen | korrekt | Die Kartenrückseite zeigt die Notiz der ersten Struktur. Deshalb wirken die Korrekturen P10, W10, N10 usw. auch hier. | [ ] |
| U17 | Erfolge | First Contact – View your first specimen; Explorer – Explore 3 specimens; Curator – Explore all 7 specimens; Collector – Favorite 3 specimens; Quizzer – Finish a quiz; Sharpshooter – Reach a 5 answer streak; Flawless – Score a perfect quiz; Scholar – Reach level 5 | Erstkontakt – Erstes Präparat ansehen; Entdecker – 3 Präparate erkunden; Kurator – Alle 7 Präparate erkunden; Sammler – 3 Präparate als Favorit markieren; Quizstarter – Ein Quiz beenden; Treffsicher – 5 richtige Antworten in Folge; Fehlerfrei – Ein Quiz ohne Fehler; Gelehrter – Stufe 5 erreichen | korrekt | – | [ ] |
| U18 | Tagesaufgabe | Daily Specimen / Study it · +15 XP / Bonus claimed today | Präparat des Tages / Jetzt lernen · +15 XP / Bonus heute erhalten | korrekt | – | [ ] |
| U19 | Mikroskopansicht | Microscope View (Karten „Light Microscope“, „Stained Selection“, „Electron Microscope“) | Mikroskopansicht | **ungenau** | Laut Quelltext zeigen die Karten nur Farbflächen bzw. Muster und keine echten Mikroskopaufnahmen. Die Beschriftung lässt echte Aufnahmen erwarten. Vorschlag: als „schematisch“ kennzeichnen oder echte, lizenzierte Aufnahmen einsetzen. | [ ] |
| U20 | Notizbücher | Notebooks – Personal notes saved in your browser, per specimen. | Notizbücher – Persönliche Notizen je Präparat, gespeichert in Ihrem Browser. | korrekt | – | [ ] |

---

## 3. Zahlenangaben mit Plausibilitätsprüfung

| Nr. | Angabe | Bewertung | Begründung / Vorschlag | Abnahme [ ] |
|---|---|---|---|---|
| P07 | Pflanzenzellkern 5–10 µm | plausibel | Übliche Größenordnung | [ ] |
| P17 | „Dutzende“ Chloroplasten je Blattzelle | plausibel | Mesophyllzellen enthalten typischerweise mehrere Dutzend. Für eine genaue Zahl Quelle prüfen. | [ ] |
| P23 | Vakuole nimmt „den größten Teil“ der Zelle ein (Vorschlag: bis etwa 90 %) | plausibel | Lehrbuchangabe. Die genaue Prozentzahl vor Übernahme kurz belegen. | [ ] |
| W07 | Lysosom „etwa 1 µm“ | zu hoch als typischer Wert | Etwa 0,1–1 µm angeben | [ ] |
| W13 (Vorschlag) | Neutrophiler Granulozyt meist 3–5 Kernsegmente | plausibel | Gängige Angabe aus der Hämatologie | [ ] |
| N07 | Axon von µm bis über 1 m | plausibel | Längste Axone reichen vom Rückenmark bis in den Fuß | [ ] |
| N11 | Nervenleitung über 100 m/s | plausibel | Schnellste myelinisierte Fasern bis etwa 120 m/s, marklose Fasern unter 2 m/s | [ ] |
| N23 | „Tausende“ synaptische Eingänge | plausibel | Eher untere Schätzung, einzelne Neurone (z. B. Purkinje-Zellen) haben deutlich mehr | [ ] |
| E07 | Mikrovilli 0,5–1 µm lang | **unsicher, Quelle prüfen** | Für den Darm-Bürstensaum oft etwa 1–2 µm angegeben | [ ] |
| B07 | Nukleoid „etwa 1 µm“ | **unsicher, Quelle prüfen** | Hängt von Zellgröße und Wachstum ab. Besser streichen. | [ ] |
| B11 (Vorschlag) | Bakterien zu Körperzellen etwa 1 : 1, je etwa 3–4 × 10¹³ | plausibel | Sender, Fuchs, Milo, PLoS Biology 2016. Ersetzt die überholte Angabe 10 : 1. | [ ] |
| B21 (Vorschlag) | Geißeldurchmesser etwa 20 nm | plausibel | Unterhalb der Auflösungsgrenze des Lichtmikroskops (etwa 0,2 µm) | [ ] |
| T07 | Mitochondrium 1–10 µm lang | plausibel als Spannweite | Typisch 1–2 µm. Vernetzte Formen können länger sein. | [ ] |
| M07 | Myofibrille etwa 1 µm Durchmesser | plausibel | 1–2 µm | [ ] |
| M10 | Hunderte bis Tausende Myofibrillen je Faser | plausibel | – | [ ] |
| M11 | Muskelfaser bis 30 cm | **unsicher, Quelle prüfen** | Angaben schwanken. Vorsichtiger: „mehrere Zentimeter, in langen Muskeln über 10 cm“. | [ ] |
| U02 / U17 | 7 Präparate | korrekt | Stimmt mit `cells.ts` überein | [ ] |
| U05 | Modelle zu Zellen, Organen, Knochen, Viren, Makromolekülen, Pflanzen | **falsch** | Nur 7 Zellen vorhanden | [ ] |
| U14 | Quiz: 10 Fragen, 12 s je Frage, 3 Leben, bis 2 Tippfehler | keine Fachangabe | Nur Spielregeln, nicht fachlich geprüft | [ ] |

---

## 4. Hinweise zu klinisch irreführenden Formulierungen (Klinischer Kontext und klinisch relevante Texte)

Gefährlich falsche klinische Aussagen habe ich nicht gefunden. Die Fußzeile „Nicht für den klinischen Einsatz“ ist vorhanden und sollte bleiben. Missverständlich sind diese Stellen:

1. **Pflanzenzelle (P03):** „Zellwände und Chloroplasten fehlen in Patientenproben“ kann so verstanden werden, dass Pflanzenstrukturen in Proben nie vorkommen. Pflanzenmaterial erscheint aber z. B. in Bronchialsekret, Mageninhalt oder Stuhl, etwa als Nahrungsreste. Gemeint ist: Menschliche Zellen haben diese Strukturen nicht.
2. **Leukozyt (W01, W13, W16):** Alle Merkmale beschreiben einen Granulozyten. Lernende könnten jeden Leukozyten für segmentkernig halten. Im Differenzialblutbild unterscheiden sich Lymphozyten (runder Kern, kaum Granula) und Monozyten (gebuchteter Kern) aber gerade dadurch. Die Morphologie allein beweist keine Infektion. Der Kontext „Infektion, Entzündung“ sollte als „Hinweise im Blutausstrich“ formuliert sein, nicht als Diagnose.
3. **Bakterien (B03, B17):** Der Weg „Zellwand → Gram-Färbung → Antibiotika“ ist richtig, aber unvollständig. Zwei klinisch wichtige Ausnahmen fehlen: Bakterien ohne Zellwand (z. B. Mykoplasmen) sind gegen Betalaktam-Antibiotika von Natur aus unempfindlich, und Mykobakterien lassen sich kaum nach Gram färben (stattdessen Ziehl-Neelsen-Färbung). Ein Satz dazu wird empfohlen.
4. **Nervenzelle (N04, N08):** „Myelinscheide“ ohne Einschränkung legt nahe, alle Axone seien myelinisiert. Klinisch wichtig: Schmerz und Temperatur laufen zu großen Teilen über marklose C-Fasern. Entmarkungskrankheiten (z. B. multiple Sklerose, Guillain-Barré-Syndrom) betreffen myelinisierte Fasern. „Nerven“ als Vorkommen von Neuronen ist ungenau, denn periphere Nerven enthalten nur Axone.
5. **Muskelzelle (M01, M03):** „Muskelzelle“ ohne Zusatz verleitet dazu, die Angaben auf Herz- und glatte Muskulatur zu übertragen. Herzmuskelzellen sind meist ein- bis zweikernig und durch Glanzstreifen verbunden, glatte Muskelzellen sind nicht quergestreift. Für die Lehre zu neuromuskulären Erkrankungen sollte „Skelettmuskelfaser“ dastehen.
6. **Tierzelle (T17):** „Rote Blutkörperchen verlieren ihren Kern“ stimmt nur für Säugetiere. Optional lässt sich ein klinischer Satz ergänzen: Kernhaltige Vorstufen (Normoblasten) im Blut eines Erwachsenen sind krankhaft.
7. **Tutor-Vorschlag (U11):** Der Zusatz „ohne medizinischen Rat“ ist gut und sollte in der Übersetzung bleiben. Ein Tutor ist aber nicht angebunden (U10).
8. **Epithelzelle (E03):** Fachlich in Ordnung. Optional: Hinweis, dass die meisten bösartigen Tumoren (Karzinome) vom Epithel ausgehen.

---

## 5. Hinweis zur Sprache der Oberfläche (nur festgestellt, nichts gebaut)

- **Sprache:** Alle Oberflächentexte liegen nur auf Englisch vor. Gemeint sind Menüs, Schaltflächen, Hinweismeldungen, Quiz, Karteikarten, Erfolge, Tagesaufgabe, Notizbücher, Tastenkürzel-Hilfe und Info-Fenster. Sie sind direkt im Quelltext der Komponenten und in `src/lib/*.ts` hinterlegt. Die Lerninhalte stehen direkt in `src/data/cells.ts`.
- **Keine Sprachumschaltung:** Die App hat noch keine Sprachumschaltung und keine Übersetzungsdateien. Es gibt keine Bibliothek für Mehrsprachigkeit und keine Sprachauswahl.
- **Zusammengesetzte Sätze:** Für eine deutsche Fassung müssen auch zusammengesetzte Sätze übersetzt werden (Tutor-Vorschläge, Hinweismeldungen wie „Added … to favorites.“, „Opened comparison: … vs …“). Sie brauchen im Deutschen Genus und Numerus der jeweiligen Struktur (siehe U11).
- **Quiz-Modus „Eintippen“:** Er vergleicht nur mit dem englischen Namen (siehe U14).
- **Kategorien:** Die Kategorienamen („Cells“, „Organs“, „Body Systems“ …) werden im Code auch zur Zuordnung verwendet. Eine Übersetzung muss Anzeige und interne Zuordnung trennen.

Weitere Feststellungen außerhalb der Fachprüfung, nur zur Kenntnis:
- **Lizenz der Modelle:** Die Modelle „Neuron“ und „Animal Cell“ stehen unter CC BY-NC-SA 4.0. „NC“ bedeutet: keine kommerzielle Nutzung. Ob der Einsatz im Angemeldetenbereich der AT-Medical-Akademie darunter fällt, ist eine rechtliche Frage und nur von Andreas zu entscheiden. Das Bakterienmodell steht unter CC0 und ist unproblematisch.
- **Herkunft der Modelle:** Die Modelle der Pflanzenzelle und des Leukozyten sind laut `cells.ts` lokale Dateien („local:/Users/lank/Downloads/…“) ohne Quellen- und Lizenzangabe (siehe U06).
