const express = require('express');
const router = express.Router();
const printController = require('../controllers/printController');
const authMiddleware = require('../middlewares/authMiddleware');

// Criar novo trabalho de impressão
router.post('/', authMiddleware, printController.createPrintJob);

// Listar trabalhos do usuário logado
router.get('/me', authMiddleware, printController.getUserPrintJobs);

// Alterar status de impressão
router.put('/:id/status', authMiddleware, printController.updatePrintStatus);

// Listar todos os trabalhos (admin)
router.get('/all', authMiddleware, printController.getAllPrintJobs);

module.exports = router;