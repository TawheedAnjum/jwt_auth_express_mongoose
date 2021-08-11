const express = require("express");
const router = express.Router();

const userModel = require("../models/userSchema");

router.get("/login", function (req, res) {
  res.render("login");
});

// register
router.get("/register", function (req, res) {
  res.render("registration");
});

router.post("/register", function (req, res) {
  const userData = new userModel({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });

  userData
    .save()
    .then((result) => {
      // res.status(200).json(result);
      res.send(result);
    })
    .catch((err) => {
      res.status(400).json({
        msg: err.message,
      });
    });
});

module.exports = router;
