require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const senhaCriptografada = await bcrypt.hash('123456', 10);

    const novoUsuario = new User({
      nome: 'Administrador',
      email: 'admin@holdprint.com',
      senha: senhaCriptografada,
      role: 'admin'
    });

    await novoUsuario.save();
    console.log('✅ Usuário criado com sucesso!');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err);
  });
