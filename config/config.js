require("dotenv").config();

const config = {
  MONGODB_URL: process.env.MONGODB_URL,
  SPACE_ID: process.env.SPACE_ID,
};

module.exports = config;
