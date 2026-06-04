import {
  ArrowDownUp,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Command,
  DatabaseZap,
  Dock,
  Layers3,
  LockKeyhole,
  PackageSearch,
  ReceiptText,
  RefreshCcw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  calculateSampleUnitEconomics,
  samplePurchases,
  sampleSettlements,
  sampleSyncStatus,
} from "@commerce-ops/shared";

const nav = [
  { label: "매입 장부", icon: ReceiptText, active: true },
  { label: "가격 점검", icon: CircleDollarSign, active: false },
  { label: "정산 매칭", icon: Dock, active: false },
  { label: "설정", icon: Settings2, active: false },
];

const workflow = [
  { label: "상품 연결", value: "98%", tone: "green" },
  { label: "환율 고정", value: "09:20", tone: "blue" },
  { label: "검토 필요", value: "14", tone: "coral" },
  { label: "정산 후보", value: "18", tone: "violet" },
] as const;

const filters = ["전체", "검토", "자동 산정", "매칭 완료"];

export default function HomePage() {
  const selected = samplePurchases[0];
  const economics = calculateSampleUnitEconomics(selected.publicInputs);

  return (
    <main className="studio-shell">
      <aside className="rail" aria-label="주요 메뉴">
        <div className="rail-logo">M</div>
        <nav className="rail-nav">
          {nav.map((item) => (
            <button
              className={item.active ? "rail-button active" : "rail-button"}
              key={item.label}
              aria-label={item.label}
            >
              <item.icon size={18} />
            </button>
          ))}
        </nav>
        <button className="rail-button" aria-label="명령 메뉴">
          <Command size={18} />
        </button>
      </aside>

      <section className="studio-main" aria-label="마진 스튜디오 작업 화면">
        <header className="studio-header">
          <div className="title-stack">
            <p>재고 마진 관리</p>
            <h1>마진 스튜디오</h1>
            <span>매입 장부, 원가, 가격, 정산 후보를 한곳에서 관리합니다.</span>
          </div>
          <div className="header-actions">
            <button className="ghost-action" aria-label="데이터 새로고침">
              <RefreshCcw size={17} />
            </button>
            <button className="primary-action">
              <PackageSearch size={17} />
              신규 매입
            </button>
          </div>
        </header>

        <section className="signal-row" aria-label="운영 상태 지표">
          {workflow.map((item) => (
            <div className={`signal ${item.tone}`} key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="desk-grid">
          <div className="ledger-pane">
            <div className="pane-head">
              <div>
                <p className="label">매입 장부</p>
                <h2>매입 검토 대기열</h2>
              </div>
              <div className="search-control">
                <Search size={15} />
                <input aria-label="매입 장부 검색" defaultValue="AF1 270" />
              </div>
            </div>

            <div className="filter-strip">
              {filters.map((filter) => (
                <button
                  className={filter === "전체" ? "filter active" : "filter"}
                  key={filter}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="ledger-list">
              {samplePurchases.map((purchase) => (
                <article
                  className={
                    purchase.id === selected.id
                      ? "ledger-row selected"
                      : "ledger-row"
                  }
                  key={purchase.id}
                >
                  <div className="item-code">{purchase.brand.slice(0, 2)}</div>
                  <div className="item-copy">
                    <strong>{purchase.productName}</strong>
                    <span>
                      {purchase.option} / {purchase.styleCode} /{" "}
                      {purchase.storeName}
                    </span>
                  </div>
                  <span
                    className={
                      purchase.status === "ready"
                        ? "status done"
                        : "status warn"
                    }
                  >
                    {purchase.status === "ready" ? "확정" : "검토"}
                  </span>
                  <strong className="margin-value">
                    {purchase.marginRate.toFixed(1)}%
                  </strong>
                </article>
              ))}
            </div>
          </div>

          <div className="automation-pane">
            <div className="pane-head">
              <div>
                <p className="label">자동화</p>
                <h2>처리 흐름</h2>
              </div>
              <Sparkles size={18} />
            </div>
            <div className="runway">
              <RunwayStep
                icon={BadgeCheck}
                label="상품 식별"
                value="연결됨"
                tone="green"
              />
              <RunwayStep
                icon={ArrowDownUp}
                label="환율 스냅샷"
                value="고정됨"
                tone="blue"
              />
              <RunwayStep
                icon={Layers3}
                label="원가 배분"
                value="검토"
                tone="coral"
              />
              <RunwayStep
                icon={Boxes}
                label="정산 범위"
                value="준비"
                tone="violet"
              />
            </div>
            <div className="sync-stack">
              {sampleSyncStatus.map((item) => (
                <div className="sync-line" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      <aside className="review-panel" aria-label="선택 매입 검토">
        <div className="review-head">
          <div>
            <p className="label">선택 상품</p>
            <h2>{selected.productName}</h2>
            <span>
              {selected.brand} / {selected.option}
            </span>
          </div>
          <button className="ghost-action" aria-label="검토 옵션 열기">
            <SlidersHorizontal size={17} />
          </button>
        </div>

        <div className="product-stage">
          <div className="product-card">
            <span>{selected.brand}</span>
            <strong>{selected.styleCode}</strong>
          </div>
        </div>

        <section className="margin-card">
          <span>예상 순마진</span>
          <strong>{economics.profitLabel}</strong>
          <p>
            매입가, 환율 스냅샷, 물류비 배분, 정산 정책을 기준으로 계산했습니다.
          </p>
        </section>

        <div className="review-lines">
          <ReviewLine
            icon={TrendingUp}
            label="마진율"
            value={`${selected.marginRate.toFixed(1)}%`}
          />
          <ReviewLine icon={ShieldCheck} label="세션 정책" value="HttpOnly" />
          <ReviewLine icon={DatabaseZap} label="원가 서비스" value="검증됨" />
          <ReviewLine icon={LockKeyhole} label="인증 보관소" value="암호화" />
        </div>

        <section className="match-card">
          <div className="match-head">
            <CheckCircle2 size={17} />
            <strong>정산 후보</strong>
          </div>
          {sampleSettlements.map((settlement) => (
            <div className="match-line" key={settlement.id}>
              <span>{settlement.label}</span>
              <strong>{settlement.confidence}</strong>
            </div>
          ))}
        </section>
      </aside>
    </main>
  );
}

function RunwayStep({
  icon: Icon,
  label,
  tone,
  value,
}: {
  icon: typeof BadgeCheck;
  label: string;
  tone: "green" | "blue" | "coral" | "violet";
  value: string;
}) {
  return (
    <div className={`runway-step ${tone}`}>
      <Icon size={17} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ReviewLine({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
}) {
  return (
    <div className="review-line">
      <Icon size={17} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
