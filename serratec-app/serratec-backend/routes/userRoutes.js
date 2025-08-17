const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Criar usuário
router.post('/', async (req, res) => {
  try {
    const { username, senha } = req.body;
    if (!username || !senha) {
      return res.status(400).json({ erro: 'Username e senha obrigatórios.' });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(409).json({ erro: 'Username já em uso.' });
    }

    const user = new User({ username, senha });
    await user.save();
    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Listar todos (pode adicionar paginação depois)
router.get('/', async (req, res) => {
  const users = await User.find().select('-senha');
  res.json(users);
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-senha');
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json(user);
  } catch {
    res.status(400).json({ erro: 'ID inválido.' });
  }
});

// Atualizar
router.put('/:id', async (req, res) => {
  try {
    const updates = (({ username, senha }) => ({ username, senha }))(req.body);
    const opts = { new: true, runValidators: true };
    const user = await User.findByIdAndUpdate(req.params.id, updates, opts);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json({ id: user._id, username: user.username });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    res.json({ mensagem: 'Usuário removido com sucesso.' });
  } catch {
    res.status(400).json({ erro: 'ID inválido.' });
  }
});

module.exports = router;
