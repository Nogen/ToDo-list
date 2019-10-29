class MyAppStyleFactory {
  static _instance() {
    if (!MyAppStyleFactory.instance) {
      MyAppStyleFactory.instance = new Style({
        card: "itemViewer",
        labelDescription: "labelBox",
        expireDateLabel: "labelBox",
        expireDate: "viewerDivs",
        creationDateLabel: "createdLabel",
        creationDate: "createdData",
        descriptionStrong: "viewerDivs",
        markAsDone: "markAsDoneButton",
        edit: "viewerButton",
        delete: "deleteButton",
        save: "saveButton",
        cancel: "cancelButton",
        buttonContainer: "buttonContainer",
        newPill: "pill",
        alertBox: "alert",
        closeAlert: "closeAlert",
        dateInput: "inputBox",
        descriptionInput: "inputBox",
        cardTitle: "cardTitle",
        cardBody: "cardBody",
        cardFooter: "cardFooter",
        checkMark: "checkMark"
      });
    }
    return MyAppStyleFactory.instance;
  }
}
