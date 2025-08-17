// holdprint-backend/controllers/authController.js
const User   = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    // Verifica se já existe usuário com este email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Gera hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria e salva o novo usuário
    const newUser = new User({ nome, email, senha: hashedPassword, role });
    await newUser.save();

    // Gera token JWT
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      token,
      user: { nome: newUser.nome, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Busca usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Compara a senha informada com o hash
    const match = await bcrypt.compare(senha, user.senha);
    if (!match) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gera token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: { nome: user.nome, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
};
