class Validator {
  static validateDescription(description) {
    if (description.length < 1) {
      return "Cannot be empty";
    } else if (description.length > 255) {
      return "Cannot be longer than 255 characters";
    }
    return "";
  }
}
