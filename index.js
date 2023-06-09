const express = require("express");
const connectDB = require("./config/connectDB");
const { homeController } = require("./controllers");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.post("/", homeController);

app.listen(3000, function () {
  console.log("App listening on port 3000.");
});
