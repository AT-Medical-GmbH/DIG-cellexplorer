# Medical Education Scope & Boundaries

This document defines what `DIG-cellexplorer` **is** and, importantly, what it
**is not**, from a medical and regulatory standpoint. It applies to the current
prototype and to all future phases until explicitly superseded by a signed-off
scope change.

---

## 1. What this project is

- An **educational prototype**: an interactive 3D explorer of cells and
  organelles intended, in the long term, for **digital medical education** —
  pre-med courses, cell-biology and histology foundations, and AI-assisted
  learning modules at AT Medical GmbH / Digital Education.
- Content is **illustrative and didactic**, aimed at learning and exploration.

## 2. What this project is NOT

`DIG-cellexplorer` is **not** and must **not** be presented or used as:

- a **diagnostic** tool or aid;
- a source of **therapy / treatment recommendations**;
- **clinical decision support** of any kind;
- a **medical device** or a component of one;
- a certified or validated medical-education product;
- a source of clinically authoritative or patient-specific information.

No diagnostic, therapeutic, or clinical decision-making use is intended or
permitted.

---

## 3. Content-status disclaimer (current state)

- The educational content imported from the upstream project has **not** been
  medically or didactically reviewed by AT Medical.
- Organelle descriptions, "clinical context" strings, comparisons and quiz
  content are **unverified prototype content** and may be incomplete,
  simplified, or inaccurate.
- Nothing in the app should be relied upon for study assessment or any
  real-world decision until a formal review has taken place.

---

## 4. Required review processes (before any didactic use)

Before the project is used with real learners or published, it requires:

1. **Medical-didactic content review** — subject-matter review of every
   specimen, organelle, fact, comparison, and quiz item by qualified reviewers,
   with sources and an evidence/accuracy rating recorded.
2. **Pedagogical review** — learning objectives, difficulty levelling, and
   alignment with the target curriculum.
3. **Localization review** — if content is translated (e.g. DE/EN), medical
   terminology must be checked in each language.
4. **Accessibility review** — ensure the material is usable by all intended
   learners (see Roadmap Phase 6).
5. **Sign-off** — recorded approval (name + date) stored with the content.

These processes are **not** part of Phase 0.

---

## 5. Boundaries for the future AI tutor (Phase 4, concept only)

When the AI-tutor concept is developed, it must be designed within these
boundaries:

- **Educational framing only** — explain, quiz, and compare cell biology; never
  diagnose, triage, or advise on treatment.
- **No patient data** — the tutor must not request, process, or store
  personal/patient health information in the prototype or concept.
- **Sourced and bounded** — answers should stay within curated educational
  content; uncertainty must be expressed, not hidden.
- **Human oversight** — generated content intended for learners must be
  reviewable by educators before it is trusted.
- **No clinical claims** — the tutor must not state or imply clinical validity.

No AI-tutor backend is connected in the current phase.

---

## 6. Regulatory awareness (non-exhaustive, informational)

This is **not** legal advice, but a reminder for later phases:

- A purely educational tool that makes **no** medical-device claims and performs
  **no** diagnostic/therapeutic function is generally outside medical-device
  regulation — but scope creep (e.g. patient-specific guidance) can change that.
- Any handling of personal data (accounts, progress, analytics) triggers
  **GDPR / DSGVO** obligations; the prototype avoids this by using only local,
  anonymous `localStorage`.
- Keep this document updated if the intended use ever moves toward clinical or
  patient-facing functionality — that would require a separate regulatory
  assessment **before** implementation.

---

## 7. Standing disclaimer (for README / UI)

> **DIG-cellexplorer is an educational prototype. It is not a finished medical
> education product and is not intended for diagnostic, therapeutic, or clinical
> decision-making use. Content has not undergone medical-didactic review.**
