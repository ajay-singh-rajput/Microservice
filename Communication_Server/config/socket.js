// socket.js

const { Server } = require('socket.io');

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: true,
        },
    });

    io.on('connection', (socket) => {
        socket.on('join', (userId) => {
            // Join room based on userId
            socket.join(userId);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });

    return io;
}

function getSocket() {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
}

module.exports = { initializeSocket, getSocket };
