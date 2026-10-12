# Process map

Every process in the company, one owner, one backup, its cadence and where it is documented. A global counterpart can trace any activity to a person. Owners confirmed by André Silva on 19 Sep 2026; "Open" marks a process still without one. Titles: see `README.md`. Sheila Esmeralda is on leave and outside the project. Tactical work she owned runs through the backup until she returns.

| # | Process | Owner | Backup | Cadence | Documented in |
|---|---|---|---|---|---|
| P1 | Daily reconciliation and the day's figure | Thiago Silva | Taina Chaves | Every business day, first job | ../operations/README.md |
| P2 | Confirmation with PaySecure (Hansraj). Reconciliation SLA: Hansraj works it together with the Brazilian acquirer processes | Thiago Silva (day's confirmation) | André Silva | Daily; SLA until written | ../operations/README.md |
| P3 | Money out: payouts and remittances to PaySecure | Taina Chaves | Rafaela Brito | Daily, after P1–P2 |../operations/README.md |
| P4 | Rolling reserve tracking and releases | Taina Chaves | Thiago Silva | Weekly; releases monthly | ../finance/README.md |
| P5 | On-ramp: same-day PIX to the OTC desk, USDC into our attested wallet, USDC to PaySecure; cost tracked against PTAX | Taina Chaves | André Silva | Per remittance |../operations/operator-windows.md |
| P6 | Collections, boletos, due dates, acquirer payables | Rafaela Brito | Taina Chaves | Daily |../finance/README.md |
| P7 | Instruments and statements: ClickSign, bank statements, acquirer administration packs | Rafaela Brito | Clayton Lira | As needed | README.md |
| P8 | Acquirer portal users and access | Rafaela Brito | Thiago Silva | As needed |../product-tech/integrations.md |
| P9 | Merchant creation pipeline, four steps | Clayton Lira | Leandro Silva | Per merchant |../operations/merchant-onboarding.md |
| P10 | KYB screening: Global Pass, Jumio, G2 | Clayton Lira operates; Sheila Esmeralda owns the policy | Sheila Esmeralda | Per merchant, before any acquirer |../risk-compliance/README.md |
| P11 | Merchant refunds, cancels and blocks | Clayton Lira | Thiago Silva | Daily | ../operations/README.md |
| P12 | Merchant support | Clayton Lira | Thiago Silva | Continuous | README.md (support@) |
| P13 | Payment engine: processors, authorisation, tokenisation, 3DS | Leandro Silva | Thiago Silva | Continuous | ../product-tech/README.md |
| P14 | Acquirer integrations and MID creation | Leandro Silva | Clayton Lira | Per acquirer, per merchant | ../product-tech/integrations.md |
| P15 | Website Factory: orchestration swarm; local merchants in geographies where we have structure, and a client's Brazil store; each digitisation case from CNPJ through entity operations until payout | Leandro Silva | Open | Objective 3 |../product-tech/README.md |
| P16 | Secrets, Key Vault, custody, identity | Thiago Silva | Leandro Silva | Continuous | ../product-tech/README.md |
| P17 | Disputes: Chargeback API, Chargeblast, CAIDs | Thiago Silva | Sheila Esmeralda | Per merchant; alerts daily |../risk-compliance/README.md |
| P18 | Incident response | Thiago Silva and Leandro Silva | André Silva (highest severity) | On event | ../product-tech/README.md |
| P19 | Correspondence with acquirers, Visa, Mastercard, regulators | Sheila Esmeralda | André Silva | On receipt | ../governance/README.md |
| P20 | KYB, AML and sanctions policy; obligations register | Sheila Esmeralda | André Silva | Monthly review |../risk-compliance/obligations.md |
| P21 | LGPD requests (DPO) | Sheila Esmeralda | André Silva | On receipt |../risk-compliance/README.md |
| P22 | PCI DSS programme | André Silva accountable; Leandro Silva and Thiago Silva execute | — | Annual assessment; continuous | ../risk-compliance/obligations.md |
| P23 | Acquirer, OTC-desk and PaySecure executive relationships. Production volume on DD1 Cielo | André Silva | Abner Maioralli | Continuous | ../product-tech/integrations.md |
| P24 | Pricing, proposals, prospects (Finnera) | André Silva | Open | Per prospect | ../commercial/pipeline.md |
| P25 | London reporting: weekly pulse, monthly pack | André Silva | Thiago Silva (numbers) | Weekly; monthly | ../reports/london/ |
| P26 | Decision log and governance | André Silva | — | On decision | ../governance/decision-log.md |
| P27 | Legal counsel Mexico and Colombia (objective 6) | André Silva | Sheila Esmeralda | Project | ../opportunities/latam-map.md |
| P28 | Purchases and tools (five Android phones) | Rafaela Brito | — | On request | README.md |
| P29 | Factoring: all volume anticipated at a competitive price | André Silva (Bahuan) | — | Continuous | ../operations/README.md |
| P30 | Brazilian / 2D acquirer restart | André Silva | Open | Board goal 1 | ../governance/README.md |
| P31 | Second Brazilian entity (DD2): Double Diamond checklist package, entity opening, indicative all-in about R$ 5,000 (lawyer, digitising including 2-step on mobile for bank/acquirer apps, CNPJ, three acquirer accounts; no contract signed), on-ramp desk account openings; the three acquirer signups run under P33 | André Silva | Sheila Esmeralda (documents), Taina Chaves (desks), Rafaela Brito (apps and access) | Opens in parallel with DD1 Cielo production volume. Date Open. Not the volume gate | ../product-tech/integrations.md, ../operations/operator-windows.md |
| P32 | Licensing roadmap: sub-acquiring in our own name, then payment-institution authorisation. Agents design; André Silva decides | André Silva | Sheila Esmeralda (obligations file) | Whenever a Stage-1 gate moves | ../governance/licensing-roadmap.md |
| P33 | Partner signup: SambaPay signed up and live on new acquirers directly connected to the central bank; requirements, document packs, contracts, production API keys delivered to the core team, MIDs, integration on PaySecure's white label, first live transaction; the pipeline metrics | Abner Maioralli | Leandro Silva (integration build), Sheila Esmeralda (documents) | Per acquirer; metrics weekly in the pulse | ../product-tech/integrations.md (signup pipeline and metrics) |
| P34 | Power of Attorney for the FX contact and contract, so settlements can start. Sridhar (PaySecure) helps; André Silva owns | André Silva | Taina Chaves (money out after the contract exists) | Until the Power of Attorney is in hand and the contract is signed | ../operations/README.md |
| P41 | Cheap-rail safety and filters: decline analysis, filter quality and the safety of low-cost rails; every incident reviewed | André Silva (Bahuan) | Leandro Silva | Continuous; every incident reviewed | ../product-tech/integrations.md |

## How to use this map

- A process with no owner is a blocker in the next weekly pulse until it has one.
- When a person is away, the backup runs the process and says so in the group of that process.
- A new process is added here the day it starts, with owner and backup, before anything else is written about it.
