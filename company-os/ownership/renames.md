# File-name pass — contracts and personal documents

Purpose: the file names carry the canonical words (`words.md`); no content of any document was
changed — names only.

## Convention

- Contract files: `RBN-2026-PSC001 - <document type> (<party, when needed>).pdf` — ASCII, no
  "PaySecure" as a party, parties written "Reborn x Double Diamond".
- Local contract files live **outside git by design** — the repo's `.gitignore` already says
  *"Local contract drafts (never commit to public repo)"* (`RBN-*.pdf`, `Contrato_*.pdf`,
  `ChoicePay*.docx`, `gerar-*.py`). The renames below are local filesystem moves; this file is the
  record of what changed.

## Applied renames (local files, in the repo root)

| Before | After | Why |
| --- | --- | --- |
| `Contrato_RBN-2026-PSC001___Double_Diamond_Paysecure.pdf` | `RBN-2026-PSC001 - contrato Reborn x Double Diamond.pdf` | The received version carried the mistaken "Paysecure" naming; the instrument is Reborn × Double Diamond |
| `RBN-2026-PSC001_Versao_Consolidada_Double_Diamond.pdf` | `RBN-2026-PSC001 - versao consolidada (Double Diamond).pdf` | Consistent pattern |
| `RBN-2026-PSC001_Pontos_de_Alteracao.pdf` | `RBN-2026-PSC001 - pontos de alteracao.pdf` | Consistent pattern |
| `RBN-2026-PSC001_Minuta_Clausula_Nona_CONTRATANTE.pdf` | `RBN-2026-PSC001 - minuta clausula nona (CONTRATANTE).pdf` | Consistent pattern |

## Kept as is (no overcomplication)

- `ChoicePay - Double Diamond 1.0.docx` — name is accurate; ignored by design.
- `2ª ALTERAÇÃO CONTRATO.pdf`, `CNH Abner.pdf`, `CNPJ 3.pdf`, `BD_Proposal_LATAM_CrossBorder_Payments
  (2).docx`, `WhatsApp Image 2026-10-02 at 12.13.59.jpeg` — personal/compliance documents; names
  stay, and `.gitignore` now protects them (below).

## Protection added to `.gitignore`

```
# Local personal/compliance documents (never commit)
CNH*.pdf
CNPJ*.pdf
*ALTERA*.pdf
BD_Proposal*.docx
WhatsApp Image*.jpeg
```

## Tooling (local scripts)

The two local generators wrote their outputs under the old names; their output paths now follow the
convention (both are local files, never committed):

| Script | Output now |
| --- | --- |
| `gerar-contrato-consolidado.py` | `RBN-2026-PSC001 - versao consolidada (Double Diamond).pdf` |
| `gerar-minuta-clausula-nona.py` | `RBN-2026-PSC001 - minuta clausula nona (CONTRATANTE).pdf` |

## Pending (app repo, different wave)

`sambapay-app` holds tracked copies under `compliance/pagsmile/`:
`Contrato_RBN-2026-PSC001___Double_Diamond_Paysecure.pdf` and
`RBN-2026-PSC001_Pontos_de_Alteracao.pdf` (plus the corporate amendment). Those are tracked — the
rename happens with a git move on the app's ownership branch (W3), never directly on `main`.

## References

No `company-os` document references the old names (checked 11 Oct 2026); nothing else needs
updating.
