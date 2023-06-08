const gkeys = require("../service-account.json");
const unirest = require("unirest");
const axios = require("axios");
const { google } = require("googleapis");
function getJWT() {
  return new Promise(function (resolve, reject) {
    let jwtClient = new google.auth.JWT(
      gkeys.client_email,
      null,
      gkeys.private_key,
      ["https://www.googleapis.com/auth/chat.bot"]
    );

    jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log("Error create JWT hangoutchat");
        reject(err);
      } else {
        resolve(tokens.access_token);
      }
    });
  });
}

const postMessage = async () => {
  return new Promise(function (resolve, reject) {
    getJWT()
      .then(function (token) {
        unirest
          .post(
            " https://chat.googleapis.com/v1/spaces/AAAAIPQrz00/messages?threadKey=5JwWMfJyyXA"
          )
          .headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          })
          .send(
            JSON.stringify({
              text: "Hello! This is a test message",
            })
          )
          .end(function (response) {
            if (response && response.body && response.body.thread) {
              const threadId = response.body.thread.name;
              console.log("Thread ID:", threadId);
              // Do further processing with the thread ID
              resolve();
            } else {
              console.log("No thread ID found for the message");
              resolve();
            }
          });
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

postMessage();
