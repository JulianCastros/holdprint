const mongoose = require('mongoose');

const FinanceiroSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['entrada', 'saida'], required: true },
  valor: { type: Number, required: true },
  descricao: { type: String },
  data: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Financeiro', FinanceiroSchema);