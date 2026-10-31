// Resolves a path under public/ against the configured deploy base
// (VITE_BASE_PATH, default "/"), so the app also works under a sub-path.
const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export type ModelKind =
  | "plant"
  | "whiteBlood"
  | "neuron"
  | "epithelial"
  | "bacteria"
  | "animal"
  | "muscle";

export type ViewMode = "mesh" | "focus";

export type OrganelleItem = {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  attributes: Array<{
    label: string;
    value: string;
  }>;
  note: string;
  fact: string;
};

export type CellModelAsset = {
  url: string;
  previewUrl: string;
  sourceLabel: string;
  sourceUrl: string;
  /** Creator as named by the source entry (required for CC BY attribution). */
  author?: string;
  /** Licence as verified on the source entry page (see docs/ASSET_REVIEW.md). */
  licence?: string;
  licenceUrl?: string;
  scale: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  exposure?: number;
  materialMode?: "studio" | "native" | "solid";
};

export type CellRenderImage = {
  url: string;
  aspect: "square" | "wide" | "landscape";
};

export type CellItem = {
  id: string;
  name: string;
  /** Alternative names accepted in the quiz "type it" mode. */
  aliases?: string[];
  type: string;
  accent: string;
  accentSoft: string;
  color: string;
  modelKind: ModelKind;
  defaultOrganelle: string;
  comparison: string;
  clinicalContext: string;
  modelAsset?: CellModelAsset;
  renderImage?: CellRenderImage;
  occurrence: {
    title: string;
    body: string;
    motif: string;
  };
  microscope: Array<{
    label: string;
    tone: string;
    pattern: string;
  }>;
  organelles: OrganelleItem[];
};

export const cells: CellItem[] = [
  {
    id: "plant",
    name: "Pflanzenzelle",
    aliases: ["Pflanzliche Zelle"],
    type: "Eukaryotische Zelle",
    accent: "#4f8a3f",
    accentSoft: "#e5f1d8",
    color: "#81b64b",
    modelKind: "plant",
    defaultOrganelle: "nucleus",
    comparison: "animal",
    clinicalContext:
      "Eine nützliche nicht-menschliche Vergleichsbasis, um zu zeigen, warum Zellwände und Chloroplasten in menschlichen Gewebeproben fehlen.",
    renderImage: {
      url: assetUrl("cell-renders-transparent/plant.png"),
      aspect: "square",
    },
    modelAsset: {
      url: assetUrl("models/plant-cell-first001.glb"),
      previewUrl: assetUrl("cell-renders-transparent/plant.png"),
      sourceLabel: "User Plant Cell GLB first001",
      sourceUrl: "local:/Users/lank/Downloads/first001.glb",
      scale: 2.36,
      rotation: [0.08, -1.42, -0.02],
      exposure: 1.08,
      materialMode: "native",
    },
    occurrence: {
      title: "Blätter, Stängel, Wurzeln",
      body: "Pflanzenzellen bilden Gewebe, die Energie speichern, Wasser transportieren und Sonnenlicht in Zucker umwandeln.",
      motif: "leaf",
    },
    microscope: [
      { label: "Lichtmikroskop", tone: "#b9d48a", pattern: "plant-light" },
      { label: "Gefärbtes Präparat", tone: "#cf8cc2", pattern: "plant-stain" },
      { label: "Elektronenmikroskop", tone: "#9a9a8e", pattern: "electron" },
    ],
    organelles: [
      {
        id: "nucleus",
        name: "Zellkern",
        subtitle: "Die Steuerzentrale",
        color: "#7047a8",
        attributes: [
          { label: "Größe", value: "5 bis 10 µm Durchmesser" },
          { label: "Lage", value: "Meist zentral" },
          { label: "Im Lichtmikroskop sichtbar", value: "Ja" },
        ],
        note:
          "Der Zellkern ist von einer Doppelmembran, der Kernhülle, umgeben. Sie enthält Poren, die den Transport von Molekülen regulieren.",
        fact: "Der Zellkern gehört zu den ersten entdeckten Zellstrukturen.",
      },
      {
        id: "chloroplast",
        name: "Chloroplast",
        subtitle: "Der Lichtsammler",
        color: "#5fa842",
        attributes: [
          { label: "Funktion", value: "Photosynthese" },
          { label: "Pigment", value: "Chlorophyll" },
          { label: "Im Lichtmikroskop sichtbar", value: "Oft" },
        ],
        note:
          "Chloroplasten wandeln Lichtenergie in chemische Energie um und verleihen vielen Pflanzengeweben ihre grüne Farbe.",
        fact: "Eine einzelne Blattzelle kann Dutzende Chloroplasten enthalten.",
      },
      {
        id: "vacuole",
        name: "Vakuole",
        subtitle: "Der Druckspeicher",
        color: "#62bdd2",
        attributes: [
          { label: "Volumen", value: "Großer zentraler Raum" },
          { label: "Inhalt", value: "Wasser und gelöste Stoffe" },
          { label: "Funktion", value: "Turgorstütze" },
        ],
        note:
          "Die zentrale Vakuole speichert Wasser, Ionen und kleine Moleküle und hilft der Pflanzenzelle, prall zu bleiben.",
        fact: "Vakuolen können den größten Teil einer ausgewachsenen Pflanzenzelle einnehmen.",
      },
      {
        id: "cellWall",
        name: "Zellwand",
        subtitle: "Der feste Rahmen",
        color: "#7aa647",
        attributes: [
          { label: "Material", value: "Reich an Cellulose" },
          { label: "Position", value: "Äußere Begrenzung" },
          { label: "Funktion", value: "Schutz" },
        ],
        note:
          "Die Zellwand gibt Pflanzenzellen ihre regelmäßige Form und schützt die darunterliegende Membran.",
        fact: "Zellwände helfen Pflanzen, ohne Skelett aufrecht zu stehen.",
      },
    ],
  },
  {
    id: "whiteBlood",
    name: "Weiße Blutzelle",
    aliases: ["Leukozyt", "Weißes Blutkörperchen", "Leukozyten"],
    type: "Immunzelle",
    accent: "#6d78a8",
    accentSoft: "#e6eaf7",
    color: "#b9bfd7",
    modelKind: "whiteBlood",
    defaultOrganelle: "lysosome",
    comparison: "epithelial",
    clinicalContext:
      "Die Morphologie von Immunzellen verbindet die Zellbiologie mit der klinischen Beurteilung von Infektion, Entzündung und Blutausstrichen.",
    renderImage: {
      url: assetUrl("cell-renders-transparent/white-blood.png"),
      aspect: "square",
    },
    modelAsset: {
      url: assetUrl("models/white-blood-cell-user.glb"),
      previewUrl: assetUrl("cell-renders-transparent/white-blood.png"),
      sourceLabel: "User White Blood Cell GLB",
      sourceUrl: "local:/Users/lank/Downloads/second.glb",
      scale: 3.18,
      rotation: [0.02, -0.18, 0],
      exposure: 1.08,
      materialMode: "native",
    },
    occurrence: {
      title: "Blut, Lymphe, Gewebe",
      body: "Weiße Blutzellen wandern durch Blut und Gewebe, erkennen Bedrohungen und koordinieren die Immunabwehr.",
      motif: "blood",
    },
    microscope: [
      { label: "Lichtmikroskop", tone: "#ded6e9", pattern: "blood-light" },
      { label: "Gefärbtes Präparat", tone: "#9c73be", pattern: "blood-stain" },
      { label: "Elektronenmikroskop", tone: "#8f8f91", pattern: "electron" },
    ],
    organelles: [
      {
        id: "lysosome",
        name: "Lysosom",
        subtitle: "Das Reinigungsbläschen",
        color: "#8b54b7",
        attributes: [
          { label: "Größe", value: "Etwa 1 µm" },
          { label: "Inhalt", value: "Verdauungsenzyme" },
          { label: "Funktion", value: "Abbau" },
        ],
        note:
          "Lysosomen helfen Immunzellen, aufgenommenes Material zu verdauen und verbrauchte Zellbestandteile zu verwerten.",
        fact: "Weiße Blutzellen sind bei der Abwehr stark auf Vesikel angewiesen.",
      },
      {
        id: "nucleus",
        name: "Gelappter Zellkern",
        subtitle: "Der flexible Erbgut-Tresor",
        color: "#6f35a1",
        attributes: [
          { label: "Form", value: "Oft gelappt" },
          { label: "Lage", value: "Zentral" },
          { label: "Im Lichtmikroskop sichtbar", value: "Ja, mit Färbung" },
        ],
        note:
          "Viele weiße Blutzellen haben einen gelappten Zellkern, der ihnen hilft, sich durch enge Spalten zu zwängen.",
        fact: "Die Kernform ist ein Hinweis, um Typen von Immunzellen zu unterscheiden.",
      },
      {
        id: "granules",
        name: "Granula",
        subtitle: "Die chemischen Päckchen",
        color: "#c06696",
        attributes: [
          { label: "Inhalt", value: "Proteine und Enzyme" },
          { label: "Aufgabe", value: "Abwehr" },
          { label: "Sichtbarkeit", value: "Färbungsabhängig" },
        ],
        note:
          "Granula speichern Moleküle, mit denen Immunzellen schnell auf Infektion oder Entzündung reagieren können.",
        fact: "Manche Immunzellen sind nach der Anfärbbarkeit ihrer Granula benannt.",
      },
    ],
  },
  {
    id: "neuron",
    name: "Neuron",
    aliases: ["Nervenzelle", "Neurone"],
    type: "Nervenzelle",
    accent: "#6578b5",
    accentSoft: "#e4e9f8",
    color: "#8c91d0",
    modelKind: "neuron",
    defaultOrganelle: "axon",
    comparison: "muscle",
    clinicalContext:
      "Die Form von Neuronen hilft, den Zellaufbau mit klinischer Neuroanatomie, Reflexen, Sinnesempfindung und motorischer Signalübertragung zu verbinden.",
    renderImage: {
      url: assetUrl("cell-renders-transparent/neuron.png"),
      aspect: "wide",
    },
    modelAsset: {
      url: assetUrl("models/neuron-nih.glb"),
      previewUrl: assetUrl("nih-previews/neuron-nih.png"),
      sourceLabel: "NIH 3D · Neuron (destacados tv, CC BY-NC-SA 4.0)",
      sourceUrl: "https://3d.nih.gov/entries/3DPX-015796",
      author: "destacados tv",
      licence: "CC BY-NC-SA 4.0",
      licenceUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
      scale: 3.15,
      rotation: [0.18, -0.24, -0.18],
      position: [0, 0.05, 0],
      exposure: 1.05,
    },
    occurrence: {
      title: "Gehirn, Rückenmark, Nerven",
      body: "Neuronen leiten elektrische und chemische Signale durch weit verzweigte Netzwerke.",
      motif: "nerve",
    },
    microscope: [
      { label: "Lichtmikroskop", tone: "#c9c4ed", pattern: "neuron-light" },
      { label: "Gefärbtes Präparat", tone: "#dc99cc", pattern: "neuron-stain" },
      { label: "Elektronenmikroskop", tone: "#8e8e94", pattern: "electron" },
    ],
    organelles: [
      {
        id: "axon",
        name: "Axon",
        subtitle: "Die Signalautobahn",
        color: "#6b7dc6",
        attributes: [
          { label: "Länge", value: "µm bis über 1 Meter" },
          { label: "Isolation", value: "Myelinscheide" },
          { label: "Im Lichtmikroskop sichtbar", value: "Ja, mit Färbung" },
        ],
        note:
          "Manche Axone im menschlichen Körper reichen von der Wirbelsäule bis zum Fuß. Neuronen gehören damit zu den längsten Zellen überhaupt.",
        fact: "Ein Nervenimpuls kann sich mit über 100 Metern pro Sekunde ausbreiten.",
      },
      {
        id: "soma",
        name: "Soma",
        subtitle: "Der Zellkörper",
        color: "#7c52b7",
        attributes: [
          { label: "Enthält", value: "Zellkern" },
          { label: "Funktion", value: "Stoffwechselzentrum" },
          { label: "Form", value: "Rundlich" },
        ],
        note:
          "Das Soma erhält das Neuron am Leben und verrechnet die Signale, die von den verzweigten Dendriten eintreffen.",
        fact: "Die meisten Proteine eines Neurons werden im oder nahe beim Soma gebildet.",
      },
      {
        id: "dendrites",
        name: "Dendriten",
        subtitle: "Die empfangenden Äste",
        color: "#7d9bcf",
        attributes: [
          { label: "Form", value: "Verzweigt" },
          { label: "Funktion", value: "Eingang" },
          { label: "Oberfläche", value: "Oft mit Dornfortsätzen" },
        ],
        note:
          "Dendriten vergrößern die Oberfläche, an der Signale anderer Zellen empfangen werden können.",
        fact: "Ein einzelnes Neuron kann Tausende synaptische Eingänge empfangen.",
      },
    ],
  },
  {
    id: "epithelial",
    name: "Epithelzelle",
    aliases: ["Epithel"],
    type: "Zelle des menschlichen Gewebes",
    accent: "#a56d7f",
    accentSoft: "#f4e2e7",
    color: "#d79baa",
    modelKind: "epithelial",
    defaultOrganelle: "microvilli",
    comparison: "animal",
    clinicalContext:
      "Epithelpolarität und Tight Junctions machen diesen Zelltyp zentral für Barrieren, Resorption und die Beurteilung histologischer Schnitte.",
    renderImage: {
      url: assetUrl("cell-renders-transparent/epithelial.png"),
      aspect: "square",
    },
    occurrence: {
      title: "Haut, Darm, Atemwege",
      body: "Epithelzellen bilden im ganzen Körper schützende Zellschichten und Resorptionsflächen.",
      motif: "surface",
    },
    microscope: [
      { label: "Lichtmikroskop", tone: "#e6a4bd", pattern: "tissue-light" },
      { label: "Gefärbtes Präparat", tone: "#cb72a4", pattern: "tissue-stain" },
      { label: "Elektronenmikroskop", tone: "#989899", pattern: "electron" },
    ],
    organelles: [
      {
        id: "microvilli",
        name: "Mikrovilli",
        subtitle: "Der Resorptionssaum",
        color: "#c86f80",
        attributes: [
          { label: "Länge", value: "0,5 bis 1 µm" },
          { label: "Lage", value: "Apikale Oberfläche" },
          { label: "Funktion", value: "Oberflächenvergrößerung" },
        ],
        note:
          "Mikrovilli vergrößern die Oberfläche für Resorption und Sekretion entlang von Epithelschichten.",
        fact: "Die Mikrovilli im Darm bilden einen dichten Bürstensaum.",
      },
      {
        id: "junctions",
        name: "Tight Junctions",
        subtitle: "Die dichten Nähte",
        color: "#9f6cbd",
        attributes: [
          { label: "Position", value: "Zwischen den Zellen" },
          { label: "Funktion", value: "Barriere" },
          { label: "Sichtbarkeit", value: "Besser im Elektronenmikroskop" },
        ],
        note:
          "Tight Junctions verbinden benachbarte Epithelzellen und steuern, was zwischen ihnen hindurchtreten kann.",
        fact: "Epithelbarrieren sind für die Abgrenzung von Organen unverzichtbar.",
      },
      {
        id: "nucleus",
        name: "Zellkern",
        subtitle: "Der Anweisungsspeicher",
        color: "#7a4aa2",
        attributes: [
          { label: "Position", value: "Basal bis zentral" },
          { label: "Form", value: "Oval" },
          { label: "Im Lichtmikroskop sichtbar", value: "Ja" },
        ],
        note:
          "Der Zellkern der Epithelzelle speichert die Erbinformation und liegt je nach Gewebeform an unterschiedlicher Stelle.",
        fact: "Die Kernform hilft Pathologen bei der Beurteilung von Gewebeproben.",
      },
    ],
  },
  {
    id: "bacteria",
    name: "Bakterienzelle",
    aliases: ["Bakterium", "Bakterien", "Bakterielle Zelle"],
    type: "Prokaryotische Zelle",
    accent: "#48a77d",
    accentSoft: "#dbf1e7",
    color: "#65b8ae",
    modelKind: "bacteria",
    defaultOrganelle: "nucleoid",
    comparison: "animal",
    clinicalContext:
      "Der Aufbau der Zellwand führt klinisch relevant von der Mikroskopie und der Gram-Färbung zu den Wirkmechanismen antibakterieller Substanzen.",
    renderImage: {
      url: assetUrl("cell-renders-transparent/bacteria.png"),
      aspect: "landscape",
    },
    modelAsset: {
      url: assetUrl("models/bacteria-wall-nih.glb"),
      previewUrl: assetUrl("nih-previews/bacteria-wall-nih.png"),
      sourceLabel: "NIH 3D · Gram Positive Bacterial Cell Wall Model (Model3D, CC0 1.0)",
      sourceUrl: "https://3d.nih.gov/entries/3DPX-010752",
      author: "Model3D",
      licence: "CC0 1.0 (Public Domain)",
      licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      scale: 0.00185,
      rotation: [0.08, -0.44, -0.08],
      position: [0, -0.1, 0],
      exposure: 1.1,
    },
    occurrence: {
      title: "Boden, Wasser, Darm, Haut",
      body: "Bakterien leben in nahezu jeder Umgebung und können als selbstständige Einzelzellen existieren.",
      motif: "microbe",
    },
    microscope: [
      { label: "Lichtmikroskop", tone: "#c7b8eb", pattern: "bacteria-light" },
      { label: "Gefärbtes Präparat", tone: "#dc6e96", pattern: "bacteria-stain" },
      { label: "Elektronenmikroskop", tone: "#8c8c8c", pattern: "electron" },
    ],
    organelles: [
      {
        id: "nucleoid",
        name: "Nukleoid",
        subtitle: "Das nackte Erbgut",
        color: "#7a43ad",
        attributes: [
          { label: "Größe", value: "Bereich von etwa 1 µm" },
          { label: "Membran", value: "Keine" },
          { label: "Im Lichtmikroskop sichtbar", value: "Nein, nur im Elektronenmikroskop" },
        ],
        note:
          "Anders als eukaryotische Zellen haben Bakterien keine Kernhülle. Ihre DNA liegt in einem Bereich des Zytoplasmas, dem Nukleoid.",
        fact: "Im menschlichen Körper leben mehr Bakterienzellen, als viele vermuten.",
      },
      {
        id: "cellWall",
        name: "Zellwand",
        subtitle: "Die Schutzhülle",
        color: "#55aa89",
        attributes: [
          { label: "Material", value: "Peptidoglykan" },
          { label: "Funktion", value: "Form und Schutz" },
          { label: "Position", value: "Außerhalb der Membran" },
        ],
        note:
          "Die bakterielle Zellwand hilft den Zellen, Druck standzuhalten, und gibt vielen Arten ihre charakteristische Form.",
        fact: "Die Gram-Färbung macht Unterschiede im Aufbau der Bakterienzellwand sichtbar.",
      },
      {
        id: "flagellum",
        name: "Geißel",
        subtitle: "Der Schwimmschwanz",
        color: "#b87438",
        attributes: [
          { label: "Funktion", value: "Fortbewegung" },
          { label: "Form", value: "Schraubenförmiges Filament" },
          { label: "Im Lichtmikroskop sichtbar", value: "Spezialfärbung" },
        ],
        note:
          "Manche Bakterien drehen ihre Geißeln wie winzige Motoren, um sich durch Flüssigkeiten zu bewegen.",
        fact: "Bakterielle Geißeln werden durch Ionengradienten angetrieben.",
      },
    ],
  },
  {
    id: "animal",
    name: "Tierzelle",
    aliases: ["Tierische Zelle"],
    type: "Eukaryotische Zelle",
    accent: "#9b74b7",
    accentSoft: "#efe5f6",
    color: "#9db6dc",
    modelKind: "animal",
    defaultOrganelle: "mitochondrion",
    comparison: "plant",
    clinicalContext:
      "Dieses allgemeine eukaryotische Modell hilft, die Funktionen der Organellen zu verankern, bevor sie auf menschliche Gewebe und Krankheitsmechanismen übertragen werden.",
    renderImage: {
      url: assetUrl("cell-renders-transparent/animal.png"),
      aspect: "square",
    },
    modelAsset: {
      url: assetUrl("models/animal-cell-nih.glb"),
      previewUrl: assetUrl("nih-previews/animal-cell-nih.png"),
      sourceLabel: "NIH 3D · Animal Cell (destacados tv, CC BY-NC-SA 4.0)",
      sourceUrl: "https://3d.nih.gov/entries/3DPX-015797",
      author: "destacados tv",
      licence: "CC BY-NC-SA 4.0",
      licenceUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
      scale: 0.044,
      rotation: [0.24, -0.08, 0.03],
      position: [0, -0.03, 0],
      exposure: 1.12,
    },
    occurrence: {
      title: "Tierische Gewebe",
      body: "Tierzellen bilden flexible Gewebe mit Membranen, inneren Organellen und spezialisierten Strukturen zur Signalübertragung.",
      motif: "animal",
    },
    microscope: [
      { label: "Lichtmikroskop", tone: "#d9a7c7", pattern: "animal-light" },
      { label: "Gefärbtes Präparat", tone: "#b889da", pattern: "animal-stain" },
      { label: "Elektronenmikroskop", tone: "#8b8b8d", pattern: "electron" },
    ],
    organelles: [
      {
        id: "mitochondrion",
        name: "Mitochondrium",
        subtitle: "Der Energiewandler",
        color: "#cf6f42",
        attributes: [
          { label: "Länge", value: "1 bis 10 µm" },
          { label: "Membran", value: "Doppelt" },
          { label: "Funktion", value: "ATP-Produktion" },
        ],
        note:
          "Mitochondrien wandeln Nährstoffmoleküle über ihre gefalteten inneren Membranen in nutzbare Zellenergie um.",
        fact: "Mitochondrien besitzen ein eigenes kleines DNA-Genom.",
      },
      {
        id: "nucleus",
        name: "Zellkern",
        subtitle: "Die Kommandozentrale",
        color: "#7a49b0",
        attributes: [
          { label: "Form", value: "Rundlich" },
          { label: "Membran", value: "Doppelt" },
          { label: "Im Lichtmikroskop sichtbar", value: "Ja" },
        ],
        note:
          "Der Zellkern enthält die Chromosomen und steuert, welche Gene in einer Zelle aktiv sind.",
        fact: "Nicht alle tierischen Zellen behalten ihren Zellkern. Reife rote Blutkörperchen verlieren ihn.",
      },
      {
        id: "golgi",
        name: "Golgi-Apparat",
        subtitle: "Der Verpackungsstapel",
        color: "#d49057",
        attributes: [
          { label: "Form", value: "Abgeflachte Stapel" },
          { label: "Funktion", value: "Modifizieren und sortieren" },
          { label: "Position", value: "Nahe am Zellkern" },
        ],
        note:
          "Der Golgi-Apparat modifiziert und sortiert Proteine und Lipide und versendet sie an ihre Zielorte.",
        fact: "Sekretorische Zellen haben oft einen auffällig ausgeprägten Golgi-Apparat.",
      },
    ],
  },
  {
    id: "muscle",
    name: "Muskelzelle",
    aliases: ["Muskelfaser", "Myozyt"],
    type: "Muskelfaser",
    accent: "#bd514d",
    accentSoft: "#f5dfdc",
    color: "#ca6678",
    modelKind: "muscle",
    defaultOrganelle: "myofibril",
    comparison: "neuron",
    clinicalContext:
      "Der Aufbau der Muskelfaser verbindet die mikroskopische Struktur mit Kontraktion, Ermüdung, Rehabilitation und neuromuskulären Erkrankungen.",
    renderImage: {
      url: assetUrl("cell-renders-transparent/muscle.png"),
      aspect: "wide",
    },
    occurrence: {
      title: "Skelettmuskulatur",
      body: "Muskelfasern enthalten sich wiederholende kontraktile Bündel, die sich verkürzen und so Kraft erzeugen.",
      motif: "muscle",
    },
    microscope: [
      { label: "Lichtmikroskop", tone: "#ef9aab", pattern: "muscle-light" },
      { label: "Gefärbtes Präparat", tone: "#c7508d", pattern: "muscle-stain" },
      { label: "Elektronenmikroskop", tone: "#8d8d8d", pattern: "electron" },
    ],
    organelles: [
      {
        id: "myofibril",
        name: "Myofibrille",
        subtitle: "Der kontrahierende Faden",
        color: "#bd3d51",
        attributes: [
          { label: "Durchmesser", value: "Etwa 1 µm" },
          { label: "Anordnung", value: "Quergestreifte Bündel" },
          { label: "Im Lichtmikroskop sichtbar", value: "Ja, mit Querstreifung" },
        ],
        note:
          "Jede Muskelfaser enthält Hunderte bis Tausende Myofibrillen, die über ihre gesamte Länge verlaufen und dicht gepackt sind.",
        fact: "Eine einzelne Muskelfaser kann bis zu 30 cm lang werden.",
      },
      {
        id: "sarcolemma",
        name: "Sarkolemm",
        subtitle: "Die erregbare Membran",
        color: "#d7b284",
        attributes: [
          { label: "Position", value: "Äußere Oberfläche" },
          { label: "Funktion", value: "Signalausbreitung" },
          { label: "Art", value: "Zellmembran" },
        ],
        note:
          "Das Sarkolemm leitet elektrische Signale, die in der gesamten Muskelfaser die Kontraktion auslösen.",
        fact: "Über die T-Tubuli gelangen Membransignale tief in die Fasern.",
      },
      {
        id: "mitochondria",
        name: "Mitochondrien",
        subtitle: "Die Ausdauerversorgung",
        color: "#cf7042",
        attributes: [
          { label: "Funktion", value: "Energieversorgung" },
          { label: "Position", value: "Zwischen den Fasern" },
          { label: "Dichte", value: "Aktivitätsabhängig" },
        ],
        note:
          "Muskelzellen brauchen viele Mitochondrien, weil die Kontraktion große Mengen ATP verbraucht.",
        fact: "Ausdauertraining kann die Dichte der Mitochondrien erhöhen.",
      },
    ],
  },
];

export function getCellById(id: string) {
  return cells.find((cell) => cell.id === id) ?? cells[0];
}

export type CellCategory =
  | "Zellen"
  | "Organe"
  | "Organsysteme"
  | "Knochen & Gelenke"
  | "Makromoleküle"
  | "Viren"
  | "Botanische Präparate";

export const CELL_CATEGORY_ORDER: CellCategory[] = [
  "Zellen",
  "Organe",
  "Organsysteme",
  "Knochen & Gelenke",
  "Makromoleküle",
  "Viren",
  "Botanische Präparate",
];

export function categorize(cell: CellItem): CellCategory {
  const t = cell.type.toLowerCase();
  if (t.includes("virus") || t.includes("viren")) return "Viren";
  if (t.includes("botan") || t.includes("pollen")) return "Botanische Präparate";
  if (t.includes("makromolek")) return "Makromoleküle";
  if (t.includes("knochen") || t.includes("gelenk")) return "Knochen & Gelenke";
  if (t.includes("system")) return "Organsysteme";
  if (t.includes("zelle") || t.includes("faser")) return "Zellen";
  if (t.includes("organ")) return "Organe";
  return "Zellen";
}
