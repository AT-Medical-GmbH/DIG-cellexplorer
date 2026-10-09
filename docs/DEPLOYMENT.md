# Deployment Concept — Login-gated, served by WordPress

**Status: prepared, nothing deployed.** The app is delivered under
`/cellexplorer/` by the AT Medical WordPress site (`ATMED-wordpress`), **only to
logged-in users**, and embedded in the site layout under *Akademie → Cell Explorer*.
The implementation lives in `ATMED-wordpress` (`docs/cell-explorer.md`); this
document keeps the app-side requirements. It does **not** authorise a release: the
asset review in [`ASSET_REVIEW.md`](ASSET_REVIEW.md) must be completed first.

> **Superseded:** the earlier Traefik-router sketch (§3) is no longer the plan.
> A proxy rule or a page-level check alone would leave the files reachable by URL;
> WordPress now checks the session for every file. §3 is kept for reference only.

Decisions taken for this concept:

| Topic | Decision |
| --- | --- |
| Audience | Logged-in website users only, **not indexed** |
| Placement | Sub-path `/cellexplorer/`, embedded as an iframe on *Akademie → Cell Explorer* |
| Execution | AT Medical team deploys; code for the site side is in `ATMED-wordpress` |
| Assets | Logged-in is **not** the same as reviewed: if registration is open, anyone can become a user. Gate on the asset review or restrict by role |

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

> ✅ **Missing GLB no longer breaks the page.** An error boundary around the model
> loader now falls back to the procedural geometry of that specimen and shows a
> "3D model unavailable" notice (verified in a browser). Deploying the complete
> asset set is still required for the intended fidelity.

## 3. Reverse proxy (Traefik) — sketch (superseded, reference only)

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
- Access restriction: now done in WordPress (`is_user_logged_in()` per file). The
  app itself has no authentication and must not get any (out of scope).
- **Framing:** the site's Traefik label `frameDeny=true` sends
  `X-Frame-Options: DENY` and blocks the iframe, even same-origin. It must become
  `SAMEORIGIN` (documented in `ATMED-wordpress/docs/cell-explorer.md`).
- Large files: the two biggest GLBs are ≈59 MB and ≈56 MB. Enable compression for
  JS/CSS only (GLB/PNG are already compact or incompressible), set long
  `Cache-Control` for hashed `/assets/*`, and check proxy body/timeouts.

## 4. Security headers and third-party requests (resolved)

**Resolved on this branch:** the Draco decoder (`public/draco/`, Apache-2.0) and
the studio HDRI (`public/hdri/`, CC0 from Poly Haven) are now shipped with the
app and loaded from the same origin. A browser smoke test on the sub-path build
contacts no third-party host. The analysis below is kept for the record.

Originally the app **fetched resources from third parties at runtime** (found by
inspecting the production bundle):

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

**Done:** both are self-hosted (`useGLTF.setDecoderPath`, `<Environment files=…>`).
Remaining CSP note: Three.js still needs `blob:` (decoded textures) and possibly
`worker-src blob:`; verify against the final header set. Do **not** loosen the
shared `secureHeaders` for the whole site.
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
- [x] Draco decoder and HDRI self-hosted; no third-party runtime requests.
- [x] Error boundary / graceful fallback for failed model loads.
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
