import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

async function bootstrap () {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )
  await app.listen(port, '0.0.0.0').then(() => {
    console.log(`Start server on ${port} port`)
  })
}

bootstrap()
