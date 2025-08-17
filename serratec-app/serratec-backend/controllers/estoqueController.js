const Estoque = require('../models/Estoque');

exports.criarItemEstoque = async (req, res) => {
  try {
    const { nome, quantidade } = req.body;
    if (!nome || quantidade == null) {
      return res.status(400).json({ erro: 'Nome e quantidade obrigatórios.' });
    }
    const novoItem = new Estoque({ nome, quantidade });
    await novoItem.save();
    res.status(201).json(novoItem);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar item.', detalhes: err.message });
  }
};

exports.listarItensEstoque = async (req, res) => {
  try {
    const itens = await Estoque.find();
    res.json(itens);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar itens do estoque.' });
  }
};

exports.buscarItemPorId = async (req, res) => {
  try {
    const item = await Estoque.findById(req.params.id);
    if (!item) return res.status(404).json({ erro: 'Item não encontrado.' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido ou erro na busca.' });
  }
};

exports.atualizarItemEstoque = async (req, res) => {
  try {
    const itemAtualizado = await Estoque.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!itemAtualizado) return res.status(404).json({ erro: 'Item não encontrado.' });
    res.json(itemAtualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar item.', detalhes: err.message });
  }
};

exports.deletarItemEstoque = async (req, res) => {
  try {
    const itemRemovido = await Estoque.findByIdAndDelete(req.params.id);
    if (!itemRemovido) return res.status(404).json({ erro: 'Item não encontrado.' });
    res.json({ mensagem: 'Item removido com sucesso.' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao remover item.' });
  }
};