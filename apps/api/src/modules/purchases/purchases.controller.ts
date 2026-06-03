import { Body, Controller, Get, Post } from "@nestjs/common";
import { purchasePublicInputSchema } from "@commerce-ops/shared";
import { PurchasesService } from "./purchases.service.js";

@Controller("purchases")
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get()
  listPurchases() {
    return this.purchasesService.listPurchases();
  }

  @Post("quote")
  quotePurchase(@Body() body: unknown) {
    return this.purchasesService.quotePurchase(
      purchasePublicInputSchema.parse(body),
    );
  }
}
