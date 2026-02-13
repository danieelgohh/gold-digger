import http from 'node:http'

const PORT = 8000

const server = http.createServer( async (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  res.end("LMAO")
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))