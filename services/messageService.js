const { google } = require("googleapis");
const { JWT } = require("google-auth-library");
const SCOPES = ["https://www.googleapis.com/auth/chat.bot"];
const credentials = require("../service-account.json");
const User = require("../models/User");
const client = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

const chat = google.chat({ version: "v1", auth: client });

const postMessageToThread = async (data, emailUser) => {
  let showData = "";
  data.forEach((item) => {
    showData += item + ", ";
  });
  const user = await User.findOne({
    email: emailUser,
  });
  chat.spaces.messages.create(
    {
      parent: "spaces/AAAAIPQrz00",
      messageReplyOption: "REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD",
      requestBody: {
        text: `${showData}`,
        thread: {
          threadKey: `${user.threadKey}`,
        },
      },
    },
    (err, res) => {
      if (err) {
        console.error("Error creating Chat message:", err);
        return;
      }
    }
  );
};

const postNewMsg = async (data) => {
  chat.spaces.messages.create(
    {
      parent: "spaces/AAAAIPQrz00",
      requestBody: {
        text: `Message for email ${data.email}`,
      },
    },
    async (err, res) => {
      if (err) {
        console.error("Error creating Chat message:", err);
        return;
      }
      const user = await User.findOne({
        email: data.email,
      });
      user.threadKey = res.data.thread.name;
      await user.save();
    }
  );
};

module.exports = { postMessageToThread, postNewMsg };
