const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const { authMiddleware } = require('../middleware/auth');
const { param, body } = require('express-validator');

// GET /clientes/:id
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

// [GET] Listar todos
router.get('/', authMiddleware, async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

// [POST] Criar novo cliente
router.post('/', authMiddleware, async (req, res) => {
  const novo = new Cliente(req.body);
  await novo.save();
  res.status(201).json(novo);
});

// [PUT] Atualizar cliente
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clienteAtualizado) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(clienteAtualizado);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: err.message });
  }
});

// [DELETE] Remover cliente
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir cliente', error: err.message });
  }
});

module.exports = router;
