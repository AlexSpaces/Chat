const axios = require('axios');
const server = require('./server');

const startServerWithPrompt = async (port) => {
    try {
      // Try to make a GET request to the server
      const response = await axios.get(`http://localhost:${port}`);
      console.log('\x1b[32mServer is already running.\x1b[0m');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If the server responds with a 404 status, it's not running
        console.log('\x1b[33mServer is not running. Starting the server...\x1b[0m');
        server.startServer(port);
  
        const app = server.getApp();
        app.get('/', (req, res) => {
          res.sendFile(__dirname + '/public/index.html');
        });
      } else {
        console.log('\x1b[33mServer is not running. Starting the server...\x1b[0m');
        server.startServer(port);
  
        const app = server.getApp();
        app.get('/', (req, res) => {
          res.sendFile(__dirname + '/public/index.html');
        });
      }
    }
  };
  

// Start the server and handle user input
startServerWithPrompt(5354)