const Pedido = require('../models/Pedido');

exports.criarPedido = async (req, res) => {
  try {
    const { clienteId, itens } = req.body;
    if (!clienteId || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ erro: 'Cliente e itens obrigatórios.' });
    }
    const novoPedido = new Pedido({ clienteId, itens });
    await novoPedido.save();
    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar pedido.', detalhes: err.message });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar pedidos.' });
  }
};

exports.buscarPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado.' });
    res.json(pedido);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido ou erro na busca.' });
  }
};

exports.atualizarPedido = async (req, res) => {
  try {
    const pedidoAtualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pedidoAtualizado) return res.status(404).json({ erro: 'Pedido não encontrado.' });
    res.json(pedidoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar pedido.', detalhes: err.message });
  }
};

exports.deletarPedido = async (req, res) => {
  try {
    const pedidoRemovido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedidoRemovido) return res.status(404).json({ erro: 'Pedido não encontrado.' });
    res.json({ mensagem: 'Pedido removido com sucesso.' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao remover pedido.' });
  }
};