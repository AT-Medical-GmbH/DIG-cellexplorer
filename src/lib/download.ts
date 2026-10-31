import type { CellItem } from "../data/cells";

type Notify = (message: string) => void;

export function slugify(name: string): string {
  return name.toLowerCase().replace(/ß/g, "ss").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function triggerDownload(href: string, filename: string): void {
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function captureScreenshot(cell: CellItem, onToast: Notify): void {
  const canvas = document.querySelector<HTMLCanvasElement>(".canvas-wrap canvas");
  if (!canvas) {
    onToast("Darstellung noch nicht bereit – bitte erneut versuchen.");
    return;
  }
  try {
    const url = canvas.toDataURL("image/png");
    triggerDownload(url, `${slugify(cell.name)}.png`);
    onToast(`${cell.name}.png gespeichert.`);
  } catch {
    onToast("Screenshot fehlgeschlagen – Zeichenfläche blockiert.");
  }
}

export function toggleFullscreen(onToast: Notify): void {
  const el = document.querySelector<HTMLElement>(".canvas-wrap");
  if (!el) return;
  if (!document.fullscreenElement) {
    el.requestFullscreen()
      .then(() => onToast("Vollbild – zum Beenden Esc drücken."))
      .catch(() => onToast("Vollbild vom Browser blockiert."));
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

export async function exportGlb(cell: CellItem, onToast: Notify): Promise<void> {
  const url = cell.modelAsset?.url;
  if (!url) {
    onToast(`Für „${cell.name}“ gibt es kein herunterladbares Modell.`);
    return;
  }
  onToast(`Modell „${cell.name}“ wird vorbereitet …`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(String(res.status));
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    triggerDownload(objectUrl, `${slugify(cell.name)}.glb`);
    URL.revokeObjectURL(objectUrl);
    onToast(`${cell.name}.glb heruntergeladen.`);
  } catch {
    onToast("Modell-Download fehlgeschlagen.");
  }
}
