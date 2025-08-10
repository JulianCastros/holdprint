const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const { authMiddleware } = require('../middleware/auth');

// GET /pedidos – listar todos
router.get('/', authMiddleware, async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('cliente').populate('orcamento');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedidos', error: err });
  }
});

// GET /pedidos/:id – buscar um por ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar pedido', error: err });
  }
});

// POST /pedidos – criar novo
router.post('/', authMiddleware, async (req, res) => {
  try {
    const novo = new Pedido(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar pedido', error: err });
  }
});

// PUT /pedidos/:id – atualizar
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pedidoAtualizado) return res.status(404).json({ message: 'Pedido não encontrado' });
    res.json(pedidoAtualizado);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar pedido', error: err });
  }
});

// DELETE /pedidos/:id – remover
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pedido excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir pedido', error: err });
  }
});

module.exports = router;
