# SambaPay institutional site

Static site for [sambapay.tech](https://sambapay.tech). Source lives here; Netlify publishes `dist/site/` only.

## Local

```bash
npm install
npm run check:site
npm run build:site
# open dist/site/index.html
```

## Netlify (new site)

1. **Site** → Add new site → Import from Git → `bahuan-coding/sambapay`, branch `main`.
2. Netlify reads [netlify.toml](../netlify.toml) at repo root:
   - **Build command:** `npm ci && npm run build:site`
   - **Publish directory:** `dist/site`
   - **Node:** 22
3. **Domain:** Site settings → Domain management → add `sambapay.tech` and `www` (DNS at your registrar).
4. Deploy. The brain (`welcome-kit/`, `company-os/`) is in the same repo but is **not** served; only the static output is public.

## Content

- English: `site/content/en/`
- Portuguese: `site/content/pt/`
- Same filenames in both folders (`00-home.md`, …). The build fails if they diverge.

Full site plan: Cursor plan *Site institucional SambaPay* (fatias 0–9).
