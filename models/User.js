const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  avatar: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
