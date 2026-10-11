# Deployment — login-gated delivery via the AT Medical website

**Status (2026-10-10): app side prepared; tier-A browser check and dependency audit fix still open.**
The app is served under `/cellexplorer/` by the AT Medical WordPress site
(`ATMED-wordpress`), **only to logged-in users**, embedded in the site layout
under *Akademie → Cell Explorer*. The site-side implementation and the operator
runbook live in `ATMED-wordpress/docs/cell-explorer.md`; this document keeps the
**app-side** requirements and the build procedure.

This document does **not** authorise a public or commercial release. It describes
a non-commercial, access-restricted deployment whose asset content is governed by
[`ASSET_REVIEW.md`](ASSET_REVIEW.md) ("Production asset set").

| Topic | Decision |
| --- | --- |
| Audience | Logged-in website users only; `noindex`; no public URL |
| Placement | Sub-path `/cellexplorer/`, iframe on *Akademie → Cell Explorer* |
| Access check | WordPress session, **per file** (page-only or proxy-only checks would leave files reachable by URL) |
| Execution | Build on a build machine, install on the host (`ATMED-core`); never build on the production container |
| Assets | Tier A (CC0) always; tier B (CC BY-NC-SA 4.0) only after the recorded decision; tier C never |

---

## 1. Build

```bash
git clone https://github.com/AT-Medical-GmbH/DIG-cellexplorer.git && cd DIG-cellexplorer
git checkout <release commit>            # the merged main commit, recorded in the deploy log
npm ci                                   # Node ≥ 20.19 (verified 22.x), npm ≥ 10

# 1) restore the licence-cleared assets (git-ignored)
node scripts/prepare-assets.mjs --cc0-only        # or --with-nc after the tier-B decision

# 2) build for the sub-path
VITE_BASE_PATH=/cellexplorer/ npm run build       # output: dist/
```

- `VITE_BASE_PATH` is read at build time, defaults to `/`, and must start **and
  end** with `/`. All asset URLs (`src/data/cells.ts`, Draco decoder, HDRI) go
  through `import.meta.env.BASE_URL`, so they resolve to `/cellexplorer/…`.
- `dist/` is self-contained: `index.html`, hashed `assets/*.js|css`, `draco/`,
  `hdri/`, `favicon.svg`, `nih-previews/`, and `models/` with whatever
  `prepare-assets.mjs` restored. Size without models ≈ 4.2 MB (≈ 2.3 MB
  JS/CSS before gzip, 1.6 MB HDRI, 0.75 MB Draco).
- Local check of the exact artefact: `VITE_BASE_PATH=/cellexplorer/ npm run preview`
  and open `http://127.0.0.1:4173/cellexplorer/`.

### Why not build on the server

The production WordPress container has no Node toolchain, and the staging-first
principle keeps toolchains off production hosts. Build elsewhere, copy `dist/`.

## 2. Install (summary; the authoritative steps are in `ATMED-wordpress/docs/cell-explorer.md`)

```bash
rsync -a --delete dist/ ATMED-core:/srv/atmed/stacks/wordpress/wordpress/wp-content/atmed-private/cellexplorer/
```

The MU-plugin `atmed-cellexplorer.php` serves this directory at `/cellexplorer/`
for logged-in users, writes the directory's `.htaccess` deny rule if it is
missing, and shows the navigation entry as soon as `index.html` exists.

## 3. Runtime requirements and headers

**No third-party request at runtime.** Draco decoder (`public/draco/`) and the
studio HDRI (`public/hdri/`) are self-hosted; a browser smoke test of the
sub-path build contacts no external host (verified 2026-10-09 with the full-asset build).

**Content Security Policy.** The site currently sets no CSP (Traefik
`secure-headers` middleware sets `X-Frame-Options`, nosniff, referrer policy and
HSTS only). If a CSP is introduced for the site or this route, the app needs:

| Directive | Value | Why |
| --- | --- | --- |
| `script-src` | `'self'` | hashed module bundles, no inline scripts |
| `worker-src` | `'self' blob:` | the Draco decoder runs in a Web Worker created from a `blob:` URL (verified) |
| `img-src` | `'self' blob: data:` | decoded GLB textures |
| `connect-src` | `'self'` | model/HDRI fetches |
| `frame-ancestors` | `'self'` | iframe on the same origin (the MU-plugin already sends this) |

**Framing.** `X-Frame-Options` must be `SAMEORIGIN` (the compose label was
`frameDeny=true`); the companion change is in `ATMED-wordpress`.

**Caching.** Responses are `Cache-Control: private` (`immutable` for hashed
`assets/`), `Vary: Cookie`, `X-Robots-Tag: noindex`. Cloudflare and other shared
caches must never store them; Cloudflare honours `private` with default settings
— verify after enabling any "cache everything" rule.

## 4. Behaviour without the full asset set

A missing GLB does **not** break the page: `ModelErrorBoundary` falls back to the
specimen's procedural geometry plus a notice. Missing reference images degrade
to placeholders (sidebar thumbnails, flashcards) or empty thumbnails (quiz review).
Designed behaviour; a browser check of a tier-A-only build is still open (see §8 and `ASSET_REVIEW.md`).

## 5. Browser storage and privacy

The app keeps progress, favourites, notes and quiz history in `localStorage`
under the site origin, all keys prefixed `cas-` (see `src/lib/storageKeys.ts`).
No cookies, no network persistence, no analytics, no tracking. The website's
privacy statement should mention this local storage for the Cell Explorer; the
user can clear it via the app's "Reset all data" action.

## 6. Pre-conditions before the go-live (login-gated, non-commercial)

- [x] Draco decoder and HDRI self-hosted; no third-party runtime requests
- [x] Error boundary / graceful fallback for failed model loads and images
- [x] Sub-path build verified in a browser; CSP needs documented (§3)
- [x] NIH asset licences verified; attribution implemented; restore script with checksums
- [x] CI: build (root + sub-path), tests, tracked-asset guard, licence guard
- [ ] Dependency advisories: `npm audit` reports 12 (2 low, 4 moderate, 6 high; mostly transitive); `npm audit fix` not yet run
- [ ] Tier-B decision recorded in `ASSET_REVIEW.md` (default: tier A only)
- [ ] Both pull requests merged (`DIG-cellexplorer#2`, `ATMED-wordpress#115`)
- [ ] Privacy statement mentions the app's `localStorage` use
- [ ] Operator checklist in `ATMED-wordpress/docs/cell-explorer.md` completed

Out of scope for this deployment and tracked as issues: medical-didactic content
review (#5), accessibility and performance baseline (#9), branding (#10), AI
tutor (#7), Moodle (#8).

## 7. Rollback

Static build: delete or rename the installed directory
(`wp-content/atmed-private/cellexplorer/`) — the route answers 404 and the
navigation entry disappears at once — or reinstall the previous `dist/`. No
database change, no backend, nothing else to roll back.

## 8. Verification log

| Date | What | Result |
| --- | --- | --- |
| 2026-10-09 | Sub-path build emits `/cellexplorer/assets/…`; model request goes to `/cellexplorer/models/…` | OK |
| 2026-10-09 | Headless Chromium on `vite preview`: HDRI + NIH model load same-origin; no third-party host | OK |
| 2026-10-09 | Draco-compressed test model: decoder fetched from `/cellexplorer/draco/`, worker from `blob:` | OK |
| 2026-10-10 | Tier-A-only build in a browser (procedural fallbacks, image placeholders, console) | **open — not yet run** |
