const express = require('express');
const router = express.Router();

let pedidos = [];

// Criar pedido
router.post('/', (req, res) => {
  const { clienteId, produtos, total } = req.body;
  if (!clienteId || !produtos || !total) return res.status(400).json({ erro: 'Dados incompletos.' });

  const novoPedido = { id: Date.now(), clienteId, produtos, total, status: 'pendente' };
  pedidos.push(novoPedido);
  res.status(201).json(novoPedido);
});

// Listar pedidos
router.get('/', (req, res) => {
  res.json(pedidos);
});

// Atualizar status
router.put('/:id/status', (req, res) => {
  const pedido = pedidos.find(p => p.id == req.params.id);
  if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado.' });

  const { status } = req.body;
  if (!status) return res.status(400).json({ erro: 'Status obrigatório.' });

  pedido.status = status;
  res.json(pedido);
});

// Deletar pedido
router.delete('/:id', (req, res) => {
  const index = pedidos.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ erro: 'Pedido não encontrado.' });

  pedidos.splice(index, 1);
  res.json({ mensagem: 'Pedido removido com sucesso.' });
});

module.exports = router;
