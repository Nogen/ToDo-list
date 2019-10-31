/**
 * Class that rappresents a view component.
 * This component is a viewer/editor of Item model.
 * It is an aggregates of NodeElement and it is a composition of a Card object that decorates the Card extending his behavior.
 */
class EditableListItem {
  /**
   * @constructor
   * @param {Style} style that contains all element style css selector associated with element ids
   */
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

  /**
   * Refresh style of all the element in this EditableListItem.
   * It will reset all the styles of the elements using style object passed with constructor
   */
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
  /**
   * Mark as Done this EditableListItem
   * Be sure to write an 'add' css selector style, because it will add it to the cardtitle.
   * It will also remove edit and markAsDone buttons
   */
  markAsDoneStyle() {
    this.cardTitle.classList.add("done");
    this.edit.remove();
    this.markAsDone.remove();
  }

  /**
   * Make editable this EditableListItem
   * It will set readonly's input attribute to false;
   * It will remove edit,markAsDone, delete buttons and add save and cancel buttons;
   */
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

  /**
   * Make not editable this EditableListItem
   * It will set readonly's input attributes to true, setting their style to 'notEditable' by adding css selector;
   * It will remove save and cancel buttons;
   * It will add markAsDone, edit and delete buttons;
   */
  viewMe() {
    this.editFlag = true;
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

  /**
   * if the EditableListItem is first created it will set the EditableListItem to state of viewing (not editable)
   * else it will remove the EditableListItem from the parent;
   */
  cancelMe() {
    if (this.editFlag) {
      this.viewMe();
    } else {
      this.removeFromParentWithTransition("remove", 400);
    }
  }

  /**
   * Marks the EditableListItem as new adding a pill element in the title;
   */
  markAsNew() {
    this.card.appendChild(this.newPill);
  }

  /**
   * Removes the pill(new mark) element form the title;
   */
  removeNewMark() {
    this.card.removeChild(this.newPill);
  }

  /**
   * Set the message in the alertBox and shows it
   */
  setInputError(errorMessage) {
    this.alertDiv.appendChild(this.alertBox);
    this.alertBox.innerHTML = errorMessage;
    this.alertBox.appendChild(this.closeAlert);
  }

  /**
   *  Modify the defualt input validity adding the personalized errorMessage
   * @param {string} errorMessage string that rappresent the error message to set to description's input box
   */
  setInvalidDescription(errorMessage) {
    this.descriptionInput.setCustomValidity(errorMessage);
  }

  /**
   * Modify the defualt input validity adding the personalized errorMessage
   * @param {string} errorMessage string that rappresent the error message to set to expire date's input box
   */
  setInvalidExpireDate(errorMessage) {
    this.dateInput.setCustomValidity(errorMessage);
  }

  /**
   * Clears all input message or alertbox
   */
  resetValidity() {
    this.descriptionInput.setCustomValidity("");
    this.dateInput.setCustomValidity("");
    this.card.removeChild(this.alertBox);
  }

  /**
   * Binds the event to the function of the deleteButton. This method act as a wrapper of addEventListener of the deleteButton element.
   * @param {string} event string that rappresents the event that will bind
   * @param {function} fun function binded to the event
   *
   */
  deleteBtnAddEventListener(event, fun) {
    this.delete.addEventListener(event, fun);
  }

  /**
   * Binds the event to the function of the saveButton. This method act as a wrapper of addEventListener of the saveButton element.
   * @param {string} event
   * @param {function} fun
   */
  saveBtnAddEventListener(event, fun) {
    this.save.addEventListener(event, fun);
  }

  /**
   * Binds the event to the function of the markAsDoneButton. This method act as a wrapper of addEventListener of the markAsDoneButton element.
   * @param {string} event
   * @param {function} fun
   */
  markAsDoneBtnAddEventListener(event, fun) {
    this.markAsDone.addEventListener(event, fun);
  }

  /**
   * Binds the event to the function of the editButton. This method act as a wrapper of addEventListener of the editButton element.
   * @param {string} event
   * @param {function} fun
   */
  editBtnAddEventListener(event, fun) {
    this.edit.addEventListener(event, fun);
  }

  /**
   * Binds the event to the function of the cancelButton. This method act as a wrapper of addEventListener of the canceleButton element.
   * @param {string} event
   * @param {function} fun
   */
  cancelBtnAddEventListener(event, fun) {
    this.cancel.addEventListener(event, fun);
  }

  /**
   * Set the value of the div that display the creation date
   * @param {string} date string that rappresents creation date of the item
   */
  setCurrentDate(date) {
    this.creationDate.innerHTML = date;
  }

  /**
   * @returns the content of the div that display the creation date
   */
  getCurrentDate() {
    return this.creationDate.innerHTML;
  }

  /**
   * @returns return the value of input box that contains the expire date
   */
  getExpireDate() {
    return this.dateInput.value;
  }

  /**
   * @returns return the value of input box that contains the description
   */
  getDescription() {
    return this.descriptionInput.value;
  }

  /**
   * Set the date value in the input box
   * @param {string} date string that rappresents the date in the format of YYYY-MM-DD
   */
  setExpireDate(date) {
    this.dateInput.value = date;
  }

  /**
   * Set the string description in the input box
   * @param {string} description string that rappresents description
   */
  setDescription(description) {
    this.descriptionInput.value = description;
  }

  /**
   * @returns the card object
   */
  getCard() {
    return this.card;
  }

  /**
   * @returns the Element of the card object
   */
  getElement() {
    return this.card.getElement();
  }

  /**
   * Add a child element to the card object as last
   * @param {Element} child element to be added to the card object
   */
  appendChild(child) {
    this.card.appendChild(child);
  }

  /**
   * Add a child element as first to the card object
   * @param {Element} child element to be added to the card object
   */
  appendChildAsFirst(child) {
    this.card.insertAdjacentElement("afterbegin", child);
  }

  /**
   * Add the card to the parent element as last
   * @param {Element} parent element where the card will be added as last
   */
  appendToParent(parent) {
    this.card.appendToParent(parent);
  }

  /**
   * Append the card object to the parent as last and play a transition with a delay
   * @param {Element} parent element where the card will be added as last
   * @param {String} cssTransition string that rappresent the transition css selector
   * @param {number} delay number of millis of delay
   */
  appendToParentWithTransition(parent, cssTransition, delay) {
    this.appendToParent(parent);
    setTimeout(() => this.card.setStyle(cssTransition), delay);
  }

  /**
   * Add the card to the parent element as first element
   * @param {Element} parent element where the card will be added as first
   */
  appendToParentAsFirst(parent) {
    this.card.appendToParentAsFirst(parent);
  }

  /**
   * Append the card object to the parent as first and play a transition with a delay
   * @param {Element} parent element where the card will be added as first
   * @param {String} cssTransition string that rappresent the transition css selector
   * @param {number} delay number of millis of delay
   */
  appendToParentAsFirstWithTransition(parent, cssTransition, delay) {
    this.appendToParentAsFirst(parent);
    setTimeout(() => this.card.setStyle(cssTransition), delay);
  }

  /**
   * Remove the child element from the card object
   * @param {Element} child elment to be removed from the card object
   */
  removeChild(child) {
    this.card.removeChild(child);
  }

  /**
   * Removes all the childs from the card object
   */
  removeAllChilds() {
    this.card.removeAllChilds();
  }

  /**
   * Removes the card object from the parent element
   */
  removeFromParent() {
    this.card.removeFromParent();
  }

  /**
   * Removes the card object from the parent element with a transition after a delay
   * @param {string} cssTransition string that rappresents css selector of transition
   * @param {number} delay number of millis of delay
   */
  removeFromParentWithTransition(cssTransition, delay) {
    this.card.setStyle(cssTransition);
    setTimeout(() => this.removeFromParent(), delay);
  }

  /**
   * Replace the actual EditableListItem with a new EditableListItem in the parentView
   * @param {EditableListItem} newListItem new view that will replace the old view
   */
  replaceWithOtherCard(newListItem) {
    this.card.replaceWithOtherCard(newListItem.getCard());
  }
}
