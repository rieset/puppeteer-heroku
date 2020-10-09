import { Test } from '@nestjs/testing'
import { PdfService } from './pdf.service'

describe('PdfService', () => {
  let service: PdfService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PdfService]
    }).compile()

    service = module.get<PdfService>(PdfService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
