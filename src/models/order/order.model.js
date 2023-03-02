const orders = require('./order.mongo');

async function createNewOrder(data) {
  const totalOrders = await orders.countDocuments({});
  const orderData = {
    ...data,
    orderId: totalOrders + 1,
  };
  return (await orders.create(orderData)) ?? false;
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
