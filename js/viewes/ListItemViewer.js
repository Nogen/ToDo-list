class ListItemViewer {
  constructor(style, id) {
    this.style = style;
    this.card = new Card(style.getStyle("card"));
    this.id = id;

    this.cardTitle = document.createElement("div");
    this.cardTitle.id = "cardTitle";

    this.checkMark = document.createElement("div");
    this.checkMark.id = "checkMark";

    this.descriptionStrong = document.createElement("strong");
    this.descriptionStrong.id = "descriptionStrong";

    this.createDiv = document.createElement("div");
    this.createDiv.id = "createDiv";

    this.creationDateLabel = document.createElement("label");
    this.creationDateLabel.id = "creationDateLabel";
    this.creationDateLabel.innerHTML = "Creation date:";

    this.creationDate = document.createElement("div");
    this.creationDate.id = "creationDate";

    this.expireDiv = document.createElement("div");
    this.expireDiv.id = "expireDiv";

    this.expireDateLabel = document.createElement("label");
    this.expireDateLabel.id = "expireDateLabel";
    this.expireDateLabel.innerHTML = "Expire Date: ";

    this.expireDate = document.createElement("div");
    this.expireDate.id = "expireDate";

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.id = "buttonContainer";

    this.delete = document.createElement("button");
    this.delete.innerHTML = "delete";
    this.delete.id = "delete";

    this.markAsDone = document.createElement("button");
    this.markAsDone.id = "markAsDone";
    this.markAsDone.innerHTML = "mark as done";

    this.edit = document.createElement("button");
    this.edit.id = "edit";
    this.edit.innerHTML = "edit";

    this.refreshStyle();

    this.cardTitle.appendChild(this.descriptionStrong);
    this.cardTitle.appendChild(this.checkMark);

    this.createDiv.appendChild(this.creationDateLabel);
    this.createDiv.appendChild(this.creationDate);

    this.expireDiv.appendChild(this.expireDateLabel);
    this.expireDiv.appendChild(this.expireDate);

    this.buttonContainer.appendChild(this.markAsDone);
    this.buttonContainer.appendChild(this.edit);
    this.buttonContainer.appendChild(this.delete);

    this.card.appendChild(this.cardTitle);
    this.card.appendChild(this.createDiv);
    this.card.appendChild(this.expireDiv);
    this.card.appendChild(this.buttonContainer);
  }

  refreshStyle() {
    this.card.getElement().className = "";
    this.card.getElement().classList.add(...this.style.getStyle("card"));
    this.cardTitle.classList.add(...this.style.getStyle(this.cardTitle.id));
    this.descriptionStrong.classList.add(
      ...this.style.getStyle(this.descriptionStrong.id)
    );
    this.checkMark.classList.add(...this.style.getStyle(this.checkMark.id));
    this.createDiv.classList.add(...this.style.getStyle(this.createDiv.id));
    this.creationDateLabel.classList.add(
      ...this.style.getStyle(this.creationDateLabel.id)
    );
    this.expireDiv.classList.add(...this.style.getStyle(this.expireDiv.id));
    this.creationDate.classList.add(
      ...this.style.getStyle(this.creationDate.id)
    );
    this.expireDateLabel.classList.add(
      ...this.style.getStyle(this.expireDateLabel.id)
    );
    this.expireDate.classList.add(...this.style.getStyle(this.expireDate.id));
    this.buttonContainer.classList.add(
      ...this.style.getStyle(this.buttonContainer.id)
    );
    this.delete.classList.add(...this.style.getStyle(this.delete.id));
    this.markAsDone.classList.add(...this.style.getStyle(this.markAsDone.id));
    this.edit.classList.add(...this.style.getStyle(this.edit.id));
  }

  markAsDoneStyle() {
    this.checkMark.classList.add("done");
    this.buttonContainer.removeChild(this.edit);
    this.buttonContainer.removeChild(this.markAsDone);
  }

  markAsDoneBtnAddEventListener(event, fun) {
    this.markAsDone.addEventListener(event, fun);
  }

  editBtnAddEventListener(event, fun) {
    this.edit.addEventListener(event, fun);
  }

  deleteBtnAddEventListener(event, fun) {
    this.delete.addEventListener(event, fun);
  }

  setDescription(description) {
    this.descriptionStrong.innerHTML = description;
  }

  setCurrentDate(currDate) {
    this.creationDate.innerHTML = currDate;
  }

  setExpireDate(expireDate) {
    this.expireDate.innerHTML = expireDate;
  }

  getDescription() {
    return this.descriptionStrong.innerHTML;
  }

  getCurrentDate() {
    return this.creationDate.innerHTML;
  }

  getExpireDate() {
    return this.expireDate.innerHTML;
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
