const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const ngrok = require('ngrok');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const messages = []; // Array to store all messages

module.exports = {
  startServer: async (port, handleMessage) => {
    const url = await ngrok.connect(port); // Expose the local server using ngrok

    io.on('connection', (socket) => {
      socket.emit('messages', messages);

      socket.on('message', (message) => {
        messages.push(message); // Add the message to the array
        //handleMessage(message); // Call the message handler with the new message
        io.emit('message', message); // Broadcast the message to all connected sockets
      });
    });

    server.listen(port, () => {
      console.log(`You can now access the chat interface by opening: ${url}`);
    });

    process.on('SIGINT', async () => {
      await ngrok.disconnect(); // Disconnect ngrok tunnel
      await ngrok.kill(); // Terminate ngrok process
      server.close(() => {
        console.log('Server stopped.');
        process.exit();
      });
    });
  },
  getApp: () => {
    return app;
  }
};
