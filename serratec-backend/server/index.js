// server/index.js

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configura CORS para permitir requisições do front-end
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

// Inicializa o Socket.IO no mesmo server HTTP
const io = new Server(server, {
  path: '/socket.io',
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('cliente conectado:', socket.id);

  // Emite um evento de teste
  socket.emit('hello', 'mundo');

  socket.on('disconnect', reason => {
    console.log('cliente desconectou:', reason);
  });
});

// Sobe o servidor na porta 5000
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Socket.IO rodando em http://localhost:${PORT}`);
});
