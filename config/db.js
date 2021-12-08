const mongoose = require("mongoose");
const config = require("config");

// getting global variable value defined in default.json under config directory
const db = config.get("mongoURI");

// mongoose returns a promise, so we need ajax
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error(err.message);

    // 1 as its a failure
    process.exit(1);
  }
};

module.exports = connectDB;
