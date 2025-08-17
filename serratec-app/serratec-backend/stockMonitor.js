const mongoose = require('mongoose');
const cron = require('node-cron');
const Produto = require('./models/Produto');
const { notifyLowStock } = require('./utils/notifier');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const LOW_STOCK_THRESHOLD = parseInt(process.env.LOW_STOCK_THRESHOLD || '5');

// 🔌 Conectar ao MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado ao MongoDB');
}).catch(err => {
  console.error('❌ Erro ao conectar ao MongoDB:', err.message);
});

// 🔄 Função para verificar estoques
async function verificarEstoque() {
  try {
    const produtos = await Produto.find();

    for (const produto of produtos) {
      if (produto.quantidade <= LOW_STOCK_THRESHOLD) {
        await notifyLowStock({
          produto: produto.nome,
          restante: produto.quantidade,
          threshold: LOW_STOCK_THRESHOLD
        });
      }
    }

    console.log('📦 Verificação de estoque concluída.');
  } catch (err) {
    console.error('❌ Erro ao verificar estoque:', err.message);
  }
}

// ⏰ Agendamento com node-cron (a cada 30 minutos)
cron.schedule('*/30 * * * *', () => {
  console.log('🕒 Executando verificação de estoque...');
  verificarEstoque();
});
