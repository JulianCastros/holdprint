const mongoose = require('mongoose');

const EstoqueSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true },
  produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' }
}, { timestamps: true });

module.exports = mongoose.model('Estoque', EstoqueSchema);