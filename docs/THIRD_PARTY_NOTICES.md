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

## 3. Asset provenance (NOT cleared)

The upstream project ships substantial binary media assets. **Their licensing
has not been verified**, and some have unknown origin. They are therefore
**not committed** to this AT Medical repository during Phase 0, and none of them
may be published or used commercially until reviewed.

High-level provenance (full inventory in [`ASSET_REVIEW.md`](ASSET_REVIEW.md)):

| Asset group | Upstream origin | Concern |
| --- | --- | --- |
| `public/models/plant-cell-first001.glb` | "user-provided" (`/Users/lank/Downloads/first001.glb`) | **Unknown provenance / licence** |
| `public/models/white-blood-cell-user.glb` | "user-provided" (`/Users/lank/Downloads/second.glb`) | **Unknown provenance / licence** |
| `public/models/*-nih.glb` + `public/nih-previews/*` | NIH 3D (3d.nih.gov entries 3DPX-015797, 3DPX-015796, 3DPX-010752) | Per-entry licence/attribution must be verified |
| `public/cell-renders/`, `public/cell-renders-transparent/` | Generated reference/thumbnail images | Generated-image IP/usage terms unverified |
| `public/texture-references/gpt-image-2-…/` | AI-generated (GPT image model) teaching images | Generated-image IP/usage terms unverified |
| `docs/media/*` | Demo GIF/MP4 of the upstream app | Shows upstream UI/branding; re-create for AT Medical |

> The small NIH **preview PNGs** (`public/nih-previews/`) and the `favicon.svg`
> are retained in the repository for continuity, but they too remain subject to
> the asset review (their licence status is confirmed in
> [`ASSET_REVIEW.md`](ASSET_REVIEW.md)).

---

## 4. Placeholder for further third-party components

As the project evolves (AI tutor, Moodle/LTI integration, replacement assets,
fonts, additional libraries), add each new third-party component here with:
name, source/URL, licence, version, and whether attribution/modification/
commercial use is permitted.

- _(none yet beyond the above)_

---

## 5. Review gate

**No public release, external distribution, or commercial use of this project
may occur until the asset review in [`ASSET_REVIEW.md`](ASSET_REVIEW.md) is
completed and signed off.** This notice must be kept in sync with that review.
