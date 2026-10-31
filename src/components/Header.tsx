import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Gamepad2,
  Grid3X3,
  Info,
  Layers,
  Library,
  type LucideIcon,
} from "lucide-react";
import type { CellItem } from "../data/cells";
import type { Progress } from "../lib/progression";
import { UserMenu } from "./UserMenu";
import { XpBar } from "./XpBar";

type HeaderProps = {
  cell: CellItem;
  favoritesCount: number;
  exploredCount: number;
  totalCount: number;
  progress: Progress;
  xpPulse: number;
  onPlayQuiz: () => void;
  onAbout: () => void;
  onGallery: () => void;
  onLibrary: () => void;
  onNotebooks: () => void;
  onFlashcards: () => void;
  onAchievements: () => void;
  accentId: string;
  onAccentChange: (id: string) => void;
  onReplayIntro: () => void;
  onClearFavorites: () => void;
  onResetAll: () => void;
};

export function Header({
  cell,
  favoritesCount,
  exploredCount,
  totalCount,
  progress,
  xpPulse,
  onPlayQuiz,
  onAbout,
  onGallery,
  onLibrary,
  onNotebooks,
  onFlashcards,
  onAchievements,
  accentId,
  onAccentChange,
  onReplayIntro,
  onClearFavorites,
  onResetAll,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems: { id: string; label: string; Icon: LucideIcon; onClick: () => void }[] = [
    { id: "gallery", label: "Galerie", Icon: Grid3X3, onClick: onGallery },
    { id: "library", label: "Bibliothek", Icon: Library, onClick: onLibrary },
    { id: "cards", label: "Karten", Icon: Layers, onClick: onFlashcards },
    { id: "notebooks", label: "Notizbücher", Icon: BookOpen, onClick: onNotebooks },
    { id: "about", label: "Info", Icon: Info, onClick: onAbout },
  ];

  return (
    <header className="topbar">
      <div className="brand-block">
        <img
          className="brand-logo"
          src={`${import.meta.env.BASE_URL}favicon.svg`}
          alt="AT Medical"
          width={52}
          height={52}
        />
        <div>
          <h1>Cell Explorer</h1>
          <p>Zellbiologie in 3D erkunden</p>
        </div>
      </div>

      <nav className="top-nav" aria-label="Hauptnavigation">
        <XpBar progress={progress} pulse={xpPulse} />
        {navItems.map(({ id, label, Icon, onClick }) => (
          <button key={id} type="button" onClick={onClick} aria-label={label} title={label}>
            <Icon size={24} />
            <span>{label}</span>
          </button>
        ))}
        <button className="quiz-launch" type="button" onClick={onPlayQuiz} aria-label="Quiz" title="Quiz">
          <Gamepad2 size={22} />
          <span>Quiz</span>
        </button>
        <div className="avatar-wrap">
          <button
            className="avatar-button"
            type="button"
            aria-label="Benutzermenü"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="avatar-core" style={{ background: cell.accentSoft }}>
              <span style={{ background: cell.accent }} />
            </span>
            <ChevronDown size={20} />
          </button>
          <UserMenu
            open={menuOpen}
            favoritesCount={favoritesCount}
            exploredCount={exploredCount}
            totalCount={totalCount}
            accentId={accentId}
            onAccentChange={onAccentChange}
            onReplayIntro={() => {
              onReplayIntro();
              setMenuOpen(false);
            }}
            onAchievements={() => {
              onAchievements();
              setMenuOpen(false);
            }}
            onClearFavorites={() => {
              onClearFavorites();
              setMenuOpen(false);
            }}
            onResetAll={() => {
              onResetAll();
              setMenuOpen(false);
            }}
            onClose={() => setMenuOpen(false)}
          />
        </div>
      </nav>
    </header>
  );
}
