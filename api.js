const express = require('express');
const cors = require('cors'); // Middleware for handling CORS
const path = require('path');

const api = express();

// Use CORS middleware
api.use(cors({ origin: "*", methods: ["GET", "POST"] }));

// Serve static files
api.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root route
api.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = api;
