import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { AppModule } from './../src/app.module'
import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HealthController } from '../src/health/health.controller'
import { PdfController } from '../src/pdf/pdf.controller'
import { PdfService } from '../src/pdf/pdf.service'
import { TerminusModule } from '@nestjs/terminus'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TerminusModule, ConfigModule.forRoot()],
      controllers: [HealthController, PdfController],
      providers: [PdfService]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ready (GET)', async done => {
    await request(app.getHttpServer()).get('/ready').expect(200)
    done()
  }, 30000)
})
