# Commerce Ops Automation | 커머스 운영 자동화

`Margin Studio`는 매입 등록, 원가 검토, 가격 점검, 정산 후보 매칭을 한 화면에서 처리하기 위한 커머스 운영 콘솔입니다.  
`Margin Studio` is a commerce operations console for purchase intake, landed-cost review, pricing checks, and settlement matching.

고객 데이터, 핵심 산식, 외부 파트너 연동 세부사항은 제외하고, 운영 자동화 시스템의 구조와 구현 역량을 검증할 수 있도록 재구성한 공개 포트폴리오 레포입니다.  
This public case-study repository preserves the engineering shape of a production-grade operations system while replacing customer data, proprietary formulas, and partner details with anonymized sample data and a public calculation policy.

![Desktop console](docs/screenshots/desktop-console.png)

## 🧰 기술 태그 / Tech Tags

![Next.js](https://img.shields.io/badge/Next.js-15-111827?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-2563EB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Schema-3E67B1?style=flat-square)
![pnpm](https://img.shields.io/badge/pnpm-Workspace-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Infra-2496ED?style=flat-square&logo=docker&logoColor=white)
![Caddy](https://img.shields.io/badge/Caddy-Reverse_Proxy-1F88C0?style=flat-square)

`Next.js 15` · `React 19` · `NestJS 11` · `TypeScript` · `zod` · `pnpm workspace` · `Turborepo` · `Docker` · `Caddy`

## ✨ 핵심 요약 / Highlights

- **실무형 모노레포 구조**: `web`, `api`, `shared`, `infra`를 분리해 프론트엔드, API, 공통 정책, 배포 구성을 독립적으로 검토할 수 있게 했습니다.  
  **Production-oriented monorepo**: `web`, `api`, `shared`, and `infra` are separated for clear review boundaries.
- **운영자 중심 UI**: queue 상태, margin health, sync status, settlement confidence를 빠르게 스캔할 수 있는 고밀도 작업 화면을 구현했습니다.  
  **Operator-first UI**: the console is built for fast scanning of queue state, margin health, sync status, and settlement confidence.
- **공유 검증 경계**: zod schema와 계산 정책을 `packages/shared`에 두어 Web/API가 같은 타입과 정책을 재사용합니다.  
  **Shared validation boundary**: zod schemas and calculation policy are reused by both the Next.js app and NestJS API.
- **확장 가능한 API 구조**: NestJS module/controller/service 경계를 유지해 persistence, auth, scheduled sync로 확장 가능한 형태를 보여줍니다.  
  **Extensible API shape**: NestJS module/controller/service boundaries leave room for persistence, auth, and scheduled sync jobs.
- **배포 고려 인프라**: Docker image와 Caddy reverse proxy 구성을 포함해 API 패키징과 노출 방식을 보여줍니다.  
  **Deployment-aware infrastructure**: Docker and Caddy show how the API can be packaged and exposed behind a reverse proxy.

## 🧩 구현 포인트 / Implementation Notes

반복적인 커머스 운영 업무를 제품 화면, API 경계, 검증 가능한 정책 레이어로 분해했습니다.  
Repetitive commerce operations are separated into product surfaces, API boundaries, and testable policy layers.

- **작업면 중심 구성 / Workspace-first composition**: 첫 화면을 랜딩 페이지가 아닌 실제 운영 콘솔로 구성했습니다.
- **직접 구성한 UI 시스템 / Hand-built UI system**: UI kit 없이 responsive layout, rail navigation, state badge, mobile stacking을 구현했습니다.
- **분리된 API 경계 / Layered API boundary**: route handling, service policy, shared validation을 분리했습니다.
- **검증 가능한 계산 정책 / Testable calculation policy**: 계산 로직을 `packages/shared`에 격리하고 단위 테스트를 추가했습니다.
- **운영 가능한 배포 구조 / Deployable infrastructure shape**: `infra/docker`에 API Dockerfile, Caddy reverse proxy, compose 구성을 포함했습니다.

## 🎛️ UI/UX

![Mobile console](docs/screenshots/mobile-console.png)

- **제품명 중심 첫인상 / Product-led first impression**  
  `Margin Studio`를 실제 제품처럼 보이게 구성하고, 운영 상태와 작업 큐가 바로 이어지도록 설계했습니다.
- **운영자 우선 레이아웃 / Operator-first layout**  
  데스크톱에서는 navigation, purchase ledger, automation status, review panel을 분리해 컨텍스트를 유지하며 검토할 수 있습니다.
- **모바일 연속성 / Mobile continuity**  
  모바일에서는 같은 흐름을 세로형 review path로 재배치해 search, filter, margin signal을 유지합니다.
- **상태 중심 정보 구조 / Status-driven hierarchy**  
  queue state, FX lock, cost review, settlement candidates를 보조 정보보다 먼저 볼 수 있게 했습니다.

## 🏗️ 아키텍처 / Architecture

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

더 자세한 런타임 구조는 [docs/architecture.md](docs/architecture.md)에서 확인할 수 있습니다.  
See [docs/architecture.md](docs/architecture.md) for the runtime architecture.

## 🔍 코드 리뷰 가이드 / Review Guide

구현을 검토하려면 아래 파일부터 보는 것을 추천합니다.  
Recommended entry points for implementation review:

| 관심사 / Concern                     | 위치 / Path                         |
| ------------------------------------ | ----------------------------------- |
| UI composition                       | `apps/web/src/app/page.tsx`         |
| Responsive visual system             | `apps/web/src/app/globals.css`      |
| Shared schema and calculation policy | `packages/shared/src/index.ts`      |
| Calculation unit test                | `packages/shared/src/index.test.ts` |
| API service boundary                 | `apps/api/src/modules/purchases`    |
| Runtime architecture notes           | `docs/architecture.md`              |
| Docker/Caddy deployment shape        | `infra/docker`                      |

## 🔌 API Surface

공개 API는 의도적으로 작게 유지했습니다.  
The public API surface is intentionally small.

- `GET /api/health`
- `GET /api/purchases`
- `POST /api/purchases/quote`

`POST /api/purchases/quote`는 shared zod schema로 입력을 검증하고 `packages/shared`의 공개 계산 정책 결과를 반환합니다.  
`POST /api/purchases/quote` validates input with the shared zod schema and returns the public calculation result from `packages/shared`.

## 🚀 로컬 실행 / Local Development

```bash
nvm use
pnpm install
pnpm dev
```

기본 로컬 포트 / Default local ports:

- Web: `http://localhost:3010`
- API: `http://localhost:4010/api`

개별 앱 실행 / Run individual apps:

```bash
pnpm --filter @commerce-ops/web dev
pnpm --filter @commerce-ops/api dev
```

## ✅ 검증 / Verification

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
```

검증 항목 / Current checks:

- ESLint 9 flat config 기반 workspace lint
- TypeScript strict-mode checks
- Shared calculation unit test
- Next.js production build
- NestJS TypeScript build

## 🛠️ 트러블슈팅 / Troubleshooting

아래 항목은 구현과 빌드 검증 과정에서 확인한 문제를 `증상 → 원인 → 해결 → 배운 점`으로 정리한 내용입니다.<br />
The notes below summarize engineering issues found during implementation and build verification.

### 1. 워크스페이스 패키지 해석과 오래된 빌드 산출물 / Workspace Package Resolution

- **증상 / Symptom**: Web과 API가 `@commerce-ops/shared`를 함께 사용하면서, 개발 환경에서는 TypeScript source를 바로 보고 싶지만 production build/runtime에서는 `dist` JavaScript가 필요했습니다. `main`만 `dist`를 바라보게 두면 shared를 수정한 뒤 소비 앱이 오래된 build output을 참조할 수 있고, 반대로 source만 바라보면 NestJS runtime과 Docker image에서 실행 가능한 JavaScript artifact가 부족해질 수 있었습니다.
- **원인 / Cause**: monorepo 내부 패키지는 개발 시점의 source resolution과 배포 시점의 artifact resolution이 다릅니다. 이 경계를 package metadata와 build graph에 명시하지 않으면 앱마다 같은 패키지를 다른 방식으로 해석합니다.
- **해결 / Resolution**: `packages/shared/package.json`에 `exports`를 두어 `types`, `development`, `default` entry를 분리했고, Next.js에는 `transpilePackages: ["@commerce-ops/shared"]`를 지정했습니다. Turbo는 `build.dependsOn: ["^build"]`로 shared build가 소비 앱보다 먼저 실행되도록 구성했습니다.
- **배운 점 / Lesson**: workspace package는 단순 경로 alias가 아니라 배포 단위입니다. 개발 편의성 때문에 source만 노출하면 runtime 검증이 약해지고, `dist`만 노출하면 frontend 개발 피드백이 늦어집니다.

### 2. 중첩 모노레포에서 Next.js output tracing root 고정 / Next.js Output Tracing Root

- **증상 / Symptom**: Next.js build에서 workspace root 추론 경고가 발생했고, 상위 디렉터리에 있는 다른 lockfile을 기준으로 output tracing root가 잡힐 수 있었습니다.
- **원인 / Cause**: 중첩된 workspace 환경에서는 상위 디렉터리의 lockfile이 framework root 추론에 영향을 줄 수 있습니다. Next.js의 file tracing은 lockfile과 workspace root를 기준으로 runtime에 필요한 파일을 추적하기 때문에, root 추론이 틀어지면 배포 산출물에서 필요한 workspace package가 누락될 위험이 있습니다.
- **해결 / Resolution**: `apps/web/next.config.mjs`에서 `outputFileTracingRoot`를 monorepo root로 명시했습니다. 동시에 shared package는 `transpilePackages`에 포함해 Next build가 workspace dependency를 명확히 처리하도록 했습니다.
- **배운 점 / Lesson**: 로컬에서 build가 성공하더라도 file tracing root가 불명확하면 배포 환경에서만 깨질 수 있습니다. nested workspace에서는 framework의 root 추론에 기대기보다 명시 설정으로 재현성을 확보하는 편이 안전합니다.

### 3. 금액 계산 정책의 런타임 검증 경계 / Calculation Policy Validation Boundary

- **증상 / Symptom**: 매입 원가, 판매가, 수수료처럼 금액 계산에 직접 영향을 주는 입력값은 Web UI와 API 어느 한쪽에서만 검증하면 쉽게 불일치가 생깁니다. 특히 API body는 런타임에서는 `unknown`에 가깝기 때문에 타입만 믿고 service로 넘기면 잘못된 숫자가 계산 함수까지 도달할 수 있습니다.
- **원인 / Cause**: TypeScript type은 compile-time 계약이고, API request body는 runtime data입니다. 계산 로직이 UI helper, API service, sample data에 흩어지면 같은 의미의 필드라도 검증 기준과 반올림 정책이 달라질 수 있습니다.
- **해결 / Resolution**: `purchasePublicInputSchema`와 `calculateSampleUnitEconomics`를 `packages/shared`에 두고, API controller에서 `purchasePublicInputSchema.parse(body)`로 runtime validation을 먼저 수행한 뒤 service로 넘겼습니다. 계산 함수는 pure function으로 유지하고 `node:test` 기반 단위 테스트에서 landed cost, net sale, profit, profit rate를 고정했습니다.
- **배운 점 / Lesson**: 금액 계산은 UI 표현 로직이 아니라 domain policy입니다. 입력 검증, 계산 함수, 테스트 fixture를 같은 패키지에 묶으면 Web/API가 같은 계약을 공유하고 회귀를 더 빨리 발견할 수 있습니다.

### 4. ESLint 9 flat config와 build 책임 분리 / Build Responsibility

- **증상 / Symptom**: Next.js build 단계와 lint 단계의 책임이 섞이면, production build가 코드 품질 검증까지 암묵적으로 떠안게 됩니다. ESLint 9 flat config 조합에서는 framework 내장 lint 감지 방식과 별도 workspace lint 흐름이 충돌하거나 경고를 만들 수 있습니다.
- **원인 / Cause**: monorepo에서는 Web, API, shared package가 서로 다른 실행 환경을 갖습니다. build는 artifact 생성과 type-level 검증에 집중해야 하고, lint는 workspace 전체 규칙을 별도 task로 실행하는 편이 CI에서 원인을 파악하기 쉽습니다.
- **해결 / Resolution**: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`를 분리했고, Next config에서는 `ignoreDuringBuilds: true`로 build 중 lint 실행을 끊었습니다. 대신 root `eslint.config.mjs`와 app-level config를 통해 lint를 명시 검증 단계로 유지했습니다.
- **배운 점 / Lesson**: build command 하나에 모든 검증을 몰아넣으면 실패 원인이 흐려집니다. CI task를 역할별로 나누면 cache, failure message, 담당 영역이 분명해집니다.

### 5. Docker runtime artifact 선별 / Docker Runtime Artifact Selection

- **증상 / Symptom**: API Docker image는 compiled NestJS app을 실행해야 하므로 `apps/api/dist`만 복사하면 충분해 보이지만, 런타임 import가 `@commerce-ops/shared`를 참조하는 순간 shared package의 `package.json`과 `dist`도 함께 필요합니다.
- **원인 / Cause**: monorepo package는 build-time dependency이면서 runtime dependency일 수 있습니다. TypeScript source가 로컬 workspace에 존재한다는 사실은 container runtime에서 아무 의미가 없고, Node는 package metadata와 JavaScript artifact를 기준으로 module을 해석합니다.
- **해결 / Resolution**: `infra/docker/api.Dockerfile`에서 shared를 API보다 먼저 build하고, runner stage에 `apps/api/dist`, `packages/shared/package.json`, `packages/shared/dist`, production `node_modules`를 명시적으로 복사했습니다.
- **배운 점 / Lesson**: Docker image는 로컬 repo의 축소판이 아니라 실행에 필요한 파일만 남긴 환경입니다. monorepo 배포에서는 어떤 package가 runtime에 필요한지 직접 추적해야 image가 작고 예측 가능해집니다.

## 🧾 공개 범위 / Public Scope

포함한 것 / Included:

- 운영 콘솔 UI / Operator console UI
- 모노레포 구조 / Monorepo structure
- API, service, shared package 경계 / API, service, and shared package boundaries
- 비식별 샘플 데이터 / Anonymized sample data
- 공개용 계산 정책 / Public calculation policy
- Docker/Caddy 기반 배포 형태 / Docker/Caddy deployment shape

포함하지 않은 것 / Not included:

- 고객사명 또는 운영 데이터 / Customer names or operating data
- 계약, 견적, 내부 커뮤니케이션 / Contract, quote, or internal communication
- 고유 스프레드시트 산식 / Proprietary spreadsheet formulas
- 실제 외부 파트너 endpoint 또는 token flow / Real external partner endpoints or token flows
- 운영 도메인, secret, credential / Production domains, secrets, or credentials
