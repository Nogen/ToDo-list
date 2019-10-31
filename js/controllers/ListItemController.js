/**
 * Class controller that binds single item with single view
 */
class ListItemController {
  /**
   * @constructor
   * @param {ListItemDao} itemDao dao for data persistence
   * @param {EditableListItem} view instance of EditableListItem
   */
  constructor(itemDao, view) {
    this.itemDao = itemDao;
    this.view = view;
    this.item = null;
  }

  /**
   * Marks the view as new
   */
  createItem() {
    this.view.markAsNew();
  }

  /**
   * Load the item and binds the data of the item to the view
   * @param {number} id that rappresent the key of the item
   */
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

  /**
   * Saves the item if it isn't created else it will be updated with data from the view inputs.
   * Checks the validity of the input view data.
   */
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

  /**
   * Sets the view in edit mode
   */
  editItem() {
    this.view.resetValidity();
    this.view.removeNewMark();
    this.view.setDescription(this.item.getDescription());
    this.view.setExpireDate(this.item.getExpireDate());
    this.view.setCurrentDate(this.item.getCreationDate());
    this.view.editMe();
  }

  /**
   * Set the views as "done" and update the item
   */
  markAsDone() {
    this.item.makeDone();
    this.view.markAsDoneStyle();
    this.itemDao.update(this.item);
  }

  /**
   * Cancel the view. if the view is new it will delete the view else it will display the view with the old datas
   */
  cancelView() {
    this.view.cancelMe();
  }

  /**
   * Delete the item and remove the view from the parent with a removing transition
   */
  deleteItem() {
    this.view.removeFromParentWithTransition("remove", 400);
    if (this.item != null) {
      this.itemDao.deleteById(this.item.getId());
    }
  }
}
