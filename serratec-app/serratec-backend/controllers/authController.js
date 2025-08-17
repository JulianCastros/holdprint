const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, senha } = req.body;
    if (!username || !email || !senha) {
      return res.status(400).json({ error: 'Username, email e senha são obrigatórios.' });
    }
    const exists = await User.exists({ $or: [ { username }, { email } ] });
    if (exists) {
      return res.status(409).json({ error: 'Username ou email já cadastrado.' });
    }
    const hashedSenha = await bcrypt.hash(senha, 10);
    const user = await User.create({ username, email, senha: hashedSenha });
    return res.status(201).json({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(409).json({ error: `${field} já existe.` });
    }
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(401).json({ error: 'Senha incorreta.' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login realizado com sucesso',
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};