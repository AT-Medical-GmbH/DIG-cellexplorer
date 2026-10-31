import { Box, Camera, CircleDot, EyeOff, Maximize, RotateCcw, type LucideIcon } from "lucide-react";
import type { CellItem, ViewMode } from "../data/cells";
import { captureScreenshot, exportGlb, toggleFullscreen } from "../lib/download";
import { CellScene } from "./CellScene";

type ModeOption = { id: ViewMode; label: string; Icon: LucideIcon };

const modeOptions: ModeOption[] = [
  { id: "mesh", label: "Netz", Icon: Box },
  { id: "focus", label: "Fokus", Icon: CircleDot },
];

type StageProps = {
  cell: CellItem;
  activeOrganelle: string;
  viewMode: ViewMode;
  crossSection: boolean;
  autoRotate: boolean;
  resetKey: number;
  onModeChange: (mode: ViewMode) => void;
  onCrossSectionChange: (value: boolean) => void;
  onAutoRotateChange: (value: boolean) => void;
  onReset: () => void;
  onToast: (message: string) => void;
};

export function Stage({
  cell,
  activeOrganelle,
  viewMode,
  crossSection,
  autoRotate,
  resetKey,
  onModeChange,
  onCrossSectionChange,
  onAutoRotateChange,
  onReset,
  onToast,
}: StageProps) {
  return (
    <main className="stage-column">
      <section className="stage-panel">
        <div className="stage-title">
          <div key={cell.id} className="stage-title-copy">
            <h2>{cell.name}</h2>
            <p>{cell.type}</p>
          </div>

          <div className="view-card">
            <span>Ansichtsmodus</span>
            <div className="mode-switcher">
              {modeOptions.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className={viewMode === id ? "is-active" : ""}
                  onClick={() => {
                    if (viewMode === id) {
                      onToast(`Ansicht „${label}“ ist bereits aktiv.`);
                    } else {
                      onModeChange(id);
                      onToast(`Ansicht „${label}“ aktiviert.`);
                    }
                  }}
                  title={label}
                >
                  <Icon size={22} />
                </button>
              ))}
            </div>
            <label className="toggle-line">
              <span>Querschnitt</span>
              <input
                type="checkbox"
                checked={crossSection}
                onChange={(event) => {
                  onCrossSectionChange(event.target.checked);
                  onToast(event.target.checked ? "Querschnitt eingeschaltet." : "Querschnitt ausgeschaltet.");
                }}
              />
              <i />
            </label>
          </div>
        </div>

        <div className="canvas-wrap">
          <CellScene
            cell={cell}
            activeOrganelle={activeOrganelle}
            viewMode={viewMode}
            crossSection={crossSection}
            autoRotate={autoRotate}
            resetKey={resetKey}
          />
        </div>

        {cell.modelAsset?.author && cell.modelAsset.licence && cell.modelAsset.sourceUrl.startsWith("https://") && (
          <p className="model-credit">
            3D-Modell:{" "}
            <a href={cell.modelAsset.sourceUrl} target="_blank" rel="noopener noreferrer">
              {cell.name}
            </a>{" "}
            von {cell.modelAsset.author} (NIH 3D) —{" "}
            {cell.modelAsset.licenceUrl ? (
              <a href={cell.modelAsset.licenceUrl} target="_blank" rel="noopener noreferrer">
                {cell.modelAsset.licence}
              </a>
            ) : (
              cell.modelAsset.licence
            )}
          </p>
        )}

        <div className="stage-toolbar">
          <button
            type="button"
            className={autoRotate ? "is-active" : ""}
            onClick={() => {
              const next = !autoRotate;
              onAutoRotateChange(next);
              onToast(next ? "Automatische Drehung an." : "Automatische Drehung aus.");
            }}
          >
            <RotateCcw size={20} />
            <span className="tb-label">Drehen</span>
          </button>
          <button
            type="button"
            className={viewMode === "focus" ? "is-active" : ""}
            onClick={() => {
              onModeChange("focus");
              onToast(
                viewMode === "focus"
                  ? `${cell.name} wird erneut isoliert.`
                  : `${cell.name} isoliert – Fokusansicht.`,
              );
            }}
          >
            <CircleDot size={20} />
            <span className="tb-label">Isolieren</span>
          </button>
          <button
            type="button"
            className={viewMode === "focus" ? "is-active" : ""}
            onClick={() => {
              onModeChange("focus");
              onToast("Andere ausgeblendet – Fokusansicht aktiv.");
            }}
          >
            <EyeOff size={20} />
            <span className="tb-label">Ausblenden</span>
          </button>
          <button type="button" onClick={onReset}
            aria-label="Zurücksetzen"
          >
            <RotateCcw size={20} />
            <span className="tb-label">Zurücksetzen</span>
          </button>
          <button type="button" onClick={() => toggleFullscreen(onToast)}>
            <Maximize size={20} />
            <span className="tb-label">Vollbild</span>
          </button>
        </div>

        <div className="export-toolbar">
          <button type="button" onClick={() => captureScreenshot(cell, onToast)}>
            <Camera size={20} />
            <span className="tb-label">Screenshot</span>
          </button>
          <button type="button" onClick={() => exportGlb(cell, onToast)}>
            <Box size={20} />
            <span className="tb-label">GLB-Export</span>
          </button>
        </div>
      </section>
    </main>
  );
}
