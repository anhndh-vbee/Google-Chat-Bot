const openDialog = (data) => {
  return {
    action_response: {
      type: "DIALOG",
      dialog_action: {
        dialog: {
          body: {
            sections: [
              {
                header: "List users in database",
                widgets: [
                  {
                    textInput: {
                      label: "Name",
                      type: "SINGLE_LINE",
                      name: "name",
                    },
                  },
                  {
                    textInput: {
                      label: "Address",
                      type: "MULTIPLE_LINE",
                      name: "address",
                    },
                  },
                  {
                    decoratedText: {
                      text: "Add to favorites",
                      switchControl: {
                        controlType: "SWITCH",
                        name: "saveFavorite",
                      },
                    },
                  },
                  {
                    decoratedText: {
                      text: "Merge with existing contacts",
                      switchControl: {
                        controlType: "SWITCH",
                        name: "mergeContact",
                        selected: true,
                      },
                    },
                  },
                  {
                    buttonList: {
                      buttons: [
                        {
                          text: "Next",
                          onClick: {
                            action: {
                              function: "openSequentialDialog",
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    },
  };
};

module.exports = { openDialog };
