const orders = require("./order.mongo");

async function placeOrder(data) {
  return await orders.create(data);
}
async function findOrders(email) {
  return await orders.find(email, {
    __v: 0,
    email: 0,
  });
}
module.exports = {
  placeOrder,
  findOrders,
};
