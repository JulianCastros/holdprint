
const express = require('express');
const Estoque = require('../models/Estoque');
const router = express.Router();

// GET /api/estoque  – listar todos os itens
router.get('/', async (req, res) => {
  try {
    const items = await Estoque.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/estoque – adicionar novo item
router.post('/', async (req, res) => {
  try {
    const novoItem = new Estoque(req.body);
    await novoItem.save();
    res.status(201).json(novoItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/estoque/:id – atualizar item
router.put('/:id', async (req, res) => {
  try {
    const updated = await Estoque.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/estoque/:id – remover item
router.delete('/:id', async (req, res) => {
  try {
    await Estoque.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removido' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
