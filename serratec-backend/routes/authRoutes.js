
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Rota de registro
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // lógica de criação de usuário...
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Usuário criado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota de login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
