require("dotenv").config();

const http = require("http");
const mongoose = require("mongoose");

const app = require("./src/app");
const { MONGO_URL } = require("./src/utils/config");

const server = http.createServer(app);

const PORT = process.env.PORT;

mongoose.connection.once("open", () => {
  console.log("Database connection success...");
});

mongoose.connection.on("error", (error) => {
  console.log("Database connection failed...");
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  server.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
}
startServer();
