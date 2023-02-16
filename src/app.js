const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const {
  authorizationMiddleware,
  validateRefreshToken,
} = require("./middleware/authMiddleware");

const registerRouter = require("./routes/register.route");
const loginRouter = require("./routes/login.route");
const orderRouter = require("./routes/order.route");
const { ALLOWED_ORIGINS } = require("./utils/config");

const app = express();

//middlewares

app.use(cors(ALLOWED_ORIGINS));
app.use(express.json());
app.use(cookieParser());

//routes

app.get("/", (req, res) => {
  return res.json({
    status: "ok",
    message: "Server running",
  });
});

app.use(registerRouter);
app.use(loginRouter);
app.use(orderRouter);

app.get("/refresh_token", validateRefreshToken);

app.get("/startsession", authorizationMiddleware, (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
  });
});

app.get("/logout", authorizationMiddleware, (req, res) => {
  return res.clearCookie("access_token").clearCookie("refresh_token").json({
    message: "Logout successfull",
  });
});

// app.post("/place_order", authorizationMiddleware, async (req, res) => {
//   const data = req.body;
//   const { email } = req.user;
//   const isPlaced = await placeOrder({ ...data, email });
//   if (isPlaced) {
//     return res.status(201).json({
//       isPlaced,
//     });
//   }
//   return res.status(400).json({
//     status: "failed",
//     message: "placing order error",
//   });
// });

module.exports = app;
