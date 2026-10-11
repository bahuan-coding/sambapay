# Surface map — where ownership attaches (100%)

Purpose: every part of every system listed, with the exact point where the ownership layer
attaches. Nothing is rebuilt; the layer is added on top of what exists.

**The registry columns** (the shape every entry follows): Owner (1) · Backup (1) · Mandate (1
line) · Cadence · Evidence · Status (owned / unowned).

## 1. Console — `/rails-activation` (`sambapay-app`)

| Part | What lives there | Ownership attaches at |
| --- | --- | --- |
| Entities tab | Entity cards (pack %, open count), pack panel (KYB stages), Papers, Banks | Entity fronts (pack completion is evidence) |
| Acquirers tab | Book with Rate column, Intl BIN, Missing; drawer "Sheet record" (23 fields) + Rates record; Settlement cycle | Each rail row (owner + backup per acquirer) |
| Anticipation tab | Desk (product × entity), sheet rates record | Each product row (owner) |
| Remittance tab | FX comparison, desk, sheet record (OTC) | Each corridor (owner) |
| Open work tab | Desk tasks (19) + sheet week tasks (11) | Each task (owner chip → registry entry) |
| Ownership tab | The registry: 15 processes · 12 initiatives · the open queue (W3) | The ownership layer itself; rows expand to the mandate charter |
| Views | Table · Matrix · Presentation | — (rendering only) |

## 2. Company brain — `company-os` (`sambapay`)

| Register | Role | Ownership adds |
| --- | --- | --- |
| `people/process-map.md` | P1–P40, owner + backup per process | New fronts enter here the day they start |
| `follow-ups.md` | Open asks (Sridhar items 2–7; Mexico pass) | Each item gets an owner on assignment |
| `product-tech/integrations.md` | Counterparties + partner signup pipeline | Reborn row to add; Scalefy/Nuclea rows to add |
| `commercial/pipeline.md` | Prospects (Finnera, PaySecure flow, Website Factory, Cruzia) | Owner per prospect already present; keep |
| `governance/decision-log.md` | Decisions with owners + dates | Locked decisions from this program enter here |
| `finance/model.md` · `operations/*` · `risk-compliance/*` | Operating registers | Owner references stay canonical |
| `welcome-kit/00–09` | The ten pages every person reads | Objectives (14) each get owner + date |
| `ownership/` (this folder) | The program: plan, words, surface map, renames | Source of the layer |

## 3. Marketplace product — `MarketPlaceFactory/site-factory` (GitHub org, private)

| Part | What lives there | Ownership attaches at |
| --- | --- | --- |
| `app/` · `server/` · `db/` | The Cruzia storefront/checkout product | The marketplace front owner (open — Hansraj assigns) |
| `cadastros/` · `biblioteca/` | Signup flows and documentation | The case: Cruzia × PagSeguro checklist (W6) |
| `BRAND.md` · `METHOD.md` | Brand + method references | Word review (`words.md`) applies |

## 4. Evidence source — `payment-api`

| Part | Role | Ownership uses |
| --- | --- | --- |
| Charges / transactions (read-only) | The rails' live truth | Numbers on the ownership rows (approval rates, volume, incidents) |

## 5. Attachment by wave

| Wave | Attaches at |
| --- | --- |
| W1 | This map + `words.md` + `renames.md` (documents) |
| W2 | `company-os` registers (Annex A texts of the plan) |
| W3–W4 | The console: registry data + Ownership panel + owner chips |
| W5 | The cadence + the process documentation per this map |
| W6 | The Cruzia × PagSeguro case structure |
| W7 | The single production merge |
