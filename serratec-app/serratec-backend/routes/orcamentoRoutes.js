const express = require('express');
const router = express.Router();
const orcamentoController = require('../controllers/orcamentoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, orcamentoController.criarOrcamento);
router.get('/', authMiddleware, orcamentoController.listarOrcamentos);
router.get('/:id', authMiddleware, orcamentoController.buscarOrcamentoPorId);
router.put('/:id', authMiddleware, orcamentoController.atualizarOrcamento);
router.delete('/:id', authMiddleware, orcamentoController.deletarOrcamento);

module.exports = router;