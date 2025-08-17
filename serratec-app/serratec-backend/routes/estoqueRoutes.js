const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, estoqueController.criarItemEstoque);
router.get('/', authMiddleware, estoqueController.listarItensEstoque);
router.get('/:id', authMiddleware, estoqueController.buscarItemPorId);
router.put('/:id', authMiddleware, estoqueController.atualizarItemEstoque);
router.delete('/:id', authMiddleware, estoqueController.deletarItemEstoque);

module.exports = router;