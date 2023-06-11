const express = require("express");
const { google } = require("googleapis");
const { client_email, private_key } = require("./service-account.json"); // Replace with your actual service account credentials

const app = express();
const port = 3000;

// Set up the Google Chat API client
const chat = google.chat("v1");

// Configure authentication using service account credentials
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email,
    private_key,
  },
  scopes: ["https://www.googleapis.com/auth/chat.bot"],
});

// Middleware to authenticate requests
const authenticateRequest = async (req, res, next) => {
  try {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    req.headers.authorization = `Bearer ${accessToken}`;
    next();
  } catch (err) {
    res.status(401).send("Authentication failed.");
  }
};

// Slash command endpoint

const test = async (req, res) => {
  try {
    // Get the space name and thread ID from the request
    const spaceName = "AAAAIPQrz00";
    const threadId = "nc_SHGXnIcI";
    // Get the members of the space
    const members = await chat.spaces.members.list({
      parent: `spaces/${spaceName}`,
    });

    // Create a response message with the member names
    const memberNames = members.memberships
      .map((member) => member.displayName)
      .join("\n");
    const responseMessage = {
      text: `Members in this space:\n${memberNames}`,
    };

    // Send the response message
    await chat.spaces.messages.create({
      parent: `spaces/${spaceName}`,
      thread_key: threadId,
      requestBody: responseMessage,
    });

    res.sendStatus(200);
  } catch (err) {
    console.error("Error handling slash command:", err);
    res.sendStatus(500);
  }
};

app.post("/", authenticateRequest, test);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
