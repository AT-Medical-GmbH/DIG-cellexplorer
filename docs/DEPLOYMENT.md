# Deployment Concept — Staging under a Sub-Path

**Status: concept + build support only. Nothing has been deployed.**
This document prepares a **non-public staging** deployment of DIG-cellexplorer
under a sub-path of the main AT Medical website (e.g. `/cellexplorer/`). It does
**not** authorise a public release: the asset review in
[`ASSET_REVIEW.md`](ASSET_REVIEW.md) must be completed first.

Decisions taken for this concept:

| Topic | Decision |
| --- | --- |
| Audience | Staging only — access-restricted, **not indexed** |
| Placement | Sub-path of the main site (`/cellexplorer/`) |
| Execution | AT Medical team deploys; this repo only provides build support and documentation |
| Assets | Full asset set allowed **only** while the site is access-restricted |

---

## 1. Build for a sub-path

The app is a static single-page build. A sub-path deployment needs the base path
set **at build time**:

```bash
VITE_BASE_PATH=/cellexplorer/ npm run build   # output: dist/
```

- `VITE_BASE_PATH` defaults to `/`, so local development and root deployments are
  unchanged. It must start **and end** with `/`.
- Asset URLs in `src/data/cells.ts` are resolved through `import.meta.env.BASE_URL`,
  so models and images resolve to `/cellexplorer/models/…` etc.
- `vite preview` must be started with the same variable to serve the sub-path:
  `VITE_BASE_PATH=/cellexplorer/ npm run preview`.

Verified (Phase 1 prep): the build emits `/cellexplorer/assets/…` and
`/cellexplorer/favicon.svg`, and a browser request for a model goes to
`/cellexplorer/models/<file>.glb`.

## 2. What must be served

`dist/` contains only the app (≈1.8 MB JS/CSS before gzip). The 3D assets are
**not** part of the build output unless they exist in `public/` at build time:

| Content | Source | Note |
| --- | --- | --- |
| App bundle | `dist/` | built as above |
| GLB models, renders | `public/models`, `public/cell-renders-transparent` | restored locally from upstream (see `ASSET_REVIEW.md`); **not in git** |

For staging, restore the assets into `public/` **before** `npm run build`, or copy
them next to `dist/`. Do not commit them.

> ⚠️ **A missing GLB breaks the whole page (verified).** The app has no error
> boundary around model loading. With a sub-path build and no
> `models/animal-cell-nih.glb`, the browser showed an **empty page** (no UI, no
> canvas); the animal cell is the default specimen. Only specimens *without* a
> `modelAsset` (epithelial, muscle) use procedural geometry. Deploy the complete
> asset set, or fix this first (see §6).

## 3. Reverse proxy (Traefik) — sketch

`ATMED-traefik` already provides `secureHeaders` and `authentik-forwardauth`
middlewares. A sub-path router must out-rank the WordPress router that owns the
host. Illustrative only — adapt names, hosts, entrypoints and the upstream
service to the real stack; do not copy blindly:

```yaml
http:
  routers:
    cellexplorer-staging:
      rule: "Host(`www.example.com`) && PathPrefix(`/cellexplorer`)"
      priority: 100                  # higher than the WordPress catch-all
      service: cellexplorer-svc      # e.g. a small static server (nginx) serving dist/
      entryPoints: [websecure]
      middlewares:
        - authentik-forwardauth      # or a basicAuth middleware — access restriction
        - cellexplorer-noindex
        - cellexplorer-headers       # see §4; NOT the unmodified secureHeaders
      tls:
        certResolver: letsencrypt
  middlewares:
    cellexplorer-noindex:
      headers:
        customResponseHeaders:
          X-Robots-Tag: "noindex, nofollow, noarchive"
```

- **No `stripPrefix` is needed** — the app is built *with* the base path.
- The static server must serve `index.html` for `/cellexplorer/` and **serve
  `.glb` as `model/gltf-binary`**. There is no client-side router, so no
  history-API fallback is required.
- Access restriction: prefer the existing Authentik forward-auth (central, audited)
  over a shared basic-auth password. This is a **proxy-level** control; the app
  itself has no authentication and must not get any (out of scope).
- Large files: the two biggest GLBs are ≈59 MB and ≈56 MB. Enable compression for
  JS/CSS only (GLB/PNG are already compact or incompressible), set long
  `Cache-Control` for hashed `/assets/*`, and check proxy body/timeouts.

## 4. Security headers and third-party requests (blocker)

The app **fetches resources from third parties at runtime** (found by inspecting
the production bundle):

| Request | Host | Triggered by |
| --- | --- | --- |
| Draco decoder (`…/draco/versioned/decoders/1.5.5/`) | `www.gstatic.com` (Google) | `useGLTF(url, true, true)` in `CellScene.tsx` |
| Studio HDRI (`…/drei-assets/…/hdri/`) | `raw.githack.com` | `<Environment preset="studio">` in `CellScene.tsx` |

Consequences:

1. **CSP conflict.** The shared `secureHeaders` middleware sets
   `connect-src 'self'` and `default-src 'self'`. These requests would be
   blocked (not yet tested in a browser against that CSP). Three.js/R3F also
   typically needs `blob:` for decoded GLB textures and may need `worker-src
   blob:` for decoders — verify empirically.
2. **Privacy (DSGVO).** Even if allowed, every visitor's IP address would be sent
   to Google and a third-party CDN. For a medical-education product this should
   not be accepted by default.

**Recommendation:** self-host both (copy the Draco decoder files from the `three`
package into `public/`, point `useGLTF.setDecoderPath` at them; ship the HDRI as a
licence-cleared local file and use `<Environment files=…>`). Then keep a strict CSP
with only `blob:`/`data:` additions on a dedicated header middleware for this
router. Do **not** loosen the shared `secureHeaders` for the whole site.
Framing: `frame-ancestors 'self'` already allows embedding by same-origin pages.

## 5. Embedding on the website

Because the app lives on the same origin under a sub-path, the website can link to
it or embed it with `<iframe src="/cellexplorer/">`. Notes:

- Give the iframe a sensible height and `allow="fullscreen"`; WebGL works inside
  same-origin iframes.
- State is stored in the browser's `localStorage` under the site origin
  (progress, favourites, notebooks). It is shared with other apps on the same
  origin — check `src/lib/storageKeys.ts` for key collisions and consider the
  privacy statement.

## 6. Pre-conditions before any non-staging use

- [ ] Asset review complete and signed off (`ASSET_REVIEW.md`); unknown-origin GLBs
      replaced.
- [ ] Draco decoder and HDRI self-hosted; no third-party runtime requests.
- [ ] Error boundary / graceful fallback for failed model loads.
- [ ] CSP validated in a real browser against the final header set.
- [ ] Medical-didactic content review (`MEDICAL_EDUCATION_SCOPE.md`).
- [ ] Privacy statement covers `localStorage` use; DSGVO review.
- [ ] Dependency advisories triaged (`npm audit`).
- [ ] Performance baseline (first 3D frame, 120 MB model download).
- [ ] Staging access restriction and `noindex` removed only by explicit decision.

## 7. Rollback

Static build: keep the previous `dist/` directory and switch the served folder (or
revert the router rule). No data migration, no backend, nothing to roll back
beyond files and the proxy rule.
