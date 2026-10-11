# Contributing to DIG-cellexplorer

Thank you for contributing. This is an **internal AT Medical GmbH / Digital
Education** prototype in its initialization phase. Please read this alongside
[`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md),
[`docs/MEDICAL_EDUCATION_SCOPE.md`](docs/MEDICAL_EDUCATION_SCOPE.md), and
[`docs/ASSET_REVIEW.md`](docs/ASSET_REVIEW.md).

## Ground rules

1. **Smallest change that meets the goal.** No unrelated refactors,
   reformatting, or speculative dependency upgrades.
2. **Preserve licence & attribution.** Never remove or alter the upstream MIT
   `LICENSE` or the credits in `README.md` / `docs/THIRD_PARTY_NOTICES.md`.
3. **Assets are restricted.** Do not add assets with unverified licensing, and
   do not claim an asset is cleared for public/commercial use. Use the
   *License / Asset Review* issue template instead.
4. **No clinical claims.** Do not introduce diagnostic, therapeutic, or clinical
   decision-making content or implications.
5. **No secrets.** Never commit tokens, keys, passwords, or credentials.
6. **Keep it buildable.** `npm run build` and `npm test` must pass before a PR.

## Workflow

1. Branch from `main`: `type/short-description`
   (`feat` · `fix` · `docs` · `chore` · `ci` · `refactor` · `test`).
2. Commit with `type(scope): short description` (imperative mood).
3. Run `npm run build` and `npm test` locally.
4. Open a PR against `main` using the PR template and complete its checklist.
5. Respect review ownership (CODEOWNERS, once configured).

## Reporting

- Bugs → *Bug report* issue template.
- Ideas/features → *Feature request* issue template (include educational value).
- Asset/licence questions → *License / Asset Review* issue template.

## Scope reminder

Branding, Moodle/LTI, auth/IAM/SSO, AI-tutor backend, analytics, tracking,
deployment pipelines and medical certification are **out of scope** for now and
are tracked as later phases in [`docs/ROADMAP.md`](docs/ROADMAP.md). Open an
issue to discuss before starting work in those areas.
