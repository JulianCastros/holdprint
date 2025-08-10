const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Orcamento = require('../models/Orcamento');
const Pedido = require('../models/Pedido');
const Financeiro = require('../models/Financeiro');
const Estoque = require('../models/Estoque');
const { authMiddleware } = require('../middleware/auth');

router.get('/',
  authMiddleware,
  async (req, res, next) => {
    try {
      const [
        totalClientes,
        totalOrcamentos,
        totalPedidos,
        totalItensEstoque,
        lancamentos
      ] = await Promise.all([
        Cliente.countDocuments(),
        Orcamento.countDocuments(),
        Pedido.countDocuments(),
        Estoque.countDocuments(),
        Financeiro.find()
      ]);

      const totalEntrada = lancamentos
        .filter(l => l.tipo === 'entrada')
        .reduce((sum, l) => sum + l.valor, 0);

      const totalSaida = lancamentos
        .filter(l => l.tipo === 'saida')
        .reduce((sum, l) => sum + l.valor, 0);

      res.json({
        totalClientes,
        totalOrcamentos,
        totalPedidos,
        totalItensEstoque,
        totalEntrada,
        totalSaida
      });
    } catch (err) { next(err); }
  }
);

module.exports = router;
