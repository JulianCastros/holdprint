const mongoose = require('mongoose');

const financeiroSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['entrada', 'saida'], required: true },
  valor: { type: Number, required: true },
  descricao: { type: String },
  data: { type: Date, default: Date.now },
  pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }
});

module.exports = mongoose.model('Financeiro', financeiroSchema);
