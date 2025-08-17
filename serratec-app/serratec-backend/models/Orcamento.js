const mongoose = require('mongoose');

const OrcamentoSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  valor: { type: Number, required: true },
  descricao: { type: String },
  aprovado: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Orcamento', OrcamentoSchema);