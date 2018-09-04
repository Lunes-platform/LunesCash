const http = require('http')

let port = 9011

const server = http.createServer({port})

server.get('/', (req, res) => {
  res.end()
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
