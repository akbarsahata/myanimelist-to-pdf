const URL = require('url').URL
const path = require('path')
const puppeteer = require('puppeteer')
const faker = require('faker')
const ms = require('ms')

const generateFilename = () => {
  const name = faker.system.fileName()
  const now = Date.now()

  return `${name}_${now}.pdf`
}

const main = async () => {
  try {
    if (!process.argv[2]) throw new Error('URL is required')

    const targetUrl = new URL(process.argv[2])
    const targetPath = path.normalize(`./pdfs/${generateFilename()}`)

    console.log(`will open ${targetUrl}`)

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    page.setDefaultTimeout(ms('1m'))

    console.log('browser opened')

    await page.goto(targetUrl.toString(), { waitUntil: 'load' })
    
    if (await page.$('div.modal-mask')) {
      console.log('found modal, clicking buttons')

      const button = await page.$('button')

      await button.click()
    }

    await page.pdf({ path: targetPath, format: 'A4' })

    console.log(`PDF file is generated at ${targetPath}`)

    await browser.close()
  } catch (err) {
    console.error(err)
  }

  process.exit(0)
}

main()