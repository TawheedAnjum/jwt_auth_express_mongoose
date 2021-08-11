const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userController = require("./controller/userController");

// middleware
app.use(express.static("public"));

app.set("view engine", "ejs");

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// controller
app.use("/", userController);

// DB connection
const DBurl = "mongodb+srv://practice:practice@cluster0.yz48e.mongodb.net/JWTUserAuth?retryWrites=true&w=majority";
mongoose
  .connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    console.log(`Database connected`);
    const port = 3000;
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err.msg);
  });
