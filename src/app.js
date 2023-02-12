const express = require("express");
const cors = require("cors");
const { registerUser, loginUser } = require("./model/userRegistration.model");
const { placeOrder, getOrders } = require("./model/order.model");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    status: "ok",
    message: "Server running",
  });
});

app.post("/register", async (req, res) => {
  const userData = req.body;
  const userAdded = await registerUser(userData);
  return res.status(201).json({ userAdded });
});

app.post("/login", async (req, res) => {
  const userData = req.body;
  const isUser = await loginUser(userData);

  if (isUser) {
    return res.status(200).json(isUser);
  }
  return res.status(404).json({
    status: "failed",
    message: "user not found",
  });
});

app.get("/order", async (req, res) => {
  const orders = await getOrders();
  if (orders) {
    return res.status(200).json({
      orders,
    });
  }
  return res.status(400).json({
    status: "failed",
    message: "order not found",
  });
});

app.post("/place_order", async (req, res) => {
  const data = req.body;
  const isPlaced = await placeOrder(data);
  if (isPlaced) {
    return res.status(201).json({
      isPlaced,
    });
  }
  return res.status(400).json({
    status: "failed",
    message: "placing order error",
  });
});

module.exports = app;
