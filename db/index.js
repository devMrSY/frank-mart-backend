const mongoose = require("mongoose");

const db = async () => {
  const isLocalDb = false;
  const url = isLocalDb
    ? "mongodb://127.0.0.1:27017/frankMart"
    : process.env.MONGODB_URL;
  try {
    await mongoose.connect(url, { useNewUrlParser: true });
    console.log("DB is connected!!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = db;
