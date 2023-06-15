const { showCard } = require("../services/listUserService");
const { postNewMsg } = require("../services/messageService");
const userService = require("../services/userService");
const { openDialog } = require("../utils/dialog");

const homeController = async (req, res) => {
  try {
    const event = req.body;
    const userData = req.body.user;
    if (req.body.type === "MESSAGE") {
      const msg = req.body.message;
      if (msg.slashCommand) {
        switch (Number(msg.slashCommand.commandId)) {
          case 1:
            console.log(userData);
            const result1 = await userService.addUser(userData);
            await postNewMsg(userData);
            res.json(result1);
            break;
          case 2:
            const result2 = await userService.showInfo(userData.email);
            res.json(result2);
            break;
          case 3:
            // console.log(req.body);
            openDialog(event);
            break;
          case 4:
            await showCard(userData.email);
            res.sendStatus(200);
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

module.exports = { homeController };
