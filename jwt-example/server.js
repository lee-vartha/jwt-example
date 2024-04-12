
let port = process.env.PORT // let my public serverdefine the port
let http = require('http') // core node.js http
const url = require('url') // core node.js url
const app = require('./lib/helpers') // auth token verification and render helpers

http.createServer((req, res) => {
    let path = url.parse(req.url).pathname

    if(path === '/' || path === '/home') { // homepage
        app.home(res)
    } else if(path === '/auth') { // authentication
        app.handler(req,res)
    } else if(path === '/private') {
        app.validate(req,res, app.done)
    } else if(path === '/logout') {
        app.logout(req, res, app.done)
    } else if(path === '/exit'){
        app.exit(res)
    } else app.notFound(res)
}).listen(port)

console.log('Visit: http//127.0.0.1:' + port)