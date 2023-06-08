const userService = require("../services/userService");

const controller = async (req, res) => {
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
            console.log(req.body);
            const result2 = await userService.showInfo(userData.email);
            console.log(result2);
            res.json(result2);
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

module.exports = { controller };
