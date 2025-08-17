const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, produtoController.criarProduto);
router.get('/', authMiddleware, produtoController.listarProdutos);
router.get('/:id', authMiddleware, produtoController.buscarProdutoPorId);
router.put('/:id', authMiddleware, produtoController.atualizarProduto);
router.delete('/:id', authMiddleware, produtoController.deletarProduto);

module.exports = router;