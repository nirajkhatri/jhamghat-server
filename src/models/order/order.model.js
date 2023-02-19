const orders = require('./order.mongo');

async function createNewOrder(data) {
  return (await orders.create(data)) ?? false;
}
async function findOrders(email) {
  return await orders.find(email, {
    __v: 0,
    email: 0,
  });
}
module.exports = {
  findOrders,
  createNewOrder,
};
