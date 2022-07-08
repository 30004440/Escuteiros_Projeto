const express = require('express')
const https = require('https')
const fs = require('fs')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use(express.json({limit: '2mb'}))
app.use(express.urlencoded({ extended: true, limit: '2mb' }))

require('./rotas/rotas')(app)

const sslServer = https.createServer({
    key: fs.readFileSync('cert/key.pem'),
    cert:fs.readFileSync('cert/certificate.pem')
}, app)


app.listen(process.env.PORT || 8080, () => {
    console.log(`O servidor está a ouvir na porta 8080`)
})

app.use(express.static('public'))