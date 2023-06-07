/**
 * Sends asynchronous message into Google Chat
 * @return{obj} response
 */
function webhook() {
  const fetch = require("node-fetch");
  const webhookURL =
    "https://chat.googleapis.com/v1/spaces/AAAAtzU3XIs/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=8IKayDI9_SaEgE4BCDdCIsCns_4VbaNf_oRJdf5n7z4";

  const data = JSON.stringify({
    text: "Hello from a Node script!",
  });
  let resp;
  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: data,
  }).then((response) => {
    resp = response;
    console.log(response);
  });
  return resp;
}

webhook();
