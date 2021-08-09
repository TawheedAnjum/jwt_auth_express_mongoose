const express = require("express");
const app = express();

const userController = require("./controller/userController");

app.set("view engine", "ejs");

// controller
app.use("/", userController);

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
