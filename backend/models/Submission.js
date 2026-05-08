const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  quest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quest",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "pending",
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
