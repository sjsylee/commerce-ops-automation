import { z } from "zod";

export const publicCurrencySchema = z.enum(["JPY", "CNY", "EUR", "USD", "KRW"]);

export const purchasePublicInputSchema = z.object({
  foreignUnitCost: z.number().positive(),
  fxRate: z.number().positive(),
  inboundCostKrw: z.number().nonnegative(),
  platformFeeKrw: z.number().nonnegative(),
  targetSalePriceKrw: z.number().positive(),
});

export type PurchasePublicInput = z.infer<typeof purchasePublicInputSchema>;

export type SamplePurchase = {
  id: string;
  brand: string;
  productName: string;
  option: string;
  styleCode: string;
  storeName: string;
  status: "ready" | "review";
  marginRate: number;
  publicInputs: PurchasePublicInput;
};

export const samplePurchases: SamplePurchase[] = [
  {
    id: "purchase_001",
    brand: "Nike",
    productName: "Air Force 1 Low",
    option: "270",
    styleCode: "AF1-270",
    storeName: "도쿄 매장",
    status: "ready",
    marginRate: 18.7,
    publicInputs: {
      foreignUnitCost: 12800,
      fxRate: 9.12,
      inboundCostKrw: 17200,
      platformFeeKrw: 8900,
      targetSalePriceKrw: 169000,
    },
  },
  {
    id: "purchase_002",
    brand: "Adidas",
    productName: "Samba OG",
    option: "265",
    styleCode: "SB-265",
    storeName: "중국 온라인",
    status: "ready",
    marginRate: 15.2,
    publicInputs: {
      foreignUnitCost: 620,
      fxRate: 189.4,
      inboundCostKrw: 14100,
      platformFeeKrw: 7600,
      targetSalePriceKrw: 158000,
    },
  },
  {
    id: "purchase_003",
    brand: "Asics",
    productName: "Gel-Kayano 14",
    option: "280",
    styleCode: "GK14-280",
    storeName: "오사카 매장",
    status: "review",
    marginRate: 9.8,
    publicInputs: {
      foreignUnitCost: 16200,
      fxRate: 9.08,
      inboundCostKrw: 19200,
      platformFeeKrw: 10100,
      targetSalePriceKrw: 184000,
    },
  },
  {
    id: "purchase_004",
    brand: "Salomon",
    productName: "XT-6",
    option: "275",
    styleCode: "XT6-275",
    storeName: "유럽 파트너",
    status: "ready",
    marginRate: 21.4,
    publicInputs: {
      foreignUnitCost: 118,
      fxRate: 1480.2,
      inboundCostKrw: 22600,
      platformFeeKrw: 13400,
      targetSalePriceKrw: 256000,
    },
  },
];

export const sampleSyncStatus = [
  { label: "환율 기준 시각", value: "09:20 기준" },
  { label: "재고 가격", value: "2분 전" },
  { label: "정산 가져오기", value: "대기 없음" },
] as const;

export const sampleSettlements = [
  { id: "match_001", label: "주문 기준값", confidence: "96%" },
  { id: "match_002", label: "상품/옵션 일치", confidence: "88%" },
  { id: "match_003", label: "수동 검토", confidence: "필요" },
] as const;

export function calculateSampleUnitEconomics(input: PurchasePublicInput) {
  const data = purchasePublicInputSchema.parse(input);
  const landedCostKrw = Math.round(
    data.foreignUnitCost * data.fxRate + data.inboundCostKrw,
  );
  const netSaleKrw = data.targetSalePriceKrw - data.platformFeeKrw;
  const profitKrw = netSaleKrw - landedCostKrw;
  const profitRate = landedCostKrw === 0 ? 0 : profitKrw / landedCostKrw;

  return {
    landedCostKrw,
    netSaleKrw,
    profitKrw,
    profitRate,
    profitLabel: `${profitKrw >= 0 ? "+" : "-"}₩${Math.abs(profitKrw).toLocaleString("ko-KR")}`,
  };
}
