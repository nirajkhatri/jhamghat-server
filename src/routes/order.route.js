const { Router } = require('express');

const { OrderController } = require('../controllers');

const orderRouter = Router();

orderRouter.get('/', OrderController.getOrder);
orderRouter.post('/', OrderController.placeOrder);

module.exports = orderRouter;
