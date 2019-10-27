class Item {
  constructor(description, expireDate, done, id = 0) {
    this.id = id;
    this.description = description;
    this.expireDate = expireDate;
    this.creationDate = Dateconverter.toString(new Date());
    this.done = done;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  getExpireDate() {
    return this.expireDate;
  }

  getCreationDate() {
    return this.creationDate;
  }

  isDone() {
    return this.done;
  }

  makeDone() {
    this.done = true;
  }

  setId(id) {
    this.id = id;
  }

  setDescription(description) {
    this.description = description;
  }

  setExpireDate(date) {
    this.expireDate = date;
  }
}
