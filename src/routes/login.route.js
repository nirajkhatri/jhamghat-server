const { Router } = require("express");
const LoginController = require("../controllers/login.controller");

const loginRouter = Router();

loginRouter.post("/login", LoginController.authenticateUser);

module.exports = loginRouter;
