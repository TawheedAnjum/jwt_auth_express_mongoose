const mongoose = require("mongoose");
const { Schema } = mongoose;

const { isEmail, isAlpha } = require("validator");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [isEmail, "Please enter valid Email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
