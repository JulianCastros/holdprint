// src/socket.js

import { io } from 'socket.io-client';

const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:5000';
const socket = io(WS_URL, {
  autoConnect: false
});

export default socket;
