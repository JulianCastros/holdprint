const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');
const authMiddleware = require('../middlewares/authMiddleware');

// CRUD de Relatório
router.post('/', authMiddleware, relatorioController.criarRelatorio);
router.get('/', authMiddleware, relatorioController.listarRelatorios);
router.get('/:id', authMiddleware, relatorioController.buscarRelatorioPorId);
router.delete('/:id', authMiddleware, relatorioController.deletarRelatorio);

// Geração de PDF
router.post('/gerar-pdf', authMiddleware, relatorioController.gerarRelatorioPDF);

module.exports = router;