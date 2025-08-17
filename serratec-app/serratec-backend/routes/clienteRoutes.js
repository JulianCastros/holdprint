const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authMiddleware');

// Criar cliente
router.post('/', authMiddleware, clienteController.criarCliente);

// Listar todos os clientes
router.get('/', authMiddleware, clienteController.listarClientes);

// Buscar cliente por ID
router.get('/:id', authMiddleware, clienteController.buscarClientePorId);

// Atualizar cliente
router.put('/:id', authMiddleware, clienteController.atualizarCliente);

// Deletar cliente
router.delete('/:id', authMiddleware, clienteController.deletarCliente);

module.exports = router;