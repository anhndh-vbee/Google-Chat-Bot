const { postMessageToThread } = require("./messageService");
const { google } = require("googleapis");
const { JWT } = require("google-auth-library");
const SCOPES = ["https://www.googleapis.com/auth/chat.bot"];
const credentials = require("../service-account.json");
const client = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: SCOPES,
});

const chat = google.chat({ version: "v1", auth: client });

const getListUsers = async () => {
  const data = await chat.spaces.members.list({
    parent: "spaces/AAAAIPQrz00",
  });
  const result = data.data.memberships.map((member) => {
    return member.member.displayName;
  });
  return result;
};

const showCard = async (emailUser) => {
  const result = await getListUsers();
  await postMessageToThread(result, emailUser);
};

module.exports = { getListUsers, showCard };
