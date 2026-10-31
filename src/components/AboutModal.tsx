import { Sparkles } from "lucide-react";
import { cells } from "../data/cells";
import { Modal } from "./Modal";

/** Models with a verifiable public source — these need visible attribution. */
const creditedModels = cells.filter(
  (cell) => cell.modelAsset && cell.modelAsset.sourceUrl.startsWith("https://"),
);

export function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label="Über diese Anwendung" panelClassName="about-modal">
      <div className="about-head">
        <span className="brand-orb" aria-hidden="true">
          <Sparkles size={24} />
        </span>
        <div>
          <h3>Cell Explorer</h3>
          <p>Das Leben auf mikroskopischer Ebene in interaktivem 3D erkunden.</p>
        </div>
      </div>

      <dl className="about-list">
        <div>
          <dt>Präparate</dt>
          <dd>
            {cells.length} interaktive 3D-Präparate: Pflanzen-, Tier- und Bakterienzelle, weiße Blutzelle,
            Neuron, Epithel- und Muskelzelle.
          </dd>
        </div>
        <div>
          <dt>3D-Modelle</dt>
          <dd>
            Bezogen von{" "}
            <a href="https://3d.nih.gov" target="_blank" rel="noopener noreferrer">
              NIH 3D Print Exchange
            </a>
            . Die Lizenzen unterscheiden sich je Eintrag:
            <ul className="about-credits">
              {creditedModels.map((cell) => {
                const asset = cell.modelAsset!;
                return (
                  <li key={cell.id}>
                    <a href={asset.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {cell.name}
                    </a>
                    {asset.author ? ` von ${asset.author}` : ""}
                    {asset.licence ? (
                      <>
                        {" — "}
                        {asset.licenceUrl ? (
                          <a href={asset.licenceUrl} target="_blank" rel="noopener noreferrer">
                            {asset.licence}
                          </a>
                        ) : (
                          asset.licence
                        )}
                      </>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            Präparate ohne aufgeführtes Modell werden vereinfacht dargestellt.
          </dd>
        </div>
        <div>
          <dt>Darstellung</dt>
          <dd>
            React + Three.js (React Three Fiber) mit HDR-Studiobeleuchtung, ACES-Tonemapping
            und meshopt-komprimierten Daten.
          </dd>
        </div>
        <div>
          <dt>Quiz</dt>
          <dd>
            Präparate erkennen im entspannten Modus, auf Zeit, per Eintippen oder im Überlebensmodus.
            Ergebnisse und Verlauf werden nur lokal in Ihrem Browser gespeichert.
          </dd>
        </div>
      </dl>

      <p className="about-foot">
        Lernangebot der AT Medical GmbH. Nicht für Diagnostik, Therapie oder klinische Entscheidungen.
        Basiert auf{" "}
        <a
          href="https://github.com/cclank/cell-architecture-studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cell Architecture Studio
        </a>{" "}
        von cclank (MIT-Lizenz).
      </p>
    </Modal>
  );
}
