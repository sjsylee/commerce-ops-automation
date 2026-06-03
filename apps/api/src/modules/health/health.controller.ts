import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  readHealth() {
    return {
      ok: true,
      service: "commerce-ops-api",
      timestamp: new Date().toISOString(),
    };
  }
}
