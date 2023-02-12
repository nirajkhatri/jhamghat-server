const orders = require("./order.mongo");

async function placeOrder(data) {
  return await orders.create(data);
}
async function getOrders() {
  return await orders.find({});
}
module.exports = {
  placeOrder,
  getOrders,
};
