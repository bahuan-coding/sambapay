# The Ownership Framework — Program Plan

Status: W1–W6 delivered on the integration branches (PRs #1, #2, #3 and #17–#20). Production is untouched until W7.
Owner: André Silva (Bahuan). Cadence: this file is the plan of record; it closes when W7 deploys.
Companions: [`words.md`](words.md) · [`surface-map.md`](surface-map.md) · [`renames.md`](renames.md)

## Why this is the most important system of the company

Every process and every live front gets **one owner** with a mandate, a backup, a cadence and
evidence — visible on the screen the team already uses. Nobody guesses who owns what. **Unowned is
an explicit blocker**, not silence. Hansraj Ojha chases daily; André Silva (Bahuan) approves.

## Locked decisions (canonical)

| Decision | Locked |
| --- | --- |
| Naming | **André Silva (Bahuan)** — one name, everywhere |
| PagSeguro × Cruzia/Double Diamond | **Two KYBs: Cruzia as Merchant of Record + Double Diamond as sub-acquirer.** Meeting Tuesday 11:00, only André Silva; material: Site Factory Business Strategy (internal). After: route to PagSeguro's onboarding team (via Glau) |
| PagSeguro's role | **PagSeguro is for the marketplace** (Site Factory / Cruzia track) |
| Entities | Double Diamond runs via the SambaPay endpoint; Cruzia runs rails directly integrated with PagSeguro. Brand rename pending; entity is CRUZIAPAY LTDA |
| QorePay | Keep volume — minimum USD 2,000 plus company-expense consistency (R$ 38k payroll context). New price: **Hansraj Ojha negotiates, approved with him**. Navya checks BIN-data accessibility before any commercial-proposal inclusion. **Filters: André Silva owns** |
| Cielo | Unblocked by Abner; GT declines recurred (19 declines · 1 approval, Oct 9–10) — filter revert pending |
| HO Brazil | **Hansraj Ojha** |
| Scalefy | New **sub-acquirer** (Double Diamond front), runs what QorePay runs today — **not** the marketplace |
| Nuclea | Double Diamond **sub-acquirer homologation** — Abner chasing |
| File names | Contract files renamed (see `renames.md`); word pass first, no overcomplication |
| Monday | **Hansraj Ojha assigns the owners of everything still open** (Open Queue below) |

## The model, in one page

**The five columns of truth — every row in the system has exactly these:**

| Owner (1) | Backup (1) | Mandate (1 line) | Cadence | Evidence |
| --- | --- | --- | --- | --- | --- |

**Two layers**

- **Process Owner** — permanent; one per capability; owns the HOW (playbook, evidence,
  improvement). Does not execute every step.
- **Initiative DRI** — temporary; one per live delivery; owns the OUTCOME until closure, then
  retires.

**Vocabulary (plain words)**

| Term | Meaning |
| --- | --- |
| Owner | The one accountable — never two |
| Backup | Runs it when the owner is away, and says so |
| DRI | Owner of one initiative |
| Unowned Queue | Orphans listed openly; never silently assigned |
| Cadence Owner | Runs the rhythm and chases updates — **Hansraj Ojha** |
| Escalation | Owner → Hansraj Ojha → **André Silva (Approver)** |

**House rules (kept from the repo):** a process with no owner is a blocker in the next weekly
pulse · a new front enters the map the day it starts, with owner and backup, before anything else
is written about it · one owner and one backup per row.

## The system we build

1. **The Registry** — every process + every live front as data (five columns + status + links).
2. **The Ownership panel** — functional page on the console (no UX embellishment yet): the table,
   the Open Queue highlighted, a drawer with the mandate text.
3. **Connections** — owner chips already living on the screens (open work, week tasks, rails) link
   to their ownership entry; unowned items surface everywhere.
4. **The Cadence** — Hansraj Ojha's daily needs-chasing view (screen-driven, not memory) + the weekly
   Ownership Review (assign orphans · items stale > 7 days declare the blocker · close
   initiatives).

## Waves

| Wave | Repo(s) | Scope | Exit | Production | Status |
| --- | --- | --- | --- | --- | --- |
| **W1 · Words & Map** | `sambapay` | Word review + surface map + local file renames + this plan | Docs reviewed; renames applied; PR open | **zero** | ✅ PR #1 |
| **W2 · Registry** | `sambapay` | Canonical texts into the registers (Annex A): the two KYBs, Scalefy, Nuclea, QorePay-WL, Reborn row, Cielo GT, owner updates, actors | Registers updated on the branch | zero | ✅ PR #2 |
| **W3 · Panel** | `sambapay-app` | Registry + Ownership tab (five columns + Open Queue + mandate drawer) | Functional screen on the branch | zero | ✅ PR #17 |
| **W4 · Connections** | `sambapay-app` | Owner chips on open work / week / rails; orphan surfacing; Hansraj Ojha chase view | Live on the branch | zero | ✅ PR #18 |
| **W5 · Cadence + process docs** | both | Weekly ritual written; how-the-company-works docs attached to processes (per the surface map) | Ritual written; view ready | zero | ✅ PR #3 + #19 |
| **W6 · PagSeguro pack** | `sambapay-app` | Cruzia checklist (66 items) structured as the case template | Case trackable | zero | ✅ PR #20 |
| **W7 · GO** | both | Final PR `ownership/program` → `main` · merge · release · deploy | **Production verified** | **the only deploy** | pending |

## The git flow (GitHub committee)

```
main ─────────────────────────────◄── FINAL PR (W7) = the only deploy
  │                                      ▲
  └──► ownership/program (integration) ──┘
            ▲          ▲          ▲
       PR W1      PR W2      PR W3…    ← each wave: own branch, PR to the integration
```

- One branch per wave (`ownership/w1-words-map`, …), PR **to `ownership/program`**. CI runs;
  **no deploy**.
- `main` receives **only the final PR**. The merge is the production button.
- **`[skip ci]` does not stop Railway** (it watches the repo, not Actions). The guarantee is not
  pushing `main`.
- Rollback = revert of the final PR; keep waves small so revert stays safe.
- Branch protection on `main` is recommended while the program runs; systems working in parallel
  (e.g., the other agent) must keep their work on branches.

## The Open Queue — Hansraj Ojha assigns Monday

| Item | Committee recommends | Hansraj Ojha |
| --- | --- | --- |
| AmFi price · Asaas anticipation · Asaas on Double Diamond · PagBank | André Silva (Bahuan); Asaas with Renato Paulino | ☐ |
| Scalefy rail | Abner (execution), André Silva sponsoring | ☐ |
| Nuclea homologation | Abner (execution) | ☐ |
| QorePay WL management | Renato Paulino + Navya | ☐ |
| Filters / cheap-rail safety | André Silva (assigned) | ☐ |
| Reborn register row | Hansraj Ojha (owner) · Abner (execution) | ☐ |
| Cielo GT revert + international cards | Leandro (revert) · Abner (Cielo) | ☐ |
| Marketplace / Site Factory | Commercial owner Open in the kit · swarm PMs Open · LATAM team composition Open | ☐ |
| Sridhar's items 2–7 | Pagsmile → Abner · Asaas → Renato Paulino · Pagar.me → Abner · Transfero → Taina · BTG → Rafaela | ☐ |
| Kit objectives (14) | Each objective: owner + date (per kit rule) | ☐ |

## Annex A — canonical texts (W2 input)

- **Two KYBs:** "PagSeguro engagement started 13 Oct 2026: Cruzia KYB as Merchant of Record +
  Double Diamond KYB as sub-acquirer. Goal: start both KYBs. Route: PagSeguro onboarding team (via
  Glau). Material: Site Factory Business Strategy (internal)."
- **Scalefy:** "New sub-acquirer (Double Diamond front). Runs what QorePay runs today — not the
  marketplace. Onboarding started; KYB via panel. Legal name and CNPJ pending entry."
- **Nuclea:** "Double Diamond in homologation as sub-acquirer at Nuclea. Abner chasing
  requirements; ETA pending."
- **QorePay WL:** "Trusted (whitelisted) traffic opened for us. New price: Hansraj Ojha negotiates,
  approved with him. Minimum volume USD 2,000 plus company-expense consistency. Navya: BIN-data
  accessibility check before commercial-proposal inclusion. Filters: André Silva owns. Incident:
  checkout filter bypass (10 Aug) — revert pending; international cards not enabled."
- **Reborn row:** "Contract RBN-2026-PSC001 — Double Diamond × Reborn (PaySecure is not a party).
  Card advance (2.38%/month, 90% advanced) + FX (0.44% over PTAX, D+1/D+2)."
- **Cielo GT (Oct 9–10):** "Unblocked via account manager (Abner); small volume restarted; GT
  declines recurred (19 declines · 1 approval). Root suspect: checkout filter bypass."
- **Naming canon:** "André Silva (Bahuan). HO Brazil = Hansraj Ojha. Reborn (no 'e'). PaySecure =
  platform, not a rail."
- **Rename:** "Cruzia brand under review; entity CRUZIAPAY LTDA unchanged until decision; rename
  applied in one pass when it lands."

## Rules of the migration

1. **Words first** — perfect names before anything moves.
2. **Nothing changes how it is** — we add the ownership layer; we do not rebuild screens.
3. **No owner invented silently** — everything open goes to Hansraj Ojha Monday.
4. **One owner + one backup per row** — always.
5. The screen stays **functional** (no UX wave yet).
