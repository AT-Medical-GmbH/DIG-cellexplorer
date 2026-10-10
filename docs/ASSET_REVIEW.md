# Asset Review

**Status (2026-10-10): ⚠️ PARTIALLY CLEARED.** The three NIH 3D entries have been
verified against their entry pages. One is public domain (CC0), two are
**CC BY-NC-SA 4.0** (non-commercial). The two unknown-origin models and all
generated images remain **blocked**. **No asset in this document is cleared for
commercial use.**

## Purpose

`DIG-cellexplorer` is derived from a MIT-licensed upstream project. While the
**code** may be reused under MIT, the **media assets** (3D GLB models, rendered
images, preview/thumbnail images, AI-generated teaching images, demo recordings,
icons) carry their own licences, sources and usage terms. This document is the
single source of truth for the **provenance and licence review** of every asset
before it may be used publicly, redistributed, or used commercially.

Until a row reaches **review status = cleared** (or the asset is **replaced**
with a cleared equivalent), the asset is **restricted**.

### Handling in this repository

- Heavy and unreviewed binaries are **not committed** (see [`../.gitignore`](../.gitignore));
  each directory keeps a tracked `README.md` placeholder.
- The two CC BY-NC-SA preview PNGs were **removed from version control on
  2026-10-10** (they had been retained "for continuity" in Phase 0). Only the
  CC0 preview `bacteria-wall-nih.png` stays tracked.
- Licence-cleared files are restored for a build by
  **`node scripts/prepare-assets.mjs`** — pinned to the upstream import commit
  and verified by SHA-256 (see "Production asset set" below). Unknown-origin and
  generated assets are not restorable through the script by design.

---

## Asset inventory

Legend — **Commercial use / Attribution req. / Modification / Replacement needed
/ Review status**: `?` = unknown/to-be-verified, `✅` = yes/confirmed,
`❌` = no, `⛔` = blocked, `🟡` = conditional.

### 3D models (`public/models/`) — not committed

| File | Type | Source (verified 2026-10-09) | Author | Licence | Commercial | Attribution | Modification | Replacement needed | Review status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `bacteria-wall-nih.glb` (~0.5 MB) | GLB | NIH 3D [3DPX-010752](https://3d.nih.gov/entries/3DPX-010752) "Gram Positive Bacterial Cell Wall Model" | Model3D | **CC0 1.0** (badge "Public Domain" linking to CC0 deed) | ✅ | ❌ (given anyway) | ✅ | ❌ | **✅ cleared** | SHA-256 `8c25bcca…ede57`. |
| `animal-cell-nih.glb` (~1.5 MB) | GLB | NIH 3D [3DPX-015797](https://3d.nih.gov/entries/3DPX-015797) "Animal Cell" | destacados tv | **CC BY-NC-SA 4.0** | **❌ non-commercial only** | ✅ required | ✅ (share-alike) | 🟡 for any commercial use | **🟡 conditional** | Usable only in a non-commercial context with attribution. SHA-256 `416b95d4…7d7c6`. |
| `neuron-nih.glb` (~2.9 MB) | GLB | NIH 3D [3DPX-015796](https://3d.nih.gov/entries/3DPX-015796) "Neuron" | destacados tv | **CC BY-NC-SA 4.0** | **❌ non-commercial only** | ✅ required | ✅ (share-alike) | 🟡 for any commercial use | **🟡 conditional** | As above. SHA-256 `d979bca2…a4a4`. |
| `plant-cell-first001.glb` (~59 MB) | GLB | Upstream "user-provided" `/Users/lank/Downloads/first001.glb` | **Unknown** | **Unknown** | ? | ? | ? | **Yes** | ⛔ blocked | No verifiable source. Never ship. Procedural fallback applies. |
| `white-blood-cell-user.glb` (~56 MB) | GLB | Upstream "user-provided" `/Users/lank/Downloads/second.glb` | **Unknown** | **Unknown** | ? | ? | ? | **Yes** | ⛔ blocked | No verifiable source. Never ship. Procedural fallback applies. |

Verification method: entry pages fetched on 2026-10-09; the licence badge and
its link target were recorded. NIH 3D does not reproduce the licence text on the
entry page; the applicable deed is the linked Creative Commons text. The pages
showed no model-specific terms beyond the badge.

### NIH preview images (`public/nih-previews/`)

| File | Source | Licence | Review status | Tracked in git |
| --- | --- | --- | --- | --- |
| `bacteria-wall-nih.png` (~55 KB) | 3DPX-010752 (preview of the CC0 model) | CC0 1.0 | ✅ cleared | yes |
| `animal-cell-nih.png` (~55 KB) | 3DPX-015797 | CC BY-NC-SA 4.0 | 🟡 conditional | **no** (since 2026-10-10; `--with-nc`) |
| `neuron-nih.png` (~23 KB) | 3DPX-015796 | CC BY-NC-SA 4.0 | 🟡 conditional | **no** (since 2026-10-10; `--with-nc`) |

### Rendered / reference images — not committed, not restorable

| File group | Type | Source | Licence | Review status | Notes |
| --- | --- | --- | --- | --- | --- |
| `public/cell-renders/*.png` (7 files, ~14 MB) | Raster render | Upstream "generated reference images" | Unknown (generated) | ⛔ blocked | Generation tool/terms unverified. |
| `public/cell-renders-transparent/*.png` (7 files, ~15 MB) | Raster render (alpha) | Upstream "generated reference images" | Unknown (generated) | ⛔ blocked | Were used as sidebar thumbnails, flashcard fronts and quiz review thumbnails. The UI degrades gracefully without them (see below). |

### AI-generated teaching images — not committed, not restorable

| File group | Type | Source | Licence | Review status | Notes |
| --- | --- | --- | --- | --- | --- |
| `public/texture-references/gpt-image-2-biology-more-teaching-2026-05-31/` (~35 MB) | AI-generated images + HTML index | Upstream; folder name indicates GPT image model output | Unknown; model output terms apply | ⛔ blocked | Not referenced by the app code; legal review of generated-image terms required before any use. |

### Demo media — not committed

| File group | Type | Source | Licence | Review status | Notes |
| --- | --- | --- | --- | --- | --- |
| `docs/media/cell-architecture-studio-demo.{gif,mp4}` (~14 MB) | Screen recording | Upstream demo of the upstream app | Upstream (MIT repo) but shows upstream UI | ⚠️ not needed | Re-create AT Medical demo media after branding. |

### Retained small assets (committed)

| File | Type | Source | Licence | Commercial | Attribution | Review status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `public/draco/*` (~750 KB) | Decoder (JS/WASM) | three.js r181 → Google Draco | Apache-2.0 | ✅ | ✅ (notice in `THIRD_PARTY_NOTICES.md`) | ✅ cleared | Self-hosted to avoid the `gstatic.com` runtime request. |
| `public/hdri/studio_small_03_1k.hdr` (~1.6 MB) | HDRI | Poly Haven, Greg Zaal | CC0 1.0 | ✅ | ❌ (given anyway) | ✅ cleared | Self-hosted to avoid the `raw.githack.com` runtime request. |
| `public/favicon.svg` (~0.8 KB) | Icon (SVG) | Upstream | MIT (ships with code) | ✅ | ❌ | ✅ cleared (code licence) | To be replaced by AT Medical branding in a later phase. |

---

## Production asset set

Three tiers decide what a build may contain. `scripts/prepare-assets.mjs`
implements tiers A and B; tier C cannot be restored through it.

| Tier | Assets | Condition | How |
| --- | --- | --- | --- |
| **A — ship** | `bacteria-wall-nih.glb`, `bacteria-wall-nih.png` (CC0) | none | `node scripts/prepare-assets.mjs --cc0-only` |
| **B — decision required** | `animal-cell-nih.glb`, `neuron-nih.glb` + their previews (CC BY-NC-SA 4.0) | (1) use is **non-commercial** — no paywall, no sale, not part of a paid course or commercial product; (2) **attribution** visible — implemented: loading notice label and *About* dialog list author, licence and entry link; (3) **share-alike** applies to adaptations of the model — the unmodified model is served, no adaptation is made | `node scripts/prepare-assets.mjs --with-nc` **only after** the decision is recorded below |
| **C — never ship** | unknown-origin GLBs, generated renders, AI images, upstream demo media | — | not restorable; replacement tracked in issue #6 |

**Decision log for tier B (CC BY-NC-SA 4.0 in the login-gated website area):**

| Date | Decision | By | Rationale |
| --- | --- | --- | --- |
| _pending_ | _ship / do not ship_ | _Andreas Tremml / legal_ | The free, login-gated area of a GmbH website is a grey zone under the NC clause: the use itself is free of charge, but the operator is a company. Default until decided: **do not ship** (tier A only). |

### What the app looks like without tier B and C

Expected behaviour by code design (**not yet verified in a browser with a tier-A-only build** — see `DEPLOYMENT.md` §8):

- 3D stage: bacteria renders from the GLB; epithelial and muscle use procedural
  geometry by design; plant, white blood cell, animal and neuron fall back to
  procedural geometry with a "3D model unavailable" notice (error boundary).
- Sidebar / strip thumbnails: gradient placeholder (`MiniCell` fallback).
- Flashcards: front shows "Reference image not available" instead of a broken image.
- Quiz review list: empty thumbnail (background image), names still shown.
- No request is expected to leave the site origin (verified for the full-asset build on 2026-10-09).

---

## Review checklist

- [x] GLB models reviewed (per-file licence + provenance confirmed) — NIH entries
- [ ] Unknown "user-provided" GLBs: origin proven **or** replaced (→ issue #6)
- [x] NIH 3D entries: exact per-entry licence + attribution captured
- [x] Attribution implemented in the app (loader label, About dialog) and in `THIRD_PARTY_NOTICES.md`
- [ ] Tier B decision (CC BY-NC-SA 4.0 in the login area) recorded above
- [ ] Rendered images reviewed (`public/cell-renders/`) — blocked, not shipped
- [ ] Transparent preview renders reviewed (`public/cell-renders-transparent/`) — blocked, not shipped
- [ ] AI-generated images reviewed (`public/texture-references/…`) — blocked, not shipped
- [x] NIH preview images reviewed (`public/nih-previews/`)
- [x] `favicon.svg` reviewed (MIT, ships with code)
- [ ] Demo media re-created for AT Medical
- [x] External sources documented (URLs, licence links)
- [ ] Commercial use explicitly confirmed per asset — **none confirmed**; tier B is NC
- [x] Attribution requirements captured per asset
- [x] Replacement plan defined where provenance cannot be cleared (→ issue #6)
- [ ] SBOM / npm licence report attached to `THIRD_PARTY_NOTICES.md`
- [ ] Legal sign-off recorded (name + date)

---

## Replacement strategy (issue #6)

For any asset that cannot be cleared:

1. **NIH 3D models** — CC0 entry kept; CC BY-NC-SA entries kept only under the
   tier-B decision, otherwise source equivalently licensed models (NIH 3D offers
   CC0 / CC BY entries; filter by licence).
2. **Unknown user-provided GLBs** — do **not** ship. Replace with (a) a
   licence-cleared model from an open repository (NIH 3D, BioModels, Sketchfab
   CC), (b) AT Medical's own modelled/commissioned asset, or (c) the procedural
   Three.js geometry that already exists for every specimen (`ProceduralCellModel`).
3. **Rendered & AI-generated images** — regenerate under a tool/licence whose
   output terms AT Medical can evidence, or commission original artwork.
4. Record every replacement here (old → new, licence, author, date).

---

## Restoring assets for a build or for local testing

```bash
# tier A only (default for production until the tier-B decision exists)
node scripts/prepare-assets.mjs --cc0-only

# tier A + B (only after the decision is recorded above)
node scripts/prepare-assets.mjs --with-nc

# offline: copy from a local upstream checkout instead of downloading
node scripts/prepare-assets.mjs --cc0-only --from /path/to/cell-architecture-studio/public
```

The script downloads from the pinned upstream commit, verifies every file's
SHA-256 and writes into `public/` (git-ignored). `--cc0-only` also deletes
tier-B files that are already present, so a CC0-only build can never ship them
by accident. Tier-C files can be copied manually from an upstream clone **for
local inspection only** (never for a build that leaves the developer machine).

---

## Sign-off

| Role | Name | Decision | Date |
| --- | --- | --- | --- |
| Asset review (technical) | Claude (agent), on behalf of DIG | NIH entries verified; tiers defined | 2026-10-10 |
| Tier B decision (NC use) | _pending_ | _pending_ | _pending_ |
| Legal / licence | _pending_ | _pending_ | _pending_ |
| Medical-didactic (content) | _pending_ | _pending_ | _pending_ |
