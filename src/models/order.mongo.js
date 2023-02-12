const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderDetail: [Object],
    email: {
      type: String,
      required: true,
    },
  },
  {
    collection: "orders",
  }
);

module.exports = mongoose.model("order", orderSchema);
