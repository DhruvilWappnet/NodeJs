const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.emit('newMessage',
        {
            from: 'jen@mds',
            text: 'hepppp',
            createdAt: 123
        });
    socket.on('createMessage',
        (newMessage) => {
            console.log('Received newMessage', newMessage);
            socket.emit('messageConfirmation', {
                message: 'Message received by the server.'
            });
            console.log('New message:', newMessage);
        }); 

    // when server disconnects from user
    socket.on(' ',
        () => {
            console.log('disconnected from user');
        }); 
});

server.listen(8080, () => {
    console.log('WebSocket server listening on port 8080');
});
