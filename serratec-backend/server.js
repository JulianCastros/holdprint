require('dotenv').config();

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const initStockMonitor = require('./stockMonitor');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'upload')));

app.use('/api/auth',       require('./routes/authRoutes'));
app.use('/api/clientes',   require('./routes/clienteRoutes'));
app.use('/api/orcamentos', require('./routes/orcamentoRoutes'));
app.use('/api/pedidos',    require('./routes/pedidoRoutes'));
app.use('/api/financeiro',  require('./routes/financeiroRoutes'));
app.use('/api/estoque',    require('./routes/estoqueRoutes'));
app.use('/api/dashboard',  require('./routes/dashboardRoutes'));

const server = http.createServer(app);
initStockMonitor(server);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');
    server.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao conectar no MongoDB:', err.message);
  });
