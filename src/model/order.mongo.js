const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderDetail: [Object],
  },
  {
    collection: "orders",
  }
);

module.exports = mongoose.model("order", orderSchema);
