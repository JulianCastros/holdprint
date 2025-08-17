const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Criar pedido
router.post('/', authMiddleware, pedidoController.criarPedido);

// Listar pedidos
router.get('/', authMiddleware, pedidoController.listarPedidos);

// Buscar pedido por ID
router.get('/:id', authMiddleware, pedidoController.buscarPedidoPorId);

// Atualizar pedido
router.put('/:id', authMiddleware, pedidoController.atualizarPedido);

// Deletar pedido
router.delete('/:id', authMiddleware, pedidoController.deletarPedido);

module.exports = router;