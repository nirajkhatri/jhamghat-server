const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

const users = require("./models/user.mongo");

const { registerUser, getUser } = require("./models/user.model");
const { placeOrder, getOrders } = require("./models/order.model");
const {
  authenticateMiddleware,
  authorizationMiddleware,
  validateRefreshToken,
} = require("./middleware/authMiddleware");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({
    status: "ok",
    message: "Server running",
  });
});

app.post("/register", async (req, res) => {
  const userData = req.body;
  const { password, email } = req.body;
  const userExist = await users.findOne({ email });
  console.log(userExist);
  if (userExist)
    return res.status(409).json({
      status: "failed",
      message: "user already exist",
    });
  const hashedPassword = await bcrypt.hash(password, 10);

  const userAdded = await registerUser({
    ...userData,
    password: hashedPassword,
  });
  return res.status(201).json({ userAdded });
});

app.post("/login", authenticateMiddleware);

app.get("/refresh_token", validateRefreshToken);

app.get("/startsession", authorizationMiddleware, (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
  });
});

app.get("/logout", authorizationMiddleware, (req, res) => {
  return res.clearCookie("token").status(200).json({
    message: "Logout successfull",
  });
});

app.get("/order", authorizationMiddleware, async (req, res) => {
  const { email } = req.user;
  const orders = await getOrders(email);

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

app.post("/place_order", authorizationMiddleware, async (req, res) => {
  const data = req.body;
  const { email } = req.user;
  const isPlaced = await placeOrder({ ...data, email });
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
