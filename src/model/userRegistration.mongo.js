const mongoose = require("mongoose");

const userRegistration = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: String,
    phoneNumber: String,
    email: String,
    password: String,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("user", userRegistration);
