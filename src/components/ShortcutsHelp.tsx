import { Keyboard } from "lucide-react";
import { Modal } from "./Modal";

const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ["←", "→"], label: "Vorheriges / nächstes Präparat" },
  { keys: ["F"], label: "Favorit umschalten" },
  { keys: ["R"], label: "3D-Ansicht zurücksetzen" },
  { keys: ["Leertaste"], label: "Automatische Drehung umschalten" },
  { keys: ["S"], label: "Überraschung – zufälliges Präparat" },
  { keys: ["G"], label: "Galerie öffnen" },
  { keys: ["L"], label: "Bibliothek öffnen" },
  { keys: ["C"], label: "Lernkarten öffnen" },
  { keys: ["Q"], label: "Quiz starten" },
  { keys: ["?"], label: "Diese Hilfe anzeigen" },
  { keys: ["Esc"], label: "Jedes Fenster schließen" },
];

export function ShortcutsHelp({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label="Tastenkürzel" panelClassName="browser-modal shortcuts-modal">
      <div className="browser-head">
        <div>
          <h3>
            <Keyboard size={20} /> Keyboard shortcuts
          </h3>
          <p>Schneller arbeiten, ohne die Tastatur zu verlassen.</p>
        </div>
      </div>
      <ul className="shortcuts-list">
        {SHORTCUTS.map((s) => (
          <li key={s.label}>
            <span className="shortcut-keys">
              {s.keys.map((k) => (
                <kbd key={k}>{k}</kbd>
              ))}
            </span>
            <span className="shortcut-label">{s.label}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
