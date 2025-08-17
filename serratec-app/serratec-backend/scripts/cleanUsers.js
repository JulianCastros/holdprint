require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function cleanInvalidUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const result = await User.deleteMany({ password: { $exists: false } });
    console.log(`Usuários removidos: ${result.deletedCount}`);
    mongoose.disconnect();
  } catch (err) {
    console.error('Erro ao limpar usuários:', err.message);
  }
}

cleanInvalidUsers();
