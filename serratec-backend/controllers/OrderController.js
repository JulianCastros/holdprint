// holdprint-backend/controllers/OrderController.js
const Order = require('../models/Order');

exports.list = async (req, res) => {
  try {
    // lista todos os pedidos (pode paginar ou filtrar conforme necessidade)
    const orders = await Order.find().populate('user', 'nome email');
    res.json(orders);
  } catch (err) {
    console.error('OrderController.list error:', err);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('user', 'nome email');
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (err) {
    console.error('OrderController.show error:', err);
    res.status(400).json({ error: 'ID de pedido inválido' });
  }
};

exports.create = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const userId = req.user.id; // preenchido pelo middleware auth

    const newOrder = new Order({
      product,
      quantity,
      user: userId
    });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    console.error('OrderController.create error:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Pedido não encontrado para atualização' });
    }
    res.json(updatedOrder);
  } catch (err) {
    console.error('OrderController.update error:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pedido não encontrado para remoção' });
    }
    res.json({ message: 'Pedido removido com sucesso' });
  } catch (err) {
    console.error('OrderController.remove error:', err);
    res.status(400).json({ error: 'ID de pedido inválido' });
  }
};
