const express = require('express');
const router = express.Router();
const Financeiro = require('../models/Financeiro');
const { authMiddleware } = require('../middleware/auth');

// GET /financeiro – listar todos os lançamentos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const lancamentos = await Financeiro.find().populate('pedido');
    res.json(lancamentos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar lançamentos', error: err });
  }
});

// GET /financeiro/:id – buscar um lançamento por ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Financeiro.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Lançamento não encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar lançamento', error: err });
  }
});

// POST /financeiro – criar novo lançamento
router.post('/', authMiddleware, async (req, res) => {
  try {
    const novo = new Financeiro(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar lançamento', error: err });
  }
});

// PUT /financeiro/:id – atualizar lançamento
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const atualizado = await Financeiro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ message: 'Lançamento não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar', error: err });
  }
});

// DELETE /financeiro/:id – remover lançamento
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletado = await Financeiro.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ message: 'Lançamento não encontrado' });
    res.json({ message: 'Lançamento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir lançamento', error: err });
  }
});

module.exports = router;
