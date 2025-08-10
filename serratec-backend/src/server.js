require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'upload')));

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/orcamentos', require('./routes/orcamentoRoutes'));
app.use('/api/pedidos', require('./routes/pedidoRoutes'));
app.use('/api/financeiro', require('./routes/financeiroRoutes'));
app.use('/api/estoque', require('./routes/estoqueRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Conexão com MongoDB
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
  })
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err));
