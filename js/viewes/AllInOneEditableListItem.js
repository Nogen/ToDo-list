class AllInOneEditableListItem {
  constructor(style) {
    this.style = style;
    this.card = new Card(style.getStyle("card"));

    this.cardTitle = document.createElement("div");
    this.cardTitle.id = "cardTitle";

    this.cardBody = document.createElement("div");
    this.cardBody.id = "cardBody";

    this.cardFooter = document.createElement("div");
    this.cardFooter.id = "cardFooter";

    this.creationDate = document.createElement("div");
    this.creationDate.id = "creationDate";

    this.descriptionLabel = document.createElement("label");
    this.descriptionLabel.id = "labelDescription";
    this.descriptionLabel.innerHTML = "Description:";

    this.descriptionInput = document.createElement("input");
    this.descriptionInput.type = "text";
    this.descriptionInput.id = "descriptionInput";

    this.expireDateLabel = document.createElement("label");
    this.expireDateLabel.id = "expireDateLabel";
    this.expireDateLabel.innerHTML = "Expire Date: ";

    this.dateInput = document.createElement("input");
    this.dateInput.type = "date";
    this.dateInput.id = "dateInput";
    this.dateInput.value = DateConverter.toString(new Date());

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.id = "buttonContainer";

    this.cancel = document.createElement("button");
    this.cancel.innerHTML = "cancel";
    this.cancel.id = "cancel";

    this.markAsDone = document.createElement("button");
    this.markAsDone.id = "markAsDone";
    this.markAsDone.innerHTML = "mark as done";

    this.edit = document.createElement("button");
    this.edit.id = "edit";
    this.edit.innerHTML = "edit";

    this.delete = document.createElement("button");
    this.delete.innerHTML = "delete";
    this.delete.id = "delete";

    this.save = document.createElement("button");
    this.save.innerHTML = "save";
    this.save.id = "save";

    this.alertDiv = document.createElement("div");

    this.alertBox = document.createElement("div");
    this.alertBox.id = "alertBox";

    this.closeAlert = document.createElement("div");
    this.closeAlert.innerHTML = "&times;";
    this.closeAlert.id = "closeAlert";
    this.closeAlert.addEventListener("click", () => this.alertBox.remove());

    this.newPill = document.createElement("strong");
    this.newPill.id = "newPill";
    this.newPill.innerHTML = "NEW";

    this.creationDateLabel = document.createElement("label");
    this.creationDateLabel.id = "creationDateLabel";
    this.creationDateLabel.innerHTML = "Created:";

    this.refreshStyle();

    this.buttonContainer.appendChild(this.save);
    this.buttonContainer.appendChild(this.cancel);

    this.cardBody.appendChild(this.descriptionLabel);
    this.cardBody.appendChild(this.descriptionInput);
    this.cardBody.appendChild(this.expireDateLabel);
    this.cardBody.appendChild(this.dateInput);
    this.cardBody.appendChild(this.buttonContainer);
    this.cardBody.appendChild(this.alertDiv);

    this.card.appendChild(this.cardTitle);
    this.card.appendChild(this.cardBody);
    this.card.appendChild(this.cardFooter);
  }

  refreshStyle() {
    this.card.getElement().className = "";
    this.card.getElement().classList.add(...this.style.getStyle("card"));
    this.cardTitle.classList.add(...this.style.getStyle(this.cardTitle.id));
    this.cardBody.classList.add(...this.style.getStyle(this.cardBody.id));
    this.cardFooter.classList.add(...this.style.getStyle(this.cardFooter.id));

    this.descriptionLabel.classList.add(
      ...this.style.getStyle(this.descriptionLabel.id)
    );
    this.descriptionInput.classList.add(
      ...this.style.getStyle(this.descriptionInput.id)
    );
    this.expireDateLabel.classList.add(
      ...this.style.getStyle(this.expireDateLabel.id)
    );
    this.buttonContainer.classList.add(
      ...this.style.getStyle(this.buttonContainer.id)
    );
    this.delete.classList.add(...this.style.getStyle(this.delete.id));
    this.dateInput.classList.add(...this.style.getStyle(this.dateInput.id));
    this.save.classList.add(...this.style.getStyle(this.save.id));
    this.alertBox.classList.add(...this.style.getStyle(this.alertBox.id));
    this.closeAlert.classList.add(...this.style.getStyle(this.closeAlert.id));
    this.newPill.classList.add(...this.style.getStyle(this.newPill.id));
    this.cancel.classList.add(...this.style.getStyle(this.cancel.id));
    this.markAsDone.classList.add(...this.style.getStyle(this.markAsDone.id));
    this.edit.classList.add(...this.style.getStyle(this.edit.id));
    this.creationDate.classList.add(
      ...this.style.getStyle(this.creationDate.id)
    );
    this.creationDateLabel.classList.add(
      ...this.style.getStyle(this.creationDateLabel.id)
    );
  }

  markAsDoneStyle() {
    this.cardTitle.classList.add("done");
    this.edit.remove();
    this.markAsDone.remove();
  }

  editMe() {
    this.editFlag = true;
    this.descriptionInput.readOnly = false;
    this.dateInput.readOnly = false;
    this.descriptionInput.classList.add("inputBox");
    this.dateInput.classList.add("inputBox");
    this.descriptionInput.classList.remove("notEditable");
    this.dateInput.classList.remove("notEditable");
    this.edit.remove();
    this.markAsDone.remove();
    this.delete.remove();
    this.buttonContainer.appendChild(this.save);
    this.buttonContainer.appendChild(this.cancel);
  }

  viewMe() {
    this.descriptionInput.readOnly = true;
    this.dateInput.readOnly = true;
    this.descriptionInput.classList.remove("inputBox");
    this.dateInput.classList.remove("inputBox");
    this.descriptionInput.classList.add("notEditable");
    this.dateInput.classList.add("notEditable");
    this.save.remove();
    this.cancel.remove();
    this.cardFooter.appendChild(this.creationDateLabel);
    this.cardFooter.appendChild(this.creationDate);
    this.buttonContainer.appendChild(this.markAsDone);
    this.buttonContainer.appendChild(this.edit);
    this.buttonContainer.appendChild(this.delete);
  }

  cancelMe() {
    if (this.editFlag) {
      this.viewMe();
    } else {
      this.removeFromParent();
    }
  }

  markAsNew() {
    this.card.appendChild(this.newPill);
  }

  removeNewMark() {
    this.card.removeChild(this.newPill);
  }

  setInputError(errorMessage) {
    this.alertDiv.appendChild(this.alertBox);
    this.alertBox.innerHTML = errorMessage;
    this.alertBox.appendChild(this.closeAlert);
  }

  setInvalidDescription(errorMessage) {
    this.descriptionInput.setCustomValidity(errorMessage);
  }

  setInvalidExpireDate(errorMessage) {
    this.dateInput.setCustomValidity(errorMessage);
  }

  resetValidity() {
    this.descriptionInput.setCustomValidity("");
    this.dateInput.setCustomValidity("");
    this.card.removeChild(this.alertBox);
  }

  deleteBtnAddEventListener(event, fun) {
    this.delete.addEventListener(event, fun);
  }

  saveBtnAddEventListener(event, fun) {
    this.save.addEventListener(event, fun);
  }

  markAsDoneBtnAddEventListener(event, fun) {
    this.markAsDone.addEventListener(event, fun);
  }

  editBtnAddEventListener(event, fun) {
    this.edit.addEventListener(event, fun);
  }

  cancelBtnAddEventListener(event, fun) {
    this.cancel.addEventListener(event, fun);
  }

  setCurrentDate(date) {
    this.creationDate.innerHTML = date;
  }

  getCurrentDate(date) {
    return this.creationDate.innerHTML;
  }

  getExpireDate() {
    return this.dateInput.value;
  }

  getDescription() {
    return this.descriptionInput.value;
  }

  setExpireDate(date) {
    this.dateInput.value = date;
  }

  setDescription(description) {
    this.descriptionInput.value = description;
  }

  getID() {
    return this.id;
  }

  setID(id) {
    this.id = id;
  }

  getCard() {
    return this.card;
  }

  getElement() {
    this.card.getElement();
  }

  appendChild(child) {
    this.card.appendChild(child);
  }

  appendChildAsFirst(child) {
    this.card.insertAdjacentElement("afterbegin", child);
  }

  appendToParent(parent) {
    this.card.appendToParent(parent);
  }

  appendToParentWithTransition(parent, cssTransition, delay) {
    this.appendToParent(parent);
    setTimeout(() => this.card.setStyle(cssTransition), delay);
  }

  appendToParentAsFirst(parent) {
    this.card.appendToParentAsFirst(parent);
  }

  appendToParentAsFirstWithTransition(parent, cssTransition, delay) {
    this.appendToParentAsFirst(parent);
    setTimeout(() => this.card.setStyle(cssTransition), delay);
  }

  removeChild(child) {
    this.card.removeChild(child);
  }

  removeAllChilds() {
    this.card.removeAllChilds();
  }

  removeFromParent() {
    this.card.removeFromParent();
  }

  removeFromParentWithTransition(cssTransition, delay) {
    this.card.setStyle(cssTransition);
    setTimeout(() => this.removeFromParent(), delay);
  }

  replaceWithOtherCard(newListItem) {
    this.card.replaceWithOtherCard(newListItem.getCard());
  }
}
