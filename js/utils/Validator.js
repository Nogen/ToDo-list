class Validator {
  static validateDescription(description) {
    if (description.length < 1) {
      return "Description cannot be empty";
    } else if (description.length > 255) {
      return "Description cannot be longer than 255 characters";
    }
    return "";
  }

  static validateExpireDate(date) {
    if (!date.match(/^[\d]{4}-[\d]{1,2}-[\d]{1,2}$/)) {
      return "Date cannot be null and must be formatted as YYYY-MM-DD";
    }
    return "";
  }
}
