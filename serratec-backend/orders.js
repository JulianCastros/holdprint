
const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/auth');
const OrderController = require('../controllers/OrderController');

// Rotas públicas
router.get('/', OrderController.listPublicOrders);

// Rotas que exigem autenticação
router.post('/', verifyJWT, OrderController.createOrder);
router.get('/me', verifyJWT, OrderController.listMyOrders);
router.put('/:id', verifyJWT, OrderController.updateOrder);

module.exports = router;
