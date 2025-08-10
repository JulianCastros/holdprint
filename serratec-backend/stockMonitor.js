const mongoose = require('mongoose');
const axios = require('axios');
const { Server } = require('socket.io');
const Estoque = require('./models/Estoque');

const LOW_STOCK_THRESHOLD = Number(process.env.LOW_STOCK_THRESHOLD) || 5;
const NOTIFIER_URL = process.env.NOTIFIER_URL;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✔️ MongoDB (monitor) conectado'))
  .catch(e => console.error('❌ MongoDB (monitor):', e.message));

function initStockMonitor(server) {
  const io = new Server(server, {
    path: '/socket.io',
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  console.log('🚀 StockMonitor inicializado');

  io.on('connection', socket => {
    console.log('WS cliente conectado:', socket.id);
    socket.emit('welcome', { message: 'Monitor de estoque ativo' });

    socket.on('disconnect', reason => {
      console.log('WS cliente desconectou:', reason);
    });
  });

  const changeStream = Estoque.watch([], { fullDocument: 'updateLookup' });
  changeStream
    .on('change', async ({ operationType, fullDocument }) => {
      if (!['insert', 'update'].includes(operationType)) return;

      const doc = fullDocument;
      const isLow = doc.quantidade <= LOW_STOCK_THRESHOLD;

      io.emit('stockUpdate', {
        _id: doc._id,
        nome: doc.nome,
        quantidade: doc.quantidade,
        isLowStock: isLow
      });

      if (isLow && NOTIFIER_URL) {
        try {
          await axios.post(NOTIFIER_URL, {
            type: 'LOW_STOCK',
            produto: doc.nome,
            restante: doc.quantidade,
            threshold: LOW_STOCK_THRESHOLD
          });
          console.log(`🔔 Notificado: ${doc.nome} está baixo`);
        } catch (err) {
          console.error('❌ Falha notificação:', err.message);
        }
      }
    })
    .on('error', err => console.error('❌ ChangeStream erro:', err));
}

module.exports = initStockMonitor;
