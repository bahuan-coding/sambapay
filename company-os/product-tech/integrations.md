# Integrations register

| Counterparty | Type | Country / currency | Status | Since | Notes | Owner |
|---|---|---|---|---|---|---|
| Partner MoR: Cielo | Merchant of Record, tokenized-PIX rail | Brazil / BRL | Live | before 13 Sep 2026 | Carries risk and reserve; high-risk volume runs here. Production volume: DD1 Cielo. Platform PCI is PaySecure's white label, not this row. Same house as DD2 Cielo own-MIDs, opened in parallel | André Silva |
| Double Diamond | Consultancy: requirements to open an entity in Brazil; author of the DD1 Cielo path and the DD2 template | Brazil | Engaged | | Deliverable: checklist package of all documents needed to open acquirer accounts (S11). Fee and date Open | André Silva |
| Cielo | Acquirer: live MoR; DD1 production volume; DD2 own-MID | Brazil / BRL | Live as MoR; production volume on DD1; DD2 own account in parallel, date Open | | MDR table of 19 Sep 2026 is Cielo's for USD 100,000 daily volume. Factoring covers all volume at a competitive price; nobody sells it | André Silva / Abner |
| Asaas | Acquirer, DD2 template | Brazil / BRL | Open in parallel with DD1 production; date Open | 17 May 2023 – 3 Sep 2024 idle; now a DD2 target again | Same | André Silva / Abner |
| EFI | Acquirer, DD2 template (Efi Bank, formerly Gerencianet) | Brazil / BRL | Open in parallel with DD1 production; date Open | | Same | André Silva / Abner |
| MIPPO / OrbiFi / GFS (one commercial desk, two legal papers) | On-ramp: BRL → USDC into our wallet | Brazil / BRL → USDC, and GFS USD paper | Counts as **one** of the two desks | GFS paper 30 Jul 2025 with Payments; MIPPO contract 26 Sep 2025 still with Consultoria | OrbiFi is a brand. MIPPO addendum to Payments needed. GFS Wyoming, spot + 0.25%; needs a Brazilian successor after 30 Oct 2026. Same people (Andrew Dayton, Caroline Poli, @mippo.io). History about 36.5 bps against PTAX on the MIPPO book | Taina |
| BRX Câmbio (IAMC 30423) | Licensed FX broker: USDC intermediation or FX wire / CC5 | BRL → USD/USDC | Candidate; plan B for wire / CC5 (about 65 bps) | | Ask for the Res. BCB 520 art. 22 communication protocol | Taina |
| Transfero | Licensed payment institution; crypto OTC needs PSAV | BRL → USDC | **Desk 2** (S11) | | Public desk suspended 18 Sep 2026; IN BCB 693 wallet questionnaire (May 2026) unanswered; PSAV protocol and A55 wallet only; never name PaySecure as third-party owner | Taina |
| Our attested wallet | Custody hop of the on-ramp | USDC | Live (per S7) | | USDC lands here, then goes to PaySecure; wallet list is what desks ask for | Thiago (custody) |
| Global Pass | KYB | — | To contract | | First of the stack | Clayton; policy André Silva while Sheila Esmeralda is on leave |
| Jumio | Identity verification | — | To contract | | | Clayton |
| G2 | Merchant risk | — | To contract | | | Clayton |
| Chargeblast | Pre-dispute alerts | — | To configure | | CAID per merchant before go-live | Thiago |
| Vector | Acquirer | Brazil / BRL | Legacy | | FX 2% spread → 1% | — |
| PagSeguro (Chile) | Acquirer | Chile / CLP | Legacy, "once live and stable" | | Flat 3.20% bank fee; up to 4.15% | — |
| Bamboo | Rail | USD | Legacy | | | — |
| Xorapay | Rail | USD, EUR | Legacy | | | — |
| OrbiFi | Brand of the MIPPO/GFS desk; also used in S4 as past USDC remittances | USD | Same desk | | CLP remitted from Mexico account | Taina |
| AmFi | Factoring pools | Brazil / BRL | Close-out | 2023 | A55 junior quota | Open |
| Blocked Brazilian acquirer (name omitted) | Acquirer | Brazil / BRL | Restart is Board goal 1 | | US cards | Open |
| Kushki | PSP | Colombia | Pipeline (Break Even tool) | | | Open |
| Reborn (RBN-2026-PSC001) | Card advance + FX into Brazil (contract with Double Diamond) | Brazil / BRL | Contract — updated agreement signed 6 Oct 2026 (our side); awaiting Reborn's next step; KYB in review | Sep 2026 | The instrument runs between Reborn and Double Diamond; PaySecure is not a party (the received version named it by mistake). Card advance 2.38%/month on 90%; FX 0.44% over PTAX, D+1/D+2 | Hansraj Ojha (owner) · Abner Maioralli (execution) |
| QorePay | Acquirer / PSP | Brazil / BRL | Live — first paid transaction 1 Oct 2026; whitelisted (trusted) traffic opened for us | Sep 2026 | New price under negotiation (Hansraj Ojha; Renato Paulino assisting); international cards not enabled; checkout filter bypass under review; counterpart: Navya Jain | Renato Paulino · Navya Jain |
| Scalefy | Sub-acquirer (Double Diamond front) | Brazil / BRL | Onboarding started — KYB through the panel | Oct 2026 | Runs what QorePay runs today; the marketplace does not ride on it; legal name and CNPJ pending entry | Abner Maioralli (execution) · André Silva (Bahuan) sponsoring |
| Nuclea | Registradora (receivables registry) | Brazil | Sub-acquirer homologation in progress | Oct 2026 | Double Diamond in homologation as sub-acquirer at Nuclea; requirements being chased | Abner Maioralli |

## Partner signup pipeline and metrics (owner: Abner Maioralli, Head of Partner Enablement; P33)

Scope: every new acquirer directly connected to the central bank of its country, and every on-ramp desk, from first contact to first live transaction. Abner produces the integration, whatever it takes, and reports these numbers in the weekly pulse.

| Acquirer or desk | Country | Stage (contact / requirements / documents sent / contract / credentials / integration / test / live) | First contact | Contract signed | First live transaction | Open requirements (count, oldest age) | First-30-days approval rate | All-in cost vs acceptance criterion | Owner |
|---|---|---|---|---|---|---|---|---|---|
| Cielo | Brazil | requirements | Open | | | Open | | | Abner Maioralli |
| Asaas | Brazil | requirements | Open | | | Open | | | Abner Maioralli |
| EFI | Brazil | requirements | Open | | | Open | | | Abner Maioralli |
| On-ramp desk 1: MIPPO/GFS/OrbiFi | Brazil | contract (MIPPO addendum) | | GFS 30 Jul 2025 | | MIPPO addendum; GFS successor | — | bps vs PTAX | Abner Maioralli with Taina Chaves |
| On-ramp desk 2: Transfero | Brazil | restart (PSAV + A55 wallet) | | | | PSAV protocol; wallet questionnaire | — | bps vs PTAX | Abner Maioralli with Taina Chaves |
| Reborn | Brazil | contract (KYB in review) | | 6 Oct 2026 (our side) | | KYB review (Hansraj Ojha); Reborn's next step | — | 0.44% over PTAX (FX); 2.38%/month advance (card) | Hansraj Ojha (with Abner Maioralli) |
| QorePay | Brazil | live (whitelisted traffic) | | | 1 Oct 2026 | International cards enablement; new price | | | Renato Paulino · Navya Jain |
| Scalefy | Brazil | requirements (KYB via panel) | Oct 2026 | | | KYB pack requested; legal name and CNPJ | — | — | Abner Maioralli |

Metrics Abner owns: acquirers in pipeline, in signup, live; days from first contact to signed contract; days from signed contract to first live transaction; open requirements per acquirer and their age; first-30-days approval rate and all-in cost of each new rail against the acceptance criterion; share of volume on rails signed in the last twelve months. Targets: DD1 Cielo in production for volumes; DD2 accounts at Cielo, Asaas and EFI open in parallel (date Open).
