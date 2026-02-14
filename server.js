import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'

const PORT = 8000

const baseDir = import.meta.dirname

const server = http.createServer( async (req, res) => {
  await serveStatic(req, res, baseDir)
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))