const mongoose = require('mongoose');

const OrcamentoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  status: { type: String, enum: ['pendente', 'aprovado', 'recusado'], default: 'pendente' },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orcamento', OrcamentoSchema);
