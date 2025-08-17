const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String },
  telefone: { type: String },
  endereco: { type: String }
});

const handleDelete = async (id) => {
  if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
    try {
      await api.delete(`/clientes/${id}`);
      setClientes(clientes.filter(cliente => cliente._id !== id));
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
    }
  }
};

module.exports = mongoose.model('Cliente', clienteSchema);
