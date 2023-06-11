const config = require("../config/config");
const unirest = require("unirest");
const { getJWT } = require("../middleware");

function postMessage(data) {
  return new Promise(function (resolve, reject) {
    getJWT()
      .then(function (token) {
        unirest
          .post(
            "https://chat.googleapis.com/v1/spaces/" +
              config.SPACE_ID +
              "/messages"
          )
          .headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          })
          .send(JSON.stringify(data))
          .end(function (res) {
            const threadId = res.body.thread.name.split("/").pop();
            resolve(threadId);
          });
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

module.exports = { postMessage };
