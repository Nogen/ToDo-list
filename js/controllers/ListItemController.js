class ListItemController {
  constructor(itemDao, view) {
    this.itemDao = itemDao;
    this.view = view;
  }

  createItem() {
    this.view.markAsNew();
    let item = new Item("default", "default", false);
    item = this.itemDao.save(item);
    return item.getId();
  }

  loadItem(id) {
    let item = this.itemDao.find(id);
    this.view.setDescription(item.getDescription());
    this.view.setExpireDate(item.getExpireDate());
    this.view.setCurrentDate(item.getCreationDate());
    if (item.isDone()) {
      this.view.markAsDoneStyle();
    }
  }

  saveItem(id, newView) {
    let item = this.itemDao.find(id);
    let description = this.view.getDescription();
    let expireDate = this.view.getExpireDate();
    let errorMsgDescription = Validator.validateDescription(description);
    let errorMsgExpireDate = Validator.validateExpireDate(expireDate);
    if (errorMsgDescription.length > 0 || errorMsgExpireDate.length > 0) {
      if ( errorMsgExpireDate.length > 0 ) {
        this.view.setInvalidExpireDate(errorMsgExpireDate);
      } 
      if (errorMsgDescription.length > 0) {
        this.view.setInvalidDescription(errorMsgDescription);
      }
      this.view.setInputError(errorMsgDescription + "<br>" + errorMsgExpireDate);
    } else {
      item.setDescription(description);
      item.setExpireDate(expireDate);
      newView.setDescription(item.getDescription());
      newView.setExpireDate(item.getExpireDate());
      newView.setCurrentDate(item.getCreationDate());
      newView.refreshStyle();
      this.view.replaceWithOtherCard(newView);
      this.view = newView;
      this.itemDao.update(item);
    }
  }

  editItem(id, newView) {
    let item = this.itemDao.find(id);
    newView.resetValidity();
    newView.removeNewMark();
    newView.setDescription(item.getDescription());
    newView.getExpireDate(item.getExpireDate());
    newView.refreshStyle();
    this.view.replaceWithOtherCard(newView);
    this.view = newView;
  }

  markAsDone(id) {
    let item = this.itemDao.find(id);
    item.makeDone();
    this.view.markAsDoneStyle();
    this.itemDao.update(item);
  }

  deleteItem(id) {
    this.view.removeFromParentWithTransition("remove", 400);
    this.itemDao.deleteById(this.view.getID());
  }
}
