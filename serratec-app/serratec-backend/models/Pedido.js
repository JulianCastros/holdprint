const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  itens: [{
    produtoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
    quantidade: { type: Number, required: true }
  }],
  status: { type: String, enum: ['pendente', 'processando', 'concluído'], default: 'pendente' },
  valorTotal: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', PedidoSchema);