const unirest = require("unirest");
const { getJWT } = require("../middleware");
const config = require("../config/config");

function getListUsers() {
  return new Promise(function (resolve, reject) {
    getJWT()
      .then(function (token) {
        unirest
          .get(
            "https://chat.googleapis.com/v1/spaces/" +
              config.SPACE_ID +
              "/members"
          )
          .headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          })
          .end(function (res) {
            // console.log(res.body.memberships[0].member);
            if (res.error) {
              console.error(res.error);
              reject(res.error);
            } else {
              const members = res.body.memberships.map(
                (member) => member.member.displayName
              );
              resolve(members);
            }
          });
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

const showCard = async () => {
  const result = await getListUsers();
  postMessage(result);
};

module.exports = { getListUsers, showCard };
