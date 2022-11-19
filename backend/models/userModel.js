const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
