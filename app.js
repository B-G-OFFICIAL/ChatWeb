const express = require("express")
const app = express()
const http = require('http').createServer(app)

const path = require('path')
const staticPath = path.join(__dirname, 'Public')
const hbsPath = path.join(__dirname, '/Source/Views')

const session = require('express-session');
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(staticPath))
const hbs = require('hbs')
app.set('view engine', 'hbs')
app.set('views', hbsPath)

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const userRoutes = require('./Source/Routes/users')
app.use('/', userRoutes)

http.listen('1234', () => {console.log('Listening at port 1234')})