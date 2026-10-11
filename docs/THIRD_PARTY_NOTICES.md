# Third-Party Notices

This document records the origin of `DIG-cellexplorer` and the third-party
components it builds on. It exists to keep the project **legally transparent**:
the application code is derived from a MIT-licensed open-source project, and the
media assets carry separate, not-yet-cleared provenance.

> **Summary:** This project is initially derived from a MIT-licensed open-source
> project. Code is reused under MIT. Assets (3D models, renders, preview images,
> screenshots, icons, generated images) are **not** cleared for use and must be
> reviewed before any public or commercial usage — see
> [`ASSET_REVIEW.md`](ASSET_REVIEW.md).

---

## 1. Upstream project

| Field | Value |
| --- | --- |
| Name | Cell Architecture Studio |
| Repository | `cclank/cell-architecture-studio` |
| URL | https://github.com/cclank/cell-architecture-studio |
| Licence | MIT License |
| Copyright | © 2026 cclank |
| Import snapshot | Upstream `main`, commit `1cab982e7a0f96af854a696430c0724707764358` (imported 2026-10-09) |

The upstream MIT licence text is preserved verbatim in [`../LICENSE`](../LICENSE).
Per the MIT licence, the copyright notice and permission notice are retained in
this repository.

### Relationship to AT Medical

- This repository is a **standalone import**, not a GitHub fork.
- The upstream origin is documented here and in [`upstream/`](upstream/)
  (the preserved upstream `README.md` and asset notes).
- AT Medical GmbH documentation and governance additions in this repository are
  contributed under the same MIT licence as the code.
- Optionally, a git remote named `upstream` may be configured locally to track
  later upstream changes:
  `git remote add upstream https://github.com/cclank/cell-architecture-studio.git`

### Upstream credits (preserved)

- Original source inspiration and visual direction: **@DilumSanjaya**
  (https://x.com/DilumSanjaya).
- Modular interface, study tools, progression system and rendering improvements:
  **@niccomann** (https://github.com/niccomann),
  contributed via upstream PR #4.

---

## 2. Runtime dependencies (npm)

These are declared in [`../package.json`](../package.json). Each is distributed
under its own licence (typically MIT / Apache-2.0 / BSD). This list is a pointer,
not a substitute for a generated SBOM — see the open task below.

| Package | Role | Typical licence |
| --- | --- | --- |
| `react`, `react-dom` | UI runtime | MIT |
| `three` | 3D engine | MIT |
| `@react-three/fiber` | React renderer for Three.js | MIT |
| `@react-three/drei` | R3F helpers | MIT |
| `meshoptimizer` | mesh/GLB optimization | MIT |
| `lucide-react` | icon set (SVG) | ISC |

### Development dependencies

`vite`, `@vitejs/plugin-react`, `typescript`, `vitest`, `jsdom`,
`playwright-core`, `pngjs`, `@types/*` — build/test tooling, each under its own
(permissive) licence.

> **Open task:** generate a complete, machine-readable SBOM / licence report
> (e.g. `license-checker`, `syk`/`cyclonedx`, or `npm sbom`) and attach the
> result here. Tracked in [`ROADMAP.md`](ROADMAP.md) (Phase 2).

---

## 3. Asset provenance

The upstream project ships substantial binary media assets. They are **not
committed** to this repository; licence-cleared files are restored for a build by
`scripts/prepare-assets.mjs` (pinned commit, SHA-256-verified). Full inventory
and the production asset tiers: [`ASSET_REVIEW.md`](ASSET_REVIEW.md).

### 3D models from the NIH 3D Print Exchange (verified 2026-10-09)

| Model (file) | NIH 3D entry | Author | Licence | Attribution shown |
| --- | --- | --- | --- | --- |
| Gram Positive Bacterial Cell Wall Model (`bacteria-wall-nih.glb`, preview PNG) | https://3d.nih.gov/entries/3DPX-010752 | Model3D | **CC0 1.0** (Public Domain) | yes (voluntary) |
| Animal Cell (`animal-cell-nih.glb`, preview PNG) | https://3d.nih.gov/entries/3DPX-015797 | destacados tv | **CC BY-NC-SA 4.0** | yes — required |
| Neuron (`neuron-nih.glb`, preview PNG) | https://3d.nih.gov/entries/3DPX-015796 | destacados tv | **CC BY-NC-SA 4.0** | yes — required |

Attribution is rendered in the app (loading notice label and the *About* dialog,
driven by `author` / `licence` / `licenceUrl` in `src/data/cells.ts`) and
recorded here. The CC BY-NC-SA models may only be included in **non-commercial**
deployments and only after the decision recorded in `ASSET_REVIEW.md`
("Production asset set", tier B). Licence texts:
https://creativecommons.org/publicdomain/zero/1.0/ ·
https://creativecommons.org/licenses/by-nc-sa/4.0/

### Not cleared — never shipped

| Asset group | Upstream origin | Concern |
| --- | --- | --- |
| `public/models/plant-cell-first001.glb` | "user-provided" (`/Users/lank/Downloads/first001.glb`) | **Unknown provenance / licence** |
| `public/models/white-blood-cell-user.glb` | "user-provided" (`/Users/lank/Downloads/second.glb`) | **Unknown provenance / licence** |
| `public/cell-renders/`, `public/cell-renders-transparent/` | Generated reference/thumbnail images | Generated-image IP/usage terms unverified |
| `public/texture-references/gpt-image-2-…/` | AI-generated (GPT image model) teaching images | Generated-image IP/usage terms unverified |
| `docs/media/*` | Demo GIF/MP4 of the upstream app | Shows upstream UI/branding; re-create for AT Medical |

> `favicon.svg` ships with the upstream code under MIT and will be replaced by
> AT Medical branding in a later phase.

---

## 4. Placeholder for further third-party components

As the project evolves (AI tutor, Moodle/LTI integration, replacement assets,
fonts, additional libraries), add each new third-party component here with:
name, source/URL, licence, version, and whether attribution/modification/
commercial use is permitted.

| Component | Source | Licence | Where | Notes |
| --- | --- | --- | --- | --- |
| Draco glTF decoder (`draco_decoder.js/.wasm`, `draco_wasm_wrapper.js`) | Google Draco, copied from `three/examples/jsm/libs/draco/gltf/` (three.js r181) | Apache-2.0 | `public/draco/` | Self-hosted instead of `www.gstatic.com`. Licence text: https://github.com/google/draco/blob/master/LICENSE |
| `studio_small_03_1k.hdr` ("Studio Small 03", Greg Zaal) | Poly Haven, https://polyhaven.com/a/studio_small_03 | CC0 1.0 | `public/hdri/` | Self-hosted instead of `raw.githack.com` (drei preset "studio"). No attribution required; given anyway. |

---

## 5. Review gate

**No public release, external distribution, or commercial use of this project
may occur until the asset review in [`ASSET_REVIEW.md`](ASSET_REVIEW.md) is
completed and signed off.** The login-gated, non-commercial website deployment
described in [`DEPLOYMENT.md`](DEPLOYMENT.md) may ship tier-A assets (CC0) at
any time and tier-B assets (CC BY-NC-SA 4.0) only after the recorded decision.
This notice must be kept in sync with that review.
