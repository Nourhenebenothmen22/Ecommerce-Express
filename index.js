const http=require('http')
const port=3000
const server = http.createServer((req, res) => {
    // envoi la réponse au client
    res.end('Hello World from the server')
})
server.listen(port, 'localhost',() => {
    console.log('Server is listening at localhost on port 3000')
})