class EditableListItem {
  constructor(style) {
    this.style = style;
    this.card = new Card(style.getStyle("card"));

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
    this.dateInput.value = Dateconverter.toString(new Date());
    this.dateInput.min = Dateconverter.toString(new Date());

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.id = "buttonContainer";

    this.delete = document.createElement("button");
    this.delete.innerHTML = "delete";
    this.delete.id = "delete";

    this.save = document.createElement("button");
    this.save.innerHTML = "save";
    this.save.id = "save";

    this.alertBox = document.createElement("div");
    this.alertBox.id = "alertBox";

    this.closeAlert = document.createElement("div");
    this.closeAlert.innerHTML = "&times;";
    this.closeAlert.id = "closeAlert";
    this.closeAlert.addEventListener("click", () => this.alertBox.remove());

    this.newPill = document.createElement("strong");
    this.newPill.id = "newPill";
    this.newPill.innerHTML = "NEW";

    this.refreshStyle();

    this.buttonContainer.appendChild(this.save);
    this.buttonContainer.appendChild(this.delete);

    this.card.appendChild(this.descriptionLabel);
    this.card.appendChild(this.descriptionInput);
    this.card.appendChild(this.expireDateLabel);
    this.card.appendChild(this.dateInput);
    this.card.appendChild(this.buttonContainer);
  }

  refreshStyle() {
    this.card.getElement().className = "";
    this.card.getElement().classList.add(...this.style.getStyle("card"));

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
  }

  markAsNew() {
    this.card.appendChild(this.newPill);
  }

  removeNewMark() {
    this.card.removeChild(this.newPill);
  }

  setInputError(errorMessage) {
    this.card.appendChild(this.alertBox);
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
