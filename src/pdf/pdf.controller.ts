import { Controller, Get, Req, Res } from '@nestjs/common'
import { PdfService } from './pdf.service'

@Controller('')
export class PdfController {
  private readonly name: string
  private readonly nameRatio: number

  constructor (private pdfService: PdfService) {
    this.nameRatio = parseFloat(process.env.SERVICE_NAME_RATIO) || 0.56
    this.name = process.env.SERVICE_NAME || 'PDF SERVICE'
  }

  @Get('/ready')
  async ready () {
    return this.pdfService.getStartPage(this.name, this.nameRatio)
  }

  @Get('*')
  async download (@Req() request, @Res() res) {
    if (!request?.headers?.authorization) {
      res.status(404)
      return this.pdfService.getStartPage(this.name, this.nameRatio)
    }

    const [host, prefix, width, height] = process.env[
      request?.headers?.authorization
    ]
      ? process.env[request?.headers?.authorization].split(',')
      : [null, null, null, null]

    if (!host) {
      res.status(404).send('')
      return
    }

    const url = new URL(
      [prefix, request.url].join('/').replace(/\/+/g, '/'),
      host
    )

    const result = await this.pdfService.getFile({
      host: url.protocol + '//' + url.host + url.pathname,
      width,
      height
    })

    if (!result) {
      res.status(404)
      res.send('')
      return
    }

    res.send(Buffer.from(result), 'base64')
  }

  @Get('/')
  root (@Res() res) {
    res.header('Content-Type', 'text/html; charset=utf-8')
    res.status(200)
    res.send(this.pdfService.getStartPage(this.name, this.nameRatio))
  }
}
