import { STORAGE_KEYS } from "./storageKeys";

export type AccentTheme = {
  id: string;
  name: string;
  accent: string;
  accentSoft: string;
};

export const ACCENTS: AccentTheme[] = [
  { id: "blue", name: "AT Medical Blue", accent: "#5b82c4", accentSoft: "rgba(91, 130, 196, 0.16)" },
  { id: "teal", name: "Teal", accent: "#3fb8a9", accentSoft: "rgba(63, 184, 169, 0.16)" },
  { id: "violet", name: "Violet", accent: "#9b87e8", accentSoft: "rgba(155, 135, 232, 0.16)" },
  { id: "rose", name: "Rose", accent: "#e8718a", accentSoft: "rgba(232, 113, 138, 0.16)" },
  { id: "amber", name: "Amber", accent: "#e0a040", accentSoft: "rgba(224, 160, 64, 0.16)" },
  { id: "emerald", name: "Emerald", accent: "#4dc28a", accentSoft: "rgba(77, 194, 138, 0.16)" },
];

export const DEFAULT_ACCENT = ACCENTS[0];

export function loadAccent(): AccentTheme {
  try {
    const id = localStorage.getItem(STORAGE_KEYS.accent);
    return ACCENTS.find((a) => a.id === id) ?? DEFAULT_ACCENT;
  } catch {
    return DEFAULT_ACCENT;
  }
}

export function saveAccent(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.accent, id);
  } catch {
    /* ignore */
  }
}
