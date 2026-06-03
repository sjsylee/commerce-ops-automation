import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { calculateSampleUnitEconomics } from "./index.js";

describe("calculateSampleUnitEconomics", () => {
  it("calculates landed cost, net sale, profit, and profit rate from public inputs", () => {
    const result = calculateSampleUnitEconomics({
      foreignUnitCost: 100,
      fxRate: 10,
      inboundCostKrw: 200,
      platformFeeKrw: 150,
      targetSalePriceKrw: 2000,
    });

    assert.equal(result.landedCostKrw, 1200);
    assert.equal(result.netSaleKrw, 1850);
    assert.equal(result.profitKrw, 650);
    assert.equal(result.profitRate, 650 / 1200);
    assert.equal(result.profitLabel, "+₩650");
  });
});
