/**
 * Static class that converts/parse date to string
 */
class DateConverter {
  /**
   * @param {string} dateString
   * @returns a new Date object that is equals to the string passed as param
   */
  static toDate(dateString) {
    let res = dateString.split("/D/");
    return new Date(res[0], --res[1], res[2]);
  }

  /**
   * @param {Date} date
   * @returns the date converted as string in the forma of YYYY-MM-DD
   */
  static toString(date) {
    let month = date.getMonth() + 1;
    return date.getFullYear() + "-" + month + "-" + date.getDate();
  }
}
