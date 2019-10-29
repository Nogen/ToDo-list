class FrontController {
  constructor(parentElement, style, itemDao) {
    this.parentElement = parentElement;
    this.style = style;
    this.itemDao = itemDao;
  }

  clearParent() {
    while (this.parentElement.hasChildNodes()) {
      this.parentElement.lastChild.remove();
    }
  }

  loadAllItems() {
    this.itemDao.findAll().forEach(i => this.loadItem(i.getId()));
  }

  createNewItem() {
    let view = new AllInOneEditableListItem(this.style);
    let controller = new ListItemController(this.itemDao, view);
    controller.createItem();
    FrontController.bindViewWithController(
      this.parentElement,
      view,
      controller
    );
  }

  loadItem(id) {
    let view = new AllInOneEditableListItem(this.style);
    let controller = new ListItemController(this.itemDao, view);
    controller.loadItem(id);
    FrontController.bindViewWithController(
      this.parentElement,
      view,
      controller
    );
  }

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
      controller.deleteItem();
    });
  }

  loadAllItemFilterByMark(markStatus) {
    this.itemDao
      .findAll()
      .filter(i => i.isDone() == markStatus)
      .forEach(i => this.loadItem(i.getId()));
  }
}
