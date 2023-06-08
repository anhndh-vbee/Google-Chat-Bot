const User = require("../models/User");
// const { google } = require("googleapis");
// const { OAuth2 } = google.auth;
// const client = new OAuth2(cli)

const checkUser = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await User.findOne({ email: userEmail }).exec();
      if (check === null || check === {} || check === undefined) {
        resolve(true);
      } else resolve(false);
    } catch (error) {
      reject(error);
    }
  });
};

const addUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await checkUser(data.email);
      if (check === false) {
        resolve({ text: "User existed" });
      } else {
        const newUser = new User({
          username: data.displayName,
          avatar: data.avatarUrl,
          email: data.email,
        });
        await newUser.save();
        return resolve({ text: "Add user successfully" });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const showInfo = (emailUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: emailUser }).exec();
      if (user === null || user === {} || user === undefined) {
        resolve({ text: "Not found user" });
      } else {
        // resolve(user);
        resolve({
          // cardsV2: [
          //   {
          //     cardId: "2",
          //     card: {
          //       header: {
          //         title: "OOO app",
          //         subtitle: "Helping you manage your OOO",
          //         imageUrl: "https://goo.gle/3SfMkjb",
          //         imageType: "SQUARE",
          //       },
          //       sections: [
          //         {
          //           widgets: [
          //             {
          //               decoratedText: {
          //                 topLabel: "",
          //                 text: "Hi! 👋 I'm here to help you with your out of office tasks.<br><br>Here's a list of commands I understand.",
          //                 wrapText: true,
          //               },
          //             },
          //           ],
          //         },
          //         {
          //           widgets: [
          //             {
          //               decoratedText: {
          //                 topLabel: "",
          //                 text: "<b>/blockDayOut</b>: I will block out your calendar for you.",
          //                 wrapText: true,
          //               },
          //             },
          //             {
          //               decoratedText: {
          //                 topLabel: "",
          //                 text: "<b>/cancelAllMeetings</b>: I will cancel all your meetings for the day.",
          //                 wrapText: false,
          //               },
          //             },
          //             {
          //               decoratedText: {
          //                 topLabel: "",
          //                 text: "<b>/setAutoReply</b>: Set an out of office auto reply in Gmail.",
          //                 wrapText: true,
          //               },
          //             },
          //           ],
          //         },
          //       ],
          //     },
          //   },
          // ],
          // cardsV2: [
          //   {
          //     cardId: "1",
          //     card: {
          //       header: {
          //         title: "OOO app",
          //         subtitle: "Helping you manage your OOO",
          //         imageUrl: "https://goo.gle/3SfMkjb",
          //         imageType: "CIRCLE",
          //       },
          //       sections: [
          //         {
          //           widgets: [
          //             {
          //               decoratedText: {
          //                 topLabel: "",
          //                 text: "<b>Test icon</b>: Ok",
          //                 // startIcon: {
          //                 //   knownIcon: "NONE",
          //                 //   altText: "Task done",
          //                 //   iconUrl:
          //                 //     "https://fonts.gstatic.com/s/i/short-term/web/system/1x/task_alt_gm_grey_48dp.png",
          //                 // },
          //                 wrapText: true,
          //               },
          //             },
          //           ],
          //         },
          //       ],
          //     },
          //   },
          // ],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { addUser, showInfo };
