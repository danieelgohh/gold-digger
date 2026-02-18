import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { getMockGoldPrice } from './utils/updateGoldPrice.js'

const PORT = 8000

const baseDir = import.meta.dirname

const server = http.createServer( async (req, res) => {
  if (req.url.startsWith('/api/price')) {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    setInterval(() => {
      const price = getMockGoldPrice()

      res.write(
        `data: ${JSON.stringify({ event: "price-updated", price: price})}\n\n`
      )
    }, 5000)
  } else {
    await serveStatic(req, res, baseDir)
  }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))