const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: String,
    password: String,
    name: String,
  },
  {
    timestamps: true,
    collection: "user",
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
