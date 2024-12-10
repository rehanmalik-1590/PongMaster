const http = require('http');
const io = require('socket.io');

const apiServer = require('./api'); 
const sockets = require('./sockets');

// Create HTTP server
const httpServer = http.createServer(apiServer);
// Set up Socket.IO with CORS settings
const socketIo = io(httpServer, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"],
    },
});

// Define the port
const PORT = 3000;

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Initialize Socket.IO
sockets.listen(socketIo);
