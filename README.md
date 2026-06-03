# Commerce Ops Automation

`Margin Studio` is a commerce operations console for purchase intake, landed-cost review, pricing checks, and settlement matching.

This repository is a public case-study implementation. It preserves the engineering shape of a production-grade operations system while replacing customer data, proprietary formulas, and external partner details with anonymized sample data and a public calculation policy.

![Desktop console](docs/screenshots/desktop-console.png)

## What This Shows

- A production-oriented monorepo split into `web`, `api`, `shared`, and `infra` workspaces.
- A dense operator UI built for scanning queue state, margin health, sync status, and settlement confidence.
- Shared zod schemas and deterministic calculation functions reused by both the Next.js app and NestJS API.
- A NestJS module/controller/service boundary that can grow into real persistence, auth, and scheduled sync jobs.
- Docker/Caddy infrastructure showing how the API is packaged and exposed behind a reverse proxy.

## For Hiring Reviewers

The project is designed to be reviewed quickly:

- **Product judgment**: the first screen is not a marketing page; it is an operator workspace with queue, automation, and review surfaces.
- **Frontend execution**: responsive layout, high-density information design, state badges, rail navigation, and mobile-first stacking are implemented without relying on a UI kit.
- **Backend structure**: the API keeps route handling, business policy, and shared validation in separate layers.
- **Reliability mindset**: calculations are isolated in `packages/shared` and covered by a unit test.
- **Deployment awareness**: `infra/docker` includes the API image and Caddy reverse proxy shape.

## UI/UX

![Mobile console](docs/screenshots/mobile-console.png)

Key interface decisions:

- **Product-led first impression**: `Margin Studio` is presented as a real tool, not a scaffold or dashboard template.
- **Operator-first layout**: the desktop view separates navigation, ledger, automation status, and review detail so users can keep context while moving through items.
- **Mobile continuity**: the same workflow collapses into a stacked review path without losing search, filters, or margin signals.
- **Status-driven hierarchy**: queue state, FX lock, cost review, and settlement candidates are visible before secondary details.

## Tech Stack

| Area    | Stack                                                                  |
| ------- | ---------------------------------------------------------------------- |
| Web     | Next.js 15, React 19, TypeScript, lucide-react                         |
| API     | NestJS 11, TypeScript                                                  |
| Shared  | zod schemas, shared TypeScript types, deterministic calculation policy |
| Infra   | Docker, Caddy                                                          |
| Tooling | pnpm workspace, Turborepo, ESLint 9 flat config, Prettier              |

## Repository Map

```txt
commerce-ops-automation/
├── apps/
│   ├── web/              # Next.js operator console
│   └── api/              # NestJS API boundary
├── packages/
│   └── shared/           # shared schemas, sample data, calculation policy
├── infra/
│   ├── docker/           # API Dockerfile, Caddy reverse proxy, compose file
│   └── deploy/           # deployment notes
├── docs/
│   ├── architecture.md
│   └── screenshots/
└── README.md
```

## Review Guide

Start here if you want to inspect implementation details:

- UI composition: `apps/web/src/app/page.tsx`
- Responsive visual system: `apps/web/src/app/globals.css`
- Shared schema and calculation policy: `packages/shared/src/index.ts`
- Calculation test: `packages/shared/src/index.test.ts`
- API service boundary: `apps/api/src/modules/purchases`
- Runtime architecture notes: `docs/architecture.md`
- Docker/Caddy deployment shape: `infra/docker`

## API Surface

The public API surface is intentionally small:

- `GET /api/health`
- `GET /api/purchases`
- `POST /api/purchases/quote`

`POST /api/purchases/quote` validates input with the shared zod schema and returns the public calculation result from `packages/shared`.

## Local Development

```bash
nvm use
pnpm install
pnpm dev
```

Default local ports:

- Web: `http://localhost:3010`
- API: `http://localhost:4010/api`

Run individual apps:

```bash
pnpm --filter @commerce-ops/web dev
pnpm --filter @commerce-ops/api dev
```

## Verification

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

Current checks cover:

- ESLint flat-config linting across all workspaces
- TypeScript strict-mode checks
- Shared calculation unit test
- Next.js production build
- NestJS TypeScript build

## Public Scope

Included:

- Operator console UI
- Monorepo structure
- API/service/shared package boundaries
- Anonymized sample data
- Public calculation policy
- Docker/Caddy deployment shape

Not included:

- Customer names or operating data
- Contract, quote, or internal communication
- Proprietary spreadsheet formulas
- Real external partner endpoints or token flows
- Production domains, secrets, or credentials
