const Cliente = require('../models/Cliente');
const Orcamento = require('../models/Orcamento');
const Pedido = require('../models/Pedido');
const Financeiro = require('../models/Financeiro');
const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');
const PrintJob = require('../models/PrintJob');
const Relatorio = require('../models/Relatorio');

exports.obterDashboard = async (req, res) => {
  try {
    const [
      totalClientes,
      totalOrcamentos,
      totalPedidos,
      totalItensEstoque,
      totalProdutos,
      totalImpressos,
      totalRelatorios,
      lancamentos
    ] = await Promise.all([
      Cliente.countDocuments(),
      Orcamento.countDocuments(),
      Pedido.countDocuments(),
      Estoque.countDocuments(),
      Produto.countDocuments(),
      PrintJob.countDocuments(),
      Relatorio.countDocuments(),
      Financeiro.find()
    ]);

    const totalEntrada = lancamentos
      .filter(l => l.tipo === 'entrada')
      .reduce((sum, l) => sum + l.valor, 0);

    const totalSaida = lancamentos
      .filter(l => l.tipo === 'saida')
      .reduce((sum, l) => sum + l.valor, 0);

    res.json({
      totalClientes,
      totalOrcamentos,
      totalPedidos,
      totalItensEstoque,
      totalProdutos,
      totalImpressos,
      totalRelatorios,
      totalEntrada,
      totalSaida
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter dashboard.' });
  }
};