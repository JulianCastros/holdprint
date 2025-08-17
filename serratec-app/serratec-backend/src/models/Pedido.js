const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  orcamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Orcamento', required: true },
  dataEntrega: { type: Date },
  status: { type: String, enum: ['aberto', 'em produção', 'entregue'], default: 'aberto' }
}, { timestamps: true });

<button
  onClick={() => navigate(`/pedidos/editar/${pedido._id}`)}
  className="bg-yellow-500 px-3 py-1 rounded text-white"
>
  Editar
</Link>

module.exports = mongoose.model('Pedido', pedidoSchema);
