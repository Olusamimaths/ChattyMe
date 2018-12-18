const express = require('express')
const bodyParser = require('body-parser')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)
const mongoose = require('mongoose')
const dbUrl = 'mongodb://admin:admin123@ds237574.mlab.com:37574/chatty'

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const Message = mongoose.model('Message', {
    name: String,
    message: String
})
app.get('/messages', (req, res, next) => {
   Message.find({}, (err, messages) => {
       res.send(messages)
   })
})
app.post('/messages', (req, res, next) => {
    let message = new Message(req.body)
    message.save((err) => {
    if(err) sendStatus(500) 
    io.emit('message', req.body)
    res.sendStatus(200)
    })
   
})

io.on('connection', (socket) => {
    console.log('User Connected')
})

mongoose.connect(dbUrl, (err) => {
    if(err) return console.log(err)
    console.log('Mongodb connection successful');
})

const server = http.listen(3000, () => console.log(`Server is listening on port ${server.address().port}`))