class ListItemController {
  constructor(itemDao, view) {
    this.itemDao = itemDao;
    this.view = view;
    this.item = null;
  }

  createItem() {
    this.view.markAsNew();
  }

  loadItem(id) {
    this.item = this.itemDao.find(id);
    this.view.viewMe();
    this.view.setDescription(this.item.getDescription());
    this.view.setExpireDate(this.item.getExpireDate());
    this.view.setCurrentDate(this.item.getCreationDate());
    if (this.item.isDone()) {
      this.view.markAsDoneStyle();
    }
  }

  saveItem() {
    let description = this.view.getDescription();
    let expireDate = this.view.getExpireDate();
    let errorMsgDescription = Validator.validateDescription(description);
    let errorMsgExpireDate = Validator.validateExpireDate(expireDate);
    if (errorMsgDescription.length > 0 || errorMsgExpireDate.length > 0) {
      if (errorMsgExpireDate.length > 0) {
        this.view.setInvalidExpireDate(errorMsgExpireDate);
      }
      if (errorMsgDescription.length > 0) {
        this.view.setInvalidDescription(errorMsgDescription);
      }
      this.view.setInputError(
        errorMsgDescription + "<br>" + errorMsgExpireDate
      );
    } else {
      if (this.item == null) {
        let itemDefault = new Item(
          "default",
          DateConverter.toString(new Date()),
          false
        );
        this.item = this.itemDao.save(itemDefault);
      }
      this.item.setDescription(description);
      this.item.setExpireDate(expireDate);
      this.view.setDescription(this.item.getDescription());
      this.view.setExpireDate(this.item.getExpireDate());
      this.view.setCurrentDate(this.item.getCreationDate());
      this.view.removeNewMark();
      this.view.viewMe();
      this.itemDao.update(this.item);
    }
  }

  editItem() {
    this.view.resetValidity();
    this.view.removeNewMark();
    this.view.setDescription(this.item.getDescription());
    this.view.setExpireDate(this.item.getExpireDate());
    this.view.setCurrentDate(this.item.getCreationDate());
    this.view.editMe();
  }

  markAsDone() {
    this.item.makeDone();
    this.view.markAsDoneStyle();
    this.itemDao.update(this.item);
  }

  cancelView() {
    this.view.cancelMe();
  }

  deleteItem() {
    this.view.removeFromParentWithTransition("remove", 400);
    if (this.item != null) {
      this.itemDao.deleteById(this.item.getId());
    }
  }
}
