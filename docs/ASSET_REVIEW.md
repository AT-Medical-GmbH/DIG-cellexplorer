# Asset Review

**Status: ⛔ PENDING REVIEW — no asset in this document is cleared for public or
commercial use.**

## Purpose

`DIG-cellexplorer` is derived from a MIT-licensed upstream project. While the
**code** may be reused under MIT, the **media assets** (3D GLB models, rendered
images, preview/thumbnail images, AI-generated teaching images, demo recordings,
icons) can carry their own licences, sources and usage terms. This document is
the single source of truth for the **provenance and licence review** of every
asset before it may be used publicly, redistributed, or used commercially.

Until each relevant row below reaches **review status = cleared** (or the asset
is **replaced** with a cleared equivalent), the asset must be treated as
**restricted**.

### Phase-0 handling in this repository

To avoid importing unreviewed binaries into the AT Medical repository, the heavy
asset directories are **not committed** (see [`../.gitignore`](../.gitignore)).
Each directory keeps a tracked `README.md` placeholder. The small NIH preview
PNGs and `favicon.svg` are retained for continuity but remain in scope for this
review.

---

## Asset inventory

Legend — **Commercial use / Attribution req. / Modification / Replacement needed
/ Review status**: `?` = unknown/to-be-verified, `✅` = yes/confirmed,
`❌` = no, `⛔` = blocked.

### 3D models (`public/models/`) — not committed

| File | Type | Source | Original author / provider | Licence | Commercial | Attribution | Modification | Replacement needed | Review status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `plant-cell-first001.glb` (~59 MB) | GLB 3D model | Upstream "user-provided" `/Users/lank/Downloads/first001.glb` | **Unknown** | **Unknown** | ? | ? | ? | **Likely yes** | ⛔ pending | No verifiable source. Treat as unusable until origin proven. Largest asset. |
| `white-blood-cell-user.glb` (~56 MB) | GLB 3D model | Upstream "user-provided" `/Users/lank/Downloads/second.glb` | **Unknown** | **Unknown** | ? | ? | ? | **Likely yes** | ⛔ pending | No verifiable source. Treat as unusable until origin proven. |
| `animal-cell-nih.glb` (~1.5 MB) | GLB 3D model | NIH 3D `https://3d.nih.gov/entries/3DPX-015797/2` | NIH 3D (to confirm) | To verify per entry | ? | ? | ? | ? | ⚠️ verify | NIH 3D entries vary (CC0 / CC-BY / custom). Confirm exact entry licence + required attribution. |
| `neuron-nih.glb` (~2.9 MB) | GLB 3D model | NIH 3D `https://3d.nih.gov/entries/3DPX-015796/2` | NIH 3D (to confirm) | To verify per entry | ? | ? | ? | ? | ⚠️ verify | As above. |
| `bacteria-wall-nih.glb` (~0.5 MB) | GLB 3D model | NIH 3D `https://3d.nih.gov/entries/3DPX-010752/2` | NIH 3D (to confirm) | To verify per entry | ? | ? | ? | ? | ⚠️ verify | As above. |

### Rendered / reference images — not committed

| File group | Type | Source | Licence | Commercial | Attribution | Modification | Replacement needed | Review status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `public/cell-renders/*.png` (7 files, ~14 MB) | Raster render | Upstream "generated reference images" | Unknown (generated) | ? | ? | ? | ? | ⚠️ verify | Generation tool/terms unverified. |
| `public/cell-renders-transparent/*.png` (7 files, ~15 MB) | Raster render (alpha) | Upstream "generated reference images" | Unknown (generated) | ? | ? | ? | ? | ⚠️ verify | Used as sidebar thumbnails / preview metadata. |

### AI-generated teaching images — not committed

| File group | Type | Source | Licence | Commercial | Attribution | Modification | Replacement needed | Review status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `public/texture-references/gpt-image-2-biology-more-teaching-2026-05-31/` (jpg + png + html, ~35 MB) | AI-generated images + HTML index | Upstream; folder name indicates GPT image model output (2026-05-31) | Unknown; model output terms apply | ? | ? | ? | ? | ⛔ pending | Model-generated image IP and usage terms require legal review. Also contains `index.html` / `annotation-hotspots.json`. |

### Demo media — not committed

| File group | Type | Source | Licence | Commercial | Attribution | Modification | Replacement needed | Review status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `docs/media/cell-architecture-studio-demo.{gif,mp4}` (~14 MB) | Screen recording | Upstream demo of upstream app | Upstream (MIT repo) but shows upstream branding/UI | ? | ? | ✅ | **Yes** | ⚠️ verify | Re-create AT Medical demo media after branding. |

### Retained small assets (committed) — still in scope for review

| File | Type | Source | Licence | Commercial | Attribution | Modification | Replacement needed | Review status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `public/nih-previews/animal-cell-nih.png` (~55 KB) | Preview PNG | NIH 3D `3DPX-015797` | To verify per entry | ? | ? | ? | ? | ⚠️ verify | Preview image for the NIH model; shares the model's terms. |
| `public/nih-previews/neuron-nih.png` (~23 KB) | Preview PNG | NIH 3D `3DPX-015796` | To verify per entry | ? | ? | ? | ? | ⚠️ verify | As above. |
| `public/nih-previews/bacteria-wall-nih.png` (~55 KB) | Preview PNG | NIH 3D `3DPX-010752` | To verify per entry | ? | ? | ? | ? | ⚠️ verify | As above. |
| `public/favicon.svg` (~0.8 KB) | Icon (SVG) | Upstream | MIT (ships with code) | ✅ | ❌ | ✅ | ❌ | ⚠️ verify | Will be replaced by AT Medical branding later (not in Phase 0). |

---

## Review checklist

- [ ] GLB models reviewed (per-file licence + provenance confirmed)
- [ ] Unknown "user-provided" GLBs: origin proven **or** replaced
- [ ] NIH 3D entries: exact per-entry licence + attribution captured
- [ ] Rendered images reviewed (`public/cell-renders/`)
- [ ] Transparent preview renders reviewed (`public/cell-renders-transparent/`)
- [ ] AI-generated images reviewed (`public/texture-references/…`) incl. model terms
- [ ] NIH preview images reviewed (`public/nih-previews/`)
- [ ] `favicon.svg` and any icons reviewed
- [ ] Demo media reviewed / re-created for AT Medical
- [ ] External sources documented (URLs, licence text archived)
- [ ] Commercial use explicitly confirmed per asset
- [ ] Attribution requirements captured per asset
- [ ] Replacement plan defined where provenance cannot be cleared
- [ ] SBOM / npm licence report attached to `THIRD_PARTY_NOTICES.md`
- [ ] Legal sign-off recorded (name + date)

---

## Replacement strategy (for Phase 2)

For any asset that cannot be cleared:

1. **NIH 3D models** — if the entry licence permits, keep with correct
   attribution; otherwise source an equivalently licensed model.
2. **Unknown user-provided GLBs** — do **not** ship. Replace with:
   (a) a licence-cleared model from an open repository (NIH 3D, BioModels,
   Sketchfab CC), or (b) AT Medical's own modelled/commissioned asset, or
   (c) procedural Three.js geometry (already supported as fallback).
3. **Rendered & AI-generated images** — regenerate under a tool/licence whose
   output terms AT Medical can evidence, or commission original artwork.
4. Record every replacement here (old → new, licence, author, date).

---

## Restoring assets for local testing

The excluded assets are **not** in this repository. A developer who needs the
full-fidelity 3D views **locally** (never for publication) can restore them from
the upstream snapshot:

```bash
# from a temporary location, NOT inside this repo's tracked tree:
git clone --depth 1 https://github.com/cclank/cell-architecture-studio.git _upstream
cp -r _upstream/public/models                     public/
cp -r _upstream/public/cell-renders               public/
cp -r _upstream/public/cell-renders-transparent   public/
cp -r _upstream/public/texture-references         public/
# these paths are git-ignored here and will not be committed
```

If assets are absent, the app automatically falls back to procedural geometry,
so the prototype remains runnable without them.

---

## Sign-off

| Role | Name | Decision | Date |
| --- | --- | --- | --- |
| Asset review lead | _pending_ | _pending_ | _pending_ |
| Legal / licence | _pending_ | _pending_ | _pending_ |
| Medical-didactic (content) | _pending_ | _pending_ | _pending_ |
