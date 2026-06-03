import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module.js";
import { PurchasesModule } from "./purchases/purchases.module.js";

@Module({
  imports: [HealthModule, PurchasesModule],
})
export class AppModule {}
