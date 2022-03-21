const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, default: null },
  description: { type: String, default: null },
  topics: { type: String, default: null },
  date: { type: Date, default: Date.now() },
  user: { type: String, default: null },
});

module.exports = mongoose.model("event", eventSchema);