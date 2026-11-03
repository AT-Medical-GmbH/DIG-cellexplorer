# Export des GitHub-Bestands (Stand 2026-11-03)

Gesichert für den Umzug auf die eigenen Server. Quelle: `AT-Medical-GmbH/DIG-cellexplorer`.
Der Quellcode samt Verlauf liegt im Git-Bundle (siehe `SERVER-BETRIEB.md`, Abschnitt Umzug).
Hier stehen die Inhalte, die **nicht** im Git-Verlauf enthalten sind: Issues und Pull Requests.

## Pull Requests

| Nr. | Titel | Stand | Zweig → Ziel | Datum |
| --- | --- | --- | --- | --- |
| 1 | [WIP] Initialize repository for AT Medical digital education prototype | gemergt 2026-06-30 | `copilot/initialization-governance-task` → `main` | 2026-05-31 |
| 2 | Initialize DIG-cellexplorer repository | gemergt 2026-10-11 | `claude/dig-cellexplorer-init-i1f8al` → `main` | 2026-10-09 |
| 11–17, 19 | Dependabot (source-map-js, vitest, baseline-browser-mapping, undici, vite) | 11, 15, 16, 17, 19 offen; 12, 13, 14 geschlossen | `dependabot/npm_and_yarn/*` → `main` | 2026-10-11 bis 2026-10-31 |
| 18 | Fachkorrekturen, NC-Modelle mit Namensnennung, npm audit fix (auf b5da551) | gemergt 2026-10-31 | `feat/fachkorrekturen-nc-audit` → `claude/dig-cellexplorer-init-i1f8al` | 2026-10-31 |

Hinweis: `main` steht noch auf `19ec0b6`; die Arbeit der letzten Wochen liegt auf dem Zweig
`claude/dig-cellexplorer-init-i1f8al`. Beim Umzug sollte dieser Zweig zum neuen `main` werden
(siehe Umzugsplan). Die offenen Dependabot-PRs sind durch den `npm audit fix` (PR 18) teilweise überholt.

## Issues (alle offen, angelegt 2026-10-09 von AndreasTremml)

### #3 Asset inventory and license review — Labels: asset-review, legal, phase-2

Every media asset the app ships is either licence-cleared (with recorded attribution) or replaced. Until then no public or commercial use, and no production install on the website.

Baseline inventory: `docs/ASSET_REVIEW.md`. The heavy binaries (~192 MB) are deliberately **not** in this repo (decision 2026-10-09) and are restored locally from upstream for builds.

Highest risk: `plant-cell-first001.glb` (59 MB) and `white-blood-cell-user.glb` (56 MB) — upstream "user-provided", **unknown origin**; `public/texture-references/gpt-image-2-…` AI-generated images; `public/cell-renders*/` generated reference images; NIH 3D models (3DPX-015797, 3DPX-015796, 3DPX-010752) — licence varies per entry.

Tasks: one *License / Asset Review* issue (template) per asset group; NIH 3D exact licence text + attribution per entry; unknown-origin GLBs: prove provenance or mark replace; generated images: document tool and output terms or mark replace; `favicon.svg`, `nih-previews/*`, demo media reviewed; SBOM / npm licence report in `docs/THIRD_PARTY_NOTICES.md`; sign-off table in `docs/ASSET_REVIEW.md`.

Acceptance: `docs/ASSET_REVIEW.md` has no row with status "pending"; each remaining asset has licence, attribution requirement and commercial-use answer; legal sign-off dated.

### #4 Technical architecture review — Labels: architecture, phase-1

Confirm the imported upstream architecture is a sound base and list what must change before it is more than a prototype. Starting points: `docs/ARCHITECTURE.md`, `CellScene.tsx` (~1 060 lines), `src/data/cells.ts`, `src/lib/*`, bundle (`three` ≈ 189 kB gzip, `r3f` ≈ 252 kB gzip, no lazy loading).
Questions: is the data-driven `CellItem` model the right seam for the learning-object schema (#5)? Split `CellScene.tsx`? What must move from `localStorage` to a platform (Phase 5)? Error handling (model-load failures fixed; WebGL unavailable; low-end devices). Third-party runtime requests (Draco, HDRI now self-hosted; any others?). `npm audit` triage. Testing strategy beyond Vitest.
Acceptance: short written review in `docs/ARCHITECTURE.md` ("Review findings") with prioritised changes per phase.

### #5 Define AT Medical educational data model — Labels: content, phase-3

Evolve `src/data/cells.ts` into an AT Medical learning-object schema carrying reviewed, versioned, translatable didactic content — without rewriting the UI. Scope (concept + schema, no content rewrite): review `CellItem`/`OrganelleItem`/`CellModelAsset`; schema (identity, structure cell → organelle → feature, explanations, media refs); medical-didactic metadata (sources, review state, reviewer, evidence rating, last-reviewed); difficulty levels and audience (preMED, students, nursing); learning objectives; quiz hooks at data level (stems, distractors, explanation); localisation DE primary / EN secondary; migration path from static TS data.
Boundaries: `docs/MEDICAL_EDUCATION_SCOPE.md` — educational only; upstream `clinicalContext` strings must be reviewed first.
Acceptance: schema documented, one specimen migrated as worked example, no UI regression.

### #6 Evaluate replacement strategy for 3D models and renders — Labels: asset-review, phase-2, 3d

Plan and pipeline for replacing assets that cannot be cleared, and for producing own assets. Two of five GLB models (plant cell, white blood cell, 115 MB together) have unknown origin. Options per specimen: licence-cleared open models (NIH 3D, BioModels, Sketchfab CC-BY/CC0, Poly Haven, open EM data); commissioned/in-house modelling (Blender) with AT Medical as rights holder; procedural Three.js geometry; generated images only under evidenced terms; size budget (current max ≈ 59 MB).
Deliverables: decision matrix (specimen × option × licence × cost × quality × size); own-asset pipeline concept (GLB, meshopt/Draco, naming, provenance metadata in `CellModelAsset`); replacement order. Depends on: asset inventory and licence review.

### #7 Concept for AI tutor integration — Labels: concept, ai-tutor, phase-4

Written, reviewable concept — **no backend implementation**. Scope: UX (where the tutor lives; modes explain / quiz / compare; relation to the static prompts panel); prompt strategy grounded in curated learning-object data with source citation; safe medical-education boundaries (no diagnosis/therapy/clinical advice, uncertainty, refusal, educator review); data-flow and privacy (no patient data, logging policy, DSGVO); model/provider options and cost model; relation to CogniCore™ / ATMED-ai-brain.
Deliverable: `docs/AI_TUTOR_CONCEPT.md` with open decisions for Andreas. No code, no keys, no provider integration.

### #8 Concept for Moodle embedding — Labels: concept, integration, phase-5

Decide how the app is embedded into AT Medical learning platforms (concept only). Compare: iframe/URL resource; LTI 1.3 (identity, grade passback); activity plugin; SCORM/H5P. Define: authentication boundary (identity stays with Moodle/Authentik); progress tracking (xAPI/LRS vs. gradebook, privacy); hosting (same origin vs. subdomain, CSP/`frame-ancestors`, asset delivery of 120 MB models); reuse of `moodle/theme/atmedical` conventions in `ATMED-docs`.
Deliverable: `docs/MOODLE_INTEGRATION_CONCEPT.md` with recommendation and trade-off table.

### #9 Accessibility and performance baseline — Labels: phase-1, accessibility, performance

Measure before hardening. Performance: bundle analysis, lazy-loading the 3D stack, time to first 3D frame (desktop and mid-range phone), large-GLB behaviour on throttled connection, memory/GPU on mobile, WebGL-unavailable path, `npm run verify` with pinned Chromium. Accessibility (WCAG 2.2 AA): keyboard navigation, screen-reader alternative for the 3D view, contrast and focus in the dark UI, `prefers-reduced-motion`, language attributes (DE/EN), heading structure.
Deliverable: `docs/BASELINE.md` with measurements, device list, prioritised findings.

### #10 Branding concept for future product phase — Labels: concept, branding

Concept for AT Medical / Digital Education branding — not for the initialization phase. Naming ("Cell Explorer" vs. product name in the AT Medical family); visual identity (colours, Inter / Source Serif, accent system); `favicon.svg`, title, About modal, credits (upstream attribution must remain); relation to the website theme and the Moodle theme `atmedical`; demo media to replace; what must not change (MIT attribution, asset provenance notices, educational disclaimer).
Deliverable: `docs/BRANDING_CONCEPT.md` plus list of design assets to be produced under AT Medical's own rights.
Hinweis: Titel „Cell Explorer“, AT-Medical-Layout und Inter/Source Serif sind inzwischen umgesetzt (2026-10-31).

(Die Beschreibungen sind gekürzt wiedergegeben; die Originaltexte stehen bis zur Abschaltung des GitHub-Repositories dort.
Vor einer Abschaltung bitte die Originale vollständig exportieren, z. B. mit `gh issue list --state all --json number,title,body,labels,comments`.)
