import { useEffect, useRef } from "react";
import { Check, Compass, RotateCcw, Star, Trash2, Trophy } from "lucide-react";
import { ACCENTS } from "../lib/theme";

type UserMenuProps = {
  open: boolean;
  favoritesCount: number;
  exploredCount: number;
  totalCount: number;
  accentId: string;
  onAccentChange: (id: string) => void;
  onReplayIntro: () => void;
  onAchievements: () => void;
  onClearFavorites: () => void;
  onResetAll: () => void;
  onClose: () => void;
};

export function UserMenu({
  open,
  favoritesCount,
  exploredCount,
  totalCount,
  accentId,
  onAccentChange,
  onReplayIntro,
  onAchievements,
  onClearFavorites,
  onResetAll,
  onClose,
}: UserMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="user-menu" ref={ref} role="menu">
      <div className="user-menu-stats">
        <div>
          <strong>{exploredCount}</strong>
          <span>von {totalCount} erkundet</span>
        </div>
        <div>
          <strong>{favoritesCount}</strong>
          <span>Favoriten</span>
        </div>
      </div>
      <div className="user-menu-theme">
        <span className="user-menu-theme-label">Akzentfarbe</span>
        <div className="user-menu-swatches">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`user-menu-swatch ${accentId === a.id ? "is-active" : ""}`}
              style={{ background: a.accent }}
              onClick={() => onAccentChange(a.id)}
              aria-label={a.name}
              title={a.name}
            >
              {accentId === a.id && <Check size={13} />}
            </button>
          ))}
        </div>
      </div>
      <button type="button" className="user-menu-item" role="menuitem" onClick={onAchievements}>
        <Trophy size={16} />
        Erfolge
      </button>
      <button type="button" className="user-menu-item" role="menuitem" onClick={onReplayIntro}>
        <Compass size={16} />
        Einführung wiederholen
      </button>
      <button type="button" className="user-menu-item" role="menuitem" onClick={onClearFavorites}>
        <Star size={16} />
        Favoriten löschen
      </button>
      <button type="button" className="user-menu-item is-danger" role="menuitem" onClick={onResetAll}>
        <Trash2 size={16} />
        Alle gespeicherten Daten zurücksetzen
      </button>
      <p className="user-menu-foot">
        <RotateCcw size={12} /> Daten werden nur in diesem Browser gespeichert.
      </p>
    </div>
  );
}
