/**
 * Aggregator Class that maps element id with css selector that defines element styles
 */
class Style {
  /**
   * @constructor
   * @param {Object} object mapping of elements and styles (see MyAppStyleFactory as example)
   */
  constructor(object) {
    this.styleBinding = new Map();
    for (let k in object) {
      this.styleBinding.set(k, object[k]);
    }
  }

  /**
   * Method that return the styles as an array of the element id passed as param
   * @param {string} elemId the id of the element
   * @returns the list of styles for that element
   */
  getStyle(elemId) {
    return this.styleBinding.get(elemId).split(/\s+/);
  }

  /**
   * Method that adds new style mapped with the element id
   * @param {string} elemId the id of the element
   * @param {string} cssClass css selector style for that element
   */
  putStyle(elemId, cssClass) {
    this.styleBinding.set(elemId, cssClass);
  }
}
