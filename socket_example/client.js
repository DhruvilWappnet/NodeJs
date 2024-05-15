const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  console.log('Connected to server');
  
  ws.send('Hello, server!');
});

ws.on('message', function incoming(data) {
  console.log('Received: %s', data);
});
