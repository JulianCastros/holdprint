require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const clienteRoutes = require('./routes/clienteRoutes');
const orcamentoRoutes = require('./routes/orcamentoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const financeiroRoutes = require('./routes/financeiroRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const printRoutes = require('./routes/printRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/clientes', clienteRoutes);
app.use('/api/orcamentos', orcamentoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/impressao', printRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/relatorios', relatorioRoutes);
app.use('/api/auth', authRoutes);

// Catch-all 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento global de erro
app.use((err, req, res, next) => {
  console.error('Erro global:', err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

module.exports = app;