// services/socket.js
import { io } from 'socket.io-client';

let socket;

export const connectSocket = (userId) => {
  socket = io('http://localhost:8081'); // Adjust the URL as necessary
  socket.emit('join', userId);
};

export const onNewMailReceived = (callback) => {
  if (socket) {
    socket.on('newMailReceived', callback);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};
