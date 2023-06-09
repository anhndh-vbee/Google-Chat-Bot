const User = require("../models/User");

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
        resolve({
          cardsV2: [
            {
              cardId: "2",
              card: {
                header: {
                  title: "Information",
                  subtitle: "Check your inform",
                  imageUrl: "https://goo.gle/3SfMkjb",
                  imageType: "CIRCLE",
                },
                sections: [
                  {
                    widgets: [
                      {
                        decoratedText: {
                          topLabel: "",
                          text: `Hi! 👋 Here is information of ${user.username}`,
                          wrapText: true,
                        },
                      },
                    ],
                  },
                  {
                    widgets: [
                      {
                        decoratedText: {
                          topLabel: "",
                          text: `<b>Email:</b> ${user.email}`,
                          wrapText: true,
                          startIcon: {
                            knownIcon: "EMAIL",
                          },
                        },
                      },
                      {
                        decoratedText: {
                          topLabel: "",
                          text: `<b>Name:</b> ${user.username}`,
                          wrapText: false,
                          startIcon: {
                            knownIcon: "PERSON",
                          },
                        },
                      },
                      {
                        decoratedText: {
                          text: "Your avatar picture",
                          startIcon: {
                            knownIcon: "BOOKMARK",
                          },
                        },
                      },
                      {
                        image: {
                          imageUrl: user.avatar,
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { addUser, showInfo };
