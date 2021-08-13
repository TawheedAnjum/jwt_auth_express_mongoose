const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const userModel = require("../models/userSchema");

router.get("/login", function (req, res) {
  res.render("login");
});

// register
router.get("/register", function (req, res) {
  const errorMsg = { email: "", password: "", name: "" };
  const inputVal = { email: "", password: "", name: "" };
  res.render("registration", { errorMsg: errorMsg, inputVal: inputVal });
});

router.post("/register", async (req, res) => {
  const userData = new userModel({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });

  userData
    .save()
    .then((result) => {
      // res.status(200).json(result);
      const token = createToken(result._id);
      res.cookie("token", token);
      res.send(result);
    })
    .catch((error) => {
      // console.log(errorHandler(error));
      // res.status(400).json(error.message);
      const errorMsg = errorHandler(error);
      const inputVal = { email: req.body.email, password: req.body.password, name: req.body.name };
      res.render("registration", { errorMsg: errorMsg, inputVal: inputVal });
      console.log(errorMsg);
    });
});

const createToken = (id) => {
  return jwt.sign({ id }, "jwt token secret code");
};

const errorHandler = (err) => {
  let errorMsg = { email: "", password: "", name: "" };
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errorMsg[properties.path] = properties.message;
    });
  }

  return errorMsg;
};

module.exports = router;
