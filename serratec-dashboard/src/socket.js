import { io } from 'socket.io-client';

const http://localhost:5000 = process.env.REACT_APP_SOCKET_URL;

const socket = io(SOCKET_URL, {
  path: '/socket.io',
  transports: ['polling', 'websocket'],
  autoConnect: false
});

export default socket;
