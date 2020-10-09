import { workerData, parentPort } from 'worker_threads'
import * as puppeteer from 'puppeteer'
import axios from 'axios'

/* eslint-env serviceworker */
const isProduction = process.env.NODE_ENV === 'production'

new Promise(resolve => {
  const create = async callbaack => {
    const instance = axios.create({
      timeout: 30000
    })
    const request = await instance.get(workerData.host).catch(err => {
      throw new Error('AXIOS GET::' + err.message)
    })

    console.log('request', request)

    if (!request || request.status !== 200) {
      callbaack(null)
      return null
    }

    const browser = await puppeteer
      .launch({
        ...(isProduction
          ? {
            args: [
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-dev-shm-usage'
            ]
          }
          : {}),
        ...(process.env.CHROME_BINARY_PATH
          ? { executablePath: process.env.CHROME_BINARY_PATH }
          : {})
      })
      .catch(err => {
        throw new Error('PUPPETEER LAUNCH::' + err.message)
      })

    const page = await browser.newPage().catch(err => {
      throw new Error('PAGE NEW::' + err.message)
    })

    await page
      .goto(workerData.host, { waitUntil: process.env.CHROME_WAIT_UNTIL })
      .catch(err => {
        throw new Error('PAGE GOTO::' + err.message)
      })

    await page.addStyleTag({ content: '' })

    const pdf = await page
      .pdf({
        // path: (name || "download") + ".pdf",
        printBackground: true,
        width: workerData.width,
        height: workerData.height
      })
      .catch(err => {
        throw new Error('PDF CONFIG::' + err.message)
      })

    await browser.close()
    callbaack(pdf)
  }

  create(pdf => {
    resolve(pdf)
  }).catch(err => {
    throw new Error('PDF CREATE::' + err.message)
  })
})
  .then(data => {
    parentPort.postMessage(data)
  })
  .catch(() => {
    parentPort.postMessage(null)
  })
