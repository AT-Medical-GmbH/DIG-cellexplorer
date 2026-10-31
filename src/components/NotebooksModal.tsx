import { useState } from "react";
import { BookOpen } from "lucide-react";
import { getCellById, type CellItem } from "../data/cells";
import { loadNotes, saveNote, type NotesMap } from "../lib/storage";
import { MiniCell } from "./MiniCell";
import { Modal } from "./Modal";

type NotebooksModalProps = {
  open: boolean;
  currentCell: CellItem;
  onSelect: (id: string) => void;
  onClose: () => void;
};

export function NotebooksModal({ open, currentCell, onSelect, onClose }: NotebooksModalProps) {
  const [notes, setNotes] = useState<NotesMap>(() => loadNotes());
  const [draft, setDraft] = useState(() => loadNotes()[currentCell.id] ?? "");

  const otherNoteIds = Object.keys(notes).filter((id) => id !== currentCell.id && notes[id]?.trim());

  function persist() {
    setNotes(saveNote(currentCell.id, draft));
  }

  return (
    <Modal open={open} onClose={onClose} label="Notizbücher" panelClassName="browser-modal notebooks-modal">
        <div className="browser-head">
          <div>
            <h3>
              <BookOpen size={20} /> Notizbücher
            </h3>
            <p>Persönliche Notizen je Präparat, nur in diesem Browser gespeichert.</p>
          </div>
        </div>

        <div className="notebook-editor">
          <div className="notebook-editor-head">
            <MiniCell cell={currentCell} />
            <div>
              <strong>{currentCell.name}</strong>
              <span>{currentCell.type}</span>
            </div>
          </div>
          <textarea
            className="notebook-textarea"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={persist}
            placeholder={`Notizen zu „${currentCell.name}“ …`}
            aria-label={`Notizen zu ${currentCell.name}`}
          />
          <div className="notebook-actions">
            <button type="button" className="quiz-primary" onClick={persist}>
              Notiz speichern
            </button>
            <button
              type="button"
              className="quiz-secondary"
              onClick={() => {
                setDraft("");
                setNotes(saveNote(currentCell.id, ""));
              }}
            >
              Leeren
            </button>
          </div>
        </div>

        {otherNoteIds.length > 0 && (
          <div className="browser-section">
            <div className="browser-section-title">
              Weitere Notizen
              <span className="browser-section-count">{otherNoteIds.length}</span>
            </div>
            <div className="notebook-list">
              {otherNoteIds.map((id) => {
                const cell = getCellById(id);
                return (
                  <button
                    key={id}
                    type="button"
                    className="notebook-list-item"
                    onClick={() => {
                      onSelect(id);
                      onClose();
                    }}
                    title={`${cell.name} öffnen`}
                  >
                    <MiniCell cell={cell} />
                    <span className="notebook-list-copy">
                      <strong>{cell.name}</strong>
                      <span>{notes[id]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
    </Modal>
  );
}
