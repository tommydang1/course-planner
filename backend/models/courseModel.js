const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    requred: true,
    min: 0,
  },
});

module.exports = mongoose.model("Course", courseSchema);
