const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: { type: String, default: null },
  user: { type: String, default: null },
});

module.exports = mongoose.model("topic", topicSchema);