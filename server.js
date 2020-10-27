const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

let users = []
let messages = []
let index = 0

io.on('connection', socket => {
    socket.emit('loggedIn', {
        users: users.map(s => s.username),
        messages: messages
    })

    socket.on('newuser', username => {
        socket.username = username
        users.push(socket)

        io.emit('userOnline', socket.username)
    })

    socket.on('msg', msg => {
        let message = {
            index: index,
            username: socket.username,
            msg: msg,
            time: `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`
        }

        messages.push(message)
        io.emit('msg', message)
        index++
    })

    socket.on('disconnect', () => {
        io.emit('userLeft', socket.username)
        users.splice(users.indexOf(socket), 1)
    })
})

http.listen(process.env.PORT || 3000, () => {
    console.log(3000)
})
