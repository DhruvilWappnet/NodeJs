const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server)
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chatMessage', (msg) => {
        console.log('message: ' + msg)
        io.emit('chat message', msg);
    })
    // Event listener for disconnections
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Event listener for incoming messages
    socket.on('message', (data) => {
        console.log('Message received:', data);
    });
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});