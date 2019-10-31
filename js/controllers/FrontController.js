/**
 * Class FrontController that manage macro-action and interaction between views and ListItemControllers
 */
class FrontController {
  /**
   * @constructor
   * @param {Element} parentElement element where the views will be added
   * @param {Style} style object that defines views styles
   * @param {ListItemDao} itemDao dao for item persistence
   */
  constructor(parentElement, style, itemDao) {
    this.parentElement = parentElement;
    this.style = style;
    this.itemDao = itemDao;
  }

  /**
   * Removes all the elements hosted by the parent
   */
  clearParent() {
    while (this.parentElement.hasChildNodes()) {
      this.parentElement.lastChild.remove();
    }
  }

  /**
   * Loads all Items in the persistence layer and for each adds a view to the parent element
   */
  loadAllItems() {
    this.itemDao.findAll().forEach(i => this.loadItem(i.getId()));
  }

  /**
   * Creates a new EditableListItem and adds it to the parent
   */
  createNewItem() {
    let view = new EditableListItem(this.style);
    let controller = new ListItemController(this.itemDao, view);
    controller.createItem();
    FrontController.bindViewWithController(
      this.parentElement,
      view,
      controller
    );
  }

  /**
   * Load a single Item retriving it from dao using id, and adds a view to the parent element
   * @param {number} id key of the item in the persistence layer
   */
  loadItem(id) {
    let view = new EditableListItem(this.style);
    let controller = new ListItemController(this.itemDao, view);
    controller.loadItem(id);
    FrontController.bindViewWithController(
      this.parentElement,
      view,
      controller
    );
  }

  /**
   * Static method wrote to avoid redundancy.
   * @param {Element} parentElement
   * @param {EditableListItem} view
   * @param {ListItemController} controller
   */
  static bindViewWithController(parentElement, view, controller) {
    view.appendToParentAsFirstWithTransition(parentElement, "adding", 100);

    view.deleteBtnAddEventListener("click", () => controller.deleteItem());

    view.saveBtnAddEventListener("click", () => {
      controller.saveItem();
    });

    view.markAsDoneBtnAddEventListener("click", () => controller.markAsDone());

    view.editBtnAddEventListener("click", () => {
      controller.editItem();
    });

    view.cancelBtnAddEventListener("click", () => {
      controller.cancelView();
    });
  }

  /**
   * Loads all item that are "done"/"not done" creating views for each item
   * @param {boolean} markStatus flag that rappresents if the item is marked as done: true => done, false => not done
   */
  loadAllItemFilterByMark(markStatus) {
    this.itemDao
      .findAll()
      .filter(i => i.isDone() == markStatus)
      .forEach(i => this.loadItem(i.getId()));
  }
}
