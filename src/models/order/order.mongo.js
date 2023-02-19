const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
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
