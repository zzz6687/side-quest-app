const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  points: {
    type: Number,
    required: [true, "Points are required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
});

module.exports = mongoose.model("Quest", questSchema);
