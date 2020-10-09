import { Test, TestingModule } from '@nestjs/testing'
import { HealthController } from './health.controller'
import {
  DNSHealthIndicator,
  HealthCheckService,
  TerminusModule
} from '@nestjs/terminus'
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service'

describe('HealthController', () => {
  let controller: HealthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [HealthCheckService, HealthCheckExecutor]
    }).compile()

    controller = module.get<HealthController>(HealthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
