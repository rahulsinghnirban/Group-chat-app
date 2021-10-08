const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path')



app.use('/', express.static(path.join(__dirname, 'public')));

const users = {}

// a new socket gets created whenever a new user connects to the io (that is set up with your server), the socket listens on your user client side actions with socket.on method , (e.g messages), and then executes a callback function (e.g broadcast that message to all other connected users via io.emit(...). I think the io object is for the server to listen on global events (e.g new user connects) or for broadcasting from server to all other users... whereas the socket object is rather to react for user-specific events.. but I'm not a 100% sure of all the differences there...

io.on('connection', (socket) =>{
    // console.log(`connection established with ${socket.id}`)
    
    socket.on('send-msg', (data) =>{
        io.emit('received-msg', {
            msg: data.msg,
            // id: socket.id,
            user: users[socket.id]
        })
    })

    socket.on('login', (data)=>{
        users[socket.id] = data.user
    })

})


const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
})