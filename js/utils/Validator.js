/**
 * Static class that validate description and date
 */
class Validator {
  /**
   * @param {String} description the string that needs to be checked
   * @returns a message error if the description length is 0 or greater of 255 else a void string
   */
  static validateDescription(description) {
    if (description.length < 1) {
      return "Description cannot be empty";
    } else if (description.length > 255) {
      return "Description cannot be longer than 255 characters";
    }
    return "";
  }

  /**
   *
   * @param {string} date the date string that needs to be checked
   * @returns a message error if the date isn't in the format YYYY-MM-DD else a void string
   */
  static validateExpireDate(date) {
    if (!date.match(/^[\d]{4}-[\d]{1,2}-[\d]{1,2}$/)) {
      return "Date cannot be null and must be formatted as YYYY-MM-DD";
    }
    return "";
  }
}
