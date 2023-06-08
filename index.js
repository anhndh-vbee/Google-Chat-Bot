// function webhook() {
//   const fetch = require("node-fetch");
//   const webhookURL =
//     "https://chat.googleapis.com/v1/spaces/AAAAtzU3XIs/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=8IKayDI9_SaEgE4BCDdCIsCns_4VbaNf_oRJdf5n7z4";

//   const data = JSON.stringify({
//     text: "Hello from a Node script!",
//   });
//   let resp;
//   fetch(webhookURL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json; charset=UTF-8",
//     },
//     body: data,
//   }).then((response) => {
//     resp = response;
//     console.log(response);
//   });
//   return resp;
// }

// webhook();

const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const gkeys = require("./key.json");
const unirest = require("unirest");
const timer = require("timers");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.post("/", function (req, res) {
  console.log("someone pinged @");
  console.log(req.body);
  if (req.body.type === "MESSAGE") {
    return res.json({
      text: "sleeping...",
    });
  }
});

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

function postMessage(count) {
  return new Promise(function (resolve, reject) {
    getJWT()
      .then(function (token) {
        unirest
          .post(
            "https://chat.googleapis.com/v1/spaces/" +
              "AAAAtzU3XIs" +
              "/messages"
          )
          .headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          })
          .send(
            JSON.stringify({
              text: "Hello! This is message number " + count,
            })
          )
          .end(function (res) {
            resolve();
          });
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

app.listen(3000, function () {
  console.log("App listening on port 8100.");

  let count = 0;
  timer.setInterval(function () {
    postMessage((count += 1));
  }, 6000);
});
