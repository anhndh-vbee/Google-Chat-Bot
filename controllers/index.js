const User = require("../models/User");
const userService = require("../services/userService");
const { openDialog } = require("../utils/dialog");

const homeController = async (req, res) => {
  try {
    const userData = req.body.user;
    if (req.body.type === "MESSAGE") {
      const msg = req.body.message;
      if (msg.slashCommand) {
        switch (Number(msg.slashCommand.commandId)) {
          case 1:
            const result1 = await userService.addUser(userData);
            res.json(result1);
            break;
          case 2:
            const result2 = await userService.showInfo(userData.email);
            res.json(result2);
            break;
          case 3:
            const result3 = openDialog();
            res.json(result3);
            break;
        }
      }
    } else {
      return res.json({ text: "Command not found" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { homeController, getAllUsers };
