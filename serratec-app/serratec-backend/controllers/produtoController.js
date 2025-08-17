const Produto = require('../models/Produto');

exports.criarProduto = async (req, res) => {
  try {
    const { nome, preco, estoque } = req.body;
    if (!nome || preco == null || estoque == null) {
      return res.status(400).json({ erro: 'Nome, preço e estoque obrigatórios.' });
    }
    const novoProduto = new Produto({ nome, preco, estoque });
    await novoProduto.save();
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar produto.', detalhes: err.message });
  }
};

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar produtos.' });
  }
};

exports.buscarProdutoPorId = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado.' });
    res.json(produto);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido ou erro na busca.' });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!produtoAtualizado) return res.status(404).json({ erro: 'Produto não encontrado.' });
    res.json(produtoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar produto.', detalhes: err.message });
  }
};

exports.deletarProduto = async (req, res) => {
  try {
    const produtoRemovido = await Produto.findByIdAndDelete(req.params.id);
    if (!produtoRemovido) return res.status(404).json({ erro: 'Produto não encontrado.' });
    res.json({ mensagem: 'Produto removido com sucesso.' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao remover produto.' });
  }
};