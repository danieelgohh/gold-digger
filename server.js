import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { getMockGoldPrice } from './utils/updateGoldPrice.js'
import { EventEmitter } from 'node:events'
import { logTransaction } from './utils/logTransaction.js'
import { parseJSONBody } from './utils/parseJSONBody.js'
import { sendResponse } from './utils/sendResponse.js'

const PORT = 8000

const baseDir = import.meta.dirname

const logTransactionEmitter = new EventEmitter()
// logTransactionEmitter.on("logTransaction", logTransaction)

const server = http.createServer( async (req, res) => {
  if (req.url.startsWith('/api/price')) {
    if (req.method === "GET") {
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
    } else if (req.method === "POST") {
      try {
        const parsedBody = await parseJSONBody(req)
        const {
          date,
          amount,
          ppoz
        } = parsedBody
        await logTransaction(date, amount, ppoz)
        sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody))
      } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))
      }
    }
  } else {
    await serveStatic(req, res, baseDir)
  }
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))