# DIG-cellexplorer

**Interactive 3D cell explorer for digital medical education and AI-assisted learning modules.**

![Status](https://img.shields.io/badge/status-prototype%20%2F%20internal%20evaluation-f59e0b)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=fff)
![Three.js](https://img.shields.io/badge/Three.js-0.181-000000?logo=threedotjs&logoColor=fff)
![Code License](https://img.shields.io/badge/code%20license-MIT-blue)
![Assets](https://img.shields.io/badge/assets-review%20required-red)

> **Project phase:** Repository initialization, governance and technical
> foundation (Phase 0). This is **not** a finished product. It is an internal,
> early-stage technical and didactic foundation derived from a MIT-licensed
> open-source prototype.

---

## 1. Overview (English)

`DIG-cellexplorer` is an internal AT Medical GmbH / Digital Education (DIG)
working base for a browser-based, interactive **3D cell explorer**. It is
intended to grow into an interactive learning module for digital medical
education — selectable cell types, clickable organelles, didactic explanations,
cell-type comparison, microscopy/representation modes, and (in a later phase) an
AI tutor and learning-platform integration.

The repository is derived from the open-source project
[`cclank/cell-architecture-studio`](https://github.com/cclank/cell-architecture-studio)
(MIT-licensed). It is **not** a GitHub fork: the upstream code was imported into
a standalone AT Medical repository so it can serve as an independent,
legally transparent and maintainable foundation, while the upstream origin is
documented transparently.

### Current scope

- **3D Cell Explorer prototype** (imported upstream application code).
- Repository initialization, licence/attribution transparency, governance,
  documentation and build verification.

### Explicitly out of scope for now

Final AT Medical branding · Moodle integration · authentication / IAM / SSO ·
production deployment pipeline · real AI-tutor backend · analytics · user
tracking · medical certification · full content redesign · commercial release.
These are tracked as later phases in [`docs/ROADMAP.md`](docs/ROADMAP.md).

---

## 2. Überblick (Deutsch)

`DIG-cellexplorer` ist eine interne Arbeitsbasis der AT Medical GmbH /
Digital Education (DIG) für einen browserbasierten, interaktiven **3D-Zell-
Explorer**. Ziel ist perspektivisch ein interaktives Lernmodul für die digitale
medizinische Bildung — mit auswählbaren Zelltypen, anklickbaren Organellen,
didaktischen Erklärtexten, Zelltyp-Vergleich, Mikroskopie-/Darstellungsmodi und
– in späteren Phasen – einem KI-Tutor sowie Lernplattform-Integration.

Das Repository leitet sich vom Open-Source-Projekt
[`cclank/cell-architecture-studio`](https://github.com/cclank/cell-architecture-studio)
(MIT-Lizenz) ab. Es ist **kein** GitHub-Fork: Der Upstream-Code wurde in ein
eigenständiges AT-Medical-Repository importiert, um als unabhängige, rechtlich
transparente und wartbare Grundlage zu dienen, wobei die Herkunft transparent
dokumentiert wird.

Aktueller Stand: **Initialisierung, Lizenztransparenz, Governance,
Dokumentation und Build-Verifikation (Phase 0)**. Dies ist **kein** fertiges
Produkt.

---

## 3. Origin & licensing (summary)

| Aspect | Status |
| --- | --- |
| Upstream project | [`cclank/cell-architecture-studio`](https://github.com/cclank/cell-architecture-studio) |
| Upstream code licence | **MIT** (Copyright © 2026 cclank) — preserved in [`LICENSE`](LICENSE) |
| AT Medical additions | Documentation/governance; contributed under the same MIT licence |
| 3D models, renders, images, icons (assets) | **Not cleared.** Separate review required — see [`docs/ASSET_REVIEW.md`](docs/ASSET_REVIEW.md) |

> ⚠️ **Code** from the upstream project may be reused under the MIT licence.
> **Assets** (GLB 3D models, renderings, preview images, screenshots, icons and
> any other media) may carry their own licences, sources and usage terms and
> **must not** be treated as freely/commercially usable until they have been
> reviewed, documented, and — where necessary — replaced.
> Public or commercial use must not happen before the asset review is complete.

Full attribution and third-party components are listed in
[`docs/THIRD_PARTY_NOTICES.md`](docs/THIRD_PARTY_NOTICES.md).

---

## 4. Technology

| Layer | Tools |
| --- | --- |
| App | React 19, TypeScript, Vite 7 |
| 3D | Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`) |
| UI | CSS in `src/styles.css`, Lucide icons |
| Data | Data-driven cell/organelle model in `src/data/cells.ts` |
| Verification | Playwright Core screenshots + PNG pixel metrics (`scripts/verify.mjs`) |

A deeper description is in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## 5. Getting started

### Prerequisites

- **Node.js ≥ 20.19** (verified on Node 22.x). React 19 + Vite 7 require a
  current LTS.
- **npm** (verified on npm 10.x). A committed `package-lock.json` is present;
  use `npm ci` for reproducible installs.

### Install

```bash
npm install     # or: npm ci
```

### Development server

```bash
npm run dev
# Vite serves on http://127.0.0.1:5173/ by default
```

### Production build

```bash
npm run build   # tsc -b && vite build  → output in dist/
```

### Preview the production build

```bash
npm run preview
```

### Tests

```bash
npm run test:unit        # Vitest unit tests
npm run test:preflight   # Node preflight checks (scripts/*.test.mjs)
npm test                 # both of the above
npm run verify           # Playwright visual verification (needs a running dev
                         # server + a Chrome/Chromium binary; see docs/DEVELOPMENT.md)
```

> **Note on 3D assets:** the large GLB models and image assets are **not**
> committed to this repository (licence review pending). **Without them the app
> does not start usefully**: a missing GLB currently leaves an empty page (there
> is no error boundary; verified). Restore the assets from upstream as described
> in [`docs/ASSET_REVIEW.md`](docs/ASSET_REVIEW.md) before running the app.

A verified, step-by-step guide (environment, structure, branching, commits, PRs)
is in [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md).

---

## 6. Documentation map

| Document | Purpose |
| --- | --- |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Phased plan (Phase 0 → Phase 6) |
| [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) | Developer setup, workflow, conventions |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Frontend/3D architecture, data model, integration points |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Staging deployment concept (sub-path, proxy, headers, blockers) |
| [`docs/ASSET_REVIEW.md`](docs/ASSET_REVIEW.md) | Asset inventory, provenance, licence review (pending) |
| [`docs/THIRD_PARTY_NOTICES.md`](docs/THIRD_PARTY_NOTICES.md) | Upstream origin + third-party components |
| [`docs/MEDICAL_EDUCATION_SCOPE.md`](docs/MEDICAL_EDUCATION_SCOPE.md) | Educational-only scope and boundaries |
| [`docs/upstream/`](docs/upstream/) | Preserved upstream README and asset notes (for provenance) |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Contribution guidelines |

---

## 7. Roadmap (short form)

- **Phase 0 — Repository import & governance** *(current)*: upstream import,
  licence preservation, documentation, build verification, GitHub templates.
- **Phase 1 — Technical validation**: install/dev/build/preview, browser smoke
  tests, 3D rendering validation, performance baseline.
- **Phase 2 — Asset & licence cleanup**: asset inventory, licence review,
  replacement strategy, release-readiness review.
- **Phase 3 — AT Medical learning data model**: didactic schema, learning
  objectives, quiz hooks.
- **Phase 4 — AI tutor integration concept**: UX, prompt strategy, safe
  medical-education boundaries (concept only).
- **Phase 5 — Moodle / platform integration concept**: iframe/LTI/SCORM/H5P
  comparison, progress-tracking concept.
- **Phase 6 — Production hardening**: accessibility, performance, security,
  privacy, deployment, monitoring, release process.

Full detail in [`docs/ROADMAP.md`](docs/ROADMAP.md).

---

## 8. Credits & attribution

- Upstream project: [`cclank/cell-architecture-studio`](https://github.com/cclank/cell-architecture-studio) (MIT).
- Upstream credits (preserved): original source inspiration and visual direction
  by [@DilumSanjaya](https://x.com/DilumSanjaya); modular interface, study tools,
  progression system and rendering improvements contributed by
  [@niccomann](https://github.com/niccomann).
- See [`docs/THIRD_PARTY_NOTICES.md`](docs/THIRD_PARTY_NOTICES.md) and
  [`docs/upstream/`](docs/upstream/) for details.

---

## 9. Disclaimer

**This is not a finished medical education product.** It is an internal,
early-stage prototype. It is **not** intended for diagnostic, therapeutic, or
clinical decision-making use. Educational content has **not** undergone
medical-didactic review and must not be relied upon. See
[`docs/MEDICAL_EDUCATION_SCOPE.md`](docs/MEDICAL_EDUCATION_SCOPE.md).

---

## 10. License

Application **code** is licensed under the [MIT License](LICENSE)
(Copyright © 2026 cclank; AT Medical GmbH additions under the same licence).
Included or referenced **assets** retain their own provenance and licences and
are **not** covered by a blanket MIT grant — see
[`docs/ASSET_REVIEW.md`](docs/ASSET_REVIEW.md) and
[`docs/THIRD_PARTY_NOTICES.md`](docs/THIRD_PARTY_NOTICES.md).
