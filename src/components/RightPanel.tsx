import { Brain, Gauge, Heart, MessageCircle, Sparkles, Target } from "lucide-react";
import type { CSSProperties } from "react";
import { cells, getCellById, type CellItem } from "../data/cells";

type RightPanelProps = {
  cell: CellItem;
  activeOrganelle: string;
  favorites: Set<string>;
  mastery: number;
  viewedCellCount: number;
  viewedOrganelleCount: number;
  totalOrganelleCount: number;
  tutorPrompt: string;
  onToggleFavorite: (id: string) => void;
  onTutorPrompt: (prompt: string) => void;
};

function buildTutorPrompts(cell: CellItem, organelle: CellItem["organelles"][number]) {
  return [
    `Erklären Sie: Welche Aufgabe hat „${organelle.name}“ in der Zelle „${cell.name}“?`,
    `Nennen Sie drei sichtbare Unterschiede zwischen „${cell.name}“ und „${getCellById(cell.comparison).name}“.`,
    `Finden Sie „${organelle.name}“ im 3D-Modell und beschreiben Sie Form und Lage.`,
    `Verbinden Sie den Aufbau von „${cell.name}“ mit einer klinischen Beobachtung (nur zum Lernen, keine medizinische Beratung).`,
  ];
}

export function RightPanel({
  cell,
  activeOrganelle,
  favorites,
  mastery,
  viewedCellCount,
  viewedOrganelleCount,
  totalOrganelleCount,
  tutorPrompt,
  onToggleFavorite,
  onTutorPrompt,
}: RightPanelProps) {
  const organelle = cell.organelles.find((item) => item.id === activeOrganelle) ?? cell.organelles[0];
  const tutorPrompts = buildTutorPrompts(cell, organelle);

  return (
    <aside className="right-rail">
      <section className="panel details-panel">
        <div className="panel-heading detail-heading">
          <span>Organell-Details</span>
          <button
            type="button"
            onClick={() => onToggleFavorite(cell.id)}
            aria-label="Favorit umschalten"
            title={favorites.has(cell.id) ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"}
          >
            <Heart size={22} fill={favorites.has(cell.id) ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="detail-hero">
          <span className="organelle-orb" style={{ background: organelle.color }} />
          <div>
            <h3>{organelle.name}</h3>
            <p>{organelle.subtitle}</p>
          </div>
        </div>

        <dl className="attribute-list">
          {organelle.attributes.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
          <div>
            <dt>Beschriftung</dt>
            <dd>
              <span className="mini-toggle is-on" />
              <span className="detail-dot" style={{ background: organelle.color }} />
            </dd>
          </div>
        </dl>
      </section>

      <section className="panel notes-panel">
        <div className="panel-heading">
          <span>Biologische Hinweise</span>
        </div>
        <p>{organelle.note}</p>
        {cell.clinicalContext && (
          <div className="clinical-context">
            <span>Klinischer Bezug</span>
            <p>{cell.clinicalContext}</p>
          </div>
        )}
        <div className="fun-fact">
          <span>Wussten Sie? {organelle.fact}</span>
          <Sparkles size={18} />
        </div>
      </section>

      <section className="panel learning-panel">
        <div className="panel-heading">
          <span>
            <Brain size={17} />
            Lernimpulse
          </span>
        </div>

        <div className="mastery-meter" style={{ "--progress": `${mastery}%` } as CSSProperties}>
          <div>
            <Gauge size={18} />
            <span>Lernfortschritt</span>
            <strong>{mastery}%</strong>
          </div>
          <i>
            <b />
          </i>
          <small>
            {viewedCellCount}/{cells.length} Zellen erkundet · {viewedOrganelleCount}/{totalOrganelleCount} Organellen betrachtet
          </small>
        </div>

        <div className="lesson-focus">
          <span>
            <Target size={17} />
            Aktueller Lernfokus
          </span>
          <p>
            Finden Sie <strong>{organelle.name}</strong>, erklären Sie die Funktion und vergleichen Sie sie mit der entsprechenden Struktur bei{" "}
            {getCellById(cell.comparison).name}.
          </p>
        </div>

        <div className="tutor-prompt">
          <span>
            <MessageCircle size={17} />
            Ausgewählter Impuls
          </span>
          <p>{tutorPrompt}</p>
        </div>

        <div className="prompt-list">
          {tutorPrompts.map((prompt) => (
            <button type="button" key={prompt} onClick={() => onTutorPrompt(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
      </section>

      <section className="panel occurrence-panel">
        <div className="panel-heading">
          <span>Vorkommen</span>
        </div>
        <div className={`occurrence-art occurrence-${cell.occurrence.motif}`}>
          <span />
          <i />
          <b />
        </div>
        <h4>{cell.occurrence.title}</h4>
        <p>{cell.occurrence.body}</p>
      </section>
    </aside>
  );
}
