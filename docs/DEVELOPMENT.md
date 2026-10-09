# Development Guide

This guide covers local setup, the development workflow, and the conventions for
contributing to `DIG-cellexplorer`. It reflects the project as actually verified
during Phase 0 (see "Verified environment" below).

---

## 1. Prerequisites

| Tool | Requirement | Notes |
| --- | --- | --- |
| Node.js | **≥ 20.19** (LTS); verified on **22.x** | Required by React 19 + Vite 7. Check with `node --version`. |
| npm | **≥ 10**; verified on **10.9** | Check with `npm --version`. A `package-lock.json` is committed. |
| Browser | Chrome / Chromium | Needed only for `npm run verify`. |

> Other package managers (pnpm/yarn) are not configured; use **npm** so the
> committed lockfile stays authoritative.

### Verified environment (Phase 0)

The import was build-verified on: **Node v22.22.0**, **npm 10.9.4**, Linux.
`npm install` → OK, `npm run build` → OK, `npm run test:unit` → 27/27 passed.
`npm install` reports dependency advisories (from upstream dependency versions);
these are **not** auto-fixed in Phase 0 (no dependency modernization) and are
tracked for Phase 6 (security).

---

## 2. Install

```bash
npm ci        # reproducible install from package-lock.json (preferred in CI)
# or
npm install   # for day-to-day development
```

---

## 3. Everyday commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start Vite dev server at `http://127.0.0.1:5173/` (HMR). |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/`. |
| `npm run preview` | Serve the production build locally. |
| `npm run test:unit` | Run Vitest unit tests. |
| `npm run test:preflight` | Run Node preflight checks (`scripts/*.test.mjs`). |
| `npm test` | Unit tests + preflight checks. |
| `npm run test:watch` | Vitest in watch mode. |
| `npm run verify` | Playwright visual verification (see below). |

### Type checking

`npm run build` runs `tsc -b` first, so a type error fails the build. To
type-check without building you can run `npx tsc -b --noEmit`.

### Visual verification (`npm run verify`)

`scripts/verify.mjs` uses **Playwright Core** to drive a real Chrome/Chromium
and capture desktop/compact/mobile + interaction screenshots, then checks canvas
pixel metrics to catch blank renders or layout regressions.

```bash
# 1) start the app
npm run dev
# 2) in another shell, run verification against the running app
npm run verify
# custom port:
APP_URL=http://127.0.0.1:5174/ npm run verify
# custom Chrome location:
CHROME_PATH="/path/to/chrome" npm run verify
```

> Playwright Core does **not** download a browser; a Chrome/Chromium binary must
> already be present. Full-fidelity 3D checks also need the (excluded) GLB assets
> restored locally — see [`ASSET_REVIEW.md`](ASSET_REVIEW.md).

---

## 4. Project structure

```text
.
├── index.html                # Vite entry HTML
├── package.json              # metadata, scripts, dependencies
├── vite.config.ts            # Vite config (manual 3D vendor chunks)
├── vitest.config.ts          # test config
├── tsconfig*.json            # TypeScript project references
├── scripts/                  # verify.mjs + preflight checks (+ their tests)
├── public/                   # static assets served at site root
│   ├── favicon.svg
│   ├── nih-previews/         # small NIH model previews (committed)
│   ├── models/               # GLB models (NOT committed — see README there)
│   ├── cell-renders/         # renders (NOT committed)
│   ├── cell-renders-transparent/
│   └── texture-references/   # AI-generated teaching images (NOT committed)
├── src/
│   ├── main.tsx              # React entry
│   ├── App.tsx               # top-level app + layout/state wiring
│   ├── styles.css            # global styles
│   ├── components/           # UI + 3D scene components (CellScene, Stage, …)
│   ├── data/cells.ts         # the cell / organelle / asset data model
│   ├── hooks/                # React hooks (progression, shortcuts, overlays…)
│   └── lib/                  # pure logic (progression, storage, daily, theme…)
└── docs/                     # this documentation set + preserved upstream docs
```

See [`ARCHITECTURE.md`](ARCHITECTURE.md) for how these fit together.

---

## 5. Contribution workflow

1. Create a branch from `main` (see branch conventions).
2. Make the **smallest change** that fully meets the task (no unrelated
   refactors, reformatting, or speculative dependency upgrades).
3. Keep upstream **attribution and licence** intact.
4. Do not add unreviewed asset-licensing claims, and do not introduce
   clinical/diagnostic claims (see [`MEDICAL_EDUCATION_SCOPE.md`](MEDICAL_EDUCATION_SCOPE.md)).
5. Verify locally: `npm run build` and `npm test` must pass.
6. Open a PR against `main` using the PR template; fill in the checklist.
7. No secrets in commits.

### Branch conventions

`type/short-description`, e.g.:

- `feat/organelle-tooltips`
- `fix/glb-loading-overlay`
- `docs/asset-review-update`
- `chore/initial-repository-setup`

Types: `feat` · `fix` · `docs` · `chore` · `ci` · `refactor` · `test`.

### Commit conventions

`type(scope): short description`, imperative mood, e.g.:

- `chore: import upstream project`
- `docs: add AT Medical project documentation`
- `chore: add GitHub issue and PR templates`
- `docs: add asset review and third party notices`
- `chore: update package metadata`
- `test: verify initial build`

Keep commits coherent and reviewable; one logical change per commit.

### Pull-request process

- Target branch: `main`.
- PRs require review (and should respect CODEOWNERS once configured).
- The PR description follows [`.github/pull_request_template.md`](../.github/pull_request_template.md),
  including the testing/build result and the asset/licence + medical-content
  checklists.

---

## 6. Troubleshooting

| Symptom | Likely cause / fix |
| --- | --- |
| Blank 3D canvas for plant/white-blood/etc. | GLB assets not present (expected — they are excluded). App should fall back to procedural geometry; restore assets per `ASSET_REVIEW.md` for full fidelity. |
| `npm run verify` cannot find a browser | Set `CHROME_PATH` to a Chrome/Chromium binary. |
| Build fails on `tsc -b` | A TypeScript error; fix types before building. |
| Large bundle warnings | Known (Three.js/R3F vendor chunks); addressed in Phase 1/6, not Phase 0. |
