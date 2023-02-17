const { Router } = require('express');

const OrderController = require('../controllers/order.controller');
const { authorizationMiddleware } = require('../middleware/authMiddleware');

const orderRouter = Router();

orderRouter.get('/order', authorizationMiddleware, OrderController.getOrder);
orderRouter.post(
  '/place_order',
  authorizationMiddleware,
  OrderController.placeOrder
);

module.exports = orderRouter;
