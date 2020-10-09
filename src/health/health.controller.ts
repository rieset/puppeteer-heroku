import { Controller, Get } from '@nestjs/common'
import {
  HealthCheckService,
  DNSHealthIndicator,
  HealthCheck
} from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor (
    private health: HealthCheckService,
    private dns: DNSHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check () {
    return this.health.check([
      () => this.dns.pingCheck('ready', process.env.HEALTH_URL)
    ])
  }
}
