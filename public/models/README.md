# `public/models/` — 3D GLB models (NOT committed)

The GLB models that power the high-fidelity specimens are **intentionally not
committed** to this AT Medical repository yet. Their licensing/provenance is
under review — see [`docs/ASSET_REVIEW.md`](../../docs/ASSET_REVIEW.md).

Expected files (referenced by `src/data/cells.ts`):

| File | Upstream provenance | Review status |
| --- | --- | --- |
| `plant-cell-first001.glb` (~59 MB) | **Unknown** — upstream "user-provided" (`/Users/lank/Downloads/first001.glb`) | ⛔ blocked |
| `white-blood-cell-user.glb` (~56 MB) | **Unknown** — upstream "user-provided" (`/Users/lank/Downloads/second.glb`) | ⛔ blocked |
| `animal-cell-nih.glb` (~1.5 MB) | NIH 3D `3DPX-015797` | ⚠️ verify license |
| `neuron-nih.glb` (~2.9 MB) | NIH 3D `3DPX-015796` | ⚠️ verify license |
| `bacteria-wall-nih.glb` (~0.5 MB) | NIH 3D `3DPX-010752` | ⚠️ verify license |

**When a model is missing the app currently shows an empty page** (no error
boundary; verified). Only specimens without a `modelAsset` use procedural
geometry. To restore the full-fidelity models for local testing,
see "Restoring assets for local testing" in `docs/ASSET_REVIEW.md`.
