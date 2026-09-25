# SambaPay institutional site

Static site for [sambapay.tech](https://sambapay.tech). Source lives here; Netlify publishes `dist/site/` only. English and Portuguese, no JavaScript, no external fonts, no tracking.

Doctrine: [`.cursor/skills/sambapay-ceo/references/site-committee.md`](../.cursor/skills/sambapay-ceo/references/site-committee.md). Read it before writing a line.

## Commands

```bash
npm install          # once
npm run check:site   # the gate
npm run build:site   # writes dist/site/ and regenerates PROVENANCE.md
```

## Layout

```
site/
  content/en/  content/pt/   one file per page, same names, same ids
  assets/site.css            the whole visual layer
  lib/forbidden.json         the refusal lists the gate enforces
  PROVENANCE.md              generated: every page and the house section it translates
```

## How a page is written

Front-matter needs `id` and `title`. The `id` must exist in both languages and must have an entry in `SLUGS` inside [`scripts/build-site.mjs`](../scripts/build-site.mjs).

Every claim carries its source as a comment. The gate opens the cited file and confirms the section exists:

```markdown
---
id: home
title: SambaPay
---

<!-- src: welcome-kit/01-why-we-exist.md § Two niches, no conflict of interest -->

We do not take our clients' merchants. We do not dispute their accounts.
```

English and Portuguese must cite the same sources in the same order. Portuguese may not carry a claim English does not have.

## What the gate refuses

No goal, date, target or strategic discussion. No `Status` line. No counterparty, client, acquirer or vendor named. No person except André Silva, and only on the character page, with no rank word near the name. Nothing that recalls AI, in substance or in texture. No superiority. No licence we do not hold, no SLA, no uptime figure. Any page that says merchant carries the two-niche line. R$ 3 billion is the only publishable figure, and only inside the learning frame, in the same paragraph.

Broken encoding fails too: a mojibaked name, a stray replacement character, a BOM or a NUL byte stops the build.

## Netlify

Netlify reads [`netlify.toml`](../netlify.toml) at the repo root: build `npm ci && npm run build:site`, publish `dist/site`, Node 22. The brain (`welcome-kit/`, `company-os/`) sits in the same repo but is never served.

`_redirects` rewrites `/pt` and `/pt/` to `/pt/index.html` with status 200. It must stay a rewrite: a 301 from `/pt/` matches its own target and loops.
