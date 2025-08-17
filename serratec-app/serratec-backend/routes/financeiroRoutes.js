const express = require('express');
const router = express.Router();
const financeiroController = require('../controllers/financeiroController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, financeiroController.criarTransacao);
router.get('/', authMiddleware, financeiroController.listarTransacoes);
router.get('/:id', authMiddleware, financeiroController.buscarTransacaoPorId);
router.put('/:id', authMiddleware, financeiroController.atualizarTransacao);
router.delete('/:id', authMiddleware, financeiroController.deletarTransacao);

module.exports = router;