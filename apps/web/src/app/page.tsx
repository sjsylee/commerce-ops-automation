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
  { label: "Ledger", icon: ReceiptText, active: true },
  { label: "Pricing", icon: CircleDollarSign, active: false },
  { label: "Match", icon: Dock, active: false },
  { label: "Settings", icon: Settings2, active: false },
];

const workflow = [
  { label: "Catalog linked", value: "98%", tone: "green" },
  { label: "FX locked", value: "09:20", tone: "blue" },
  { label: "Needs review", value: "14", tone: "coral" },
  { label: "Settlement candidates", value: "18", tone: "violet" },
] as const;

const filters = ["All", "Review", "Auto-priced", "Matched"];

export default function HomePage() {
  const selected = samplePurchases[0];
  const economics = calculateSampleUnitEconomics(selected.publicInputs);

  return (
    <main className="studio-shell">
      <aside className="rail" aria-label="Primary navigation">
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
        <button className="rail-button" aria-label="Command menu">
          <Command size={18} />
        </button>
      </aside>

      <section className="studio-main" aria-label="Margin Studio workspace">
        <header className="studio-header">
          <div className="title-stack">
            <p>Inventory margin control</p>
            <h1>Margin Studio</h1>
            <span>
              Live purchase ledger, landed-cost checks, and settlement
              confidence for commerce operators.
            </span>
          </div>
          <div className="header-actions">
            <button className="ghost-action" aria-label="Refresh data">
              <RefreshCcw size={17} />
            </button>
            <button className="primary-action">
              <PackageSearch size={17} />
              New Intake
            </button>
          </div>
        </header>

        <section className="signal-row" aria-label="Operational signals">
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
                <p className="label">Purchase ledger</p>
                <h2>Intake Queue</h2>
              </div>
              <div className="search-control">
                <Search size={15} />
                <input aria-label="Search ledger" defaultValue="AF1 270" />
              </div>
            </div>

            <div className="filter-strip">
              {filters.map((filter) => (
                <button
                  className={filter === "All" ? "filter active" : "filter"}
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
                    {purchase.status === "ready" ? "Ready" : "Review"}
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
                <p className="label">Automation</p>
                <h2>Control Flow</h2>
              </div>
              <Sparkles size={18} />
            </div>
            <div className="runway">
              <RunwayStep
                icon={BadgeCheck}
                label="Product identity"
                value="linked"
                tone="green"
              />
              <RunwayStep
                icon={ArrowDownUp}
                label="FX snapshot"
                value="locked"
                tone="blue"
              />
              <RunwayStep
                icon={Layers3}
                label="Cost allocation"
                value="review"
                tone="coral"
              />
              <RunwayStep
                icon={Boxes}
                label="Settlement scope"
                value="ready"
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

      <aside className="review-panel" aria-label="Selected purchase review">
        <div className="review-head">
          <div>
            <p className="label">Selected SKU</p>
            <h2>{selected.productName}</h2>
            <span>
              {selected.brand} / {selected.option}
            </span>
          </div>
          <button className="ghost-action" aria-label="Open review controls">
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
          <span>Projected net margin</span>
          <strong>{economics.profitLabel}</strong>
          <p>
            Calculated from intake cost, FX snapshot, logistics allocation, and
            settlement policy.
          </p>
        </section>

        <div className="review-lines">
          <ReviewLine
            icon={TrendingUp}
            label="Margin rate"
            value={`${selected.marginRate.toFixed(1)}%`}
          />
          <ReviewLine
            icon={ShieldCheck}
            label="Session policy"
            value="HttpOnly"
          />
          <ReviewLine
            icon={DatabaseZap}
            label="Cost service"
            value="Validated"
          />
          <ReviewLine
            icon={LockKeyhole}
            label="Credential vault"
            value="Encrypted"
          />
        </div>

        <section className="match-card">
          <div className="match-head">
            <CheckCircle2 size={17} />
            <strong>Settlement candidates</strong>
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
