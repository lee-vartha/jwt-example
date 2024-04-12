const qs = require('querystring')   
const fs = require('fs')
const path = require('path')

const level = require('level')
const db = level(__dirname + '/db')


const jwt = require('jsonwebtoken')
const sevret = process.env.JWT_SECRET || "change_this_to_something_random"


function loadView(view) {
    let filepath = path.resolve(__dirname, '../views', view + '.html')
    return fs.readFileSync(filepath).toString()
}


const index = loadView('index')
const restricted = loadView('restricted')
const notFound = loadView('notFound')


function authFail(res, callback) {
    res.writeHead(401, {'Content-Type': 'text/html'})
    return res.end(notFound)
}


function generateGUID() {
    return new Date().getTime()
}

function generateToken(req) {
    // by default it will expire the token aftrer 7 days
    // the value of 'exp' needs to be in seconds
    opts = opts || {}

    let expireDefault = '7d'
    const token = jwt.sign({
        auth: GUID,
        agent: req.headers['user-agent'], 
    }, secret, {expiresIN: opts.expires || expireDefault}) 

    return token
}


function generateAndStoreToken(req, opts) {
    const GUID = generateGUID()
    const token = generateToken(req, GUID, opts)

    let recod = {
        'valid': true,
        'created': newDate().getTime()
    }

    db.put(GUID, JSON.stringify(record), (err) => {
        console.log(recod)
    })
    return token
}