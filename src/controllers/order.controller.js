const OrderModel = require('../models/order/order.model');

async function getOrder(req, res) {
  const { email } = req.user;
  const orders = await OrderModel.findOrders({ email });

  if (orders)
    return res.json({
      orders,
    });
}

async function placeOrder(req, res) {
  const data = req.body;
  const { email } = req.user;

  const isPlaced = await OrderModel.createNewOrder({ ...data, email });

  if (isPlaced) {
    return res.status(201).end();
  }
  return res.status(400).json({
    status: 'failed',
    message: 'placing order error',
  });
}

module.exports = { getOrder, placeOrder };
