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

function openSequentialDialog(event) {
  res.json({
    action_response: {
      type: "DIALOG",
      dialog_action: {
        dialog: {
          body: {
            sections: [
              {
                header: "Add new contact",
                widgets: [
                  {
                    textInput: {
                      label: "Notes",
                      type: "MULTIPLE_LINE",
                      name: "notes",
                    },
                  },
                  {
                    selectionInput: {
                      type: "RADIO_BUTTON",
                      label: "Contact type",
                      name: "contactType",
                      items: [
                        {
                          text: "Work",
                          value: "Work",
                          selected: false,
                        },
                        {
                          text: "Personal",
                          value: "Personal",
                          selected: false,
                        },
                      ],
                    },
                  },
                  {
                    buttonList: {
                      buttons: [
                        {
                          text: "Submit",
                          onClick: {
                            action: {
                              function: "confirmDialogSuccess",
                              parameters: [
                                {
                                  key: "confirmDialogSuccess",
                                  value: "confirmDialogSuccess",
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                    horizontalAlignment: "END",
                  },
                ],
              },
            ],
          },
        },
      },
    },
  });
}

module.exports = { openDialog };
