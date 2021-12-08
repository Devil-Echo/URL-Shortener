const mongoose = require("mongoose");

// create schema for each resource, here only one resource is required
const urlSchema = new mongoose.Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Url", urlSchema);
