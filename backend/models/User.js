const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Passqord is required"],
  },
  role: {
    type: String,
    default: "user",
  },
  points: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
