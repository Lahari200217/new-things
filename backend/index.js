// backend/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' },
});

app.use(cors());

let currentPage = 1;
let adminSocket = null;

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Determine if user is admin or viewer
    if (!adminSocket) {
        adminSocket = socket;
        socket.emit('role', 'admin');
    } else {
        socket.emit('role', 'viewer');
        socket.emit('pageChange', currentPage); // Sync new viewer to current page
    }

    // Handle page change from admin
    socket.on('pageChange', (page) => {
        if (socket === adminSocket) {
            currentPage = page;
            io.emit('pageChange', page); // Broadcast new page to all users
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        if (socket === adminSocket) {
            adminSocket = null; // Reset admin on disconnect
            io.emit('adminDisconnected');
        }
    });
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
