class Card {
  constructor(cssClass) {
    this.div = document.createElement("div");
    this.div.id = "card";
    this.div.classList.add(...cssClass);
    this.parent = null;
  }

  setParent(parent) {
    this.parent = parent;
  }

  setStyle(cssClass) {
    this.div.classList.add(cssClass);
  }

  getElement() {
    return this.div;
  }

  appendChild(child) {
    this.div.appendChild(child);
  }

  appendChildAsFirst(child) {
    this.div.insertAdjacentElement("afterbegin", child);
  }

  appendToParent(parent) {
    this.parent = parent;
    this.parent.appendChild(this.div);
  }

  appendToParentAsFirst(parent) {
    this.parent = parent;
    this.parent.insertAdjacentElement("afterbegin", this.div);
  }

  removeChild(child) {
    if (this.div.contains(child)) {
      this.div.removeChild(child);
    }
  }

  removeAllChilds() {
    while (this.div.hasChildNodes()) {
      this.removeChild(this.div.lastChild);
    }
  }

  removeFromParent() {
    this.div.remove();
  }

  replaceWithOtherCard(newCard) {
    if (newCard instanceof Card) {
      newCard.setParent(this.parent);
      this.parent.replaceChild(newCard.getElement(), this.div);
      newCard.setStyle("adding");
    }
  }
}
