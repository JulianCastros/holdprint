const Financeiro = require('../models/Financeiro');

exports.criarTransacao = async (req, res) => {
  try {
    const { tipo, valor, descricao } = req.body;
    if (!tipo || valor == null) {
      return res.status(400).json({ erro: 'Tipo e valor obrigatórios.' });
    }
    const transacao = new Financeiro({ tipo, valor, descricao });
    await transacao.save();
    res.status(201).json(transacao);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar transação.', detalhes: err.message });
  }
};

exports.listarTransacoes = async (req, res) => {
  try {
    const transacoes = await Financeiro.find();
    res.json(transacoes);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar transações.' });
  }
};

exports.buscarTransacaoPorId = async (req, res) => {
  try {
    const transacao = await Financeiro.findById(req.params.id);
    if (!transacao) return res.status(404).json({ erro: 'Transação não encontrada.' });
    res.json(transacao);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido ou erro na busca.' });
  }
};

exports.atualizarTransacao = async (req, res) => {
  try {
    const transacaoAtualizada = await Financeiro.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!transacaoAtualizada) return res.status(404).json({ erro: 'Transação não encontrada.' });
    res.json(transacaoAtualizada);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar transação.', detalhes: err.message });
  }
};

exports.deletarTransacao = async (req, res) => {
  try {
    const transacaoRemovida = await Financeiro.findByIdAndDelete(req.params.id);
    if (!transacaoRemovida) return res.status(404).json({ erro: 'Transação não encontrada.' });
    res.json({ mensagem: 'Transação removida com sucesso.' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao remover transação.' });
  }
};