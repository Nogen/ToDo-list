/**
 * DAO class that uses a map to persist data
 */
class ListItemDao {
  /**
   * @constructor
   * @param {Map} source the map that contains data. If not passed as argument it will create a new one.
   */
  constructor(source = new Map()) {
    this.source = source;
    this.lastIndex = 0;
    if (this.source.size > 0) {
      this.lastIndex = Array.from(this.source.keys()).sort((a, b) => b - a)[0];
    }
  }

  /**
   * Finds all the items in the map source and returns them as array
   * @returns an array of all Item elemnts in the source map
   */
  findAll() {
    return Array.from(this.source.values());
  }

  /**
   * Finds the item by id and returns it
   * @param {number} id the id of Item
   * @returns the item with the id passed
   */
  find(id) {
    return this.source.get(id);
  }

  /**
   * Saves the item in the map source and return it with id modified
   * @param {Item} item the item that will be saved
   * @returns item with the new id
   */
  save(item) {
    item.setId(++this.lastIndex);
    this.source.set(this.lastIndex, item);
    return item;
  }

  /**
   * Updates the item in the map source
   * @param {Item} item the item that will be updated
   */
  update(item) {
    this.source.set(item.getId(), item);
  }

  /**
   * Deletes the item in the map source
   * @param {Item} item the item that will be deleted
   */
  delete(item) {
    this.source.delete(item.getId());
  }

  /**
   * Deletes the Item finding it by the id
   * @param {number} id the id of the Item
   */
  deleteById(id) {
    this.source.delete(id);
  }

  /**
   * Search in the map Item that will match the query.
   * The search is rudimental boolean AND search: based on the toString method of Items and the presence of every word of the query in the Item
   * @param {string} query set of words that will be searched in the items
   * @returns
   */
  searchByKey(query) {
    let listItem = this.findAll();
    for (let word of query.split(/\s/)) {
      listItem = listItem.filter(
        i =>
          i
            .toString()
            .toLowerCase()
            .search(word.toLowerCase()) > -1
      );
    }
    return listItem;
  }

  /**
   * Filters Item by expire date and returns item with expire date greater than the date passed as param
   * @param {string} date string that rappresent the start date of search (format: YYYY-MM-DD)
   * @returns array of item filtered by the date
   */
  filterByExpireDateFrom(date) {
    return this.findAll().filter(
      i => DateConverter.toDate(i.getExpireDate()) - date > 0
    );
  }

  /**
   * Filters Item by expire date and returns item with expire date lower than the date passed as param
   * @param {string} date string that rappresent the upper limt date of search (format: YYYY-MM-DD)
   * @returns array of item filtered by the date
   */
  filterByExpireDateTo(date) {
    return this.findAll().filter(
      i => DateConverter.toDate(i.getExpireDate()) - date < 0
    );
  }

  /**
   * Filters item by a range of dates
   * @param {string} dateFirst string that rappresent the lower limt date of search (format: YYYY-MM-DD)
   * @param {string} dateLast string that rappresent the upper limt date of search (format: YYYY-MM-DD)
   * @returns array of item filtered by the date range
   */
  filterByDateRange(dateFirst, dateLast) {
    return this.findAll().filter(
      i =>
        DateConverter.toDate(i.getExpireDate()) - dateFirst > 0 &&
        DateConverter.toDate(i.getExpireDate()) - dateLast < 0
    );
  }
}
