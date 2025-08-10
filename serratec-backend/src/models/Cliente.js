const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String },
  email: { type: String },
  endereco: { type: String },
  observacoes: { type: String }
}, { timestamps: true });

<Link
  to={`/clientes/editar/${cliente._id}`}
  className="bg-yellow-400 px-3 py-1 rounded text-white"
>
  Editar
</Link>

module.exports = mongoose.model('Cliente', clienteSchema);
