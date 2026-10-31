import { describe, expect, it } from "vitest";
import { parseViewportMessage } from "./embed";

const parent = {};
const ok = { origin: "https://at-medical.de", source: parent, data: { type: "cx-viewport", top: 120.4, height: 700 } };

describe("parseViewportMessage", () => {
  it("nimmt eine gueltige Nachricht vom eigenen Origin und Elternfenster an", () => {
    expect(parseViewportMessage(ok, "https://at-medical.de", parent)).toEqual({ type: "cx-viewport", top: 120, height: 700 });
  });
  it("lehnt fremde Origins ab", () => {
    expect(parseViewportMessage({ ...ok, origin: "https://evil.example" }, "https://at-medical.de", parent)).toBeNull();
  });
  it("lehnt andere Absender-Fenster ab", () => {
    expect(parseViewportMessage({ ...ok, source: {} }, "https://at-medical.de", parent)).toBeNull();
  });
  it("lehnt falsche Typen und unsinnige Werte ab", () => {
    for (const data of [null, "x", { type: "other", top: 0, height: 700 }, { type: "cx-viewport", top: -1, height: 700 }, { type: "cx-viewport", top: 0, height: 10 }, { type: "cx-viewport", top: "0", height: 700 }, { type: "cx-viewport", top: NaN, height: 700 }]) {
      expect(parseViewportMessage({ ...ok, data }, "https://at-medical.de", parent)).toBeNull();
    }
  });
});
