const mongoose = require('mongoose');

const userRegistrationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'users',
  }
);

const userSchema = mongoose.model('user', userRegistrationSchema);

module.exports = userSchema;
