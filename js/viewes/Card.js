/**
 * Class that rappresent the base of the card that hosts element to display an Item
 */
class Card {
  /**
   * @constructor
   * @param {string} cssClass string that rappresents the css selector that defines style of the card
   */
  constructor(cssClass) {
    this.div = document.createElement("div");
    this.div.id = "card";
    this.div.classList.add(...cssClass);
    this.parent = null;
  }

  /**
   * Set the parent of div
   * @param {Element} parent element to be set as parent of the div
   */
  setParent(parent) {
    this.parent = parent;
  }

  /**
   * Set the string that rappresents css selector for the styles
   * @param {string} cssClass string that rappresents css selector for the styles
   */
  setStyle(cssClass) {
    this.div.classList.add(cssClass);
  }

  /**
   * @returns the Element of the card object
   */
  getElement() {
    return this.div;
  }

  /**
   * Add a child element to the card object as last
   * @param {Element} child element to be added to the card object
   */
  appendChild(child) {
    this.div.appendChild(child);
  }

  /**
   * Add a child element as first to the card object
   * @param {Element} child element to be added to the card object
   */
  appendChildAsFirst(child) {
    this.div.insertAdjacentElement("afterbegin", child);
  }

  /**
   * Add the card to the parent element as last
   * @param {Element} parent element where the card will be added as last
   */
  appendToParent(parent) {
    this.parent = parent;
    this.parent.appendChild(this.div);
  }

  /**
   * Add the card to the parent element as first element
   * @param {Element} parent element where the card will be added as first
   */
  appendToParentAsFirst(parent) {
    this.parent = parent;
    this.parent.insertAdjacentElement("afterbegin", this.div);
  }

  /**
   * Remove the child element from the card object
   * @param {Element} child elment to be removed from the card object
   */
  removeChild(child) {
    if (this.div.contains(child)) {
      this.div.removeChild(child);
    }
  }

  /**
   * Removes all the childs from the card object
   */
  removeAllChilds() {
    while (this.div.hasChildNodes()) {
      this.removeChild(this.div.lastChild);
    }
  }

  /**
   * Removes the card object from the parent element
   */
  removeFromParent() {
    this.div.remove();
  }

  /**
   * Replace the actual Card with a new Card in the parent view
   * @param {Card} newCard new view that will replace the old view
   */
  replaceWithOtherCard(newCard) {
    if (newCard instanceof Card) {
      newCard.setParent(this.parent);
      this.parent.replaceChild(newCard.getElement(), this.div);
      newCard.setStyle("adding");
    }
  }
}
