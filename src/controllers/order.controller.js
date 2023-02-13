const OrderModel = require("../models/order.model");

async function getOrder(req, res) {
  const { email } = req.user;
  const orders = await OrderModel.findOrders({ email });

  if (orders)
    return res.json({
      orders,
    });
}

module.exports = { getOrder };
