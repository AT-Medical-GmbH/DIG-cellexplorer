// Einbettung im Website-Rahmen (iframe): Die Anwendung meldet ihre Hoehe an die
// Seite, damit der Rahmen genau passt und es nur einen Scrollbalken gibt. Die Seite
// meldet den sichtbaren Ausschnitt zurueck, damit Dialoge dort erscheinen, wo der
// Nutzer gerade hinschaut. Es werden nur Nachrichten vom eigenen Origin und vom
// uebergeordneten Fenster angenommen.

export type HeightMessage = { type: "cx-height"; height: number };
export type ViewportMessage = { type: "cx-viewport"; top: number; height: number };

type Source = { origin: string; source: unknown; data: unknown };

/** True, wenn die Nachricht vom eigenen Origin und vom Elternfenster stammt und eine gueltige Sichtflaeche enthaelt. */
export function parseViewportMessage(
  event: Source,
  ownOrigin: string,
  parentWindow: unknown,
): ViewportMessage | null {
  if (event.origin !== ownOrigin || event.source !== parentWindow) return null;
  const data = event.data as Partial<ViewportMessage> | null;
  if (!data || data.type !== "cx-viewport") return null;
  const { top, height } = data;
  if (typeof top !== "number" || typeof height !== "number") return null;
  if (!Number.isFinite(top) || !Number.isFinite(height) || top < 0 || height < 200) return null;
  return { type: "cx-viewport", top: Math.round(top), height: Math.round(height) };
}

/** Startet die Rahmen-Kommunikation. Gibt eine Aufraeumfunktion zurueck. Ausserhalb eines Rahmens passiert nichts. */
export function startEmbedBridge(): () => void {
  if (typeof window === "undefined" || window.parent === window) return () => {};
  const root = document.documentElement;
  const origin = window.location.origin;
  root.classList.add("cx-embedded");

  let lastHeight = 0;
  const sendHeight = () => {
    const height = Math.ceil(document.body.scrollHeight);
    if (height === lastHeight || height < 200) return;
    lastHeight = height;
    const message: HeightMessage = { type: "cx-height", height };
    window.parent.postMessage(message, origin);
  };

  const onMessage = (event: MessageEvent) => {
    const viewport = parseViewportMessage(event, origin, window.parent);
    if (!viewport) return;
    root.style.setProperty("--vp-top", `${viewport.top}px`);
    root.style.setProperty("--vp-h", `${viewport.height}px`);
    root.classList.add("cx-vp-active");
  };

  window.addEventListener("message", onMessage);
  const observer = new ResizeObserver(sendHeight);
  observer.observe(document.body);
  window.addEventListener("load", sendHeight);
  sendHeight();
  window.parent.postMessage({ type: "cx-ready" }, origin);

  return () => {
    window.removeEventListener("message", onMessage);
    window.removeEventListener("load", sendHeight);
    observer.disconnect();
    root.classList.remove("cx-embedded", "cx-vp-active");
  };
}
