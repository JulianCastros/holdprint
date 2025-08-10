const express = require('express');
const router = express.Router();
const Orcamento = require('../models/Orcamento');
const { authMiddleware } = require('../middleware/auth');
const { param, validationResult } = require('express-validator');

// Buscar orçamento por ID
router.get('/:id',
  authMiddleware,
  param('id').isMongoId(),
  async (req, res, next) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const cliente = await Cliente.findById(id);
      if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
      res.json(cliente);
    } catch (err) { next(err); }
  }
);

// Criar novo orçamento
router.post('/', authMiddleware, async (req, res) => {
  try {
    const novo = new Orcamento(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar orçamento', error: err });
  }
});

// Atualizar orçamento
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const orcamentoAtualizado = await Orcamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!orcamentoAtualizado) return res.status(404).json({ message: 'Orçamento não encontrado' });
    res.json(orcamentoAtualizado);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar orçamento', error: err });
  }
});

// Excluir orçamento
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Orcamento.findByIdAndDelete(req.params.id);
    res.json({ message: 'Orçamento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir orçamento', error: err });
  }
});

// Listar todos — mantém auth
router.get(
  '/',
  authMiddleware,
  async (req, res, next) => {
    try {
      const lista = await Orcamento.find();
      res.json(lista);
    } catch (err) {
      next(err);
    }
  }
);

// Buscar por ID com validação de MongoID
router.get(
  '/:id',
  authMiddleware,
  param('id').isMongoId().withMessage('ID de orçamento inválido'),
  async (req, res, next) => {
    // Verifica erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const orc = await Orcamento.findById(req.params.id);
      if (!orc) {
        return res.status(404).json({ message: 'Orçamento não encontrado' });
      }
      res.json(orc);
    } catch (err) {
      next(err);
    }
  }
);

// Criar, atualizar e excluir seguem aqui, você pode adicionar validações semelhantes

module.exports = router;
