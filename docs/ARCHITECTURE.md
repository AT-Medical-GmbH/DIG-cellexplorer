# Architecture

A high-level description of how `DIG-cellexplorer` is built, intended to orient
developers and to mark the seams where AT Medical adaptations and future
integrations will attach. This reflects the **imported upstream** structure;
it is descriptive, not a redesign.

> Scope note: this documents the **prototype** as imported. It deliberately does
> not propose a production architecture — that belongs to Phase 6 and to the
> integration concepts (Phases 4–5).

---

## 1. Frontend architecture

- **Single-page React 19 application** bundled by **Vite 7**, written in
  **TypeScript**.
- Entry: `index.html` → `src/main.tsx` → `src/App.tsx`.
- `App.tsx` is the composition root: it holds top-level UI state (selected cell,
  active organelle, view mode, overlays), wires the layout components, and
  connects the hooks (progression, overlays, keyboard shortcuts).
- Styling is global CSS in `src/styles.css`; icons come from `lucide-react`.
- State is **local and client-side** (React state + `localStorage`); there is no
  backend and no network API in the prototype.

### Layout composition (from `App.tsx`)

```
App
├── Header                 app bar, actions, accent/theme
├── SpecimenStrip          horizontal specimen selector
├── Sidebar                specimen list / navigation
├── Stage                  hosts the 3D canvas (CellScene) + overlays
│   └── CellScene          the R3F/Three.js scene (largest module)
├── RightPanel             organelle detail, microscope modes, metadata
├── BottomPanels           comparison / supporting panels
└── Modals & overlays      Comparison, About, SpecimenGrid, Notebooks,
                           Flashcards, SpecimenQuiz (lazy), AchievementsPanel,
                           DailyChallenge, ShortcutsHelp, WelcomeTour,
                           Toast, Confetti, CelebrationBanner
```

`SpecimenQuiz` is **code-split** via `React.lazy` + `Suspense`.

---

## 2. Component structure (`src/components/`)

Components fall into three groups:

1. **3D / rendering** — `CellScene.tsx` (the Three.js scene; by far the largest
   component), `Stage.tsx` (canvas host + loading overlay), `MiniCell.tsx`
   (small inline 3D preview).
2. **Didactic UI** — `RightPanel`, `BottomPanels`, `ComparisonModal`,
   `SpecimenQuiz`, `FlashcardsModal`, `NotebooksModal`, `SpecimenGridModal`,
   `SpecimenStrip`, `Sidebar`, `Header`.
3. **Progression / feedback / onboarding** — `AchievementsPanel`,
   `DailyChallenge`, `XpBar`, `CelebrationBanner`, `Confetti`, `Toast`,
   `WelcomeTour`, `ShortcutsHelp`, `UserMenu`, `AboutModal`, `Modal`.

---

## 3. Data model (`src/data/cells.ts`)

The learning content is **data-driven**, which is what makes the project a good
base for AT Medical content. Key exported types:

- `ModelKind` — one of the seven specimens (`plant`, `whiteBlood`, `neuron`,
  `epithelial`, `bacteria`, `animal`, `muscle`).
- `ViewMode` — `"mesh" | "focus"`.
- `OrganelleItem` — `id`, `name`, `subtitle`, `color`, `attributes[]`, `note`,
  `fact`.
- `CellModelAsset` — `url`, `previewUrl`, `sourceLabel`, `sourceUrl`, transform
  (`scale`, `rotation`, `position`, `exposure`), `materialMode`.
- `CellRenderImage` — `url`, `aspect`.
- `CellItem` — the full specimen: identity/colours, `modelKind`,
  `defaultOrganelle`, `comparison`, `clinicalContext`, optional `modelAsset` and
  `renderImage`, `occurrence`, `microscope[]`, and `organelles[]`.

Asset URLs point at `public/` paths (e.g. `/models/animal-cell-nih.glb`,
`/nih-previews/…`, `/cell-renders-transparent/…`). `sourceUrl`/`sourceLabel`
carry provenance strings (including the unverified upstream origins). These are
exactly the fields that the Phase-2 asset review and the Phase-3 learning-object
schema will formalise.

---

## 4. 3D rendering layer

- **Three.js** via **React Three Fiber** (`@react-three/fiber`) with **Drei**
  helpers (`@react-three/drei`); `meshoptimizer` supports GLB optimisation.
- Specimens with a `modelAsset` load a **GLB** from `public/models/`; specimens
  without one (epithelial, muscle) use **procedural Three.js geometry**. There is
  **no error boundary**: if a referenced GLB is missing or fails to load, the whole
  React tree unmounts and the page is empty (verified in a browser, see
  `DEPLOYMENT.md`).
- Two **third-party runtime requests** exist: the Draco decoder
  (`www.gstatic.com`) and the studio HDRI (`raw.githack.com`) — see
  `DEPLOYMENT.md` §4.
- A loading overlay covers large-GLB fetches on slow networks.
- `vite.config.ts` splits the heavy 3D stack into long-cached vendor chunks
  (`three`, and `@react-three/fiber`+`drei` as `r3f`). Built sizes (gzip):
  `three` ≈ 189 kB, `r3f` ≈ 252 kB — see Phase 1/6 for lazy-loading work.
- Material handling lives in `src/lib/cellMaterials.ts` (`materialMode`:
  `studio` / `native` / `solid`).

---

## 5. Logic & persistence (`src/lib/`, `src/hooks/`)

- `src/lib/` holds **pure, testable logic**: `progression.ts` (XP/levels),
  `daily.ts` (daily challenge/specimen), `storage.ts` + `storageKeys.ts`
  (`localStorage` persistence), `theme.ts` (accent), `download.ts`
  (screenshot/GLB export), `quizSound.ts`. Several have co-located
  `*.test.ts` files (Vitest).
- `src/hooks/` adapts that logic to React: `useProgression`, `useOverlays`,
  `useKeyboardShortcuts`, `useEscapeToClose`.
- Persistence is **per-browser `localStorage`** only — no accounts, no server.

---

## 6. Asset structure

See [`ASSET_REVIEW.md`](ASSET_REVIEW.md) for the authoritative inventory. In
short: static assets are served from `public/` at the site root; the large,
unreviewed binaries (GLB models, renders, AI-generated textures, demo media) are
**excluded** from this repository and restored locally when needed.

---

## 7. Verification tooling (`scripts/`)

- `verify.mjs` — Playwright-Core driven screenshot + pixel-metric verification
  against a running dev server.
- `verify-preflight.mjs` (+ `*.test.mjs`) — Node-test preflight checks.

---

## 8. Future integration points (planned, not built)

The architecture intentionally keeps clean seams for later phases:

| Seam | Where | Future use |
| --- | --- | --- |
| Content/data | `src/data/cells.ts` + types | AT Medical learning-object schema, metadata, difficulty, objectives (Phase 3) |
| AI tutor | a panel/service boundary around the didactic UI | AI-tutor UX + prompt strategy (Phase 4; **no** backend yet) |
| Embedding | app shell / `index.html` / build output | iframe / LTI / Moodle activity (Phase 5) |
| Identity | **none in-app** | delegated to the hosting platform (IAM/SSO), never embedded here |
| Progress | `src/lib/storage.ts` (local only) | xAPI/LRS or platform gradebook (Phase 5) |
| Assets | `public/` + `CellModelAsset` provenance fields | own-asset pipeline / replacements (Phase 2) |
| Branding | `favicon.svg`, theme, copy | AT Medical branding (later phase) |

---

## 9. Prototype vs. production boundary

| Concern | Prototype (now) | Production (later) |
| --- | --- | --- |
| Data | Static TS in `src/data` | Reviewed, versioned learning objects |
| Persistence | `localStorage` | Platform-managed, privacy-reviewed |
| Auth | none | Delegated to platform (not in this app) |
| AI tutor | UI concept only | Specified, guard-railed service |
| Assets | upstream, unreviewed, excluded | cleared/replaced + attributed |
| Deployment | local dev/build | staging-first, monitored pipeline |
| Medical content | **unreviewed** | medical-didactically reviewed |
