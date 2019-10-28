class MyAppStyleFactory {
  static _instance() {
    if (!MyAppStyleFactory.instance) {
      MyAppStyleFactory.instance = new Style({
        card: "itemViewer",
        labelDescription: "labelBox",
        expireDateLabel: "labelBox",
        expireDate: "viewerDivs",
        creationDateLabel: "viewerDivs",
        creationDate: "viewerDivs",
        descriptionStrong: "viewerDivs",
        markAsDone: "markAsDoneButton",
        edit: "viewerButton",
        delete: "deleteButton",
        save: "saveButton",
        buttonContainer: "buttonContainer",
        expireDiv: "dateContainer",
        createDiv: "dateContainer",
        newPill: "pill",
        alertBox: "alert",
        closeAlert: "closeAlert",
        dateInput: "inputBox",
        descriptionInput: "inputBox",
        cardTitle: "cardTitle",
        checkMark: "checkMark"
      });
    }
    return MyAppStyleFactory.instance;
  }
}
