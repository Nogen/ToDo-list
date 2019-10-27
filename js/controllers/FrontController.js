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
    let viewer = new ListItemViewer(this.style, 0);
    let editableView = new EditableListItem(this.style);
    let controller = new ListItemController(this.itemDao, editableView);
    let id = controller.createItem();

    editableView.appendToParentAsFirstWithTransition(
      this.parentElement,
      "adding",
      100
    );

    editableView.deleteBtnAddEventListener("click", () =>
      controller.deleteItem(id)
    );

    editableView.saveBtnAddEventListener("click", () => {
      controller.saveItem(id, viewer);
    });

    viewer.deleteBtnAddEventListener("click", () => controller.deleteItem(id));

    viewer.markAsDoneBtnAddEventListener("click", () =>
      controller.markAsDone(id)
    );

    viewer.editBtnAddEventListener("click", () => {
      controller.editItem(id, editableView);
    });
  }

  loadItem(id) {
    let viewer = new ListItemViewer(this.style, id);
    let editableView = new EditableListItem(this.style);
    let controller = new ListItemController(this.itemDao, viewer);

    controller.loadItem(id);

    viewer.appendToParentAsFirstWithTransition(
      this.parentElement,
      "adding",
      100
    );

    editableView.deleteBtnAddEventListener("click", () =>
      controller.deleteItem(id)
    );

    editableView.saveBtnAddEventListener("click", () => {
      controller.saveItem(id, viewer);
    });

    viewer.deleteBtnAddEventListener("click", () => controller.deleteItem(id));

    viewer.markAsDoneBtnAddEventListener("click", () =>
      controller.markAsDone(id)
    );

    viewer.editBtnAddEventListener("click", () => {
      controller.editItem(id, editableView);
    });
  }

  loadAllItemFilterByMark(markStatus) {
    this.itemDao
      .findAll()
      .filter(i => i.isDone() == markStatus)
      .forEach(i => this.loadItem(i.getId()));
  }
}
