import { Module } from '@nestjs/common'
import { HealthController } from './health/health.controller'
import { TerminusModule } from '@nestjs/terminus'
import { PdfController } from './pdf/pdf.controller'
import { PdfService } from './pdf/pdf.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [TerminusModule, ConfigModule.forRoot()],
  controllers: [HealthController, PdfController],
  providers: [PdfService]
})
export class AppModule {}
