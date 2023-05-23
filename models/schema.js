const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    user_type: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
const Products = mongoose.model("products", {});

module.exports = { User, Products };
