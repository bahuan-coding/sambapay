# app.sambapay.tech/login — deploy map & live surface

Verified **2026-09-25** via Railway MCP, DNS, and browser snapshot of `https://app.sambapay.tech/login`.

## Where it runs (Railway)

| Field | Value |
| --- | --- |
| Workspace | bahuan-coding's Projects |
| Project | **Payment Ochestration** (`68ae7939-204c-43ac-a784-e0b84cd1bb69`) |
| Environment | **production** (`00f2cb4c-e558-487d-934b-f032d2fabd50`) |
| Service | **sambapay-app** (`2b4f7dd4-4765-4596-8233-67c3fc89ef2d`) |
| Custom domain | `https://app.sambapay.tech` → container port **8080** |
| Railway URL | `https://sambapay-app-production.up.railway.app` |
| Deploy status | SUCCESS (deploy `677adb5d-1480-4a92-9fc9-964d490e1f2e`, 2026-09-24) |
| Source (Railway) | GitHub **`SambaPay/console-app`**, branch **`main`** |
| Build | Railpack, runtime V2, region `europe-west4-drams3a` |

Related services in the same project (same environment): **Keycloak**, **payment-api**, **payment-worker**, **payment-beat**, **Postgres**, **Redis**, **doublediamond-app**.

## Auth & runtime (variable names only)

Production `sambapay-app` is configured for **corporate SSO via Keycloak**, not the magic-link flow in this repo’s marketing Astro app.

| Variable | Role |
| --- | --- |
| `AUTH_ORIGIN` | Auth callback / origin for the console app |
| `NUXT_PUBLIC_KEYCLOAK_URL` | Keycloak base URL |
| `NUXT_PUBLIC_KEYCLOAK_REALM` | Realm |
| `NUXT_PUBLIC_KEYCLOAK_CLIENT_ID` | OIDC client |
| `NUXT_PUBLIC_KEYCLOAK_REDIRECT_URI` | Post-login redirect |
| `NUXT_PUBLIC_KEYCLOAK_IDP_HINT` | IdP routing (Google corporate) |
| `NUXT_PUBLIC_ALLOWED_EMAIL_DOMAINS` | Allowed corporate email domains |
| `NUXT_PUBLIC_APP_URL` | Public console base URL (`app.sambapay.tech`) |
| `DATABASE_URL` | App database |
| `NUXT_CORE_MANAGER_URL` | Payment core / manager API |

Keycloak runs as a separate Railway service in this project.

## Live `/login` surface (production)

**Page title:** `Login - SambaPay Console`

### Left panel (marketing / institutional)

- Badge: **Made in Brazil · Institutional Console**
- Headline: **The rhythm of Brazilian money.**
- Body: Brazil payment rails end to end — Pix, cards, boleto, cross-border corridors; visibility, compliance, enterprise security.
- Feature chips: **Pix 24/7**, **Cards**, **Boleto**, **FX**
- Visual: 3D globe (Americas), settlement ticker ribbon, payment brand marks, São Paulo clock.

### Right panel (auth card)

- Eyebrow: **Welcome back**
- Heading: **Sign in to Console**
- Copy: **Use your corporate Google account.**
- Primary CTA: **Continue with Google** (Google logo button)
- Footer: **Restricted to authorised corporate accounts · SSO**

No email magic-link form on this URL in production.

## Repo split (do not confuse)

| URL / product | Codebase | Host |
| --- | --- | --- |
| `sambapay.tech` (marketing, welcome kit, magic-link signup/login in Astro) | **`bahuan-coding/sambapay`** (this repository) | Not `app.sambapay.tech` |
| `app.sambapay.tech` (institutional console) | **`SambaPay/console-app`** | Railway **sambapay-app** |

Changes to `app/pages/login.astro` in **this** repo do **not** deploy to `app.sambapay.tech` until wired to the console-app pipeline.

## Quick re-check commands

```bash
# DNS / HTTP
curl -sI https://app.sambapay.tech/login | head -5

# Railway (MCP or CLI): project Payment Ochestration → service sambapay-app → Domains
```
