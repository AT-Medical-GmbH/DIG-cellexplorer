#!/usr/bin/env node
/**
 * prepare-assets.mjs — restores the licence-reviewed upstream media assets into
 * `public/` before a build. Nothing it writes is committed (see .gitignore).
 *
 *   node scripts/prepare-assets.mjs --cc0-only
 *       Only CC0 / public-domain assets. Also REMOVES any CC BY-NC-SA file that
 *       is already present in public/, so the build cannot ship it by accident.
 *
 *   node scripts/prepare-assets.mjs --with-nc
 *       Additionally restores the CC BY-NC-SA 4.0 assets. Needs an explicit,
 *       recorded decision (docs/ASSET_REVIEW.md, "Production asset set").
 *
 *   --from <dir>   copy from a local upstream checkout's `public/` directory
 *                  instead of downloading (offline / air-gapped build hosts).
 *
 * Every file is pinned to the upstream import commit and verified by SHA-256;
 * a mismatch aborts with exit code 1 and leaves no partial file behind.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Upstream snapshot the import was taken from (docs/THIRD_PARTY_NOTICES.md). */
export const UPSTREAM_COMMIT = "1cab982e7a0f96af854a696430c0724707764358";
export const UPSTREAM_RAW_BASE = `https://raw.githubusercontent.com/cclank/cell-architecture-studio/${UPSTREAM_COMMIT}/public/`;

/**
 * Allowlist of restorable assets. Only files whose licence has been verified
 * against the NIH 3D entry page (2026-10-09) are listed here. Unknown-origin
 * models and generated images are deliberately absent — they must not ship.
 */
export const ASSETS = [
  {
    path: "models/bacteria-wall-nih.glb",
    sha256: "8c25bccaf828353ced1849483f9701266b43ae6f51899f6f6a3c45bfc7bede57",
    group: "cc0",
    licence: "CC0 1.0 (Public Domain)",
    author: "Model3D",
    title: "Gram Positive Bacterial Cell Wall Model",
    sourceUrl: "https://3d.nih.gov/entries/3DPX-010752",
  },
  {
    path: "nih-previews/bacteria-wall-nih.png",
    sha256: "ee886b9ff8a4e3c352f98ee7719b6e3e19536f0fd064e11dbc202615b54ff6e9",
    group: "cc0",
    licence: "CC0 1.0 (Public Domain)",
    author: "Model3D",
    title: "Gram Positive Bacterial Cell Wall Model (preview)",
    sourceUrl: "https://3d.nih.gov/entries/3DPX-010752",
  },
  {
    path: "models/animal-cell-nih.glb",
    sha256: "416b95d454e4243a49a530e7e9e4447d33c543e838d072ae5128c38bdad7d7c6",
    group: "nc",
    licence: "CC BY-NC-SA 4.0",
    author: "destacados tv",
    title: "Animal Cell",
    sourceUrl: "https://3d.nih.gov/entries/3DPX-015797",
  },
  {
    path: "nih-previews/animal-cell-nih.png",
    sha256: "7fa36d73c5601fc0d9fd57b66e3d9a06233aed8f2d0b50da47697bd1e42e2d5a",
    group: "nc",
    licence: "CC BY-NC-SA 4.0",
    author: "destacados tv",
    title: "Animal Cell (preview)",
    sourceUrl: "https://3d.nih.gov/entries/3DPX-015797",
  },
  {
    path: "models/neuron-nih.glb",
    sha256: "d979bca2c94eb7b78de51bf68642ba00bf0b21d38d31161348f033c2a893a4a4",
    group: "nc",
    licence: "CC BY-NC-SA 4.0",
    author: "destacados tv",
    title: "Neuron",
    sourceUrl: "https://3d.nih.gov/entries/3DPX-015796",
  },
  {
    path: "nih-previews/neuron-nih.png",
    sha256: "2b464a56c681a6562d97fb47c19381a65c002c801963cbd7c7b08d37d7d73ed5",
    group: "nc",
    licence: "CC BY-NC-SA 4.0",
    author: "destacados tv",
    title: "Neuron (preview)",
    sourceUrl: "https://3d.nih.gov/entries/3DPX-015796",
  },
];

export const USAGE = `Usage: node scripts/prepare-assets.mjs (--cc0-only | --with-nc) [--from <upstream public dir>]

  --cc0-only   restore CC0 assets only; removes CC BY-NC-SA files already in public/
  --with-nc    also restore CC BY-NC-SA 4.0 assets (decision required, see docs/ASSET_REVIEW.md)
  --from DIR   copy from a local upstream checkout instead of downloading
`;

export function parseArgs(argv) {
  const options = { mode: null, from: null };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--cc0-only" || arg === "--with-nc") {
      const mode = arg === "--cc0-only" ? "cc0" : "nc";
      if (options.mode && options.mode !== mode) {
        throw new Error("Choose either --cc0-only or --with-nc, not both.");
      }
      options.mode = mode;
    } else if (arg === "--from") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) throw new Error("--from needs a directory path.");
      options.from = value;
      index += 1;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!options.help && !options.mode) {
    throw new Error("A mode is required: --cc0-only or --with-nc.");
  }
  return options;
}

export function selectAssets(mode) {
  if (mode === "cc0") return ASSETS.filter((asset) => asset.group === "cc0");
  if (mode === "nc") return ASSETS;
  throw new Error(`Unknown mode: ${mode}`);
}

export function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

/** Throws when the bytes do not match the pinned checksum. */
export function verifyChecksum(bytes, asset) {
  const actual = sha256(bytes);
  if (actual !== asset.sha256) {
    throw new Error(
      `Checksum mismatch for ${asset.path}: expected ${asset.sha256}, got ${actual}. ` +
        "The upstream file changed or the download is corrupt — nothing was written.",
    );
  }
  return actual;
}

async function fetchBytes(asset, from) {
  if (from) {
    return new Uint8Array(await readFile(path.join(from, asset.path)));
  }
  const url = UPSTREAM_RAW_BASE + asset.path;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed (${response.status}) for ${url}`);
  return new Uint8Array(await response.arrayBuffer());
}

/**
 * Restores `assets` into `${publicDir}`. Returns a report of written files.
 * Pure apart from the file system; `getBytes` is injectable for tests.
 */
export async function installAssets(assets, publicDir, getBytes) {
  const written = [];
  for (const asset of assets) {
    const bytes = await getBytes(asset);
    verifyChecksum(bytes, asset);
    const target = path.join(publicDir, asset.path);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, bytes);
    written.push({ path: asset.path, bytes: bytes.byteLength, licence: asset.licence });
  }
  return written;
}

/** Removes NC assets from public/ so a CC0-only build cannot ship them. */
export async function removeAssets(assets, publicDir) {
  const removed = [];
  for (const asset of assets) {
    const target = path.join(publicDir, asset.path);
    if (existsSync(target)) {
      await rm(target);
      removed.push(asset.path);
    }
  }
  return removed;
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(USAGE);
    process.exit(2);
  }
  if (options.help) {
    console.log(USAGE);
    return;
  }

  const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
  const publicDir = path.join(root, "public");
  const selected = selectAssets(options.mode);

  console.log(
    `Restoring ${selected.length} asset(s) [${options.mode === "cc0" ? "CC0 only" : "CC0 + CC BY-NC-SA 4.0"}] ` +
      `from ${options.from ? options.from : `upstream @ ${UPSTREAM_COMMIT.slice(0, 7)}`} …`,
  );

  const written = await installAssets(selected, publicDir, (asset) => fetchBytes(asset, options.from));
  for (const entry of written) {
    console.log(`  ✓ ${entry.path}  (${(entry.bytes / 1024).toFixed(0)} KB, ${entry.licence})`);
  }

  if (options.mode === "cc0") {
    const removed = await removeAssets(
      ASSETS.filter((asset) => asset.group === "nc"),
      publicDir,
    );
    for (const file of removed) console.log(`  ✗ removed ${file} (CC BY-NC-SA, not part of a CC0-only build)`);
  } else {
    console.log(
      "\nNOTE: CC BY-NC-SA 4.0 assets restored. They require attribution (shown in the app), " +
        "non-commercial use and share-alike. Record the decision in docs/ASSET_REVIEW.md.",
    );
  }
  console.log("\nDone. These files are git-ignored; build with: VITE_BASE_PATH=/cellexplorer/ npm run build");
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((error) => {
    console.error(`\nERROR: ${error.message}`);
    process.exit(1);
  });
}
