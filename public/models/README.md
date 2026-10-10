# `public/models/` — 3D GLB models (NOT committed)

The GLB models that power the high-fidelity specimens are **not committed** to
this repository. Licence-cleared files are restored for a build with
`node scripts/prepare-assets.mjs` (pinned to the upstream import commit and
SHA-256-verified); see [`docs/ASSET_REVIEW.md`](../../docs/ASSET_REVIEW.md).

Files referenced by `src/data/cells.ts`:

| File | Source | Licence (verified 2026-10-09) | Restorable |
| --- | --- | --- | --- |
| `bacteria-wall-nih.glb` (~0.5 MB) | NIH 3D `3DPX-010752`, Model3D | **CC0 1.0** | `--cc0-only` |
| `animal-cell-nih.glb` (~1.5 MB) | NIH 3D `3DPX-015797`, destacados tv | **CC BY-NC-SA 4.0** | `--with-nc` (decision required) |
| `neuron-nih.glb` (~2.9 MB) | NIH 3D `3DPX-015796`, destacados tv | **CC BY-NC-SA 4.0** | `--with-nc` (decision required) |
| `plant-cell-first001.glb` (~59 MB) | **Unknown** — upstream "user-provided" | unknown | ⛔ never |
| `white-blood-cell-user.glb` (~56 MB) | **Unknown** — upstream "user-provided" | unknown | ⛔ never |

When a model is missing, the app falls back to that specimen's procedural
geometry and shows a "3D model unavailable" notice (error boundary in
`CellScene.tsx`).
