# Roadmap

This roadmap describes the planned evolution of `DIG-cellexplorer` from an
imported open-source prototype into an interactive 3D learning module for
digital medical education at AT Medical GmbH / Digital Education.

> **Important:** Only **Phase 0** is being executed now. Phases 1–6 are
> **planned and documented, not implemented.** Later phases that touch branding,
> authentication, Moodle/LTI, AI backends, analytics, deployment or medical
> certification each require their own issue(s), scope and sign-off before any
> implementation begins.

Status legend: ✅ done · 🔄 in progress · ⬜ planned

---

## Phase 0 — Repository import and governance  🔄 in progress

Goal: a clean, legally transparent, buildable foundation.

- ✅ Upstream import from `cclank/cell-architecture-studio` (code, build config,
  scripts; snapshot commit recorded in `THIRD_PARTY_NOTICES.md`)
- ✅ Standalone repository (not a fork); upstream origin documented
- ✅ Licence preservation (upstream MIT `LICENSE` kept verbatim)
- ✅ Documentation (`README`, this roadmap, development, architecture,
  medical-education scope, third-party notices, asset review)
- ✅ Build verification (`npm install`, `npm run build`, unit tests)
- ✅ GitHub governance templates (issues + PR)
- ✅ Package metadata (`name`, `description`, `private`, repository URLs)
- ⬜ Branch protection + CODEOWNERS (repository-admin task, outside the code)

**Exit criteria:** repo builds; licence/attribution preserved; docs + templates
in place; asset handling defined.

---

## Phase 1 — Technical validation  ⬜

Goal: prove the prototype runs and renders correctly in a browser.

- ⬜ Local install verified on a clean environment (`npm ci`)
- ⬜ Dev server smoke test (`npm run dev`)
- ⬜ Production build + `npm run preview` smoke test
- ⬜ Browser smoke test (desktop / compact / mobile layouts)
- ⬜ 3D rendering validation (GLB load + procedural fallback paths)
- ⬜ Visual verification run (`npm run verify`) with a documented Chrome/Chromium
- ⬜ Performance baseline (bundle sizes, first 3D frame, large-GLB load time)

**Note:** full-fidelity rendering requires restoring the (currently excluded)
3D assets locally — see `ASSET_REVIEW.md`.

---

## Phase 2 — Asset and licence cleanup  ⬜

Goal: every shipped asset is licence-cleared or replaced.

- ⬜ Complete asset inventory (done as a baseline in `ASSET_REVIEW.md`)
- ⬜ Per-asset licence review (NIH 3D entries, generated images, user GLBs)
- ⬜ Replacement strategy executed for unclearable assets
- ⬜ Own-asset pipeline concept (modelling/commission/generation + licensing)
- ⬜ SBOM / npm licence report attached to `THIRD_PARTY_NOTICES.md`
- ⬜ Public/commercial release-readiness review + legal sign-off

**Exit criteria:** no restricted asset remains in any shippable build.

---

## Phase 3 — AT Medical learning data model adaptation  ⬜

Goal: evolve the cell data into an AT Medical didactic learning-object schema.

- ⬜ Review the existing cell data model (`src/data/cells.ts`)
- ⬜ Define AT Medical learning-object schema
- ⬜ Model organelles / structures / explanations as structured, translatable
  learning items
- ⬜ Medical-didactic metadata (source, review state, evidence level)
- ⬜ Difficulty levels
- ⬜ Learning objectives (mapped to curricula / pre-med courses)
- ⬜ Quiz hooks (data-level, no backend)

---

## Phase 4 — AI tutor integration concept  ⬜

Goal: a safe, well-specified concept for the AI tutor (concept only — **no**
backend implementation in this phase).

- ⬜ Define AI-tutor UX (explain / quiz / compare modes)
- ⬜ Define prompt strategy
- ⬜ Define safe medical-education boundaries (no diagnosis/therapy; sourcing;
  uncertainty handling; guardrails)
- ⬜ Define data-flow and privacy boundaries for any future backend
- ⬜ Explicitly: **no** real AI-tutor backend connection in this phase

---

## Phase 5 — Moodle / platform integration concept  ⬜

Goal: a concept for embedding into AT Medical learning platforms.

- ⬜ iframe embedding concept
- ⬜ LTI (1.3 / Advantage) integration concept
- ⬜ Moodle activity concept
- ⬜ SCORM / H5P comparison (trade-offs for this 3D app)
- ⬜ Authentication boundaries (IAM/SSO handled by the platform, not this app)
- ⬜ Learning-progress tracking concept (xAPI/LRS vs. platform gradebook)

---

## Phase 6 — Production hardening  ⬜

Goal: readiness for a real, maintained product.

- ⬜ Accessibility (WCAG; keyboard/screen-reader; 3D alternatives)
- ⬜ Performance (asset streaming, lazy-loading the 3D vendor bundles)
- ⬜ Security (dependency audit remediation, CSP, supply chain)
- ⬜ Privacy (GDPR/DSGVO; data minimisation; no tracking by default)
- ⬜ Deployment (staging-first; reproducible pipeline)
- ⬜ Monitoring
- ⬜ Release process (versioning, changelog, sign-off gates)

---

## Recommended next issues (after Phase 0)

1. Asset inventory and license review
2. Technical architecture review
3. Define AT Medical educational data model
4. Evaluate replacement strategy for 3D models and renders
5. Concept for AI tutor integration
6. Concept for Moodle embedding
7. Accessibility and performance baseline
8. Branding concept for future product phase
