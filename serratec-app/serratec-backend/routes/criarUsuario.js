// routes/criarUsuario.js
const express = require('express');
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');

const router = express.Router();

// POST /api/users/  – cria um novo usuário
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    // verifica se já existe
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // gera hash e salva
    const hash = await bcrypt.hash(senha, 10);
    const user = new User({ nome, email, senha: hash, role });
    await user.save();

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: err.message });
  }
});

// exporta o Router diretamente
module.exports = router;
