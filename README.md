# SambaPay

The company brain of SambaPay (sambapay.tech), the rebrand of A55 Payments and PaySecure's market enabler in Latin America.

Start here: [welcome-kit/00-the-map.md](welcome-kit/00-the-map.md)

| Layer | What it is | Path |
|---|---|---|
| Welcome Kit | Ten one-page documents every person in the company reads. Attached to the kickoff email. | `welcome-kit/` |
| Company OS | The control room: one page per area plus the registers that track it. | `company-os/` |
| CEO Agent | Cursor rule and skills that keep every document in the company's voice and give governance, finance and opportunity support. | `.cursor/` |
| Institutional site | Public static site (EN + PT). Netlify publishes `dist/site/` only. | `site/` |

Build the kit as PDF: `npm install` once, then `npm run check` and `npm run build` (output in `dist/`).

Build the site for Netlify: `npm run check:site` and `npm run build:site`. See [site/README.md](site/README.md) and [netlify.toml](netlify.toml).
