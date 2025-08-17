const Orcamento = require('../models/Orcamento');

exports.criarOrcamento = async (req, res) => {
  try {
    const { clienteId, valor } = req.body;
    if (!clienteId || valor == null) {
      return res.status(400).json({ erro: 'Cliente e valor obrigatórios.' });
    }
    const novoOrcamento = new Orcamento({ clienteId, valor });
    await novoOrcamento.save();
    res.status(201).json(novoOrcamento);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar orçamento.', detalhes: err.message });
  }
};

exports.listarOrcamentos = async (req, res) => {
  try {
    const orcamentos = await Orcamento.find();
    res.json(orcamentos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar orçamentos.' });
  }
};

exports.buscarOrcamentoPorId = async (req, res) => {
  try {
    const orcamento = await Orcamento.findById(req.params.id);
    if (!orcamento) return res.status(404).json({ erro: 'Orçamento não encontrado.' });
    res.json(orcamento);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido ou erro na busca.' });
  }
};

exports.atualizarOrcamento = async (req, res) => {
  try {
    const orcamentoAtualizado = await Orcamento.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!orcamentoAtualizado) return res.status(404).json({ erro: 'Orçamento não encontrado.' });
    res.json(orcamentoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar orçamento.', detalhes: err.message });
  }
};

exports.deletarOrcamento = async (req, res) => {
  try {
    const orcamentoRemovido = await Orcamento.findByIdAndDelete(req.params.id);
    if (!orcamentoRemovido) return res.status(404).json({ erro: 'Orçamento não encontrado.' });
    res.json({ mensagem: 'Orçamento removido com sucesso.' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao remover orçamento.' });
  }
};