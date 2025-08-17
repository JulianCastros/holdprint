const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  orcamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Orcamento' },
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  status: { type: String, enum: ['pendente', 'em produção', 'concluído'], default: 'pendente' },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
