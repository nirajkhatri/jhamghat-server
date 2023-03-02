const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
    },
    orderDetail: [Object],
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'unpaid',
    },
  },
  {
    collection: 'orders',
  }
);

module.exports = mongoose.model('order', orderSchema);
