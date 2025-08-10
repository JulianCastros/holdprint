// holdprint-backend/routes/orders.js
const express = require('express');
const router  = express.Router();
const OrderController = require('../controllers/OrderController');

router
  .route('/')
  .get(  OrderController.list   )   // chama apenas a função list
  .post( OrderController.create );

router
  .route('/:id')
  .get(    OrderController.show   )
  .put(    OrderController.update )
  .delete( OrderController.remove );

module.exports = router;
