const Cliente = require('../models/Cliente');

// Criar cliente
exports.criarCliente = async (req, res) => {
  try {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Nome e email obrigatórios' });
    }
    const novoCliente = new Cliente({ nome, email });
    const clienteSalvo = await novoCliente.save();
    res.status(201).json(clienteSalvo);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar cliente', detalhes: err.message });
  }
};

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar clientes' });
  }
};

// Buscar cliente por ID
exports.buscarClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido ou erro na busca' });
  }
};

// Atualizar cliente
exports.atualizarCliente = async (req, res) => {
  try {
    const clienteAtualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!clienteAtualizado) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json(clienteAtualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar cliente', detalhes: err.message });
  }
};

// Deletar cliente
exports.deletarCliente = async (req, res) => {
  try {
    const clienteRemovido = await Cliente.findByIdAndDelete(req.params.id);
    if (!clienteRemovido) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente removido com sucesso' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao remover cliente' });
  }
};