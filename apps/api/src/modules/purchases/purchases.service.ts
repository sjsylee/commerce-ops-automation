import { Injectable } from "@nestjs/common";
import {
  calculateSampleUnitEconomics,
  samplePurchases,
  type PurchasePublicInput,
} from "@commerce-ops/shared";

@Injectable()
export class PurchasesService {
  listPurchases() {
    return samplePurchases;
  }

  quotePurchase(input: PurchasePublicInput) {
    return {
      calculationPolicy: "public-sample-policy",
      result: calculateSampleUnitEconomics(input),
    };
  }
}
