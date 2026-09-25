# Site committee (agents, not people)

Purpose: own the doctrine of the public site at sambapay.tech. Not visual taste. Source of truth: `welcome-kit/` and `company-os/`. The site translates the house; it never invents. The agents design. André Silva decides.

Convened 24 Sep 2026, when the site moved into this repo under `site/`. The instruction that opened it: the site must not tell our goals or the values of our strategic discussions, and nothing on it may recall AI.

## Doctrine in one line

The site says who we are, what we do, and what we refuse. It never says where we are going, what we are still deciding, or what a number will be. What we refuse is what defines us, because a refusal does not age, does not leak strategy, and cannot be copied by a competitor who would write the same paragraph about infrastructure.

## Seats

| Seat | Agent | What it refuses to let through |
|---|---|---|
| Chair (decides) | André Silva | — |
| No goals, no discussion | `sambapay-governance` | Any objective, date, target, roadmap, milestone, breakeven, take rate, entity codename or open question. No `Status` line, no `Open:` on any public page. The house register stays in the house |
| No counterparty | `sambapay-ceo` | Any client, acquirer, vendor or platform named on a public page, and any logo wall. The acquirer is written as a category. The relationship is the obsession, never a brand |
| No person but one | `sambapay-ceo` | Any name from `company-os/people/README.md`, any counterpart, any biography. `André Silva` appears only on the character page, with the accent, in UTF-8, with no rank word anywhere near it |
| No AI, in substance or in texture | `sambapay-ceo` plus the payments committee | Any mention of AI, agents, swarm, model, automation, bot or copilot. Also any sentence written in the cadence of a machine. See the pass below |
| No superiority | `sambapay-opportunities` | Better than, best-in-class, leading, the only one, unlike others, and any superlative the kit has not already earned |
| No conflict | `sambapay-ceo` plus entrepreneurship committee | Any page that turns the Website Factory into an offer aimed at a client's merchants. Every page that says merchant carries the two-niche line on the same page. No call to action pointed at a merchant |
| No licence we lack | `sambapay-governance` | "We are a sub-acquirer", "we are a payment institution", any SLA, any uptime percentage, any count of years. We will be a sub-acquirer; payment institution follows; the grant date belongs to the Central Bank |
| Provenance | `sambapay-ceo` | Any block of copy without a `source:` that points at a real file and section in `welcome-kit/` or `company-os/`. If it is not in the house, it is not on the site |

## This pass (24 Sep 2026, nothing that recalls AI)

Two readings, both binding.

**In substance.** The word AI does not appear on the site, and neither do agents, swarm, orchestration swarm, model, machine learning, automation, bot, copilot or assistant. The kit describes the Website Factory internally as an orchestration swarm of AI and product specialists. That description stays internal. In public the Website Factory is described by what the local merchant gets: digitisation in a geography where we have structure, from the CNPJ through operational management with the local entities, until payout.

**In texture.** The site must not read as though a machine wrote it. Refuse: the three-adjective list (fast, reliable and secure); "in today's landscape"; leverage, seamless, robust, cutting-edge, empower, unlock, journey, solutions, ecosystem, transform; the construction "it is not just X, it is Y"; a paragraph that opens by restating its own heading; a rhetorical question used as a heading; symmetry for its own sake. Write short declarative sentences with a subject, a verb and an object. One idea per sentence. Read it out loud; if it stumbles, rewrite it.

## This pass (24 Sep 2026, the figure)

R$ 3 billion is the only figure the site may carry, and only inside the learning frame: it was processed before the system we run today existed, and what it taught is the argument. Never as a credential, never near a present-tense claim about volume. The R$ 2 billion of the Cielo register stays internal: it is tied to a named acquirer, and the site does not name acquirers.

## How this committee writes

1. Four beats per page, in order: the affirmation, the fact, the refusal, the craft.
2. Refusal before promise. What we do not do is the most honest thing we can publish.
3. English and Portuguese carry exactly the same claims. Portuguese never introduces one that English does not have.
4. Every page must survive the swap test: put a competitor's name where SambaPay is, and if the sentence still holds, cut it.

## Method

Write the page in `site/content/en/` and `site/content/pt/` with the same `id:` and the same `source:`. Run `node scripts/build-site.mjs check` and `node scripts/build-kit.mjs check`. One line in the decision log when a rule changes.
