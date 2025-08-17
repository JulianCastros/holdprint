import express   from 'express';
import { createServer } from 'node:http';
import { Server }       from 'socket.io';

const app    = express();
const httpSv = createServer(app);

// Habilite CORS para seu front
const io = new Server(httpSv, {
  path: '/socket.io',
  cors: {
    origin: ['http://localhost:3000'], // ajuste se rodar em outra URL
    methods: ['GET','POST']
  }
});

// Rota teste
app.get('/', (_req, res) => {
  res.send('<h1>Servidor Socket.IO no ar</h1>');
});

// Evento de conexão
io.on('connection', socket => {
  console.log('▶️ Cliente conectado:', socket.id);
  socket.on('disconnect', () => console.log('⛔ Cliente desconectou:', socket.id));
});

httpSv.listen(5000, () => {
  console.log('🚀 Servidor rodando em http://localhost:5000');
});
