const mongoose = require("mongoose");
const logger = require("./logger");

async function connectDB() {
  const { MONGODB_URI } = process.env;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  await mongoose.connect(MONGODB_URI);
  logger.info("Connected to MongoDB");
}

module.exports = connectDB;
