function init() {
  let fab = document.querySelector(".fab");
  let gridBtn = document.querySelector("#grid");
  let listBtn = document.querySelector("#list");
  let filterDone = document.querySelector(".filterDone");
  let parent = document.querySelector(".itemList");
  let style = MyAppStyleFactory._instance();
  let mockDb = new Map();
  mockDb.set(0, new Item("Not yet completed", "2020-10-10", false, 0));
  mockDb.set(1, new Item("Task Completed", "2019-10-10", true, 1));
  mockDb.set(2, new Item("Esame MRI", "2019-11-12", false, 2));
  let dao = new ListItemDao(mockDb);
  let frontController = new FrontController(parent, style, dao);
  frontController.loadAllItems();

  console.log(dao.searchByKey("true"));

  console.log(
    "1: ",
    Validator.validateExpireDate(""),
    "\n2:",
    Validator.validateExpireDate("1994-04-03"),
    "\n3: ",
    Validator.validateExpireDate(" 1994-03-04"),
    "\n4: ",
    Validator.validateExpireDate("1994-03-3")
  );

  filterDone.addEventListener("click", () => {
    filterDone.classList.toggle("selected");
    frontController.clearParent();
    if (filterDone.classList.contains("selected")) {
      frontController.loadAllItemFilterByMark(true);
    } else {
      frontController.loadAllItems();
    }
  });

  gridBtn.addEventListener("click", () => {
    gridBtn.classList.add("selected");
    listBtn.classList.remove("selected");
    parent.classList.add("grid");
    document.querySelectorAll("#card").forEach(e => {
      e.classList.add("box");
    });
    style.putStyle("card", "itemViewer box");
  });

  listBtn.addEventListener("click", () => {
    gridBtn.classList.remove("selected");
    listBtn.classList.add("selected");
    parent.classList.add("grid");
    document.querySelectorAll("#card").forEach(e => {
      e.classList.remove("box");
    });
    style.putStyle("card", "itemViewer");
  });

  fab.addEventListener("click", () => {
    frontController.createNewItem();
  });
}
