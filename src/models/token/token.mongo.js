const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: [String],
});

const tokenSchema = mongoose.model("token", refreshTokenSchema);

module.exports = tokenSchema;
