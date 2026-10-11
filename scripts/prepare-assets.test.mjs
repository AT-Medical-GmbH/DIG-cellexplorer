import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  ASSETS,
  installAssets,
  parseArgs,
  removeAssets,
  selectAssets,
  sha256,
  verifyChecksum,
} from "./prepare-assets.mjs";

test("every allowlisted asset carries a pinned checksum, licence and source", () => {
  for (const asset of ASSETS) {
    assert.match(asset.sha256, /^[0-9a-f]{64}$/, asset.path);
    assert.ok(asset.licence.length > 0, asset.path);
    assert.match(asset.sourceUrl, /^https:\/\/3d\.nih\.gov\/entries\/3DPX-\d+$/, asset.path);
    assert.ok(["cc0", "nc"].includes(asset.group), asset.path);
    assert.ok(!asset.path.includes(".."), asset.path);
  }
});

test("unknown-origin models and generated images are never restorable", () => {
  const paths = ASSETS.map((asset) => asset.path);
  assert.ok(!paths.some((p) => p.includes("first001") || p.includes("white-blood-cell-user")));
  assert.ok(!paths.some((p) => p.startsWith("cell-renders") || p.startsWith("texture-references")));
});

test("--cc0-only selects only CC0 assets, --with-nc selects all", () => {
  const cc0 = selectAssets("cc0");
  assert.ok(cc0.length > 0);
  assert.ok(cc0.every((asset) => asset.group === "cc0"));
  assert.equal(selectAssets("nc").length, ASSETS.length);
  assert.throws(() => selectAssets("all"));
});

test("argument parsing requires exactly one mode", () => {
  assert.equal(parseArgs(["--cc0-only"]).mode, "cc0");
  assert.deepEqual(parseArgs(["--with-nc", "--from", "/tmp/up"]), { mode: "nc", from: "/tmp/up" });
  assert.throws(() => parseArgs([]), /mode is required/);
  assert.throws(() => parseArgs(["--cc0-only", "--with-nc"]), /not both/);
  assert.throws(() => parseArgs(["--from"]), /directory path/);
  assert.throws(() => parseArgs(["--bogus"]), /Unknown argument/);
  assert.equal(parseArgs(["--help"]).help, true);
});

test("checksum verification rejects altered bytes", () => {
  const bytes = new TextEncoder().encode("glTF-test");
  const asset = { path: "models/x.glb", sha256: sha256(bytes) };
  assert.equal(verifyChecksum(bytes, asset), asset.sha256);
  assert.throws(() => verifyChecksum(new TextEncoder().encode("glTF-tampered"), asset), /Checksum mismatch/);
});

test("installAssets writes verified files and removeAssets cleans them up", async () => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "cx-assets-"));
  try {
    const bytes = new TextEncoder().encode("binary-model");
    const asset = { path: "models/test.glb", sha256: sha256(bytes), licence: "CC0 1.0" };
    const bad = { path: "models/bad.glb", sha256: "0".repeat(64), licence: "CC0 1.0" };

    const written = await installAssets([asset], dir, async () => bytes);
    assert.equal(written.length, 1);
    assert.equal((await readFile(path.join(dir, asset.path))).toString(), "binary-model");

    await assert.rejects(installAssets([bad], dir, async () => bytes), /Checksum mismatch/);
    assert.equal(existsSync(path.join(dir, bad.path)), false);

    await writeFile(path.join(dir, "models", "nc.glb"), "x");
    const removed = await removeAssets([{ path: "models/nc.glb" }, { path: "models/absent.glb" }], dir);
    assert.deepEqual(removed, ["models/nc.glb"]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
